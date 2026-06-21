import { PageHero, PageIntro, PageCta, Section, SectionHeader } from "@/components/ui/section";
import { WeeklyCalendar } from "@/components/home/WeeklyCalendar";
import { SocialActivitiesIntro } from "@/components/home/SocialActivitiesIntro";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { resolvePageMeta } from "@/lib/cms/page-meta";
import { resolvePageHero } from "@/lib/cms/page-hero";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await getPageContext(params);
  const { title, description } = await resolvePageMeta(locale as Locale, "social-activities", "/social-activities");
  return createLocalizedMetadata(locale, { title, description, path: "/social-activities" });
}

export default async function SocialActivitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const p = dict.pages.activities;
  const pageMeta = await resolvePageMeta(loc, "social-activities", "/social-activities").then((r) => r.page);

  const hero = resolvePageHero(pageMeta, { title: p.title, subtitle: p.subtitle });
  const labels = pageMeta?.labels;
  const communityTitle = labels?.communityTitle || p.communityTitle;
  const showCommunity = communityTitle || pageMeta?.intro || pageMeta?.ctaLabel;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/social-activities" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      <SocialActivitiesIntro />

      <WeeklyCalendar
        title={labels?.scheduleTitle || p.title}
        subtitle={labels?.scheduleSubtitle || p.communitySubtitle}
        joinLabel={pageMeta?.ctaLabel || p.join}
      />

      {showCommunity ? (
        <Section>
          {communityTitle ? (
            <SectionHeader
              title={communityTitle}
              subtitle={pageMeta?.intro || p.communitySubtitle}
            />
          ) : pageMeta?.intro ? (
            <PageIntro>{pageMeta.intro}</PageIntro>
          ) : null}
          {pageMeta?.ctaLabel ? (
            <PageCta>
              <WhatsAppButton messageType="join_activity" label={pageMeta.ctaLabel} size="lg" />
            </PageCta>
          ) : null}
        </Section>
      ) : null}
    </>
  );
}
