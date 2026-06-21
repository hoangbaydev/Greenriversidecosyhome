import "server-only";

import type { Query, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { getAdminFirestore } from "./admin-app";

function mapDocs<T>(docs: QueryDocumentSnapshot[]): T[] {
  return docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export async function adminGetCollection<T>(
  collectionName: string,
  options?: {
    publishedOnly?: boolean;
    statusPublished?: boolean;
    orderField?: string;
    orderDirection?: "asc" | "desc";
  }
): Promise<T[] | null> {
  const db = getAdminFirestore();
  if (!db) return null;

  let q: Query = db.collection(collectionName);
  if (options?.publishedOnly) {
    q = q.where("published", "==", true);
  }
  if (options?.statusPublished) {
    q = q.where("status", "==", "published");
  }
  if (options?.orderField) {
    q = q.orderBy(options.orderField, options.orderDirection ?? "asc");
  }

  const snap = await q.get();
  return mapDocs<T>(snap.docs);
}

export async function adminGetCollectionCount(collectionName: string): Promise<number | null> {
  const db = getAdminFirestore();
  if (!db) return null;
  const snap = await db.collection(collectionName).count().get();
  return snap.data().count;
}

export async function adminGetDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const db = getAdminFirestore();
  if (!db) return null;
  const snap = await db.collection(collectionName).doc(id).get();
  if (!snap.exists) return null;
  return { id: snap.id, ...snap.data() } as T;
}

export async function adminGetDocumentBySlug<T>(
  collectionName: string,
  slug: string,
  options?: { publishedOnly?: boolean; statusPublished?: boolean }
): Promise<T | null> {
  const db = getAdminFirestore();
  if (!db) return null;

  let q: Query = db.collection(collectionName).where("slug", "==", slug);
  if (options?.publishedOnly) {
    q = q.where("published", "==", true);
  }
  if (options?.statusPublished) {
    q = q.where("status", "==", "published");
  }

  const snap = await q.limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as T;
}

export async function adminGetFeatured<T>(
  collectionName: string,
  count = 6
): Promise<T[] | null> {
  const db = getAdminFirestore();
  if (!db) return null;

  const snap = await db
    .collection(collectionName)
    .where("featured", "==", true)
    .where("published", "==", true)
    .orderBy("order", "asc")
    .limit(count)
    .get();

  return mapDocs<T>(snap.docs);
}
