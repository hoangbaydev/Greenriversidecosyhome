"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { approxUsdLabel } from "@/lib/tours/experience";
import type { TourDetailLabels, TourExperienceView } from "@/lib/tours/experience";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { defaultTransition } from "@/lib/motion";

export function TourHero({
  experience,
  labels,
  tourTitle,
}: {
  experience: TourExperienceView;
  labels: TourDetailLabels;
  tourTitle: string;
}) {
  const usdLine = approxUsdLabel(
    experience.price,
    experience.currency,
    experience.priceUsdApprox,
    labels.approxUsd
  );

  const scrollToItinerary = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="tour-hero relative isolate flex items-end overflow-hidden bg-[#0a1610]">
      <div className="absolute inset-0 z-0" aria-hidden>
        {experience.heroImage ? (
          <OptimizedImage
            src={experience.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
        ) : (
          <div className="h-full w-full bg-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/25" />
      </div>

      <div className="relative z-10 w-full px-5 pb-8 pt-32 sm:px-8 lg:px-10 lg:pb-12 lg:pt-36">
        <div className="mx-auto max-w-[1140px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={defaultTransition}
            className="max-w-3xl"
          >
            <p className="inline-flex rounded-md border border-white/25 bg-white/10 px-3 py-1 text-eyebrow text-white/90 backdrop-blur-sm">
              {experience.heroLabel}
            </p>
            <h1 className="mt-3 text-display text-white">{experience.title}</h1>
            {experience.description ? (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                {experience.description}
              </p>
            ) : null}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, delay: 0.1 }}
            className="mt-8 overflow-hidden rounded-xl border border-white/12 bg-white/95 shadow-[var(--shadow-soft)] backdrop-blur-md lg:mt-10"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border">
              {[
                { label: labels.duration, value: experience.duration },
                { label: labels.departure, value: experience.departure },
                { label: labels.return, value: experience.returnTime },
                {
                  label: labels.price,
                  value:
                    experience.price > 0
                      ? formatPrice(experience.price, experience.currency)
                      : "—",
                  prefix: experience.price > 0 ? labels.from : undefined,
                  sub: usdLine,
                  highlight: true,
                },
              ].map((item) => (
                <div key={item.label} className="border-b border-border px-5 py-4 last:border-b-0 sm:border-b-0 lg:px-6 lg:py-5">
                  <p className="text-xs font-medium text-text-muted">
                    {item.label}
                  </p>
                  {item.prefix ? (
                    <p className="mt-0.5 text-xs text-text-muted">{item.prefix}</p>
                  ) : null}
                  <p
                    className={`mt-0.5 font-semibold leading-tight text-text ${item.highlight ? "text-xl text-primary md:text-2xl" : "text-base md:text-lg"}`}
                  >
                    {item.value}
                  </p>
                  {item.sub ? <p className="mt-0.5 text-sm text-text-muted">{item.sub}</p> : null}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <WhatsAppButton
              messageType="book_tour"
              customMessage={`Hi! I'd like to book the ${tourTitle} tour.`}
              label={labels.bookWhatsApp}
              size="lg"
              className="min-h-12 px-8 text-sm font-semibold"
            />
            {experience.timeline.length > 0 ? (
              <button
                type="button"
                onClick={scrollToItinerary}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/55 bg-transparent px-8 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/12"
              >
                {labels.viewItinerary}
              </button>
            ) : null}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 lg:block" aria-hidden>
        <ChevronDown className="h-6 w-6 animate-bounce text-white/50" />
      </div>
    </section>
  );
}
