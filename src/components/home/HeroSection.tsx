"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { HomepageContent } from "@/types";
import { normalizeHomepage } from "@/types";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { defaultTransition } from "@/lib/motion";
import { resolveBannerImage } from "@/lib/banner-image";
import {
  DEFAULT_BANNER_IMAGE,
  DEFAULT_BANNER_IMAGE_MOBILE,
  DEFAULT_BANNER_IMAGE_TABLET,
} from "@/lib/constants";

interface HeroSectionProps {
  content: HomepageContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const data = normalizeHomepage(content);
  const locale = useLocale();
  const dict = useDictionary();

  const [failedHeroImage, setFailedHeroImage] = useState<string | null>(null);

  const heroEyebrow = data.heroEyebrow || dict.home.hero.eyebrow;
  const heroTitle = data.heroTitle || dict.home.hero.fallbackTitle;
  const heroSubtitle = data.heroSubtitle || dict.home.hero.fallbackSubtitle;
  const primaryLabel = data.primaryCtaLabel || dict.home.hero.primaryCta;
  const secondaryLabel = data.secondaryCtaLabel || dict.home.hero.secondaryCta;

  const secondaryLink = data.secondaryCtaLink?.startsWith("/")
    ? localizedPath(locale, data.secondaryCtaLink)
    : localizedPath(locale, "/stay");

  const bannerUrl =
    failedHeroImage === data.heroImage ? DEFAULT_BANNER_IMAGE : resolveBannerImage(data.heroImage);

  const pillars = data.heroPillars && data.heroPillars.length > 0
    ? data.heroPillars
    : dict.home.hero.pillars
    ? Object.values(dict.home.hero.pillars)
    : [];

  return (
    <section
      className="relative isolate flex min-h-screen min-h-[100dvh] items-center justify-center overflow-hidden bg-primary"
      aria-label="Hero"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <picture className="absolute inset-0">
          {bannerUrl === DEFAULT_BANNER_IMAGE ? (
            <>
              <source media="(max-width: 640px)" srcSet={DEFAULT_BANNER_IMAGE_MOBILE} />
              <source media="(max-width: 1280px)" srcSet={DEFAULT_BANNER_IMAGE_TABLET} />
            </>
          ) : null}
          <img
            src={bannerUrl}
            alt=""
            className="hero-media h-full w-full object-cover"
            fetchPriority="high"
            decoding="async"
            onError={() => setFailedHeroImage(data.heroImage || "")}
          />
        </picture>
        <div className="hero-overlay-light absolute inset-0" />
      </div>

      <Container size="hero" className="relative z-10 py-24 md:py-28">
        <div className="hero-content mx-auto max-w-4xl text-center">
          {heroEyebrow ? (
            <p className="hero-eyebrow text-eyebrow text-white/90 tracking-[0.2em]">{heroEyebrow}</p>
          ) : null}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, delay: 0.06 }}
            className="font-heading mt-6 text-display text-white whitespace-pre-line leading-[1.1]"
          >
            {heroTitle}
          </motion.h1>
          {heroSubtitle ? (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.14 }}
              className="hero-subtitle mx-auto mt-8 text-white/95 max-w-2xl font-light"
            >
              {heroSubtitle}
            </motion.p>
          ) : null}

          {pillars.length > 0 ? (
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.18 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
            >
              {pillars.map((pill, i) => (
                <li key={i} className="hero-pill rounded-full px-4 py-2 text-sm font-semibold tracking-wide">
                  {pill}
                </li>
              ))}
            </motion.ul>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...defaultTransition, delay: 0.22 }}
            className="mx-auto mt-12 flex w-full max-w-[22rem] flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
          >
            {primaryLabel ? (
              <WhatsAppButton
                messageType="book_room"
                label={primaryLabel}
                size="lg"
                className="hero-cta-primary min-h-12 rounded-full px-10 shadow-md transition-all"
              />
            ) : null}
            {secondaryLabel ? (
              <Link
                href={secondaryLink}
                className="hero-cta-secondary inline-flex min-h-12 items-center justify-center rounded-full px-10 transition-all"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </motion.div>
        </div>
      </Container>

      {data.heroScrollHint ? (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center" aria-hidden>
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-white/70">
            {dict.home.hero.scrollHint || data.heroScrollHint}
          </p>
          <ChevronDown className="mx-auto mt-1 h-5 w-5 animate-bounce text-white/60" />
        </div>
      ) : null}
    </section>
  );
}
