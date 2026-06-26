import { notFound } from "next/navigation";
import Link from "next/link";
import { createMetadata, blogPostSchema, breadcrumbSchema } from "@/lib/seo";
import { getBlogPostBySlug, getAllBlogSlugs, getBlogPosts } from "@/lib/data/services";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero, Section, SectionHeader } from "@/components/ui/section";
import { BlogArticleBody } from "@/components/blog/BlogArticleBody";
import { ListingGrid } from "@/components/motion";
import { getBlogImage } from "@/types";
import { estimateReadingTime } from "@/lib/blog-utils";
import { locales } from "@/lib/i18n/config";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { localizedBreadcrumb } from "@/lib/i18n/metadata";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await getPageContext(params);
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) return {};
  const image = getBlogImage(post);
  return createMetadata({
    title: post.seoTitle || `${post.title} | Green Riverside Blog`,
    description: post.seoDescription || post.excerpt,
    path: `/${locale}/blog/${slug}`,
    image,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug, locale, dict } = await getPageContext(params);
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) notFound();
  const image = getBlogImage(post);
  const b = dict.pages.blog;
  const loc = locale === "vi" ? "vi" : "en";

  const readingMins = estimateReadingTime(post.content || post.excerpt);
  const readingTimeLabel = b.readingTime.replace("{count}", String(readingMins));

  const allPosts = await getBlogPosts(loc);
  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          blogPostSchema(post, locale),
          breadcrumbSchema(
            localizedBreadcrumb(locale, [
              { name: dict.nav.home, path: "/" },
              { name: dict.nav.blog, path: "/blog" },
              { name: post.title, path: `/blog/${slug}` },
            ])
          ),
        ]}
      />

      <article>
        {image ? (
          <PageHero
            title={post.title}
            subtitle={`${post.author} / ${readingTimeLabel}`}
            image={image}
          />
        ) : (
          <PageHero title={post.title} subtitle={`${post.author} / ${readingTimeLabel}`} />
        )}

        <Section narrow>
          <BlogArticleBody
            post={post}
            locale={loc}
            readingTimeLabel={b.readingTimeLabel}
            readingTimeValueLabel={readingTimeLabel}
            tocTitle={b.tableOfContents}
          />
        </Section>

        {related.length > 0 ? (
          <Section background="soft">
            <SectionHeader title={b.relatedPosts} />
            <ListingGrid>
              {related.map((r) => (
                <Link key={r.id} href={`/${locale}/blog/${r.slug}`} className="page-card group block h-full">
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getBlogImage(r)} alt={r.title} className="img-hover h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-h4 text-text group-hover:text-primary">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </ListingGrid>
          </Section>
        ) : null}
      </article>
    </>
  );
}
