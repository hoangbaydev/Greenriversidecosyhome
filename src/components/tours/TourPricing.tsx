"use client";

import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { approxUsdLabel } from "@/lib/tours/experience";
import type { TourDetailLabels, TourExperienceView } from "@/lib/tours/experience";
import { TourSection, TourSectionHeading } from "@/components/tours/tour-section";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";

export function TourPricing({
  experience,
  labels,
  tourTitle,
}: {
  experience: TourExperienceView;
  labels: TourDetailLabels;
  tourTitle: string;
}) {
  if (experience.price <= 0) return null;

  const usdLine = approxUsdLabel(
    experience.price,
    experience.currency,
    experience.priceUsdApprox,
    labels.approxUsd
  );

  return (
    <TourSection id="pricing" background="white">
      <TourSectionHeading title={labels.pricingTitle} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={fadeUp}
        transition={defaultTransition}
        className="mx-auto max-w-lg"
      >
        <div className="rounded-2xl border border-primary/15 bg-gradient-to-b from-soft to-white p-10 text-center shadow-[var(--shadow-card)] md:p-12">
          <p className="text-eyebrow text-primary">{labels.from}</p>
          <p className="mt-3 text-3xl font-bold text-primary md:text-4xl">
            {formatPrice(experience.price, experience.currency)}
          </p>
          {usdLine ? <p className="mt-2 text-lg text-text-muted">{usdLine}</p> : null}
          {(experience.childDiscountNote || labels.childDiscountDefault) ? (
            <div className="mt-6 rounded-xl bg-white px-5 py-4">
              <p className="text-sm font-semibold text-text">{labels.childDiscount}</p>
              <p className="mt-1 text-base text-text-muted">
                {experience.childDiscountNote || labels.childDiscountDefault}
              </p>
            </div>
          ) : null}
          <WhatsAppButton
            messageType="book_tour"
            customMessage={`Hi! I'd like to reserve the ${tourTitle} tour.`}
            label={labels.reserveWhatsApp}
            size="lg"
            className="min-h-11 w-full rounded-lg sm:w-auto sm:px-10"
          />
        </div>
      </motion.div>
    </TourSection>
  );
}
