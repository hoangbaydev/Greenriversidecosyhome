import {
  getCollection,
  setDocument,
  removeDocument,
  getCollectionCount,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Activity } from "@/types";

const COL = FIRESTORE_COLLECTIONS.activities;

export async function fetchActivities(): Promise<Activity[]> {
  return getCollection<Activity>(COL, { orderField: "order" });
}

export async function countActivities(): Promise<number> {
  return getCollectionCount(COL);
}

export async function saveActivity(
  id: string,
  data: Omit<Activity, "id">
): Promise<void> {
  await setDocument(COL, id, { ...data, id });
}

export async function deleteActivity(id: string): Promise<void> {
  await removeDocument(COL, id);
}
