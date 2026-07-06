import { Suspense } from "react";
import {
  getHomepageContent,
  getFeaturedRooms,
  getActivities,
  getCafeContent,
  getPageContent,
  getFeaturedReviews,
  getStoryContent,
  getFeaturedGallery,
  getFaqContent,
  fetchRoomsByIds,
} from "@/lib/data/services";
import { normalizeHomepage } from "@/types";
import { HeroSection } from "@/components/home/HeroSection";
import { AccommodationPreview } from "@/components/shared/RoomCard";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { OurStoryPreview } from "@/components/home/OurStoryPreview";
import { CafeSection } from "@/components/home/CafeSection";
import { ExplorePreview } from "@/components/explore/ExploreSections";
import { SocialActivitiesShowcase } from "@/components/home/SocialActivitiesShowcase";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { UsefulInfoPreview } from "@/components/home/UsefulInfoPreview";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactPreview } from "@/components/home/ContactPreview";
import { CardGridSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

const homepagePreviewCtas = {
  en: {
    rooms: "View rooms",
    cafe: "Explore the cafe",
    activities: "View activities",
    gallery: "View gallery",
  },
  vi: {
    rooms: "Xem phòng",
    cafe: "Khám phá cafe",
    activities: "Xem hoạt động",
    gallery: "Xem thư viện ảnh",
  },
} as const;

async function HomeContent({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const previewCtas = locale === "vi" ? homepagePreviewCtas.vi : homepagePreviewCtas.en;
  const [
    homepageRaw,
    activities,
    cafe,
    stayPage,
    reviews,
    story,
    galleryItems,
    faq,
  ] = await Promise.all([
    getHomepageContent(locale),
    getActivities(locale),
    getCafeContent(locale),
    getPageContent(locale, "stay"),
    getFeaturedReviews(6, locale),
    getStoryContent(locale),
    getFeaturedGallery(8, locale),
    getFaqContent(locale),
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

      <OurStoryPreview
        story={story}
        title={sections.story?.title}
        subtitle={sections.story?.subtitle}
      />

      <AccommodationPreview
        rooms={rooms}
        title={dict.home.accommodation.title}
        subtitle={dict.home.accommodation.subtitle}
        bookLabel={homepage?.primaryCtaLabel}
        viewAllLabel={dict.home.accommodation.viewAll}
        emptyMessage={dict.common.contentNotPublished}
        priceFromLabel={stayPage?.labels?.priceFrom || dict.pages.stay.startingFrom}
        perNightLabel={stayPage?.labels?.perNight}
        viewDetailsLabel={stayPage?.labels?.viewDetails || dict.common.viewDetails}
        bookRoomLabel={stayPage?.labels?.bookRoom || dict.pages.stay.bookRoom}
        rateNote={dict.home.stay.rateNote}
      />

      {cafe ? (
        <CafeSection
          content={cafe}
          heading={sections.cafe}
          fallbackCtaLabel={previewCtas.cafe}
        />
      ) : null}

      <SocialActivitiesShowcase
        activities={activities}
        title={sections.activities?.title}
        subtitle={sections.activities?.subtitle}
        viewAllLabel={sections.activities?.ctaLabel || previewCtas.activities}
      />

      <ExplorePreview
        title={sections.tours?.title}
        subtitle={sections.tours?.subtitle}
        viewAllLabel={sections.tours?.ctaLabel || dict.nav.explorePhongNha}
      />

      <GalleryPreview
        items={galleryItems}
        title={sections.gallery?.title || dict.home.gallery.title}
        subtitle={sections.gallery?.subtitle || dict.home.gallery.subtitle}
        viewAllLabel={sections.gallery?.ctaLabel || dict.home.gallery.viewAll || previewCtas.gallery}
      />

      <ReviewsSection
        reviews={reviews}
        title={sections.reviews?.title || dict.home.reviews.title}
        subtitle={sections.reviews?.subtitle || dict.home.reviews.subtitle}
        excellentLabel={dict.home.reviews.excellent}
        basedOnLabel={dict.home.reviews.basedOn.replace(
          "{count}",
          String(reviews.length || 271)
        )}
      />

      <UsefulInfoPreview />

      {faq ? <FaqSection faq={faq} /> : null}

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
