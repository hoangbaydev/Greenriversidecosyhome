"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { TourExperienceView } from "@/lib/tours/experience";
import { TourSection, TourSectionHeading } from "@/components/tours/tour-section";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";

function ListCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "included" | "excluded";
}) {
  if (!items.length) return null;

  const isIncluded = variant === "included";

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={defaultTransition}
      className={`h-full overflow-hidden rounded-2xl border p-7 md:p-8 ${
        isIncluded
          ? "border-primary/15 bg-gradient-to-br from-soft to-white"
          : "border-border bg-white"
      }`}
    >
      <h3 className="text-h4 text-text">{title}</h3>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-text-muted md:text-base">
            {isIncluded ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted/50" aria-hidden />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function TourIncludedExcluded({
  experience,
  sectionTitle,
  includedTitle,
  excludedTitle,
}: {
  experience: TourExperienceView;
  sectionTitle: string;
  includedTitle: string;
  excludedTitle: string;
}) {
  if (!experience.included.length && !experience.excluded.length) return null;

  return (
    <TourSection background="white">
      <TourSectionHeading title={sectionTitle} />
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <ListCard title={includedTitle} items={experience.included} variant="included" />
        <ListCard title={excludedTitle} items={experience.excluded} variant="excluded" />
      </div>
    </TourSection>
  );
}
