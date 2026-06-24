"use client";

import { motion } from "framer-motion";
import type { CafeContent } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import { getCafeExperienceBlocks } from "@/lib/content/brand";
import { SAMPLE_IMAGES } from "@/lib/sample-media";
import { Section, SectionHeader, PageCta } from "@/components/ui/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";

export function EatDrinkExperience({
  content,
  locale,
  labels,
}: {
  content: CafeContent;
  locale: Locale;
  labels: {
    atmosphereTitle: string;
    atmosphereSubtitle: string;
    menuTitle: string;
    reserveTable: string;
  };
}) {
  const blocks = getCafeExperienceBlocks(locale);
  const featured = blocks.slice(0, 2);
  const gridBlocks = blocks.slice(2);
  const features = content.features?.length ? content.features : null;

  return (
    <>
      <Section>
        <SectionHeader
          eyebrow={locale === "vi" ? "Cozy Cafe Rooftop" : "Cozy Cafe Rooftop"}
          title={labels.atmosphereTitle}
          subtitle={labels.atmosphereSubtitle}
        />
        <div className="mt-12 space-y-20 md:space-y-28">
          {featured.map((block, index) => {
            const image = content.images?.[index] || SAMPLE_IMAGES[block.imageKey];
            const reversed = index % 2 === 1;
            return (
              <motion.div
                key={block.title}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...defaultTransition, delay: 0.04 }}
                className={`editorial-split ${reversed ? "editorial-split--reverse" : ""}`}
              >
                <div className="editorial-media-frame editorial-split__media relative aspect-[4/3] lg:aspect-auto lg:min-h-[380px]">
                  <OptimizedImage
                    src={image}
                    alt={block.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="img-hover"
                  />
                  <div className="editorial-media-frame__overlay" aria-hidden />
                </div>
                <div className="editorial-split__content flex flex-col justify-center">
                  <h3 className="font-heading text-h2 text-text">{block.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-text-muted">
                    {block.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {gridBlocks.map((block, index) => {
            const contentImageIndex = featured.length + index;
            const image = content.images?.[contentImageIndex] || SAMPLE_IMAGES[block.imageKey];
            return (
              <motion.article
                key={block.title}
                variants={fadeUp}
                transition={{ ...defaultTransition, delay: index * 0.04 }}
                className="experience-card group overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <OptimizedImage
                    src={image}
                    alt={block.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="img-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-5 md:p-6">
                  <h4 className="font-heading text-lg text-text">{block.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{block.description}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Section>

      {(features || content.menuCategories?.length) ? (
        <Section background="soft">
          {features ? (
            <div className="mb-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article key={feature.title} className="experience-card p-6 md:p-7">
                  <h4 className="font-heading text-lg text-text">{feature.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
                </article>
              ))}
            </div>
          ) : null}

          {content.menuCategories?.length ? (
            <>
              <SectionHeader title={labels.menuTitle} centered={false} compact showAccent={false} />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {content.menuCategories.map((cat) => (
                  <div key={cat.name} className="menu-card">
                    <h4 className="font-heading text-lg text-primary">{cat.name}</h4>
                    <ul className="mt-4 space-y-2.5">
                      {cat.items.map((item) => (
                        <li key={item} className="menu-card__item text-sm text-text-muted">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </Section>
      ) : null}

      <Section>
        <PageCta>
          <WhatsAppButton
            messageType="reserve_table"
            label={content.reserveCtaLabel || labels.reserveTable}
            size="lg"
            className="min-h-12 rounded-lg px-10 shadow-sm"
          />
        </PageCta>
      </Section>
    </>
  );
}
