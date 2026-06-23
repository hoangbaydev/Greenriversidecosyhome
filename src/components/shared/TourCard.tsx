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
        className="relative block aspect-[4/3] overflow-hidden bg-soft after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:via-black/0 after:to-transparent"
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
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-[1.28rem] leading-tight text-text sm:text-[1.4rem]">
          <Link
            href={detailHref}
            className="transition-colors hover:text-primary"
          >
            {title}
          </Link>
        </h3>
        {tour.shortDescription ? (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.7] text-text-muted">
            {tour.shortDescription}
          </p>
        ) : null}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-border pt-4 text-sm text-text-muted">
          {tour.duration ? <span>{tour.duration}</span> : null}
          {price > 0 ? (
              <span className="font-sans font-semibold text-primary">
              {formatPrice(price, tour.currency)}
            </span>
          ) : null}
        </div>
        {viewDetailsLabel ? (
          <Link
            href={detailHref}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-primary/20 bg-white px-5 font-sans text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-soft hover:shadow-[var(--shadow-soft)] sm:w-fit"
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
