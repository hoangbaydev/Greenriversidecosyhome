"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { CafeContent, HomepageSectionHeading } from "@/types";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";
import { SAMPLE_IMAGES } from "@/lib/sample-media";

export function CafeSection({
  content,
  heading,
}: {
  content: CafeContent;
  heading?: HomepageSectionHeading;
}) {
  const locale = useLocale();
  if (!content.title?.trim()) return null;

  const title = heading?.title || content.title;
  const heroImage = content.images[0] || SAMPLE_IMAGES.rooftop;
  const ctaLabel = heading?.ctaLabel || content.reserveCtaLabel;

  return (
    <HomeSection id="eat-drink" background="soft" divider>
      <div className="editorial-split">
        {heroImage ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={defaultTransition}
            className="editorial-split__media relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] lg:aspect-auto lg:min-h-[420px]"
          >
            <OptimizedImage
              src={heroImage}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="img-hover"
            />
          </motion.div>
        ) : null}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.08 }}
          className="editorial-split__content flex flex-col justify-center"
        >
          <SectionHeader
            eyebrow="Eat & Drink"
            title={title}
            subtitle={heading?.subtitle || content.subtitle}
            centered={false}
            className="mb-0"
          />
          {content.description ? (
            <p className="mt-5 line-clamp-4 max-w-xl text-base leading-[1.65] text-text-muted">
              {content.description}
            </p>
          ) : null}
          {ctaLabel ? (
            <Link
              href={localizedPath(locale, "/eat-drink")}
              className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          ) : null}
        </motion.div>
      </div>
    </HomeSection>
  );
}
