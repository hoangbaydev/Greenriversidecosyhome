"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Search, Clock } from "lucide-react";
import type { BlogPost } from "@/types";
import { getBlogImage } from "@/types";
import { estimateReadingTime } from "@/lib/blog-utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { EmptyState } from "@/components/ui/empty-state";
import { MotionStagger, MotionItem, MotionReveal } from "@/components/motion";

export function BlogList({
  posts,
  searchPlaceholder,
  noResultsLabel,
  readingTimeLabel,
  allCategoryLabel,
}: {
  posts: BlogPost[];
  searchPlaceholder?: string;
  noResultsLabel?: string;
  readingTimeLabel?: string;
  allCategoryLabel?: string;
}) {
  const locale = useLocale();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(
    () => ["all", ...new Set(posts.map((p) => p.category).filter(Boolean))],
    [posts]
  );

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = category === "all" || post.category === category;
      const matchesSearch =
        search === "" ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, search, category]);

  const heroPost = filtered.find((p) => p.featured) || filtered[0];
  const regular = filtered.filter((p) => p.id !== heroPost?.id);

  const minRead = (post: BlogPost) => {
    const mins = estimateReadingTime(post.content || post.excerpt);
    return readingTimeLabel?.replace("{count}", String(mins)) || `${mins} min read`;
  };

  return (
    <>
      <MotionReveal>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text/40" />
            <Input
              placeholder={searchPlaceholder || ""}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`min-h-10 rounded-full px-4 py-2 font-heading text-[13px] font-bold uppercase tracking-[0.04em] transition-colors ${
                  category === cat
                    ? "bg-primary text-white"
                    : "bg-soft text-primary hover:bg-primary/10"
                }`}
              >
                {cat === "all" ? allCategoryLabel || "All" : cat}
              </button>
            ))}
          </div>
        </div>
      </MotionReveal>

      {heroPost ? (
        <MotionReveal className="mt-12">
          <Link
            href={localizedPath(locale, `/blog/${heroPost.slug}`)}
            className="page-card group grid overflow-hidden md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getBlogImage(heroPost)}
                alt={heroPost.title}
                className="img-hover h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12">
              <Badge variant="secondary" className="w-fit">
                {heroPost.category}
              </Badge>
              <h2 className="mt-4 font-heading text-h2 text-text group-hover:text-primary">
                {heroPost.title}
              </h2>
              <p className="mt-4 line-clamp-3 text-base leading-relaxed text-text-muted md:text-lg">
                {heroPost.excerpt}
              </p>
              <p className="mt-6 flex items-center gap-4 text-sm text-text-muted">
                <span>{heroPost.author}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {minRead(heroPost)}
                </span>
              </p>
            </div>
          </Link>
        </MotionReveal>
      ) : null}

      <MotionStagger className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {regular.map((post) => (
          <MotionItem key={post.id}>
            <Link
              href={localizedPath(locale, `/blog/${post.slug}`)}
              className="page-card group block h-full"
            >
              <div className="aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getBlogImage(post)}
                  alt={post.title}
                  className="img-hover h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <Badge variant="outline">{post.category}</Badge>
                <h3 className="mt-3 text-card-title text-text group-hover:text-primary">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-base leading-relaxed text-text-muted">
                  {post.excerpt}
                </p>
                <p className="mt-4 flex items-center justify-between text-sm text-text-muted">
                  <span>{post.publishedAt}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {minRead(post)}
                  </span>
                </p>
              </div>
            </Link>
          </MotionItem>
        ))}
      </MotionStagger>

      {filtered.length === 0 && noResultsLabel ? (
        <div className="mt-10">
          <EmptyState message={noResultsLabel} />
        </div>
      ) : null}
    </>
  );
}
