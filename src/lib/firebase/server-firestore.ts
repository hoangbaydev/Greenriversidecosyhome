import "server-only";

type CollectionOptions = {
  publishedOnly?: boolean;
  statusPublished?: boolean;
  orderField?: string;
  orderDirection?: "asc" | "desc";
};

import { serializeFirestoreValue } from "./serialize-firestore";

function serialize<T>(value: T): T {
  return serializeFirestoreValue(value);
}

async function withAdminFallback<T>(
  adminRead: () => Promise<T | null>,
  clientRead: () => Promise<T>
): Promise<T> {
  try {
    const adminResult = await adminRead();
    if (adminResult !== null) return adminResult;
  } catch {
    // Fall back to client SDK reads below.
  }
  return clientRead();
}

export async function serverGetCollection<T>(
  collectionName: string,
  options?: CollectionOptions
): Promise<T[]> {
  const result = await withAdminFallback(
    async () => {
      const { adminGetCollection } = await import("./admin-firestore");
      return adminGetCollection<T>(collectionName, options);
    },
    async () => {
      const { getCollection } = await import("./firestore");
      return getCollection<T>(collectionName, options);
    }
  );
  return serialize(result);
}

export async function serverGetDocument<T>(
  collectionName: string,
  id: string
): Promise<T | null> {
  const result = await withAdminFallback(
    async () => {
      const { adminGetDocument } = await import("./admin-firestore");
      return adminGetDocument<T>(collectionName, id);
    },
    async () => {
      const { getDocument } = await import("./firestore");
      return getDocument<T>(collectionName, id);
    }
  );
  return result ? serialize(result) : null;
}

export async function serverGetDocumentBySlug<T>(
  collectionName: string,
  slug: string,
  options?: { publishedOnly?: boolean; statusPublished?: boolean }
): Promise<T | null> {
  const result = await withAdminFallback(
    async () => {
      const { adminGetDocumentBySlug } = await import("./admin-firestore");
      return adminGetDocumentBySlug<T>(collectionName, slug, options);
    },
    async () => {
      const { getDocumentBySlug } = await import("./firestore");
      return getDocumentBySlug<T>(collectionName, slug, options);
    }
  );
  return result ? serialize(result) : null;
}

export async function serverGetFeatured<T>(
  collectionName: string,
  count = 6
): Promise<T[]> {
  const result = await withAdminFallback(
    async () => {
      const { adminGetFeatured } = await import("./admin-firestore");
      return adminGetFeatured<T>(collectionName, count);
    },
    async () => {
      const { getFeatured } = await import("./firestore");
      return getFeatured<T>(collectionName, count);
    }
  );
  return serialize(result);
}
