import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { locales } from "@/lib/i18n/config";

export const dynamic = "force-static";
import {
  getAllRoomSlugs,
  getAllTourSlugs,
  getAllBlogSlugs,
} from "@/lib/data/services";

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
    staticPaths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }))
  );

  const roomPages = locales.flatMap((locale) =>
    roomSlugs.map((slug) => ({
      url: `${SITE_URL}/${locale}/stay/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const tourPages = locales.flatMap((locale) =>
    tourSlugs.map((slug) => ({
      url: `${SITE_URL}/${locale}/tours/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogPages = locales.flatMap((locale) =>
    blogSlugs.map((slug) => ({
      url: `${SITE_URL}/${locale}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...roomPages, ...tourPages, ...blogPages];
}
