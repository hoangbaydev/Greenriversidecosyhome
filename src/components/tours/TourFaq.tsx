"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { TourExperienceView } from "@/lib/tours/experience";
import { TourSection, TourSectionHeading } from "@/components/tours/tour-section";
import { cn } from "@/lib/utils";
import { MotionStagger, MotionItem } from "@/components/motion";
import { fastTransition } from "@/lib/motion";

export function TourFaq({
  experience,
  title,
}: {
  experience: TourExperienceView;
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  if (!experience.faq.length) return null;

  return (
    <TourSection background="soft">
      <TourSectionHeading title={title} />
      <MotionStagger className="mx-auto max-w-3xl space-y-3">
        {experience.faq.map((item, index) => {
          const isOpen = open === index;
          return (
            <MotionItem key={item.question}>
            <div
              className="overflow-hidden rounded-xl border border-border bg-white shadow-sm"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex min-h-[3.25rem] w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-soft/40 md:px-6"
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
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={fastTransition}
                  >
                    <p className="border-t border-border px-5 py-4 text-base leading-relaxed text-text-muted md:px-6">
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
    </TourSection>
  );
}
