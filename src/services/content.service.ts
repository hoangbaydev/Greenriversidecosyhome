import {
  getDocument,
  setDocument,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { Locale } from "@/lib/i18n/config";
import type { StoryContent, CafeContent } from "@/types";

export async function fetchStoryContent(
  locale: Locale
): Promise<StoryContent | null> {
  return getDocument<StoryContent>(
    FIRESTORE_COLLECTIONS.storyContent,
    locale
  );
}

export async function fetchCafeContent(
  locale: Locale
): Promise<CafeContent | null> {
  return getDocument<CafeContent>(FIRESTORE_COLLECTIONS.cafeContent, locale);
}

export async function saveStoryContent(
  locale: Locale,
  data: StoryContent
): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.storyContent, locale, data);
}

export async function saveCafeContent(
  locale: Locale,
  data: CafeContent
): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.cafeContent, locale, data);
}
