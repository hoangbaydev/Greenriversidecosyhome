import type { Locale } from "@/lib/i18n/config";
import type { PageContent } from "@/types";
import { getPageContent, getSiteSettings } from "@/lib/data/services";
import { getDictionary } from "@/lib/i18n/get-dictionary";

const pageDictKeys = {
  stay: "stay",
  tours: "tours",
  "our-story": "ourStory",
  "eat-drink": "eatDrink",
  "explore-phong-nha": "explore",
  transportation: "transportation",
  "other-services": "otherServices",
  "useful-info": "usefulInfo",
  "social-activities": "activities",
  gallery: "gallery",
  blog: "blog",
  contact: "contact",
} as const satisfies Record<PageContent["pageKey"], string>;

export async function resolvePageMeta(
  locale: Locale,
  pageKey: PageContent["pageKey"],
  path: string
) {
  const [page, settings, dict] = await Promise.all([
    getPageContent(locale, pageKey),
    getSiteSettings(),
    getDictionary(locale),
  ]);

  const siteName = settings?.siteName || "Green Riverside Cosy Home";
  const pageDict = dict.pages[pageDictKeys[pageKey] as keyof typeof dict.pages] as
    | { metaTitle?: string; metaDescription?: string }
    | undefined;
  const title =
    page?.metaTitle ||
    pageDict?.metaTitle ||
    settings?.seo?.defaultTitle ||
    `${siteName}`;
  const description =
    page?.metaDescription ||
    pageDict?.metaDescription ||
    settings?.seo?.defaultDescription ||
    settings?.tagline ||
    "";

  return { page, settings, title, description, path };
}
