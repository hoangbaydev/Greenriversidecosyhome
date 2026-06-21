import { Suspense } from "react";
import {
  getHomepageContent,
  getFeaturedRooms,
  getFeaturedTours,
  getActivities,
  getCafeContent,
  getBlogPosts,
  getStoryContent,
  getPageContent,
  getFeaturedGallery,
  getFeaturedReviews,
  getFaqContent,
} from "@/lib/data/services";
import { fetchRoomsByIds, fetchToursByIds } from "@/lib/data/services";
import { normalizeHomepage } from "@/types";
import { HeroSection } from "@/components/home/HeroSection";
import { OurStoryPreview } from "@/components/home/OurStoryPreview";
import { AccommodationPreview } from "@/components/shared/RoomCard";
import { WhyChooseSection } from "@/components/home/WhyChooseSection";
import { CafeSection } from "@/components/home/CafeSection";
import { ExplorePreview } from "@/components/explore/ExploreSections";
import { SocialActivitiesShowcase } from "@/components/home/SocialActivitiesShowcase";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactPreview } from "@/components/home/ContactPreview";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { CardGridSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SAMPLE_IMAGES } from "@/lib/sample-media";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { Locale } from "@/lib/i18n/config";

async function HomeContent({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const [
    homepageRaw,
    activities,
    cafe,
    blogPosts,
    story,
    stayPage,
    /* toursPage */,
    galleryItems,
    reviews,
    faq,
  ] = await Promise.all([
    getHomepageContent(),
    getActivities(),
    getCafeContent(locale),
    getBlogPosts(),
    getStoryContent(locale),
    getPageContent(locale, "stay"),
    getPageContent(locale, "tours"),
    getFeaturedGallery(8),
    getFeaturedReviews(4),
    getFaqContent(locale),
  ]);

  const homepage = homepageRaw ? normalizeHomepage(homepageRaw) : null;
  const sections = homepage?.sections ?? {};

  const rooms = homepage?.featuredRoomIds.length
    ? await fetchRoomsByIds(homepage.featuredRoomIds)
    : await getFeaturedRooms(3);

  const tours = homepage?.featuredTourIds.length
    ? await fetchToursByIds(homepage.featuredTourIds)
    : await getFeaturedTours(3);

  const hasAnyContent =
    homepage?.heroTitle ||
    story ||
    rooms.length ||
    tours.length ||
    cafe ||
    activities.length ||
    blogPosts.length;

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

      <OurStoryPreview
        story={story}
        title={sections.story?.title}
        subtitle={sections.story?.subtitle}
      />

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

      <GalleryPreview
        items={galleryItems}
        title={sections.gallery?.title}
        subtitle={sections.gallery?.subtitle}
        viewAllLabel={sections.gallery?.ctaLabel}
      />

      <BlogPreview
        posts={blogPosts}
        title={sections.blog?.title || dict.pages.blog.title}
        subtitle={sections.blog?.subtitle}
        viewAllLabel={sections.blog?.ctaLabel || dict.home.blog.viewAll}
        readArticleLabel={dict.home.blog.readArticle}
      />

      {faq ? (
        <>
          <FaqJsonLd faq={faq} />
          <FaqSection faq={faq} />
        </>
      ) : null}

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
