"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Review } from "@/types";
import { getFallbackReviews } from "@/lib/content/brand";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { HomeSection } from "@/components/ui/home-section";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const BOOKING_URL =
  "https://www.booking.com/hotel/vn/greenriver-guesthouse-and-restaurant.html";

const sourceLabels: Record<Review["source"], string> = {
  booking: "Booking.com",
  airbnb: "Airbnb",
  hostelworld: "Hostelworld",
  tripadvisor: "Tripadvisor",
  google: "Google Reviews",
};

const sourceStyles: Record<Review["source"], string> = {
  booking: "text-[#003b95]",
  airbnb: "text-[#ff385c]",
  hostelworld: "text-[#f25621]",
  tripadvisor: "text-[#00aa6c]",
  google: "text-[#4285f4]",
};

function getReviewName(review: Review) {
  return review.guestName || review.author || "Guest";
}

function getReviewText(review: Review) {
  return review.reviewText || review.content || "";
}

function getSourceUrl(review: Review) {
  if (review.sourceUrl) return review.sourceUrl;
  if (review.source === "booking") return BOOKING_URL;
  return "";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function PlatformText({ source }: { source: Review["source"] }) {
  return (
    <span className={cn("text-xs font-semibold", sourceStyles[source] ?? "text-primary")}>
      {sourceLabels[source] ?? source}
    </span>
  );
}

function formatRating(rating?: number) {
  if (!rating) return "";
  return rating <= 5 ? `${rating.toFixed(1)}/5` : `${rating.toFixed(1)}/10`;
}

function ReviewCard({
  review,
  labels,
}: {
  review: Review;
  labels: {
    readMore: string;
    showLess: string;
    internationalGuest: string;
    viewVerified: string;
  };
}) {
  const [expanded, setExpanded] = useState(false);
  const name = getReviewName(review);
  const text = getReviewText(review);
  const sourceUrl = getSourceUrl(review);
  const source = review.source || "google";

  return (
    <motion.article variants={fadeUp} transition={defaultTransition} className="group flex h-full flex-col">
      <div className="relative flex min-h-[230px] flex-1 flex-col rounded-[var(--radius-card)] bg-[#f5f7f3] p-6 text-left shadow-[0_14px_36px_rgba(72,92,44,0.07)] ring-1 ring-primary/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-white group-hover:shadow-[0_22px_60px_rgba(72,92,44,0.12)] md:p-7">
        <span className="pointer-events-none absolute right-5 top-3 font-heading text-6xl leading-none text-primary/8">
          &ldquo;
        </span>

        <blockquote className={cn("relative flex-1 text-[15px] leading-7 text-text/82", !expanded && "line-clamp-4")}>
          {text}
        </blockquote>

        {text.length > 210 ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mt-4 w-fit text-xs font-black uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary-dark"
          >
            {expanded ? labels.showLess : labels.readMore}
          </button>
        ) : null}

      </div>

      <footer className="mt-4 flex items-center justify-between gap-3 px-1">
        <a
          href={sourceUrl || undefined}
          target={sourceUrl ? "_blank" : undefined}
          rel={sourceUrl ? "noreferrer" : undefined}
          className={cn("flex min-w-0 items-center gap-2.5", sourceUrl && "hover:text-primary")}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center text-xl leading-none">
            {review.countryFlag || initials(name)}
          </div>
          <div className="min-w-0">
            <p className="flex min-w-0 items-baseline gap-2">
              <span className="truncate text-sm font-black text-primary">{name}</span>
              <PlatformText source={source} />
            </p>
            <p className="truncate text-xs text-text-muted">
              {review.country || labels.internationalGuest}
            </p>
          </div>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          {review.rating ? (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-black text-primary shadow-sm ring-1 ring-primary/10">
              {formatRating(review.rating)}
            </span>
          ) : null}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden text-primary transition-colors hover:text-primary-dark sm:block"
              aria-label={labels.viewVerified}
            >
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          ) : null}
        </div>
      </footer>
    </motion.article>
  );
}

