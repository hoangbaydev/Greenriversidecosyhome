import { Suspense } from "react";
import {
  getHomepageContent,
  getFeaturedRooms,
  getActivities,
  getCafeContent,
  getPageContent,
  getFeaturedReviews,
} from "@/lib/data/services";
import { fetchRoomsByIds } from "@/lib/data/services";
import { normalizeHomepage } from "@/types";
import { HeroSection } from "@/components/home/HeroSection";
import { AccommodationPreview } from "@/components/shared/RoomCard";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { CafeSection } from "@/components/home/CafeSection";
import { ExplorePreview } from "@/components/explore/ExploreSections";
import { SocialActivitiesShowcase } from "@/components/home/SocialActivitiesShowcase";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ContactPreview } from "@/components/home/ContactPreview";
import { CardGridSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

async function HomeContent({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const [
    homepageRaw,
    activities,
    cafe,
    stayPage,
    reviews,
  ] = await Promise.all([
    getHomepageContent(),
    getActivities(),
    getCafeContent(locale),
    getPageContent(locale, "stay"),
    getFeaturedReviews(4),
  ]);

  const homepage = homepageRaw ? normalizeHomepage(homepageRaw) : null;
  const sections = homepage?.sections ?? {};

  const selectedRooms = homepage?.featuredRoomIds.length
    ? await fetchRoomsByIds(homepage.featuredRoomIds, locale)
    : [];
  const rooms = selectedRooms.length ? selectedRooms : await getFeaturedRooms(3, locale);

  const hasAnyContent =
    homepage?.heroTitle ||
    rooms.length ||
    cafe ||
    activities.length;

  if (!hasAnyContent) {
    return (
      <section className="section-breathe">
        <EmptyState message={dict.common.contentNotPublished} />
      </section>
    );
  }

  return (
    <>
      {homepage ? <HeroSection content={homepage} /> : null}

      {homepage ? <WhyChooseSection /> : null}

      <AccommodationPreview
        rooms={rooms}
        title={sections.accommodation?.title}
        subtitle={sections.accommodation?.subtitle}
        bookLabel={homepage?.primaryCtaLabel}
        viewAllLabel={sections.accommodation?.ctaLabel}
        emptyMessage={dict.common.contentNotPublished}
        priceFromLabel={stayPage?.labels?.priceFrom}
        perNightLabel={stayPage?.labels?.perNight}
        viewDetailsLabel={stayPage?.labels?.viewDetails}
        rateNote={dict.home.stay.rateNote}
      />

      {cafe ? <CafeSection content={cafe} heading={sections.cafe} /> : null}

      <SocialActivitiesShowcase
        activities={activities}
        title={sections.activities?.title}
        subtitle={sections.activities?.subtitle}
        viewAllLabel={sections.activities?.ctaLabel}
      />

      <ExplorePreview
        title={sections.tours?.title}
        subtitle={sections.tours?.subtitle}
        viewAllLabel={sections.tours?.ctaLabel || dict.nav.explorePhongNha}
      />

      <ReviewsSection
        reviews={reviews}
        title={sections.reviews?.title || dict.home.reviews.title}
        subtitle={sections.reviews?.subtitle || dict.home.reviews.subtitle}
        excellentLabel={dict.home.reviews.excellent}
        basedOnLabel={dict.home.reviews.basedOn.replace(
          "{count}",
          String(reviews.length || 0)
        )}
      />

      <ContactPreview
        heading={sections.contact}
        ctaLabel={dict.home.contact.cta}
        contactLinkLabel={dict.home.contact.directions}
        viewOnMapLabel={dict.home.contact.directions}
      />
    </>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale: Locale = localeParam === "vi" ? "vi" : "en";

  return (
    <Suspense fallback={<CardGridSkeleton count={4} />}>
      <HomeContent locale={locale} />
    </Suspense>
  );
}
