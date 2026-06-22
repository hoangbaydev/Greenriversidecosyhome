/**
 * Sync the public room catalog without touching the rest of the CMS.
 * Usage: node --env-file=.env.local scripts/sync-room-catalog.mjs
 */

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ROOMS } from "./content/from-docx.mjs";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@greenriversidecosyhome.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "admin123@";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const shouldEmptyImages = process.argv.includes("--empty-images");

function normalizeExistingRoomImages(room) {
  const roomImages = Array.isArray(room?.roomImages)
    ? room.roomImages
        .filter((image) => image?.imageUrl)
        .sort((a, b) => {
          if (a.isCover && !b.isCover) return -1;
          if (!a.isCover && b.isCover) return 1;
          return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
        })
        .map((image, index) => ({
          ...image,
          sortOrder: index,
          isCover: index === 0,
        }))
    : [];

  const images = roomImages.length
    ? roomImages.map((image) => image.imageUrl)
    : Array.isArray(room?.images)
      ? room.images.filter(Boolean)
      : [];

  return { images, roomImages };
}

async function main() {
  console.log("Signing in as admin...");
  await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);

  const snapshot = await getDocs(collection(db, "rooms"));
  const existingRooms = new Map(snapshot.docs.map((item) => [item.id, item.data()]));
  const allowedIds = new Set(ROOMS.map((room) => room.id));

  for (const room of ROOMS) {
    const existing = existingRooms.get(room.id);
    const { images, roomImages } = shouldEmptyImages
      ? { images: [], roomImages: [] }
      : normalizeExistingRoomImages(existing);

    if (shouldEmptyImages) {
      try {
        const imageSnapshot = await getDocs(collection(db, "rooms", room.id, "images"));
        for (const imageDoc of imageSnapshot.docs) {
          await deleteDoc(imageDoc.ref);
        }
      } catch (error) {
        console.warn(`Could not clear image metadata for rooms/${room.id}. Root gallery will still be empty.`, error);
      }
    }

    await setDoc(
      doc(db, "rooms", room.id),
      {
        ...room,
        id: room.id,
        images,
        roomImages,
        featured: room.order <= 4,
        published: true,
        createdAt: existing?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log(`Synced rooms/${room.id}`);
  }

  for (const docSnap of snapshot.docs) {
    if (allowedIds.has(docSnap.id)) continue;
    if (docSnap.data().published !== false) {
      await setDoc(
        doc(db, "rooms", docSnap.id),
        { published: false, featured: false, updatedAt: serverTimestamp() },
        { merge: true }
      );
      console.log(`Unpublished old rooms/${docSnap.id}`);
    }
  }

  console.log("Room catalog sync complete.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Room catalog sync failed:", error);
    process.exit(1);
  });
