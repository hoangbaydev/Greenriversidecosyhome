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
  const reviews = await getCollection<Review>(COL);
  return reviews.sort(
    (a, b) =>
      (a.displayOrder ?? a.order ?? 999) - (b.displayOrder ?? b.order ?? 999) ||
      (b.rating ?? 0) - (a.rating ?? 0)
  );
}

export async function fetchFeaturedReviews(count = 6): Promise<Review[]> {
  const reviews = await fetchReviews();
  return reviews
    .filter((r) => r.featured && ((r.rating ?? 0) >= 9 || ((r.rating ?? 0) <= 5 && (r.rating ?? 0) >= 4.5)))
    .slice(0, count);
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
