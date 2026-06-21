import { getTours } from "@/lib/data/services";
import { PageHero, PageIntro, PageCta, Section } from "@/components/ui/section";
import { TourCard } from "@/components/shared/TourCard";
import { ListingGrid } from "@/components/motion";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { EmptyState } from "@/components/ui/empty-state";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { resolvePageMeta } from "@/lib/cms/page-meta";
import { resolvePageHero } from "@/lib/cms/page-hero";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await getPageContext(params);
  const { title, description } = await resolvePageMeta(locale as Locale, "tours", "/tours");
  return createLocalizedMetadata(locale, { title, description, path: "/tours" });
}

export default async function ToursPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const p = dict.pages.tours;
  const [page, tours] = await Promise.all([
    resolvePageMeta(loc, "tours", "/tours").then((r) => r.page),
    getTours(),
  ]);

  const hero = resolvePageHero(page, { title: p.title, subtitle: p.subtitle });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/tours" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      <Section>
        {page?.intro ? <PageIntro>{page.intro}</PageIntro> : null}
        {tours.length === 0 ? (
          <EmptyState message={dict.common.contentNotPublished} />
        ) : (
          <ListingGrid>
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} viewDetailsLabel={page?.labels?.viewDetails} />
            ))}
          </ListingGrid>
        )}
        {page?.ctaLabel ? (
          <PageCta>
            <WhatsAppButton messageType="book_tour" label={page.ctaLabel} size="lg" />
          </PageCta>
        ) : null}
      </Section>
    </>
  );
}
