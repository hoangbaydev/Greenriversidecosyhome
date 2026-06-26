import { getGalleryItems } from "@/lib/data/services";
import { PageHero, PageIntro, Section } from "@/components/ui/section";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
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
  const { title, description } = await resolvePageMeta(locale as Locale, "gallery", "/gallery");
  return createLocalizedMetadata(locale, { title, description, path: "/gallery" });
}

export default async function GalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const p = dict.pages.gallery;
  const [page, items] = await Promise.all([
    resolvePageMeta(loc, "gallery", "/gallery").then((r) => r.page),
    getGalleryItems(loc),
  ]);

  const hero = resolvePageHero(page, { title: p.title, subtitle: p.subtitle });

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/gallery" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      <Section>
        {page?.intro ? <PageIntro>{page.intro}</PageIntro> : null}
        {items.length === 0 ? (
          <EmptyState message={dict.common.contentNotPublished} />
        ) : (
          <GalleryGrid
            items={items}
            loadMoreLabel={page?.labels?.loadMore || p.loadMore}
            categoryLabels={p.categories}
          />
        )}
      </Section>
    </>
  );
}
