import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { locales } from "@/lib/i18n/config";

export const dynamic = "force-static";
import {
  getAllRoomSlugs,
  getAllTourSlugs,
  getAllBlogSlugs,
} from "@/lib/data/services";

function localizedAlternates(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const suffix = normalized === "/" ? "" : normalized;

  return {
    languages: {
      en: `${SITE_URL}/en${suffix}`,
      vi: `${SITE_URL}/vi${suffix}`,
      "x-default": `${SITE_URL}/en${suffix}`,
    },
  };
}

function localizedEntry(locale: string, path = "", options?: {
  changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority?: number;
  images?: string[];
}) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const suffix = normalized === "/" ? "" : normalized;

  return {
    url: `${SITE_URL}/${locale}${suffix}`,
    lastModified: new Date(),
    changeFrequency: options?.changeFrequency ?? ("weekly" as const),
    priority: options?.priority ?? 0.8,
    alternates: localizedAlternates(suffix),
    images: options?.images,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [roomSlugs, tourSlugs, blogSlugs] = await Promise.all([
    getAllRoomSlugs(),
    getAllTourSlugs(),
    getAllBlogSlugs(),
  ]);

  const staticPaths = [
    "",
    "/our-story",
    "/stay",
    "/eat-drink",
    "/explore-phong-nha",
    "/tours",
    "/transportation",
    "/other-services",
    "/useful-info",
    "/social-activities",
    "/gallery",
    "/blog",
    "/faq",
    "/contact",
    "/terms",
    "/privacy",
  ];

  const staticPages = locales.flatMap((locale) =>
    staticPaths.map((path) =>
      localizedEntry(locale, path || "/", {
        priority: path === "" ? 1 : 0.8,
        images: path === "" ? [`${SITE_URL}/images/home-hero.webp`] : undefined,
      })
    )
  );

  const roomPages = locales.flatMap((locale) =>
    roomSlugs.map((slug) =>
      localizedEntry(locale, `/stay/${slug}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      })
    )
  );

  const tourPages = locales.flatMap((locale) =>
    tourSlugs.map((slug) =>
      localizedEntry(locale, `/tours/${slug}`, {
        changeFrequency: "monthly",
        priority: 0.7,
      })
    )
  );

  const blogPages = locales.flatMap((locale) =>
    blogSlugs.map((slug) =>
      localizedEntry(locale, `/blog/${slug}`, {
        changeFrequency: "weekly",
        priority: 0.6,
      })
    )
  );

  return [...staticPages, ...roomPages, ...tourPages, ...blogPages];
}
