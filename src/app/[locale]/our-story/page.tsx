import { getStoryContent } from "@/lib/data/services";
import { PageHero, Section } from "@/components/ui/section";
import { StoryExperience } from "@/components/story/StoryExperience";
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
  const { title, description } = await resolvePageMeta(locale as Locale, "our-story", "/our-story");
  return createLocalizedMetadata(locale, { title, description, path: "/our-story" });
}

export default async function OurStoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const [page, story] = await Promise.all([
    resolvePageMeta(loc, "our-story", "/our-story").then((r) => r.page),
    getStoryContent(loc),
  ]);

  const hero = resolvePageHero(
    {
      heroTitle: page?.heroTitle || story?.heroTitle,
      heroSubtitle: page?.heroSubtitle || story?.heroSubtitle,
      heroImage: page?.heroImage || story?.heroImage,
    },
    { title: dict.pages.ourStory.title, subtitle: story?.heroSubtitle }
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/our-story" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      {!story ? (
        <Section>
          <EmptyState message={dict.common.contentNotPublished} />
        </Section>
      ) : (
        <StoryExperience story={story} />
      )}
    </>
  );
}
