"use client";

import type { Tour } from "@/types";
import { getTourTitle } from "@/types";
import { buildTourExperience, type TourDetailLabels } from "@/lib/tours/experience";
import { TourHero } from "@/components/tours/TourHero";
import { TourHighlights } from "@/components/tours/TourHighlights";
import { TourOverview } from "@/components/tours/TourOverview";
import { TourTimeline } from "@/components/tours/TourTimeline";
import { TourGallery } from "@/components/tours/TourGallery";
import { TourIncludedExcluded } from "@/components/tours/TourIncludedExcluded";
import { TourWhatToBring } from "@/components/tours/TourWhatToBring";
import { TourPricing } from "@/components/tours/TourPricing";
import { TourFaq } from "@/components/tours/TourFaq";
import { TourFinalCta } from "@/components/tours/TourFinalCta";

export function TourExperiencePage({
  tour,
  labels,
}: {
  tour: Tour;
  labels: TourDetailLabels;
}) {
  const experience = buildTourExperience(tour, labels);
  const tourTitle = getTourTitle(tour);

  return (
    <article className="-mt-20">
      <TourHero experience={experience} labels={labels} tourTitle={tourTitle} />
      <TourHighlights experience={experience} title={labels.highlightsTitle} />
      <TourOverview experience={experience} />
      <TourTimeline experience={experience} title={labels.timelineTitle} />
      <TourGallery experience={experience} title={labels.galleryTitle} />
      <TourIncludedExcluded
        experience={experience}
        sectionTitle={labels.packageTitle}
        includedTitle={labels.includedTitle}
        excludedTitle={labels.excludedTitle}
      />
      <TourWhatToBring experience={experience} title={labels.whatToBringTitle} />
      <TourPricing experience={experience} labels={labels} tourTitle={tourTitle} />
      <TourFaq experience={experience} title={labels.faqTitle} />
      <TourFinalCta experience={experience} labels={labels} tourTitle={tourTitle} />
    </article>
  );
}
