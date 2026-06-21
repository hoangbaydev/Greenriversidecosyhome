import { WHATSAPP_NUMBER } from "./constants";
import type { ContactInformation, SiteSettings } from "@/types";

export type WhatsAppMessageType =
  | "book_room"
  | "book_tour"
  | "transportation"
  | "reserve_table"
  | "join_activity"
  | "general";

const MESSAGES: Record<WhatsAppMessageType, string> = {
  book_room:
    "Hi Green Riverside! I'd like to book a room. Could you please help me with availability and rates?",
  book_tour:
    "Hi Green Riverside! I'm interested in booking a tour. Could you share details and availability?",
  transportation:
    "Hi Green Riverside! I need help with transportation. Could you assist me with options and pricing?",
  reserve_table:
    "Hi Green Riverside! I'd like to reserve a table at Cozy Cafe Rooftop. What times are available?",
  join_activity:
    "Hi Green Riverside! I'd love to join your social activities this week. What events are coming up?",
  general:
    "Hi Green Riverside! I have a question about your services. Could you help me?",
};

export function resolveWhatsAppNumber(
  settings?: SiteSettings | null,
  contact?: ContactInformation | null
): string {
  const raw =
    contact?.whatsapp?.trim() ||
    settings?.whatsappNumber?.trim() ||
    WHATSAPP_NUMBER.trim() ||
    "";
  return raw.replace(/\D/g, "");
}

export function getWhatsAppUrl(
  type: WhatsAppMessageType = "general",
  customMessage?: string,
  phoneNumber?: string
): string {
  const number = (phoneNumber || WHATSAPP_NUMBER).replace(/\D/g, "");
  if (!number) return "#";
  const message = encodeURIComponent(customMessage || MESSAGES[type]);
  return `https://wa.me/${number}?text=${message}`;
}

export function getWhatsAppMessage(type: WhatsAppMessageType): string {
  return MESSAGES[type];
}

export function getZaloUrl(phoneNumber: string): string {
  let clean = phoneNumber.replace(/\D/g, "").trim();
  if (clean.startsWith("84")) {
    clean = "0" + clean.slice(2);
  }
  return `https://zalo.me/${clean}`;
}
