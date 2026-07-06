"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
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
    subtitle: "More than a place to stay — a home shaped by nature, family, and community.",
    excerpt:
      "Nestled between rice fields, limestone mountains, and the peaceful Son River, Green Riverside Cosy Home is where travellers experience Phong Nha through the eyes of a local family.",
    quote: "Come as our guest, leave as our family.",
    values: ["Nature", "Family", "Community"],
    cta: "Read Our Story",
  },
  vi: {
    eyebrow: "Gặp gỡ gia đình Linh",
    title: "Câu chuyện của chúng tôi",
    subtitle: "Hơn cả một nơi lưu trú, đây là ngôi nhà được nuôi dưỡng bởi thiên nhiên, gia đình và cộng đồng.",
    excerpt:
      "Nằm giữa cánh đồng lúa, núi đá vôi và dòng sông Son yên bình, Green Riverside Cosy Home giúp du khách cảm nhận Phong Nha qua góc nhìn của một gia đình địa phương.",
    quote: "Đến như khách, về như người thân.",
    values: ["Thiên nhiên", "Gia đình", "Cộng đồng"],
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
    <section id="our-story" className="home-section section-breathe home-section--soft home-section--divider">
      <div className="mx-auto w-full max-w-[72rem] px-5 sm:px-8 lg:px-10">
        <div className="editorial-split items-center gap-12 lg:gap-16">
          {/* Left Column: Image with overlapping badge */}
          {image ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={defaultTransition}
              className="relative w-full max-w-[540px] mx-auto pb-10 sm:pb-8 lg:pb-0"
            >
              {/* Main Rounded Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-md sm:max-h-[640px] lg:aspect-auto lg:min-h-[520px]">
                <OptimizedImage
                  src={image}
                  alt={displayTitle}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Overlapping Badge */}
              <div className="absolute -bottom-4 -right-2 w-[240px] rounded-[24px] bg-[#fbfcf8] p-5 shadow-lg border border-primary/8 dark:bg-[#152213] dark:border-primary/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c3312] text-white dark:bg-[#9fbd70] dark:text-primary">
                  <Heart className="h-5 w-5 fill-current" />
                </div>
                <h4 className="mt-3 font-heading text-base font-bold text-[#1c3312] dark:text-primary-dark leading-tight">
                  {locale === "vi" ? "Gia đình Bản địa" : "Local Homestay"}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                  {locale === "vi" 
                    ? "Đón tiếp bằng cả trái tim, chia sẻ chân thành như người nhà."
                    : "Come as our guest, leave as our family — run by a warm local family."}
                </p>
              </div>
            </motion.div>
          ) : null}

          {/* Right Column: Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.08 }}
            className="editorial-split__content"
          >
            <header className="mb-0">
              <p className="text-eyebrow text-[#1c3312] dark:text-[#9fbd70] mb-2">{t.eyebrow}</p>
              <h2 className="font-heading text-3xl font-bold text-text sm:text-4xl">{displayTitle}</h2>
              <p className="mt-4 text-lg font-medium text-[#1c3312] dark:text-[#9fbd70] leading-relaxed max-w-xl">
                {displaySubtitle}
              </p>
            </header>

            <p className="mt-4 line-clamp-4 max-w-xl text-base leading-relaxed text-text-muted">
              {displayExcerpt}
            </p>

            {/* Left Accent border Quote Block */}
            <div className="mt-6 border-l-4 border-[#1c3312] bg-[#f4f8f1] p-5 rounded-r-[16px] dark:border-[#9fbd70] dark:bg-[#152213]/40 max-w-xl">
              <p className="font-heading text-lg italic font-semibold text-text leading-relaxed">
                “{t.quote}”
              </p>
            </div>

            {/* Theme Color Value Tags */}
            <ul className="mt-6 flex flex-wrap gap-2.5 max-w-xl">
              {t.values.map((value) => (
                <li 
                  key={value} 
                  className="rounded-full bg-[#1c3312]/8 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c3312] dark:bg-[#9fbd70]/15 dark:text-[#9fbd70]"
                >
                  {value}
                </li>
              ))}
            </ul>

            {/* CTA Pill Button */}
            <div className="mt-8">
              <Link
                href={localizedPath(locale, "/our-story")}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1c3312] hover:bg-[#152e0a] px-8 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg dark:bg-[#9fbd70] dark:text-primary dark:hover:bg-[#8da860] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {t.cta}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
