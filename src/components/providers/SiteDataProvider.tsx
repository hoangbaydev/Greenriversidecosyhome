"use client";

import { createContext, useContext } from "react";
import type { SiteSettings, ContactInformation } from "@/types";

interface SiteDataContextValue {
  settings: SiteSettings | null;
  contact: ContactInformation | null;
}

const SiteDataContext = createContext<SiteDataContextValue>({
  settings: null,
  contact: null,
});

export function SiteDataProvider({
  settings,
  contact,
  children,
}: SiteDataContextValue & { children: React.ReactNode }) {
  return (
    <SiteDataContext.Provider value={{ settings, contact }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(SiteDataContext);
}
