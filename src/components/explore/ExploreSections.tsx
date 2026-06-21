"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getExploreSections } from "@/lib/content/brand";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";
import { SAMPLE_IMAGES } from "@/lib/sample-media";
import { OptimizedImage } from "@/components/ui/optimized-image";

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
  const sections = getExploreSections(locale).slice(1, 4);

  return (
    <HomeSection id="explore" background="white" divider>
      <SectionHeader
        eyebrow={locale === "vi" ? "Khám phá" : "Explore"}
        title={title || (locale === "vi" ? "Khám phá Phong Nha" : "Explore Phong Nha")}
        subtitle={
          subtitle ||
          (locale === "vi"
            ? "Thung lũng Bong Lai, hang động kinh điển và tour mạo hiểm — qua góc nhìn địa phương."
            : "Bong Lai Valley, classic caves, and adventure tours — through local eyes.")
        }
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid gap-6 md:grid-cols-3"
      >
        {sections.map((section, index) => {
          return (
            <motion.article
              key={section.id}
              variants={fadeUp}
              transition={{ ...defaultTransition, delay: index * 0.06 }}
              className="experience-card flex flex-col p-6 md:p-7"
            >
              <p className="text-eyebrow mb-2">
                {section.subtitle}
              </p>
              <h3 className="font-heading mt-2 text-h4 text-text">
                {section.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted whitespace-pre-line">
                {section.body}
              </p>
              
              {section.ctaHref && section.ctaLabel ? (
                <Link
                  href={localizedPath(locale, section.ctaHref)}
                  className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"
                >
                  {section.ctaLabel}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : null}
            </motion.article>
          );
        })}
      </motion.div>
      <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        {viewAllLabel ? (
          <Link
            href={localizedPath(locale, "/explore-phong-nha")}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/25 px-8 text-sm font-semibold text-primary transition-colors hover:bg-soft"
          >
            {viewAllLabel}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        ) : null}
        <WhatsAppButton
          messageType="book_tour"
          label={locale === "vi" ? "Tư vấn tour qua WhatsApp" : "Get tour advice on WhatsApp"}
          size="lg"
          className="min-h-11 rounded-lg px-8 text-sm font-semibold"
        />
      </div>
    </HomeSection>
  );
}

export function ExplorePhongNhaContent() {
  const locale = useLocale();
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
              {section.highlights.map((h) => (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
                  transition={defaultTransition}
                  className="experience-card p-5"
                >
                  <h3 className="font-heading text-base text-text">{h.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{h.description}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : null}
          {section.ctaHref && section.ctaLabel ? (
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={localizedPath(locale, section.ctaHref)}
                className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                {section.ctaLabel}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <WhatsAppButton
                messageType="book_tour"
                label={locale === "vi" ? "Chat WhatsApp" : "Chat on WhatsApp"}
                size="lg"
                className="min-h-11 rounded-lg px-8 text-sm font-semibold"
              />
            </div>
          ) : null}
        </HomeSection>
      ))}
    </>
  );
}
