import {
  getDocument,
  setDocument,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { SiteSettings, ContactInformation } from "@/types";

const SETTINGS_ID = "main";
const CONTACT_ID = "main";

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  return getDocument<SiteSettings>(
    FIRESTORE_COLLECTIONS.siteSettings,
    SETTINGS_ID
  );
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.siteSettings, SETTINGS_ID, data);
}

export async function fetchContactInformation(): Promise<ContactInformation | null> {
  return getDocument<ContactInformation>(
    FIRESTORE_COLLECTIONS.contactInformation,
    CONTACT_ID
  );
}

export async function saveContactInformation(
  data: ContactInformation
): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.contactInformation, CONTACT_ID, data);
}
