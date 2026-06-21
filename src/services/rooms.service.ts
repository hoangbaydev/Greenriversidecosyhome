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
  await setDocument(COL, id, { ...data, id });
}

export async function deleteRoom(id: string): Promise<void> {
  await removeDocument(COL, id);
}

export async function fetchRoomsByIds(ids: string[]): Promise<Room[]> {
  if (!ids.length) return [];
  const all = await fetchPublishedRooms();
  return ids
    .map((id) => all.find((r) => r.id === id))
    .filter((r): r is Room => Boolean(r));
}
