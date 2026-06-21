"use client";

import { motion } from "framer-motion";
import type { TourExperienceView } from "@/lib/tours/experience";
import { TourSection, TourSectionHeading } from "@/components/tours/tour-section";
import { TourIcon } from "@/components/tours/tour-icons";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";

export function TourTimeline({
  experience,
  title,
}: {
  experience: TourExperienceView;
  title: string;
}) {
  if (!experience.timeline.length) return null;

  return (
    <TourSection id="timeline" background="soft">
      <TourSectionHeading title={title} />
      <div className="mx-auto max-w-3xl">
        {experience.timeline.map((item, index) => (
          <motion.article
            key={`${item.time}-${item.title}`}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: index * 0.04 }}
            className="relative flex gap-4 pb-6 last:pb-0 md:gap-6 md:pb-8"
          >
            {index < experience.timeline.length - 1 ? (
              <span
                className="absolute left-5 top-14 h-[calc(100%-1.5rem)] w-0.5 bg-primary/20 md:left-6"
                aria-hidden
              />
            ) : null}
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md md:h-12 md:w-12">
              <TourIcon name={item.icon || "clock"} className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div className="min-w-0 flex-1 rounded-xl border border-border bg-white p-5 shadow-sm md:p-6">
              <time className="text-sm font-bold tabular-nums text-primary">{item.time}</time>
              <h3 className="mt-1 text-base font-semibold text-text md:text-lg">{item.title}</h3>
              {item.description ? (
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </TourSection>
  );
}
