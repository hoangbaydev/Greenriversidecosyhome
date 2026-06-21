export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "gr-locale";

export const localeNames: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname;
}
