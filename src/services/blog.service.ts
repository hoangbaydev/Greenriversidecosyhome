import {
  getCollection,
  getDocumentBySlug,
  setDocument,
  removeDocument,
  getCollectionCount,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { BlogPost } from "@/types";

const COL = FIRESTORE_COLLECTIONS.blogPosts;

export async function fetchPublishedBlogPosts(): Promise<BlogPost[]> {
  const byStatus = await getCollection<BlogPost>(COL, {
    statusPublished: true,
    orderField: "publishedAt",
    orderDirection: "desc",
  });
  if (byStatus.length > 0) return byStatus;

  return getCollection<BlogPost>(COL, {
    publishedOnly: true,
    orderField: "publishedAt",
    orderDirection: "desc",
  });
}

export async function fetchAllBlogPosts(): Promise<BlogPost[]> {
  return getCollection<BlogPost>(COL, {
    orderField: "publishedAt",
    orderDirection: "desc",
  });
}

export async function fetchBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  const byStatus = await getDocumentBySlug<BlogPost>(COL, slug, {
    statusPublished: true,
  });
  if (byStatus) return byStatus;
  return getDocumentBySlug<BlogPost>(COL, slug, { publishedOnly: true });
}

export async function fetchBlogSlugs(): Promise<string[]> {
  const posts = await fetchPublishedBlogPosts();
  return posts.map((p) => p.slug);
}

export async function countBlogPosts(): Promise<number> {
  return getCollectionCount(COL);
}

export async function saveBlogPost(
  id: string,
  data: Omit<BlogPost, "id">
): Promise<void> {
  await setDocument(COL, id, {
    ...data,
    id,
    published: data.status === "published",
    coverImage: data.featuredImage,
  });
}

export async function deleteBlogPost(id: string): Promise<void> {
  await removeDocument(COL, id);
}
