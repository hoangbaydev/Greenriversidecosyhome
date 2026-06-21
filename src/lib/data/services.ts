import "server-only";

import {
  serverGetCollection,
  serverGetDocument,
  serverGetDocumentBySlug,
} from "@/lib/firebase/server-firestore";
import { FIRESTORE_COLLECTIONS } from "@/lib/firebase/firestore";
import type { Locale } from "@/lib/i18n/config";
import type {
  Room,
  Tour,
  Activity,
  Transportation,
  GalleryItem,
  Review,
  BlogPost,
  HomepageContent,
  SiteSettings,
  ContactInformation,
  StoryContent,
  CafeContent,
  FaqContent,
  Faq,
  PageContent,
  PageKey,
} from "@/types";
import { normalizeHomepage } from "@/types";

const HOMEPAGE_ID = "main";
const SETTINGS_ID = "main";
const CONTACT_ID = "main";

function pageDocId(locale: Locale, pageKey: PageKey): string {
  return `${locale}_${pageKey}`;
}

function byOrder<T extends { order?: number }>(a: T, b: T): number {
  return (a.order ?? 0) - (b.order ?? 0);
}

function byPublishedAtDesc(a: BlogPost, b: BlogPost): number {
  return (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");
}

export async function getRooms(): Promise<Room[]> {
  const rooms = await serverGetCollection<Room>(FIRESTORE_COLLECTIONS.rooms, {
    publishedOnly: true,
  });
  return rooms.sort(byOrder);
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  return serverGetDocumentBySlug<Room>(FIRESTORE_COLLECTIONS.rooms, slug, {
    publishedOnly: true,
  });
}

export async function getFeaturedRooms(count = 4): Promise<Room[]> {
  const rooms = await getRooms();
  return rooms.filter((r) => r.featured).slice(0, count);
}

export async function getAllRoomSlugs(): Promise<string[]> {
  const rooms = await getRooms();
  return rooms.map((r) => r.slug);
}

export async function fetchRoomsByIds(ids: string[]): Promise<Room[]> {
  if (!ids.length) return [];
  const all = await getRooms();
  return ids.map((id) => all.find((r) => r.id === id)).filter((r): r is Room => Boolean(r));
}

export async function getTours(): Promise<Tour[]> {
  const tours = await serverGetCollection<Tour>(FIRESTORE_COLLECTIONS.tours, {
    publishedOnly: true,
  });
  return tours.sort(byOrder);
}

export async function getTourBySlug(slug: string): Promise<Tour | null> {
  return serverGetDocumentBySlug<Tour>(FIRESTORE_COLLECTIONS.tours, slug, {
    publishedOnly: true,
  });
}

export async function getFeaturedTours(count = 4): Promise<Tour[]> {
  const tours = await getTours();
  return tours.filter((t) => t.featured).slice(0, count);
}

export async function getAllTourSlugs(): Promise<string[]> {
  const tours = await getTours();
  return tours.map((t) => t.slug);
}

export async function fetchToursByIds(ids: string[]): Promise<Tour[]> {
  if (!ids.length) return [];
  const all = await getTours();
  return ids.map((id) => all.find((t) => t.id === id)).filter((t): t is Tour => Boolean(t));
}

export async function getActivities(): Promise<Activity[]> {
  const activities = await serverGetCollection<Activity>(FIRESTORE_COLLECTIONS.activities);
  return activities.sort(byOrder);
}

export async function getTransportation(): Promise<Transportation[]> {
  const items = await serverGetCollection<Transportation>(FIRESTORE_COLLECTIONS.transportation, {
    publishedOnly: true,
  });
  return items.sort(byOrder);
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const items = await serverGetCollection<GalleryItem>(FIRESTORE_COLLECTIONS.gallery);
  return items.sort(byOrder);
}

export async function getFeaturedGallery(count = 8): Promise<GalleryItem[]> {
  const items = await getGalleryItems();
  return items.filter((i) => i.featured).slice(0, count);
}

export async function getReviews(): Promise<Review[]> {
  return serverGetCollection<Review>(FIRESTORE_COLLECTIONS.reviews);
}

export async function getFeaturedReviews(count = 4): Promise<Review[]> {
  const reviews = await getReviews();
  return reviews.filter((r) => r.featured).slice(0, count);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await serverGetCollection<BlogPost>(FIRESTORE_COLLECTIONS.blogPosts, {
    statusPublished: true,
  });
  return posts.sort(byPublishedAtDesc);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return serverGetDocumentBySlug<BlogPost>(FIRESTORE_COLLECTIONS.blogPosts, slug, {
    statusPublished: true,
  });
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  const doc = await serverGetDocument<HomepageContent>(
    FIRESTORE_COLLECTIONS.homepageContent,
    HOMEPAGE_ID
  );
  return doc ? normalizeHomepage(doc) : null;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return serverGetDocument<SiteSettings>(FIRESTORE_COLLECTIONS.siteSettings, SETTINGS_ID);
}

export async function getContactInformation(): Promise<ContactInformation | null> {
  return serverGetDocument<ContactInformation>(
    FIRESTORE_COLLECTIONS.contactInformation,
    CONTACT_ID
  );
}

export async function getStoryContent(locale: Locale): Promise<StoryContent | null> {
  return serverGetDocument<StoryContent>(FIRESTORE_COLLECTIONS.storyContent, locale);
}

export async function getCafeContent(locale: Locale): Promise<CafeContent | null> {
  return serverGetDocument<CafeContent>(FIRESTORE_COLLECTIONS.cafeContent, locale);
}

export async function getFaqContent(locale: Locale): Promise<FaqContent | null> {
  const meta = await serverGetDocument<FaqContent>(
    FIRESTORE_COLLECTIONS.faqContent,
    locale
  );
  const faqDocs = await serverGetCollection<Faq>(FIRESTORE_COLLECTIONS.faqs, {
    publishedOnly: true,
  });
  const fromCollection = faqDocs
    .filter((f) => f.locale === locale && f.published !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(({ question, answer, order }) => ({ question, answer, order }));

  const items =
    fromCollection.length > 0 ? fromCollection : (meta?.items ?? []).filter((i) => i.question?.trim());

  if (!meta?.title && !items.length) return null;

  return {
    title: meta?.title ?? "",
    subtitle: meta?.subtitle,
    items,
  };
}

export async function getPageContent(
  locale: Locale,
  pageKey: PageKey
): Promise<PageContent | null> {
  return serverGetDocument<PageContent>(
    FIRESTORE_COLLECTIONS.pageContent,
    pageDocId(locale, pageKey)
  );
}
