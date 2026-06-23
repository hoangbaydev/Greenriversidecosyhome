"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Review } from "@/types";
import { getFallbackReviews } from "@/lib/content/brand";
import { useLocale } from "@/components/providers/I18nProvider";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";
import { MotionReveal } from "@/components/motion";

function ReviewCard({ review }: { review: Review }) {
  const location = review.country || review.source;

  return (
    <motion.article
      variants={fadeUp}
      transition={defaultTransition}
      className="card-premium flex h-full flex-col p-8 md:p-9"
    >
      <div className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`}
            aria-hidden
          />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 font-heading text-lg leading-relaxed text-text md:text-xl">
        &ldquo;{review.content}&rdquo;
      </blockquote>
      <footer className="mt-6 border-t border-border pt-5">
        <cite className="text-sm font-semibold not-italic text-text">{review.author}</cite>
        <p className="mt-1 text-xs text-text-muted">{location}</p>
      </footer>
    </motion.article>
  );
}

export function ReviewsSection({
  reviews,
  title,
  subtitle,
  excellentLabel,
  basedOnLabel,
}: {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  excellentLabel?: string;
  basedOnLabel?: string;
}) {
  const locale = useLocale();
  const displayReviews = reviews.length ? reviews : getFallbackReviews(locale);

  if (!displayReviews.length) return null;

  const avg = displayReviews.reduce((sum, r) => sum + r.rating, 0) / displayReviews.length;

  return (
    <HomeSection background="soft" divider aria-labelledby="reviews-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {title ? (
            <SectionHeader
              eyebrow="Guest Reviews"
              title={title}
              subtitle={subtitle}
              centered={false}
              className="mb-6"
            />
          ) : null}
          <MotionReveal>
            <div className="rounded-[var(--radius-card)] border border-border bg-white p-8 text-center shadow-[var(--shadow-soft)] lg:text-left">
              <p className="font-heading text-5xl text-primary">{avg.toFixed(1)}</p>
              <div className="mt-3 flex justify-center gap-0.5 lg:justify-start">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(avg) ? "fill-accent text-accent" : "text-border"}`}
                    aria-hidden
                  />
                ))}
              </div>
              {excellentLabel ? (
                <p className="mt-3 text-sm font-semibold text-text uppercase tracking-wider">{excellentLabel}</p>
              ) : null}
              {basedOnLabel ? (
                <p className="mt-1 text-xs text-text-muted">
                  {basedOnLabel.replace("{count}", String(displayReviews.length))}
                </p>
              ) : null}
            </div>
          </MotionReveal>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2"
        >
          {displayReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </motion.div>
      </div>
    </HomeSection>
  );
}
