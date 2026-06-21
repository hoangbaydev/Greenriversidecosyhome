"use client";

import { motion } from "framer-motion";
import type { TourExperienceView } from "@/lib/tours/experience";
import { TourSection, TourSectionHeading } from "@/components/tours/tour-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";

const aspectPatterns = ["aspect-[4/5]", "aspect-[16/10]", "aspect-square", "aspect-[3/4]", "aspect-[5/4]"];

export function TourGallery({
  experience,
  title,
}: {
  experience: TourExperienceView;
  title: string;
}) {
  if (!experience.galleryImages.length) return null;

  return (
    <TourSection background="soft">
      <TourSectionHeading title={title} />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="tour-gallery-masonry"
      >
        {experience.galleryImages.map((src, index) => (
          <motion.div
            key={src}
            variants={fadeUp}
            transition={defaultTransition}
            className="tour-gallery-masonry__item overflow-hidden rounded-[var(--radius-card)]"
          >
            <div
              className={`relative w-full overflow-hidden ${aspectPatterns[index % aspectPatterns.length]}`}
            >
              <OptimizedImage
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="tour-gallery-hover object-cover"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </TourSection>
  );
}
