"use client";

import Link from "next/link";
import type { Tour } from "@/types";
import { getTourTitle, getTourPrice } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLink } from "@/components/ui/section-link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ListingGrid } from "@/components/motion";
import { EmptyState } from "@/components/ui/empty-state";
import { withSampleImages, SAMPLE_TOUR } from "@/lib/sample-media";

function PremiumTourCard({
  tour,
  viewDetailsLabel,
  detailBasePath = "/tours",
}: {
  tour: Tour;
  viewDetailsLabel?: string;
  detailBasePath?: string;
}) {
  const locale = useLocale();
  const title = getTourTitle(tour);
  const price = getTourPrice(tour);
  const images = withSampleImages(tour.images ?? [], SAMPLE_TOUR.gallery);
  const cover = images[0];
  const detailHref = localizedPath(locale, `${detailBasePath}/${tour.slug}`);

  return (
    <article className="page-card page-card--lift group flex h-full flex-col">
      <Link
        href={detailHref}
        className="relative block aspect-[4/3] overflow-hidden bg-soft"
        tabIndex={-1}
        aria-hidden
      >
        {cover ? (
          <OptimizedImage
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="img-hover"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="text-card-title text-text">
          <Link
            href={detailHref}
            className="transition-colors hover:text-primary"
          >
            {title}
          </Link>
        </h3>
        {tour.shortDescription ? (
          <p className="mt-3 line-clamp-3 flex-1 text-base leading-relaxed text-text-muted">
            {tour.shortDescription}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-text-muted">
          {tour.duration ? <span>{tour.duration}</span> : null}
          {price > 0 ? (
            <span className="font-heading font-bold text-primary">
              {formatPrice(price, tour.currency)}
            </span>
          ) : null}
        </div>
        {viewDetailsLabel ? (
          <Link
            href={detailHref}
            className="mt-5 inline-flex min-h-10 w-fit items-center justify-center rounded-lg border border-primary/30 px-5 font-heading text-[13px] font-bold uppercase tracking-[0.04em] text-primary transition-colors hover:border-primary hover:bg-soft"
          >
            {viewDetailsLabel}
          </Link>
        ) : null}
      </div>
    </article>
  );
}

export function TourCard({
  tour,
  viewDetailsLabel,
  detailBasePath,
}: {
  tour: Tour;
  viewDetailsLabel?: string;
  detailBasePath?: string;
}) {
  return (
    <PremiumTourCard
      tour={tour}
      viewDetailsLabel={viewDetailsLabel}
      detailBasePath={detailBasePath}
    />
  );
}

export function ToursPreview({
  tours,
  title,
  subtitle,
  viewAllLabel,
  emptyMessage,
  viewDetailsLabel,
}: {
  tours: Tour[];
  title?: string;
  subtitle?: string;
  bookLabel?: string;
  viewAllLabel?: string;
  emptyMessage?: string;
  viewDetailsLabel?: string;
}) {
  const locale = useLocale();

  if (!title && !tours.length) return null;

  if (!tours.length) {
    return (
      <HomeSection id="tours" background="white" divider>
        {title ? <SectionHeader eyebrow="Explore" title={title} subtitle={subtitle} /> : null}
        <EmptyState message={emptyMessage || ""} />
      </HomeSection>
    );
  }

  return (
    <HomeSection id="tours" background="white" divider>
      {title ? <SectionHeader eyebrow="Explore" title={title} subtitle={subtitle} /> : null}

      <ListingGrid>
        {tours.slice(0, 3).map((tour) => (
          <PremiumTourCard
            key={tour.id}
            tour={tour}
            viewDetailsLabel={viewDetailsLabel}
            detailBasePath="/explore-phong-nha"
          />
        ))}
      </ListingGrid>

      {viewAllLabel ? (
        <p className="mt-12 text-center">
          <SectionLink href={localizedPath(locale, "/explore-phong-nha#experiences")}>
            {viewAllLabel}
          </SectionLink>
        </p>
      ) : null}
    </HomeSection>
  );
}
