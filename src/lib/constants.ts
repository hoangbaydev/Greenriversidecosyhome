/** Tiny blur placeholder for Next.js Image */
export const IMAGE_BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAAECAxEEBSESMUFRYXGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDZgKKKKAP/2Q==";

export const SITE_NAME = "Green Riverside Cosy Home";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://greenriversidecosyhome.com";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

/** Homepage hero/banner - not overwritten by npm run images:fetch */
export const DEFAULT_BANNER_IMAGE = "/images/home-hero.webp";
export const DEFAULT_BANNER_IMAGE_TABLET = "/images/home-hero-1280.webp";
export const DEFAULT_BANNER_IMAGE_MOBILE = "/images/home-hero-mobile.webp";
export const DEFAULT_OG_IMAGE = "/images/og-default.jpg";

/** Calendar day keys for activity scheduling (matches Activity.dayOfWeek values) */
export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;
