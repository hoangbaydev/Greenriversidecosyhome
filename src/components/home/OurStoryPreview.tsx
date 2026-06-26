"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { StoryContent } from "@/types";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";
import { SAMPLE_IMAGES } from "@/lib/sample-media";

interface OurStoryPreviewProps {
  story: StoryContent | null;
  title?: string;
  subtitle?: string;
}

const copy = {
  en: {
    eyebrow: "Meet Linh & Family",
    title: "Our Story",
    subtitle: "More than a place to stay, a home shaped by nature, family, and community.",
    excerpt:
      "Nestled between rice fields, limestone mountains, and the peaceful Son River, Green Riverside Cosy Home is more than a place to stay. It is where travellers experience Phong Nha through the eyes of a local family.",
    cta: "Read our story",
  },
  vi: {
    eyebrow: "Gặp gỡ gia đình",
    title: "Câu chuyện của chúng tôi",
    subtitle: "Hơn cả một nơi lưu trú, đây là ngôi nhà được nuôi dưỡng bởi thiên nhiên, gia đình và cộng đồng.",
    excerpt:
      "Nằm giữa cánh đồng lúa, núi đá vôi và dòng sông Son yên bình, Green Riverside Cosy Home không chỉ là nơi để ở. Đây là nơi du khách cảm nhận vẻ đẹp Phong Nha qua góc nhìn của một gia đình địa phương.",
    cta: "Đọc câu chuyện",
  },
} as const;

export function OurStoryPreview({ story, title, subtitle }: OurStoryPreviewProps) {
  const locale = useLocale();
  const t = locale === "vi" ? copy.vi : copy.en;
  const displayTitle = title || story?.homepagePreviewTitle || t.title;
  const displaySubtitle = subtitle || story?.homepagePreviewSubtitle || t.subtitle;
  const displayExcerpt = story?.homepagePreviewExcerpt || t.excerpt;
  const image = story?.homepagePreviewImage || story?.heroImage || SAMPLE_IMAGES.homestay;

  return (
    <section id="our-story" className="home-section section-breathe home-section--white home-section--divider">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-10 max-w-[72rem]">
        <div className="editorial-split">
          {image ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={defaultTransition}
              className="editorial-split__media relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] sm:max-h-[640px] lg:aspect-auto lg:min-h-[520px]"
            >
              <OptimizedImage
                src={image}
                alt={displayTitle}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          ) : null}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.08 }}
            className="editorial-split__content"
          >
            <header className="md:mb-10 mb-0">
              <p className="text-eyebrow mb-2">{t.eyebrow}</p>
              <h2 className="text-text">{displayTitle}</h2>
              <p className="mt-3 max-w-xl text-base leading-[1.65] text-text-muted">
                {displaySubtitle}
              </p>
            </header>

            <p className="mt-5 line-clamp-4 max-w-xl text-base leading-[1.65] text-text-muted">
              {displayExcerpt}
            </p>

            <Link
              href={localizedPath(locale, "/our-story")}
              className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
