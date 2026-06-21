"use client";

import { motion } from "framer-motion";
import type { TourExperienceView } from "@/lib/tours/experience";
import { TourSection } from "@/components/tours/tour-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";

export function TourOverview({ experience }: { experience: TourExperienceView }) {
  if (!experience.overviewText) return null;

  return (
    <TourSection background="soft">
      <div className="editorial-split">
        {experience.overviewImage ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={defaultTransition}
            className="editorial-split__media relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] lg:aspect-auto lg:min-h-[480px]"
          >
            <OptimizedImage
              src={experience.overviewImage}
              alt={experience.overviewHeading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        ) : null}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.08 }}
          className="editorial-split__content flex flex-col justify-center"
        >
          <h2 className="text-h2 text-text">{experience.overviewHeading}</h2>
          <div className="mt-4 max-w-2xl space-y-4 text-base leading-relaxed text-text-muted">
            {experience.overviewText.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </TourSection>
  );
}
