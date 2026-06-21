import { notFound } from "next/navigation";
import { createMetadata, tourSchema, breadcrumbSchema } from "@/lib/seo";
import { getTourBySlug, getAllTourSlugs } from "@/lib/data/services";
import { getTourTitle } from "@/types";
import { JsonLd } from "@/components/seo/JsonLd";
import { TourExperiencePage } from "@/components/tours/TourExperiencePage";
import type { TourDetailLabels } from "@/lib/tours/experience";
import { locales } from "@/lib/i18n/config";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { localizedBreadcrumb } from "@/lib/i18n/metadata";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTourSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await getPageContext(params);
  const tour = await getTourBySlug(slug);
  if (!tour) return {};
  const title = getTourTitle(tour);
  return createMetadata({
    title: tour.seoTitle || `${title} | Explore Phong Nha`,
    description: tour.seoDescription || tour.shortDescription,
    path: `/${locale}/explore-phong-nha/${slug}`,
    image: tour.images[0],
  });
}

function tourDetailLabels(dict: Awaited<ReturnType<typeof getPageContext>>["dict"]): TourDetailLabels {
  const d = dict.pages.tourDetail;
  return {
    experienceLabel: d.experienceLabel,
    duration: d.duration,
    departure: d.departure,
    return: d.return,
    price: d.price,
    from: d.from,
    bookWhatsApp: d.bookWhatsApp,
    viewItinerary: d.viewItinerary,
    highlightsTitle: d.highlightsTitle,
    overviewTitle: d.overviewTitle,
    timelineTitle: d.timelineTitle,
    galleryTitle: d.galleryTitle,
    includedTitle: d.includedTitle,
    excludedTitle: d.excludedTitle,
    whatToBringTitle: d.whatToBringTitle,
    pricingTitle: d.pricingTitle,
    reserveWhatsApp: d.reserveWhatsApp,
    childDiscount: d.childDiscount,
    childDiscountDefault: d.childDiscountDefault,
    packageTitle: d.packageTitle,
    faqTitle: d.faqTitle,
    ctaTitle: d.ctaTitle,
    ctaSubtitle: d.ctaSubtitle,
    ctaButton: d.ctaButton,
    approxUsd: d.approxUsd,
  };
}

export default async function ExploreExperienceDetailPage({ params }: Props) {
  const { slug, locale, dict } = await getPageContext(params);
  const tour = await getTourBySlug(slug);
  if (!tour) notFound();

  const title = getTourTitle(tour);

  return (
    <>
      <JsonLd
        data={[
          tourSchema(tour, locale),
          breadcrumbSchema(
            localizedBreadcrumb(locale, [
              { name: dict.nav.home, path: "/" },
              { name: dict.nav.explore, path: "/explore-phong-nha" },
              { name: title, path: `/explore-phong-nha/${slug}` },
            ])
          ),
        ]}
      />
      <TourExperiencePage tour={tour} labels={tourDetailLabels(dict)} />
    </>
  );
}
