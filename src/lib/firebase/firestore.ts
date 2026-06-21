import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getCountFromServer,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import {
  getFirebaseDb,
  FIRESTORE_COLLECTIONS,
  isFirebaseConfigured,
} from "./config";
import { isEnvValid } from "@/lib/env";

const warnedCollections = new Set<string>();
let permissionDeniedDetected = false;

export function wasFirestorePermissionDenied(): boolean {
  return permissionDeniedDetected;
}

function isPermissionDenied(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "permission-denied"
  );
}

function isFailedPrecondition(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "failed-precondition"
  );
}

function isRecoverableReadError(error: unknown): boolean {
  return isPermissionDenied(error) || isFailedPrecondition(error);
}

function warnPermissionDenied(collectionName: string) {
  if (warnedCollections.has(collectionName)) return;
  warnedCollections.add(collectionName);
  permissionDeniedDetected = true;
  console.warn(
    `[Firestore] Read denied for "${collectionName}". Run: npm run firebase:deploy`
  );
}

function mapDocs<T>(docs: { id: string; data: () => DocumentData }[]): T[] {
  return docs.map((d) => ({ id: d.id, ...d.data() }) as T);
}

export function isFirestoreAvailable(): boolean {
  return isEnvValid() && isFirebaseConfigured();
}

export async function getCollection<T>(
  collectionName: string,
  options?: {
    publishedOnly?: boolean;
    statusPublished?: boolean;
    orderField?: string;
    orderDirection?: "asc" | "desc";
  }
): Promise<T[]> {
  const db = getFirebaseDb();
  if (!db) return [];

  let q = query(collection(db, collectionName));
  if (options?.publishedOnly) {
    q = query(q, where("published", "==", true));
  }
  if (options?.statusPublished) {
    q = query(q, where("status", "==", "published"));
  }
  if (options?.orderField) {
    q = query(
      q,
      orderBy(options.orderField, options.orderDirection ?? "asc")
    );
  }

  try {
    const snap = await getDocs(q);
    return mapDocs<T>(snap.docs);
  } catch (error) {
    if (isRecoverableReadError(error)) {
      if (isPermissionDenied(error)) warnPermissionDenied(collectionName);
      return [];
    }
    throw error;
  }
}

export async function getCollectionCount(
  collectionName: string
): Promise<number> {
  const db = getFirebaseDb();
  if (!db) return 0;
  try {
    const snap = await getCountFromServer(collection(db, collectionName));
    return snap.data().count;
  } catch (error) {
    if (isRecoverableReadError(error)) return 0;
    throw error;
  }
}

export async function getDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, collectionName, id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as T;
  } catch (error) {
    if (isRecoverableReadError(error)) return null;
    throw error;
  }
}

export async function getDocumentBySlug<T>(
  collectionName: string,
  slug: string,
  options?: { publishedOnly?: boolean; statusPublished?: boolean }
): Promise<T | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  let q = query(collection(db, collectionName), where("slug", "==", slug));
  if (options?.publishedOnly) {
    q = query(q, where("published", "==", true));
  }
  if (options?.statusPublished) {
    q = query(q, where("status", "==", "published"));
  }
  try {
    const snap = await getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, ...d.data() } as T;
  } catch (error) {
    if (isRecoverableReadError(error)) return null;
    throw error;
  }
}

export async function setDocument(
  collectionName: string,
  id: string,
  data: DocumentData,
  options?: { merge?: boolean; timestamps?: boolean }
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not configured");

  const payload = { ...data };
  if (options?.timestamps !== false) {
    payload.updatedAt = serverTimestamp();
    if (!payload.createdAt) {
      payload.createdAt = serverTimestamp();
    }
  }

  await setDoc(doc(db, collectionName, id), payload, {
    merge: options?.merge ?? true,
  });
}

export async function removeDocument(
  collectionName: string,
  id: string
): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firebase is not configured");
  await deleteDoc(doc(db, collectionName, id));
}

export async function getFeatured<T>(
  collectionName: string,
  count = 6
): Promise<T[]> {
  const db = getFirebaseDb();
  if (!db) return [];
  const q = query(
    collection(db, collectionName),
    where("featured", "==", true),
    where("published", "==", true),
    orderBy("order", "asc"),
    limit(count)
  );
  try {
    const snap = await getDocs(q);
    return mapDocs<T>(snap.docs);
  } catch (error) {
    if (isRecoverableReadError(error)) return [];
    throw error;
  }
}

export { isFirebaseConfigured, FIRESTORE_COLLECTIONS, serverTimestamp };
