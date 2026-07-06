import type { ContactInformation, SiteSettings } from "@/types";

export const OFFICIAL_GOOGLE_MAPS_URL = "https://maps.app.goo.gl/pG4zBELktoPaRYtdA";

export const OFFICIAL_SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/greenriverguesthouse",
  instagram: "https://www.instagram.com/greenriversidecosyhomephongnha",
  tiktok: "https://www.tiktok.com/@greenriversidecosyhome",
} as const;

const GENERIC_SOCIAL_URLS = new Set([
  "https://facebook.com/",
  "https://www.facebook.com/",
  "https://instagram.com/",
  "https://www.instagram.com/",
  "https://tiktok.com/",
  "https://www.tiktok.com/",
]);

const OLD_MAP_URLS = new Set([
  "https://maps.google.com/?q=Phong+Nha",
  "https://maps.app.goo.gl/ziWqMez9fChLCKNJ7",
]);

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "Green Riverside Cosy Home",
  tagline: "Come as our guest, leave as our family.",
  logoUrl: "/logo.png",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  phone: "+84 77 850 8898",
  email: "greenriverphongnha@gmail.com",
  address: "ĐT20, Phong Nha, Quảng Trị 311860",
  googleMapsUrl: OFFICIAL_GOOGLE_MAPS_URL,
  bookNowLabel: "Book Now",
  socialLinks: OFFICIAL_SOCIAL_LINKS,
  seo: {
    defaultTitle: "Green Riverside Cosy Home | Phong Nha",
    defaultDescription:
      "Family-run hospitality in Phong Nha. Stay, eat, explore and connect. Book direct via WhatsApp.",
    ogImage: "/images/home-hero.webp",
  },
  reviewRatings: {
    booking: "",
    airbnb: "",
    hostelworld: "",
    tripadvisor: "",
    google: "",
  },
};

export const DEFAULT_CONTACT_INFORMATION: ContactInformation = {
  phone: DEFAULT_SITE_SETTINGS.phone,
  email: DEFAULT_SITE_SETTINGS.email,
  address: DEFAULT_SITE_SETTINGS.address,
  whatsapp: DEFAULT_SITE_SETTINGS.whatsappNumber,
  googleMapsEmbed: "",
  googleMapsUrl: OFFICIAL_GOOGLE_MAPS_URL,
  openingHours: "Daily · 7:00 – 22:00",
};

function resolveOfficialUrl(current: string | undefined, official: string): string {
  const value = current?.trim();
  if (!value || GENERIC_SOCIAL_URLS.has(value) || OLD_MAP_URLS.has(value)) {
    return official;
  }
  return value;
}

export function normalizeSiteSettings(settings: SiteSettings | null): SiteSettings {
  const base = settings ?? DEFAULT_SITE_SETTINGS;
  const rawAddress = base.address?.trim();
  const address = (!rawAddress || rawAddress === "Son River, Phong Nha, Quang Binh, Vietnam")
    ? "ĐT20, Phong Nha, Quảng Trị 311860"
    : rawAddress;

  return {
    ...DEFAULT_SITE_SETTINGS,
    ...base,
    address,
    googleMapsUrl: resolveOfficialUrl(base.googleMapsUrl, OFFICIAL_GOOGLE_MAPS_URL),
    socialLinks: {
      ...base.socialLinks,
      facebook: resolveOfficialUrl(base.socialLinks?.facebook, OFFICIAL_SOCIAL_LINKS.facebook),
      instagram: resolveOfficialUrl(base.socialLinks?.instagram, OFFICIAL_SOCIAL_LINKS.instagram),
      tiktok: resolveOfficialUrl(base.socialLinks?.tiktok, OFFICIAL_SOCIAL_LINKS.tiktok),
    },
    seo: {
      ...DEFAULT_SITE_SETTINGS.seo,
      ...base.seo,
    },
    reviewRatings: {
      ...DEFAULT_SITE_SETTINGS.reviewRatings,
      ...base.reviewRatings,
    },
  };
}

export function normalizeContactInformation(
  contact: ContactInformation | null,
  settings?: SiteSettings | null
): ContactInformation {
  const normalizedSettings = normalizeSiteSettings(settings ?? null);
  const base = contact ?? DEFAULT_CONTACT_INFORMATION;
  const rawAddress = base.address?.trim();
  const address = (!rawAddress || rawAddress === "Son River, Phong Nha, Quang Binh, Vietnam")
    ? normalizedSettings.address
    : rawAddress;

  return {
    ...DEFAULT_CONTACT_INFORMATION,
    ...base,
    phone: base.phone || normalizedSettings.phone,
    email: base.email || normalizedSettings.email,
    address,
    whatsapp: base.whatsapp || normalizedSettings.whatsappNumber,
    googleMapsUrl: resolveOfficialUrl(
      base.googleMapsUrl || normalizedSettings.googleMapsUrl,
      OFFICIAL_GOOGLE_MAPS_URL
    ),
  };
}
