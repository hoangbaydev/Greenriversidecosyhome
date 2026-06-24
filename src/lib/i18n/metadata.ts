import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { locales, type Locale } from "./config";

interface LocalizedMeta {
  title: string;
  description: string;
  path: string;
}

export function createLocalizedMetadata(
  locale: Locale,
  { title, description, path }: LocalizedMeta
): Metadata {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const fullPath = `/${locale}${normalized === "/" ? "" : normalized}`;

  const languages = Object.fromEntries(
    locales.map((l) => [
      l,
      `${SITE_URL}/${l}${normalized === "/" ? "" : normalized}`,
    ])
  );

  return {
    ...createMetadata({ title, description, path: fullPath }),
    alternates: {
      canonical: `${SITE_URL}${fullPath}`,
      languages: {
        ...languages,
        "x-default": `${SITE_URL}/en${normalized === "/" ? "" : normalized}`,
      },
    },
  };
}

export function localizedBreadcrumb(
  locale: Locale,
  items: { name: string; path: string }[]
) {
  return items.map((item) => ({
    name: item.name,
    url: `${SITE_URL}/${locale}${item.path === "/" ? "" : item.path}`,
  }));
}
