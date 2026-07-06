"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function ReviewCard({
  review,
  labels,
  onReadMore,
}: {
  review: Review;
  labels: {
    readMore: string;
    showLess: string;
    internationalGuest: string;
    viewVerified: string;
  };
  onReadMore: () => void;
}) {
  const name = getReviewName(review);
  const text = getReviewText(review);
  const sourceUrl = getSourceUrl(review);
  const source = review.source || "google";

  return (
    <motion.article variants={fadeUp} transition={defaultTransition} className="group flex h-full flex-col">
      <div className="relative flex min-h-[235px] flex-1 flex-col rounded-[24px] bg-white p-6 text-left shadow-sm ring-1 ring-primary/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md dark:bg-[#152213] dark:ring-white/5 md:p-7">
        <span className="pointer-events-none absolute right-5 top-3 font-heading text-6xl leading-none text-primary/8 select-none">
          &ldquo;
        </span>

        <blockquote className="relative flex-1 text-[15px] leading-7 text-text/82 font-medium line-clamp-4">
          {text}
        </blockquote>

        {text.length > 210 ? (
          <button
            type="button"
            onClick={onReadMore}
            className="mt-4 w-fit text-xs font-black uppercase tracking-[0.12em] text-primary transition-colors hover:text-primary-dark"
          >
            {labels.readMore}
          </button>
        ) : null}
      </div>

      <footer className="mt-4 flex items-center justify-between gap-3 px-2">
        <a
          href={sourceUrl || undefined}
          target={sourceUrl ? "_blank" : undefined}
          rel={sourceUrl ? "noreferrer" : undefined}
          className={cn("flex min-w-0 items-center gap-2.5", sourceUrl && "hover:text-primary")}
        >
          <div className="flex h-7.5 w-7.5 shrink-0 items-center justify-center text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/5">
            {review.countryFlag || initials(name)}
          </div>
          <div className="min-w-0">
            <p className="flex min-w-0 items-baseline gap-2">
              <span className="truncate text-sm font-bold text-text">{name}</span>
              <PlatformText source={source} />
            </p>
            <p className="truncate text-xs text-text-muted">
              {review.country || labels.internationalGuest}
            </p>
          </div>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          {review.rating ? (
            <span className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-black text-primary border border-primary/5">
              {formatRating(review.rating)}
            </span>
          ) : null}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              title={labels.viewVerified}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-full bg-primary/8 border border-primary/5 text-primary transition-all hover:bg-primary hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
      </footer>
    </motion.article>
  );
}

function formatRating(rating?: number) {
  if (!rating) return "";
  return rating <= 5 ? `${rating.toFixed(1)}/5` : `${rating.toFixed(1)}/10`;
}

interface ReviewsSectionProps {
  reviews: Review[];
  title?: string;
  subtitle?: string;
  excellentLabel?: string;
  basedOnLabel?: string;
}

export function ReviewsSection({
  reviews,
  title,
  subtitle,
}: ReviewsSectionProps) {
  const dict = useDictionary();
  const locale = useLocale();

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [snapCount, setSnapCount] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const fallbackReviews = useMemo(() => getFallbackReviews(locale), [locale]);
  const displayReviews = useMemo(() => {
    return reviews.length > 0 ? reviews : fallbackReviews;
  }, [reviews, fallbackReviews]);

  const autoRotateMs = 6000;

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateSnapCount = () => {
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
    if (paused || snapCount <= 1 || selectedReview !== null) return;

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
  }, [activeIndex, paused, snapCount, selectedReview]);

  if (!displayReviews.length) return null;

  const onScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const firstCard = scroller.querySelector<HTMLElement>("[data-review-card]");
    const cardStep = firstCard ? firstCard.offsetWidth + 24 : scroller.clientWidth;
    setActiveIndex(Math.round(scroller.scrollLeft / cardStep));
  };

  return (
    <HomeSection 
      id="reviews" 
      background="soft" 
      divider 
      aria-labelledby="reviews-heading"
    >
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
          {/* Mockup stars at the top */}
          <p className="text-xl tracking-widest text-[#f0a14a] mb-2" aria-label={dict.home.reviews.fiveStarLabel}>
            ★★★★★
          </p>
          <h2 id="reviews-heading" className="font-heading text-h2 text-text">
            {title || (locale === "vi" ? "Được du khách yêu mến" : "Loved by Travellers")}
          </h2>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">{subtitle}</p>
          ) : null}
        </motion.div>

        <motion.div
          ref={scrollerRef}
          onScroll={onScroll}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-12 flex max-w-5xl snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
                onReadMore={() => setSelectedReview(review)}
              />
            </div>
          ))}
        </motion.div>

        <div className="mt-4 flex justify-center gap-2">
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

      {/* Review overlay modal popup */}
      <AnimatePresence>
        {selectedReview ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={() => setSelectedReview(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-xl rounded-[28px] bg-white p-8 shadow-2xl border border-primary/10 dark:bg-[#152213] dark:border-primary/20 z-10"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="absolute right-6 top-6 rounded-full p-2 text-text-muted hover:bg-soft hover:text-text transition-colors dark:hover:bg-white/5"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center text-xs font-bold rounded-full bg-primary/10 text-primary border border-primary/5">
                  {selectedReview.countryFlag || initials(getReviewName(selectedReview))}
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-text flex items-baseline gap-2">
                    {getReviewName(selectedReview)}
                    <span className={cn("text-xs font-bold uppercase tracking-wider", sourceStyles[selectedReview.source || "google"])}>
                      {sourceLabels[selectedReview.source || "google"]}
                    </span>
                  </h4>
                  <p className="text-xs text-text-muted">
                    {selectedReview.country || (locale === "vi" ? "Khách quốc tế" : "International guest")}
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-3">
                <span className="text-lg tracking-widest text-[#f0a14a]">★★★★★</span>
                {selectedReview.rating ? (
                  <span className="rounded-full bg-primary/8 px-2.5 py-1 text-xs font-black text-primary border border-primary/5">
                    {formatRating(selectedReview.rating)}
                  </span>
                ) : null}
              </div>

              {/* Scrollable text container */}
              <div className="mt-5 max-h-[280px] overflow-y-auto pr-2 text-base leading-relaxed text-text/88 whitespace-pre-line border-t border-border/60 pt-4 dark:border-white/5">
                {getReviewText(selectedReview)}
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </HomeSection>
  );
}
