"use client";

import { motion } from "framer-motion";
import type { TourExperienceView } from "@/lib/tours/experience";
import { TourSection, TourSectionHeading } from "@/components/tours/tour-section";
import { TourIcon } from "@/components/tours/tour-icons";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";

export function TourHighlights({
  experience,
  title,
}: {
  experience: TourExperienceView;
  title: string;
}) {
  if (!experience.highlights.length) return null;

  return (
    <TourSection background="white" className="pt-8 md:pt-10">
      <TourSectionHeading title={title} />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {experience.highlights.map((item) => (
          <motion.article
            key={item.label}
            variants={fadeUp}
            transition={defaultTransition}
            className="flex items-center gap-3 rounded-lg border border-border bg-white p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-soft">
              <TourIcon name={item.icon} className="h-4 w-4 text-primary" />
            </span>
            <p className="text-sm font-medium leading-snug text-text md:text-[0.9375rem]">
              {item.label}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </TourSection>
  );
}
