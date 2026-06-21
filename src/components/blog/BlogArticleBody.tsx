"use client";

import { useMemo } from "react";
import type { BlogPost } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import {
  extractHeadings,
  injectHeadingIds,
} from "@/lib/blog-utils";
import { Badge } from "@/components/ui/badge";
import { MotionReveal } from "@/components/motion";

export function BlogArticleBody({
  post,
  locale,
  readingTimeLabel,
  readingTimeValueLabel,
  tocTitle,
}: {
  post: BlogPost;
  locale: Locale;
  readingTimeLabel: string;
  readingTimeValueLabel: string;
  tocTitle: string;
}) {
  const headings = useMemo(() => extractHeadings(post.content || ""), [post.content]);
  const contentHtml = useMemo(
    () => (post.content ? injectHeadingIds(post.content, headings) : ""),
    [post.content, headings]
  );

  const formattedDate = useMemo(() => {
    try {
      return new Date(post.publishedAt).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return post.publishedAt;
    }
  }, [post.publishedAt, locale]);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,240px)_1fr] lg:gap-16">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <MotionReveal>
          <div className="rounded-[var(--radius-card)] border border-border bg-soft p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-eyebrow text-text-muted">{readingTimeLabel}</dt>
                <dd className="mt-1 font-medium text-text">{readingTimeValueLabel}</dd>
              </div>
              <div>
                <dt className="text-eyebrow text-text-muted">{locale === "vi" ? "Ngày đăng" : "Published"}</dt>
                <dd className="mt-1 font-medium text-text">{formattedDate}</dd>
              </div>
              {post.author ? (
                <div>
                  <dt className="text-eyebrow text-text-muted">{locale === "vi" ? "Tác giả" : "Author"}</dt>
                  <dd className="mt-1 font-medium text-text">{post.author}</dd>
                </div>
              ) : null}
            </dl>

            {headings.length > 0 ? (
              <nav className="mt-8 border-t border-border pt-6" aria-label={tocTitle}>
                <p className="text-eyebrow text-text-muted">{tocTitle}</p>
                <ol className="mt-4 space-y-2">
                  {headings.map((heading) => (
                    <li key={heading.id} className={heading.level === 3 ? "pl-3" : undefined}>
                      <a
                        href={`#${heading.id}`}
                        className="text-sm text-text-muted transition-colors hover:text-primary"
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}
          </div>
        </MotionReveal>
      </aside>

      <div>
        {post.category ? (
          <Badge variant="secondary" className="mb-6">
            {post.category}
          </Badge>
        ) : null}
        {post.excerpt ? (
          <p className="text-body-lg leading-relaxed text-text-muted">{post.excerpt}</p>
        ) : null}
        {contentHtml ? (
          <div
            className="prose-content mt-8 [&_a]:text-primary [&_a]:underline [&_h2]:scroll-mt-28 [&_h2]:font-heading [&_h2]:text-h2 [&_h2]:text-text [&_h3]:scroll-mt-28 [&_h3]:font-heading [&_h3]:text-card-title [&_h3]:text-text [&_img]:rounded-xl [&_li]:text-text-muted [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : null}
        {post.tags?.length ? (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-8">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
