"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import enDict from "@/messages/admin/en.json";
import viDict from "@/messages/admin/vi.json";
import {
  type AdminDictionary,
  type AdminLocale,
  isAdminLocale,
  ADMIN_LOCALE_STORAGE_KEY,
} from "@/lib/i18n/admin-dictionary";

const dictionaries: Record<AdminLocale, AdminDictionary> = {
  en: enDict,
  vi: viDict,
};

interface AdminI18nContextValue {
  locale: AdminLocale;
  setLocale: (locale: AdminLocale) => void;
  dict: AdminDictionary;
  ready: boolean;
}

const AdminI18nContext = createContext<AdminI18nContextValue>({
  locale: "vi",
  setLocale: () => {},
  dict: viDict,
  ready: true,
});

function readStoredLocale(): AdminLocale {
  if (typeof window === "undefined") return "vi";
  const stored = localStorage.getItem(ADMIN_LOCALE_STORAGE_KEY);
  return stored && isAdminLocale(stored) ? stored : "vi";
}

export function AdminI18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AdminLocale>(() => readStoredLocale());

  const setLocale = useCallback((next: AdminLocale) => {
    setLocaleState(next);
    localStorage.setItem(ADMIN_LOCALE_STORAGE_KEY, next);
  }, []);

  const dict = dictionaries[locale];

  const value = useMemo(
    () => ({ locale, setLocale, dict, ready: true }),
    [locale, setLocale, dict]
  );

  return (
    <AdminI18nContext.Provider value={value}>{children}</AdminI18nContext.Provider>
  );
}

export function useAdminI18n() {
  return useContext(AdminI18nContext);
}

export function useAdminDict(): AdminDictionary {
  return useAdminI18n().dict;
}
