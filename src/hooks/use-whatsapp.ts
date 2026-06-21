"use client";

import { useSiteData } from "@/components/providers/SiteDataProvider";
import { resolveWhatsAppNumber } from "@/lib/whatsapp";

export function useWhatsAppNumber(): string {
  const { settings, contact } = useSiteData();
  return resolveWhatsAppNumber(settings, contact);
}
