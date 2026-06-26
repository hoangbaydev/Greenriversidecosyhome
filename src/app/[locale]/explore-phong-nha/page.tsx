import { getTours, getPageContent } from "@/lib/data/services";
import { resolvePageMeta } from "@/lib/cms/page-meta";
import { PageCta, PageHero, PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { TourCard } from "@/components/shared/TourCard";
import { ListingGrid } from "@/components/motion";
import { ExplorePhongNhaContent } from "@/components/explore/ExploreSections";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import type { Locale } from "@/lib/i18n/config";
import { SAMPLE_IMAGES } from "@/lib/sample-media";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const page = dict.pages.explore;
  return createLocalizedMetadata(locale, {
    title: page.title,
    description: page.subtitle,
    path: "/explore-phong-nha",
  });
}

export default async function ExplorePhongNhaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const pageCopy = dict.pages.explore;
  const [page, toursPage, tours] = await Promise.all([
    getPageContent(loc, "explore-phong-nha"),
    resolvePageMeta(loc, "tours", "/tours").then((result) => result.page),
    getTours(loc),
  ]);

  const experienceTitle =
    toursPage?.heroTitle ||
    (loc === "vi" ? "Trải nghiệm khám phá Phong Nha" : "Phong Nha Experiences");
  const experienceSubtitle =
    toursPage?.heroSubtitle ||
    (loc === "vi"
      ? "Hang động, thung lũng và những chuyến đi địa phương được cô Linh tư vấn theo thời gian, sức khỏe và ngân sách của bạn."
      : "Caves, valleys, and local adventures recommended by Ms. Linh around your time, fitness, and budget.");

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: pageCopy.title, path: "/explore-phong-nha" },
          ])
        )}
      />
      <PageHero
        title={page?.heroTitle || pageCopy.title}
        subtitle={page?.heroSubtitle || pageCopy.subtitle}
        image={page?.heroImage || SAMPLE_IMAGES.mountains}
      />
      {page?.intro ? (
        <Section>
          <PageIntro>{page.intro}</PageIntro>
        </Section>
      ) : null}
      <ExplorePhongNhaContent />
      <Section id="experiences" background="soft">
        <SectionHeader title={experienceTitle} subtitle={experienceSubtitle} />
        {toursPage?.intro ? <PageIntro>{toursPage.intro}</PageIntro> : null}
        {tours.length === 0 ? (
          <EmptyState message={dict.common.contentNotPublished} />
        ) : (
          <ListingGrid>
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={tour}
                viewDetailsLabel={toursPage?.labels?.viewDetails}
                detailBasePath="/explore-phong-nha"
              />
            ))}
          </ListingGrid>
        )}
        {toursPage?.ctaLabel ? (
          <PageCta>
            <WhatsAppButton messageType="book_tour" label={toursPage.ctaLabel} size="lg" />
          </PageCta>
        ) : null}
      </Section>
    </>
  );
}
