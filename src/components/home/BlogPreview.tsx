"use client";

import Link from "next/link";
import type { BlogPost } from "@/types";
import { getBlogImage } from "@/types";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLink } from "@/components/ui/section-link";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { MotionStagger, MotionItem } from "@/components/motion";
import { SAMPLE_IMAGES } from "@/lib/sample-media";

const BLOG_FALLBACKS = [
  SAMPLE_IMAGES.cave,
  SAMPLE_IMAGES.boat,
  SAMPLE_IMAGES.homestay,
  SAMPLE_IMAGES.mountains,
  SAMPLE_IMAGES.jungle,
  SAMPLE_IMAGES.sunset,
];

export function BlogPreview({
  posts,
  title,
  subtitle,
  viewAllLabel,
  readArticleLabel = "Read article",
}: {
  posts: BlogPost[];
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
  readArticleLabel?: string;
}) {
  const locale = useLocale();

  if (!posts.length) return null;

  const items = posts.slice(0, 6);

  return (
    <HomeSection id="blog" background="white" divider>
      {title ? <SectionHeader eyebrow="News" title={title} subtitle={subtitle} /> : null}

      <MotionStagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((post, index) => (
          <MotionItem key={post.id}>
            <article className="page-card page-card--lift flex flex-col">
              <Link
                href={localizedPath(locale, `/blog/${post.slug}`)}
                className="relative block aspect-[16/10] overflow-hidden bg-soft"
              >
                <OptimizedImage
                  src={getBlogImage(post) || BLOG_FALLBACKS[index % BLOG_FALLBACKS.length]}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="img-hover object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-h4 leading-snug text-text">
                  <Link
                    href={localizedPath(locale, `/blog/${post.slug}`)}
                    className="transition-colors hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {post.excerpt || "No description available..."}
                </p>
                <Link
                  href={localizedPath(locale, `/blog/${post.slug}`)}
                  className="mt-4 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  {readArticleLabel} →
                </Link>
              </div>
            </article>
          </MotionItem>
        ))}
      </MotionStagger>

      {viewAllLabel ? (
        <p className="mt-12 text-center">
          <SectionLink href={localizedPath(locale, "/blog")}>{viewAllLabel}</SectionLink>
        </p>
      ) : null}
    </HomeSection>
  );
}
