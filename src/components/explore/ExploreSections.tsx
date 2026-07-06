"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getExploreSections } from "@/lib/content/brand";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useWhatsAppNumber } from "@/hooks/use-whatsapp";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";
import { SAMPLE_IMAGES } from "@/lib/sample-media";
import { OptimizedImage } from "@/components/ui/optimized-image";

const exploreCopy = {
  en: {
    previewSubtitle: "Bong Lai Valley, classic caves, and adventure tours through local eyes.",
    adviceCta: "Get tour advice on WhatsApp",
    chatCta: "Chat on WhatsApp",
  },
  vi: {
    previewSubtitle: "Thung lũng Bong Lai, hang động kinh điển và tour mạo hiểm qua góc nhìn địa phương.",
    adviceCta: "Tư vấn tour qua WhatsApp",
    chatCta: "Chat WhatsApp",
  },
} as const;

const sectionImages: Record<string, string> = {
  "bong-lai": SAMPLE_IMAGES.river,
  "motorbike-adventures": SAMPLE_IMAGES.mountains,
  "classic-cave-tours": SAMPLE_IMAGES.cave,
};

const categoryTags: Record<string, string> = {
  "bong-lai": "Countryside",
  "motorbike-adventures": "Scenic Loop",
  "classic-cave-tours": "Must-See Caves",
};

export function ExplorePreview({
  title,
  subtitle,
  viewAllLabel,
}: {
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
}) {
  const locale = useLocale();
  const dict = useDictionary();
  const t = locale === "vi" ? exploreCopy.vi : exploreCopy.en;
  const sections = getExploreSections(locale).slice(1, 4);

  return (
    <HomeSection id="explore" background="soft" divider>
      <SectionHeader
        eyebrow={dict.nav.explore}
        title={title || dict.home.tours.title}
        subtitle={subtitle || t.previewSubtitle}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-6 md:grid-cols-3"
      >
        {sections.map((section, index) => (
          <motion.article
            key={section.id}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: index * 0.06 }}
            className="group flex h-full flex-col rounded-[28px] bg-white p-5 border border-primary/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#152213] dark:border-white/5"
          >
            {/* Visual Image Header */}
            <div className="relative h-[200px] w-full overflow-hidden rounded-[20px] mb-5">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
              <OptimizedImage
                src={sectionImages[section.id] || SAMPLE_IMAGES.river}
                alt={section.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 z-20 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[#1c3312] shadow-sm dark:bg-[#152213]/95 dark:text-[#9fbd70]">
                {categoryTags[section.id] || "Tours"}
              </span>
            </div>

            {/* Content Details */}
            <div className="flex flex-1 flex-col px-1">
              <h3 className="font-heading text-lg font-bold text-text group-hover:text-primary transition-colors duration-300 sm:text-xl">
                {section.title}
              </h3>
              <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-text-muted dark:text-[#c4cdbc] line-clamp-3">
                {section.body.split("\n\n")[0]}
              </p>

              {section.ctaHref && section.ctaLabel ? (
                <Link
                  href={localizedPath(locale, section.ctaHref)}
                  className="mt-5 inline-flex items-center justify-between text-sm font-bold text-primary group/link hover:text-primary-dark border-t border-border/40 pt-4 dark:border-white/5"
                >
                  <span>{section.ctaLabel}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/8 text-primary transition-all duration-300 group-hover/link:bg-primary group-hover/link:text-white group-hover/link:translate-x-1 dark:bg-[#9fbd70]/10 dark:text-[#9fbd70] dark:group-hover/link:bg-[#9fbd70] dark:group-hover/link:text-[#152213]">
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              ) : null}
            </div>
          </motion.article>
        ))}
      </motion.div>
      <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        {viewAllLabel ? (
          <Link
            href={localizedPath(locale, "/explore-phong-nha")}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-primary/25 bg-white px-8 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-soft hover:shadow-md"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
        <WhatsAppButton
          messageType="book_tour"
          label={t.adviceCta}
          size="lg"
          className="min-h-12 px-8 text-sm font-semibold"
        />
      </div>
    </HomeSection>
  );
}

export function ExplorePhongNhaContent() {
  const locale = useLocale();
  const phoneNumber = useWhatsAppNumber();
  const t = locale === "vi" ? exploreCopy.vi : exploreCopy.en;
  const sections = getExploreSections(locale);

  return (
    <>
      {sections.map((section, index) => (
        <HomeSection
          key={section.id}
          id={section.id}
          background={index % 2 === 0 ? "white" : "soft"}
          divider={index > 0}
        >
          <SectionHeader title={section.title} subtitle={section.subtitle} centered={false} />
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={defaultTransition}
            className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-text-muted"
          >
            {section.body}
          </motion.p>
          {section.highlights?.length ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {section.highlights.map((h) => {
                const href =
                  h.ctaMessage && phoneNumber
                    ? getWhatsAppUrl("book_tour", h.ctaMessage, phoneNumber)
                    : null;
                const card = (
                  <motion.div
                    key={h.title}
                    variants={fadeUp}
                    transition={defaultTransition}
                    className="experience-card flex h-full flex-col p-5"
                  >
                    <h3 className="font-heading text-base text-text">{h.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-text-muted">{h.description}</p>
                    {h.ctaLabel ? (
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                        {h.ctaLabel}
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    ) : null}
                  </motion.div>
                );

                if (!href) return card;

                return (
                  <a
                    key={h.title}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full transition-transform hover:-translate-y-0.5"
                  >
                    {card}
                  </a>
                );
              })}
            </motion.div>
          ) : null}
          {section.ctaHref && section.ctaLabel ? (
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={localizedPath(locale, section.ctaHref)}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(96,121,59,0.22)] transition-all hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-[0_14px_30px_rgba(96,121,59,0.28)]"
              >
                {section.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <WhatsAppButton
                messageType="book_tour"
                label={t.chatCta}
                size="lg"
                className="min-h-12 px-8 text-sm font-semibold"
              />
            </div>
          ) : null}
        </HomeSection>
      ))}
    </>
  );
}
