"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Utensils } from "lucide-react";
import type { CafeContent, HomepageSectionHeading } from "@/types";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";
import { SAMPLE_IMAGES } from "@/lib/sample-media";

export function CafeSection({
  content,
  heading,
  fallbackCtaLabel,
}: {
  content: CafeContent;
  heading?: HomepageSectionHeading;
  fallbackCtaLabel?: string;
}) {
  const locale = useLocale();
  if (!content.title?.trim()) return null;

  const title = heading?.title || content.title;
  const heroImage = content.images[0] || SAMPLE_IMAGES.rooftop;
  const ctaLabel = heading?.ctaLabel || content.reserveCtaLabel || fallbackCtaLabel;

  const features = locale === "vi" ? [
    "Không gian Rooftop Café & Lounge ấm cúng",
    "Bữa ăn gia đình mang hương vị bản địa",
    "Nước ép trái cây tươi & Cà phê đặc sản"
  ] : [
    "Cozy Cafe Rooftop & Lounge",
    "Authentic Local Home-cooked Meals",
    "Fresh Tropical Juices & Specialty Coffee"
  ];

  return (
    <HomeSection id="eat-drink" background="soft" divider>
      <div className="editorial-split items-center gap-12 lg:gap-16">
        {/* Left Column: Image with overlapping badge */}
        {heroImage ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={defaultTransition}
            className="relative w-full max-w-[540px] mx-auto pb-10 sm:pb-8 lg:pb-0"
          >
            {/* Main Rounded Image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] shadow-md">
              <OptimizedImage
                src={heroImage}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-4 -right-2 w-[240px] rounded-[24px] bg-[#fce5d8] p-5 shadow-lg border border-[#f9cbaf]/40 dark:bg-[#281b12] dark:border-primary/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c3312] text-white dark:bg-[#9fbd70] dark:text-primary">
                <Utensils className="h-5 w-5" />
              </div>
              <h4 className="mt-3 font-heading text-base font-bold text-[#1c3312] dark:text-primary-dark leading-tight">
                {locale === "vi" ? "Đậm đà vị bản địa" : "Homemade with Love"}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-text-muted">
                {locale === "vi" 
                  ? "Nguyên liệu tươi ngon lấy trực tiếp từ chợ làng mỗi ngày."
                  : "Fresh ingredients sourced daily from the local village market."}
              </p>
            </div>
          </motion.div>
        ) : null}

        {/* Right Column: Custom Content Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.08 }}
          className="editorial-split__content flex flex-col justify-center"
        >
          {/* Main Section Title */}
          <h2 className="font-heading text-3xl font-bold text-[#1c3312] dark:text-[#9fbd70] sm:text-4xl">
            {locale === "vi" ? "Ẩm thực & Đồ uống" : "Eat & Drink"}
          </h2>

          {/* Subtitle/Description Paragraph */}
          <p className="mt-4 text-base leading-relaxed text-text-muted max-w-xl">
            {locale === "vi"
              ? "Rooftop café là trái tim của ngôi nhà. Thưởng thức bữa sáng truyền thống Việt Nam, những bữa tối gia đình ấm cúng và nước ép tươi mát trong khi ngắm nhìn dòng sông yên bình."
              : "Our rooftop cafe is the heart of the home. Enjoy traditional Vietnamese breakfast, hearty home-cooked dinners, and refreshing juices while soaking in the best views of the river."}
          </p>

          {/* Checklist Feature List */}
          <ul className="mt-6 space-y-3.5 max-w-xl">
            {features.map((feat) => (
              <li key={feat} className="flex items-center gap-3.5">
                <div className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-[#1c3312]/8 text-[#1c3312] dark:bg-[#9fbd70]/15 dark:text-[#9fbd70]">
                  <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
                </div>
                <span className="text-sm font-semibold text-text leading-tight">{feat}</span>
              </li>
            ))}
          </ul>

          {/* Full Menu CTA Button */}
          {ctaLabel ? (
            <div className="mt-8">
              <Link
                href={localizedPath(locale, "/eat-drink")}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#1c3312] hover:bg-[#152e0a] px-8 text-sm font-bold text-white transition-all hover:-translate-y-0.5 shadow-md hover:shadow-lg dark:bg-[#9fbd70] dark:text-primary dark:hover:bg-[#8da860]"
              >
                {locale === "vi" ? "Xem thực đơn đầy đủ" : "View Full Menu"}
              </Link>
            </div>
          ) : null}
        </motion.div>
      </div>
    </HomeSection>
  );
}
