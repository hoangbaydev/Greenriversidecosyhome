import {
  getDocument,
  setDocument,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/config";
import { doc, onSnapshot } from "firebase/firestore";
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

export function subscribeCafeContent(
  locale: Locale,
  onChange: (content: CafeContent | null) => void
): () => void {
  const db = getFirebaseDb();
  if (!db) return () => {};

  return onSnapshot(
    doc(db, FIRESTORE_COLLECTIONS.cafeContent, locale),
    (snapshot) => {
      onChange(snapshot.exists() ? (snapshot.data() as CafeContent) : null);
    },
    () => {}
  );
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

export async function saveCafeImages(
  locale: Locale,
  images: string[]
): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.cafeContent, locale, { images });
}
