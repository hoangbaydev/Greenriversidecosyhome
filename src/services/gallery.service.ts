import {
  getCollection,
  setDocument,
  removeDocument,
  getCollectionCount,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { GalleryItem, GalleryCategory } from "@/types";

const COL = FIRESTORE_COLLECTIONS.gallery;

export async function fetchGalleryItems(
  category?: GalleryCategory
): Promise<GalleryItem[]> {
  const items = await getCollection<GalleryItem>(COL, { orderField: "order" });
  if (category) return items.filter((i) => i.category === category);
  return items;
}

export async function fetchFeaturedGallery(count = 8): Promise<GalleryItem[]> {
  const items = await fetchGalleryItems();
  return items.filter((i) => i.featured).slice(0, count);
}

export async function countGallery(): Promise<number> {
  return getCollectionCount(COL);
}

export async function saveGalleryItem(
  id: string,
  data: Omit<GalleryItem, "id">
): Promise<void> {
  await setDocument(COL, id, { ...data, id });
}

export async function deleteGalleryItem(id: string): Promise<void> {
  await removeDocument(COL, id);
}
