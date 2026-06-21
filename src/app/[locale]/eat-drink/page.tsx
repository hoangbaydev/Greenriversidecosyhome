import { getCafeContent } from "@/lib/data/services";
import { PageHero, PageIntro, Section, PageCta } from "@/components/ui/section";
import { EatDrinkExperience } from "@/components/eat-drink/EatDrinkExperience";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { EmptyState } from "@/components/ui/empty-state";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, restaurantSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { resolvePageMeta } from "@/lib/cms/page-meta";
import { resolvePageHero } from "@/lib/cms/page-hero";
import { getCafeExperienceBlocks } from "@/lib/content/brand";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await getPageContext(params);
  const { title, description } = await resolvePageMeta(locale as Locale, "eat-drink", "/eat-drink");
  return createLocalizedMetadata(locale, { title, description, path: "/eat-drink" });
}

export default async function EatDrinkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const p = dict.pages.eatDrink;
  const [page, cafeRaw] = await Promise.all([
    resolvePageMeta(loc, "eat-drink", "/eat-drink").then((r) => r.page),
    getCafeContent(loc),
  ]);

  const cafe = cafeRaw?.title
    ? cafeRaw
    : {
        title: getCafeExperienceBlocks(loc)[0]?.title || p.title,
        subtitle: p.atmosphereSubtitle,
        description: p.atmosphereSubtitle,
        features: [],
        menuCategories: [],
        images: [],
        reserveCtaLabel: p.reserveTable,
      };

  const hero = resolvePageHero(
    {
      heroTitle: page?.heroTitle || cafe.title,
      heroSubtitle: page?.heroSubtitle || cafe.subtitle,
      heroImage: page?.heroImage || cafe.images?.[0],
    },
    { title: p.title, subtitle: cafe.subtitle }
  );

  return (
    <>
      <JsonLd
        data={[
          restaurantSchema(loc),
          breadcrumbSchema(
            localizedBreadcrumb(locale, [
              { name: dict.nav.home, path: "/" },
              { name: hero.title, path: "/eat-drink" },
            ])
          ),
        ]}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      {!cafeRaw?.title && !page?.intro ? (
        <Section>
          <EmptyState message={p.empty} />
          <PageCta>
            <WhatsAppButton messageType="reserve_table" label={p.reserveTable} size="lg" />
          </PageCta>
        </Section>
      ) : (
        <>
          {page?.intro ? (
            <Section>
              <PageIntro>{page.intro}</PageIntro>
            </Section>
          ) : cafe.description ? (
            <Section>
              <PageIntro>{cafe.description}</PageIntro>
            </Section>
          ) : null}
          <EatDrinkExperience
            content={cafe}
            locale={loc}
            labels={{
              atmosphereTitle: p.atmosphereTitle,
              atmosphereSubtitle: p.atmosphereSubtitle,
              menuTitle: p.menuHighlights,
              reserveTable: p.reserveTable,
            }}
          />
        </>
      )}
    </>
  );
}
