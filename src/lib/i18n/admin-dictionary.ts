export type AdminLocale = "en" | "vi";

export const adminLocales: AdminLocale[] = ["en", "vi"];

const dictionaries = {
  en: () => import("@/messages/admin/en.json").then((m) => m.default),
  vi: () => import("@/messages/admin/vi.json").then((m) => m.default),
};

export type AdminDictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>;

export async function getAdminDictionary(locale: AdminLocale): Promise<AdminDictionary> {
  return dictionaries[locale]();
}

export function isAdminLocale(value: string): value is AdminLocale {
  return value === "en" || value === "vi";
}

export const ADMIN_LOCALE_STORAGE_KEY = "gr-admin-locale";
