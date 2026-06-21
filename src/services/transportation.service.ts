import {
  getCollection,
  setDocument,
  removeDocument,
  getCollectionCount,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Transportation } from "@/types";

const COL = FIRESTORE_COLLECTIONS.transportation;

export async function fetchPublishedTransportation(): Promise<Transportation[]> {
  return getCollection<Transportation>(COL, {
    publishedOnly: true,
    orderField: "order",
  });
}

export async function fetchAllTransportation(): Promise<Transportation[]> {
  return getCollection<Transportation>(COL, { orderField: "order" });
}

export async function countTransportation(): Promise<number> {
  return getCollectionCount(COL);
}

export async function saveTransportation(
  id: string,
  data: Omit<Transportation, "id">
): Promise<void> {
  await setDocument(COL, id, { ...data, id });
}

export async function deleteTransportation(id: string): Promise<void> {
  await removeDocument(COL, id);
}
