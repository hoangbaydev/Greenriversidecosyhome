"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FaqContent } from "@/types";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { MotionStagger, MotionItem } from "@/components/motion";

export function FaqSection({
  faq,
  showHeader = true,
}: {
  faq: FaqContent | null;
  showHeader?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);

  if (!faq?.items?.length) return null;

  const items = [...faq.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <HomeSection id="faq" background="soft" divider aria-labelledby="faq-heading">
      {showHeader ? (
        <SectionHeader eyebrow="FAQ" title={faq.title} subtitle={faq.subtitle} />
      ) : null}
      <MotionStagger className="mx-auto max-w-3xl space-y-3">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <MotionItem key={`${item.question}-${index}`}>
            <div
              className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
            >
              <button
                type="button"
                id={`faq-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex min-h-[3.5rem] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-soft/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary md:px-6"
              >
                <span className="text-base font-medium text-text">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform",
                    isOpen && "rotate-180"
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="border-t border-border px-5 py-4 text-sm leading-relaxed text-text-muted md:px-6 md:text-base">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            </MotionItem>
          );
        })}
      </MotionStagger>
    </HomeSection>
  );
}
