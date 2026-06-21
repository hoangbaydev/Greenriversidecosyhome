import {
  getCollection,
  getDocumentBySlug,
  setDocument,
  removeDocument,
  getCollectionCount,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Tour } from "@/types";

const COL = FIRESTORE_COLLECTIONS.tours;

export async function fetchPublishedTours(): Promise<Tour[]> {
  return getCollection<Tour>(COL, {
    publishedOnly: true,
    orderField: "order",
  });
}

export async function fetchAllTours(): Promise<Tour[]> {
  return getCollection<Tour>(COL, { orderField: "order" });
}

export async function fetchTourBySlug(slug: string): Promise<Tour | null> {
  return getDocumentBySlug<Tour>(COL, slug, { publishedOnly: true });
}

export async function fetchFeaturedTours(count = 6): Promise<Tour[]> {
  const tours = await fetchPublishedTours();
  return tours.filter((t) => t.featured).slice(0, count);
}

export async function fetchTourSlugs(): Promise<string[]> {
  const tours = await fetchPublishedTours();
  return tours.map((t) => t.slug);
}

export async function countTours(): Promise<number> {
  return getCollectionCount(COL);
}

export async function saveTour(id: string, data: Omit<Tour, "id">): Promise<void> {
  await setDocument(COL, id, { ...data, id });
}

export async function deleteTour(id: string): Promise<void> {
  await removeDocument(COL, id);
}

export async function fetchToursByIds(ids: string[]): Promise<Tour[]> {
  if (!ids.length) return [];
  const all = await fetchPublishedTours();
  return ids
    .map((id) => all.find((t) => t.id === id))
    .filter((t): t is Tour => Boolean(t));
}
