"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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
      {/* Background & Vignette Dark Mask */}
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/20 lg:from-black/70 lg:via-black/50 lg:to-transparent z-1" />
      </div>

      <Container size="hero" className="relative z-10 py-24 md:py-28 w-full">
        {/* Responsive Grid: text is left-aligned on desktop, leaving the right side open */}
        <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
          <div className="lg:col-span-8 xl:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Glowing Eyebrow Status */}
            {heroEyebrow ? (
              <div className="inline-flex items-center gap-2.5 mb-4 text-[#f0a14a] font-bold text-xs uppercase tracking-[0.25em]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f0a14a] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f0a14a]"></span>
                </span>
                {heroEyebrow}
              </div>
            ) : null}

            {/* Typography Highlight Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.06 }}
              className="font-heading text-display text-white whitespace-pre-line leading-[1.1] text-balance font-black"
            >
              {heroTitle}
            </motion.h1>

            {/* Subtitle Description */}
            {heroSubtitle ? (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...defaultTransition, delay: 0.14 }}
                className="mx-auto lg:mx-0 mt-6 text-white/88 max-w-xl font-light text-base md:text-lg leading-relaxed text-balance"
              >
                {heroSubtitle}
              </motion.p>
            ) : null}

            {/* Branded Frosted Navigation Pill Bar */}
            {pillars.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...defaultTransition, delay: 0.18 }}
                className="mt-8 flex items-center"
              >
                <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-4 rounded-full bg-white/10 backdrop-blur-md px-5 py-2.5 border border-white/10 shadow-lg">
                  {pillars.map((pill, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-xs font-black tracking-[0.12em] text-white uppercase">{pill}</span>
                      {i < pillars.length - 1 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#f0a14a]" />
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* CTAs Blocks */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...defaultTransition, delay: 0.22 }}
              className="mt-10 flex w-full max-w-[22rem] flex-col items-stretch gap-4 sm:max-w-none sm:flex-row sm:items-center sm:justify-center lg:justify-start sm:gap-4"
            >
              {primaryLabel ? (
                <WhatsAppButton
                  messageType="book_room"
                  label={primaryLabel}
                  size="lg"
                  className="hero-cta-primary min-h-12 rounded-full px-10 shadow-md hover:scale-102 hover:shadow-lg transition-all duration-300"
                />
              ) : null}
              {secondaryLabel ? (
                <Link
                  href={secondaryLink}
                  className="hero-cta-secondary inline-flex min-h-12 items-center justify-center rounded-full px-10 border border-white/40 bg-white/5 hover:bg-white/15 text-white hover:border-white transition-all duration-300 font-semibold text-sm"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </motion.div>

          </div>
        </div>
      </Container>

      {/* Luxury Interactive Mouse Scroll Indicator */}
      {data.heroScrollHint ? (
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center flex flex-col items-center gap-2.5 cursor-pointer select-none" aria-hidden>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
            {dict.home.hero.scrollHint || data.heroScrollHint}
          </p>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1 flex justify-center">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-[#f0a14a] rounded-full"
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
