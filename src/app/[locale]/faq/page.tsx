import { getFaqContent } from "@/lib/data/services";
import { FaqSection } from "@/components/home/FaqSection";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { PageHero, Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { resolvePageHero } from "@/lib/cms/page-hero";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const faq = await getFaqContent(locale as Locale);
  const title = faq?.title || dict.home.faq.title;
  const description = faq?.subtitle || dict.home.faq.subtitle;
  return createLocalizedMetadata(locale, {
    title,
    description,
    path: "/faq",
  });
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const faq = await getFaqContent(loc);
  const hero = resolvePageHero(
    { heroTitle: faq?.title, heroSubtitle: faq?.subtitle },
    { title: dict.home.faq.title, subtitle: dict.home.faq.subtitle }
  );

  return (
    <>
      <FaqJsonLd faq={faq} />
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/faq" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} />
      {faq?.items?.length ? (
        <FaqSection faq={faq} showHeader={false} />
      ) : (
        <Section>
          <EmptyState message={dict.common.contentNotPublished} />
        </Section>
      )}
    </>
  );
}
