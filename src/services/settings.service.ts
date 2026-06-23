import {
  getDocument,
  setDocument,
  FIRESTORE_COLLECTIONS,
} from "@/lib/firebase/firestore";
import type { SiteSettings, ContactInformation } from "@/types";
import {
  normalizeContactInformation,
  normalizeSiteSettings,
} from "@/lib/content/site-settings-defaults";

const SETTINGS_ID = "main";
const CONTACT_ID = "main";

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const settings = await getDocument<SiteSettings>(
    FIRESTORE_COLLECTIONS.siteSettings,
    SETTINGS_ID
  );

  return normalizeSiteSettings(settings);
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.siteSettings, SETTINGS_ID, data);
}

export async function fetchContactInformation(): Promise<ContactInformation> {
  const [contact, settings] = await Promise.all([
    getDocument<ContactInformation>(
      FIRESTORE_COLLECTIONS.contactInformation,
      CONTACT_ID
    ),
    getDocument<SiteSettings>(FIRESTORE_COLLECTIONS.siteSettings, SETTINGS_ID),
  ]);

  return normalizeContactInformation(contact, settings);
}

export async function saveContactInformation(
  data: ContactInformation
): Promise<void> {
  await setDocument(FIRESTORE_COLLECTIONS.contactInformation, CONTACT_ID, data);
}
