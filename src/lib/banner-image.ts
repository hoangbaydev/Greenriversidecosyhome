import { DEFAULT_BANNER_IMAGE } from "@/lib/constants";

const LEGACY_HERO_PATHS = new Set([
  "/images/banner.webp",
  "/images/samples/home-hero.webp",
  "/images/samples/hero.webp",
]);

/** Resolve homepage hero URL — CMS value wins unless empty or legacy path. */
export function resolveBannerImage(cmsUrl?: string | null): string {
  const trimmed = cmsUrl?.trim();
  if (!trimmed || LEGACY_HERO_PATHS.has(trimmed)) {
    return DEFAULT_BANNER_IMAGE;
  }
  return trimmed;
}
