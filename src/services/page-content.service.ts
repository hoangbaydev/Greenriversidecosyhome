import {
  getDocument,
  setDocument,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Locale } from "@/lib/i18n/config";
import type { PageContent, PageKey } from "@/types";

function pageDocId(locale: Locale, pageKey: PageKey): string {
  return `${locale}_${pageKey}`;
}

export async function fetchPageContent(
  locale: Locale,
  pageKey: PageKey
): Promise<PageContent | null> {
  return getDocument<PageContent>(
    FIRESTORE_COLLECTIONS.pageContent,
    pageDocId(locale, pageKey)
  );
}

export async function savePageContent(
  locale: Locale,
  data: PageContent
): Promise<void> {
  await setDocument(
    FIRESTORE_COLLECTIONS.pageContent,
    pageDocId(locale, data.pageKey),
    { ...data, locale }
  );
}

export const PAGE_KEYS: PageKey[] = [
  "stay",
  "tours",
  "our-story",
  "eat-drink",
  "transportation",
  "social-activities",
  "gallery",
  "blog",
  "contact",
];
