import { faqSchema } from "@/lib/seo";
import type { FaqContent, FaqItem } from "@/types";

export function faqItemsForSchema(items: FaqItem[]): { question: string; answer: string }[] {
  return items
    .filter((item) => item.question.trim() && item.answer.trim())
    .map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }));
}

export function buildFaqPageSchema(faq: FaqContent | null): Record<string, unknown> | null {
  if (!faq?.items?.length) return null;
  const entries = faqItemsForSchema(faq.items);
  if (!entries.length) return null;
  return faqSchema(entries);
}
