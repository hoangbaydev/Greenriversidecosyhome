import {
  getDocument,
  setDocument,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { HomepageContent } from "@/types";
import { normalizeHomepage } from "@/types";

const DOC_ID = "main";

export async function fetchHomepageContent(): Promise<HomepageContent | null> {
  const doc = await getDocument<HomepageContent>(
    FIRESTORE_COLLECTIONS.homepageContent,
    DOC_ID
  );
  return doc ? normalizeHomepage(doc) : null;
}

export async function saveHomepageContent(
  data: HomepageContent
): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.homepageContent, DOC_ID, {
    ...data,
    id: DOC_ID,
  });
}
