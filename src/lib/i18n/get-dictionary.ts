import { defaultLocale, isValidLocale, type Locale } from "./config";

const dictionaries = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  vi: () => import("@/messages/vi.json").then((m) => m.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export async function getPageContext<T extends { locale: string }>(
  params: Promise<T>
) {
  const resolved = await params;
  const locale = isValidLocale(resolved.locale) ? resolved.locale : defaultLocale;
  const dict = await getDictionary(locale);
  return { ...resolved, locale, dict };
}
