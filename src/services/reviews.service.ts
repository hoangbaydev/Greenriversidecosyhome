import {
  getCollection,
  setDocument,
  removeDocument,
  getCollectionCount,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Review } from "@/types";

const COL = FIRESTORE_COLLECTIONS.reviews;

export async function fetchReviews(): Promise<Review[]> {
  return getCollection<Review>(COL);
}

export async function fetchFeaturedReviews(count = 4): Promise<Review[]> {
  const reviews = await fetchReviews();
  return reviews.filter((r) => r.featured).slice(0, count);
}

export async function countReviews(): Promise<number> {
  return getCollectionCount(COL);
}

export async function saveReview(
  id: string,
  data: Omit<Review, "id">
): Promise<void> {
  await setDocument(COL, id, { ...data, id }, { timestamps: false });
}

export async function deleteReview(id: string): Promise<void> {
  await removeDocument(COL, id);
}