export function ReviewsSection({
  reviews,
  title,
  subtitle,
}: {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  excellentLabel?: string;
  basedOnLabel?: string;
}) {
  const locale = useLocale();
  const dict = useDictionary();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(1);
  const [paused, setPaused] = useState(false);
  const displayReviews = useMemo(
    () => (reviews.length ? reviews : getFallbackReviews(locale)).slice(0, 6),
    [locale, reviews]
  );
  const autoRotateMs = 5500;

  useEffect(() => {
    const updateSnapCount = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const firstCard = scroller.querySelector<HTMLElement>("[data-review-card]");
      const cardStep = firstCard ? firstCard.offsetWidth + 24 : scroller.clientWidth;
      const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      setSnapCount(Math.max(1, Math.round(maxScroll / cardStep) + 1));
    };

    updateSnapCount();
    window.addEventListener("resize", updateSnapCount);
    return () => window.removeEventListener("resize", updateSnapCount);
  }, [displayReviews.length]);

  useEffect(() => {
    if (paused || snapCount <= 1) return;

    const interval = window.setInterval(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const firstCard = scroller.querySelector<HTMLElement>("[data-review-card]");
      const cardStep = firstCard ? firstCard.offsetWidth + 24 : scroller.clientWidth;
      const nextIndex = activeIndex >= snapCount - 1 ? 0 : activeIndex + 1;

      scroller.scrollTo({ left: nextIndex * cardStep, behavior: "smooth" });
      setActiveIndex(nextIndex);
    }, autoRotateMs);

    return () => window.clearInterval(interval);
  }, [activeIndex, paused, snapCount]);

  if (!displayReviews.length) return null;

  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstCard = scroller.querySelector<HTMLElement>("[data-review-card]");
    const cardStep = firstCard ? firstCard.offsetWidth + 24 : scroller.clientWidth;
    setActiveIndex(Math.round(scroller.scrollLeft / cardStep));
  };

  return (
    <HomeSection background="soft" divider aria-labelledby="reviews-heading">
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={defaultTransition}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-eyebrow text-primary">{dict.home.reviews.eyebrow}</p>
          <h2 id="reviews-heading" className="mt-3 font-heading text-h2 text-text">
            {title || dict.home.reviews.fallbackTitle}
          </h2>
          <p className="mt-3 text-sm font-semibold text-accent" aria-label={dict.home.reviews.fiveStarLabel}>
            ★★★★★
          </p>
          {subtitle ? (
            <p className="mx-auto mt-3 max-w-xl text-base leading-[1.65] text-text-muted">{subtitle}</p>
          ) : null}
        </motion.div>

        <motion.div
          ref={scrollerRef}
          onScroll={onScroll}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-9 flex max-w-5xl snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {displayReviews.map((review) => (
            <div
              key={review.id}
              data-review-card
              className="min-w-full snap-start sm:min-w-[calc((100%_-_1.5rem)/2)] lg:min-w-[calc((100%_-_3rem)/3)]"
            >
              <ReviewCard
                review={review}
                labels={{
                  readMore: dict.common.readMore,
                  showLess: dict.common.showLess,
                  internationalGuest: dict.home.reviews.internationalGuest,
                  viewVerified: dict.home.reviews.viewVerified,
                }}
              />
            </div>
          ))}
        </motion.div>

        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                const scroller = scrollerRef.current;
                const firstCard = scroller?.querySelector<HTMLElement>("[data-review-card]");
                if (!scroller || !firstCard) return;
                scroller.scrollTo({
                  left: index * (firstCard.offsetWidth + 24),
                  behavior: "smooth",
                });
                setActiveIndex(index);
              }}
              className={cn(
                "h-2 rounded-full transition-all",
                activeIndex === index ? "w-7 bg-primary" : "w-2 bg-primary/25"
              )}
              aria-label={dict.home.reviews.goToGroup.replace("{count}", String(index + 1))}
            />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
