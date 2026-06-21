"use client";

import { motion } from "framer-motion";
import type { TourDetailLabels, TourExperienceView } from "@/lib/tours/experience";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { defaultTransition } from "@/lib/motion";

export function TourFinalCta({
  experience,
  labels,
  tourTitle,
}: {
  experience: TourExperienceView;
  labels: TourDetailLabels;
  tourTitle: string;
}) {
  return (
    <section className="relative isolate min-h-[420px] overflow-hidden md:min-h-[480px]">
      <div className="absolute inset-0 z-0" aria-hidden>
        {experience.ctaImage ? (
          <OptimizedImage
            src={experience.ctaImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-primary" />
        )}
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 flex min-h-[420px] items-center px-5 py-20 sm:px-8 md:min-h-[480px] lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={defaultTransition}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-h1 !text-white">{experience.ctaHeading}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed !text-white/88">
            {experience.ctaSubheading}
          </p>
          <WhatsAppButton
            messageType="book_tour"
            customMessage={`Hi! I'd like to book the ${tourTitle} tour.`}
            label={labels.ctaButton}
            size="lg"
            className="min-h-11 rounded-lg px-10 shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
