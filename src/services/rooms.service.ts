import {
  getCollection,
  getDocument,
  getDocumentBySlug,
  setDocument,
  removeDocument,
  getCollectionCount,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Room } from "@/types";
import { collection, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/config";
import { deleteImage, extractStoragePathFromUrl } from "@/lib/firebase/storage";

const COL = FIRESTORE_COLLECTIONS.rooms;

export async function fetchPublishedRooms(): Promise<Room[]> {
  return getCollection<Room>(COL, {
    publishedOnly: true,
    orderField: "order",
  });
}

export async function fetchAllRooms(): Promise<Room[]> {
  return getCollection<Room>(COL, { orderField: "order" });
}

export async function fetchRoomBySlug(slug: string): Promise<Room | null> {
  return getDocumentBySlug<Room>(COL, slug, { publishedOnly: true });
}

export async function fetchRoomById(id: string): Promise<Room | null> {
  return getDocument<Room>(COL, id);
}

export async function fetchFeaturedRooms(count = 4): Promise<Room[]> {
  const rooms = await fetchPublishedRooms();
  return rooms.filter((r) => r.featured).slice(0, count);
}

export async function fetchRoomSlugs(): Promise<string[]> {
  const rooms = await fetchPublishedRooms();
  return rooms.map((r) => r.slug);
}

export async function countRooms(): Promise<number> {
  return getCollectionCount(COL);
}

export async function saveRoom(id: string, data: Omit<Room, "id">): Promise<void> {
  // 1. Save root Room document
  await setDocument(COL, id, { ...data, id });

  // 2. Manage Firestore Subcollection: rooms/{roomId}/images/{imageId}
  if (data.roomImages) {
    const db = getFirebaseDb();
    if (db) {
      try {
        const subColRef = collection(db, COL, id, "images");
        const snapshot = await getDocs(subColRef);
        const existingIds = snapshot.docs.map((d) => d.id);
        
        const newIds = data.roomImages.map((img) => img.id);
        const toDelete = existingIds.filter((x) => !newIds.includes(x));

        // Delete removed images from Firestore subcollection
        for (const imgId of toDelete) {
          await deleteDoc(doc(db, COL, id, "images", imgId));
        }

        // Write/update current images metadata in Firestore subcollection
        for (const img of data.roomImages) {
          const imgDocRef = doc(db, COL, id, "images", img.id);
          await setDoc(
            imgDocRef,
            {
              id: img.id,
              imageUrl: img.imageUrl,
              imagePath: img.imagePath,
              roomId: id,
              sortOrder: img.sortOrder,
              isCover: img.isCover,
              altText: img.altText || "",
              title: img.title || "",
              description: img.description || "",
              uploadedAt: img.uploadedAt,
            },
            { merge: true }
          );
        }
      } catch (error) {
        console.warn("Room saved, but image metadata subcollection sync failed.", error);
      }
    }
  }
}

export async function deleteRoom(id: string): Promise<void> {
  const existingRoom = await getDocument<Room>(COL, id).catch((error) => {
    console.warn("Could not read room before deletion. Continuing with root delete.", error);
    return null;
  });

  // Delete the root room first. If this succeeds, the CMS should consider the room deleted.
  // Storage and image metadata cleanup below are best-effort so a stale image file cannot block deletion.
  await removeDocument(COL, id);

  const imagePaths = new Set<string>();
  existingRoom?.roomImages?.forEach((img) => {
    if (img.imagePath) imagePaths.add(img.imagePath);
  });
  existingRoom?.images?.forEach((url) => {
    const path = extractStoragePathFromUrl(url);
    if (path) imagePaths.add(path);
  });

  const db = getFirebaseDb();
  if (db) {
    try {
      const subColRef = collection(db, COL, id, "images");
      const snapshot = await getDocs(subColRef);
      for (const docSnap of snapshot.docs) {
        const imgData = docSnap.data();
        if (imgData.imagePath) imagePaths.add(imgData.imagePath);
        try {
          await deleteDoc(docSnap.ref);
        } catch (err) {
          console.warn("Room deleted, but image metadata cleanup failed", err);
        }
      }
    } catch (error) {
      console.warn("Room deleted, but image metadata lookup failed", error);
    }
  }

  for (const path of imagePaths) {
    try {
      await deleteImage(path);
    } catch (err) {
      console.warn("Room deleted, but storage image cleanup failed", err);
    }
  }
}

export async function fetchRoomsByIds(ids: string[]): Promise<Room[]> {
  if (!ids.length) return [];
  const all = await fetchPublishedRooms();
  return ids
    .map((id) => all.find((r) => r.id === id))
    .filter((r): r is Room => Boolean(r));
}
