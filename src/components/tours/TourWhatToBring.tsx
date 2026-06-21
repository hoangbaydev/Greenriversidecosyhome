"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { TourExperienceView } from "@/lib/tours/experience";
import { TourSection, TourSectionHeading } from "@/components/tours/tour-section";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";

export function TourWhatToBring({
  experience,
  title,
}: {
  experience: TourExperienceView;
  title: string;
}) {
  if (!experience.whatToBring.length) return null;

  return (
    <TourSection background="soft">
      <TourSectionHeading title={title} />
      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {experience.whatToBring.map((item) => (
          <motion.li
            key={item}
            variants={fadeUp}
            transition={defaultTransition}
            className="card-premium flex items-center gap-4 p-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-soft">
              <Check className="h-4 w-4 text-primary" aria-hidden />
            </span>
            <span className="text-base text-text">{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </TourSection>
  );
}
