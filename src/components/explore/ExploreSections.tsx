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
    <HomeSection id="explore" background="white" divider>
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
            className="experience-card flex flex-col p-6 md:p-7"
          >
            <p className="text-eyebrow mb-2">{section.subtitle}</p>
            <h3 className="font-heading mt-2 text-h4 text-text">{section.title}</h3>
            <p className="mt-3 line-clamp-5 flex-1 text-sm leading-relaxed text-text-muted">
              {section.body.split("\n\n")[0]}
            </p>

            {section.ctaHref && section.ctaLabel ? (
              <Link
                href={localizedPath(locale, section.ctaHref)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-all hover:-translate-y-0.5 hover:text-primary-dark"
              >
                {section.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            ) : null}
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
