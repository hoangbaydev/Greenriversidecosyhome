import { getBlogPosts } from "@/lib/data/services";
import { PageHero, PageIntro, Section } from "@/components/ui/section";
import { BlogList } from "@/components/blog/BlogList";
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
  const { title, description } = await resolvePageMeta(locale as Locale, "blog", "/blog");
  return createLocalizedMetadata(locale, { title, description, path: "/blog" });
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const p = dict.pages.blog;
  const [page, posts] = await Promise.all([
    resolvePageMeta(loc, "blog", "/blog").then((r) => r.page),
    getBlogPosts(loc),
  ]);

  const hero = resolvePageHero(page, { title: p.title, subtitle: p.subtitle });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/blog" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      <Section>
        {page?.intro ? <PageIntro>{page.intro}</PageIntro> : null}
        {posts.length === 0 ? (
          <EmptyState message={dict.common.contentNotPublished} />
        ) : (
          <BlogList
            posts={posts}
            searchPlaceholder={page?.labels?.searchPlaceholder || p.searchPlaceholder}
            noResultsLabel={page?.labels?.noResults || p.noResults}
            readingTimeLabel={p.readingTime}
            allCategoryLabel={p.allCategories}
          />
        )}
      </Section>
    </>
  );
}
