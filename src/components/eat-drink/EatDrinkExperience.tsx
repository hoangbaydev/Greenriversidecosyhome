"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Search, Utensils } from "lucide-react";
import type { CafeContent } from "@/types";
import type { Locale } from "@/lib/i18n/config";
import { getCafeExperienceBlocks } from "@/lib/content/brand";
import {
  CAFE_MENU,
  CAFE_MENU_SCANS,
  CAFE_PHRASES,
  getCafeMenuCopy,
  type CafeMenuCategory,
} from "@/lib/content/cafe-menu";
import { SAMPLE_IMAGES } from "@/lib/sample-media";
import { Section, SectionHeader, PageCta } from "@/components/ui/section";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";
import { subscribeCafeContent } from "@/services/content.service";

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
  const [liveContent, setLiveContent] = useState(content);
  const [menuMode, setMenuMode] = useState<"all" | "food" | "drinks">("all");
  const [menuQuery, setMenuQuery] = useState("");
  const blocks = getCafeExperienceBlocks(locale);
  const menuCopy = getCafeMenuCopy(locale);
  const featured = blocks.slice(0, 2);
  const gridBlocks = blocks.slice(2);
  const features = liveContent.features?.length ? liveContent.features : null;
  const normalizedQuery = menuQuery.trim().toLowerCase();
  const filteredMenu = useMemo(() => {
    return CAFE_MENU.reduce<CafeMenuCategory[]>((acc, category) => {
      if (menuMode !== "all" && category.group !== menuMode) return acc;

      const searchableCategory = `${category.title} ${category.viTitle ?? ""}`.toLowerCase();
      const items = normalizedQuery
        ? category.items.filter((item) =>
            `${item.name} ${item.vi ?? ""} ${item.note ?? ""} ${item.price} ${searchableCategory}`
              .toLowerCase()
              .includes(normalizedQuery)
          )
        : category.items;

      if (items.length) acc.push({ ...category, items });
      return acc;
    }, []);
  }, [menuMode, normalizedQuery]);

  useEffect(() => {
    return subscribeCafeContent(locale, (latest) => {
      if (latest?.title) setLiveContent(latest);
    });
  }, [locale]);

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
            const image = liveContent.images?.[index] || SAMPLE_IMAGES[block.imageKey];
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
            const image = liveContent.images?.[contentImageIndex] || SAMPLE_IMAGES[block.imageKey];
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

      <Section background="soft">
        <SectionHeader
          eyebrow={menuCopy.eyebrow}
          title={menuCopy.title}
          subtitle={menuCopy.subtitle}
          centered={false}
          compact
        />

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex rounded-lg border border-primary/15 bg-white p-1 shadow-sm">
            {[
              { key: "all", label: menuCopy.all, icon: Utensils },
              { key: "food", label: menuCopy.food, icon: Utensils },
              { key: "drinks", label: menuCopy.drinks, icon: Coffee },
            ].map((mode) => {
              const Icon = mode.icon;
              const active = menuMode === mode.key;
              return (
                <button
                  key={mode.key}
                  type="button"
                  onClick={() => setMenuMode(mode.key as "all" | "food" | "drinks")}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-md px-4 text-sm font-semibold transition ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-muted hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {mode.label}
                </button>
              );
            })}
          </div>

          <label className="relative block w-full lg:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              value={menuQuery}
              onChange={(event) => setMenuQuery(event.target.value)}
              placeholder={menuCopy.search}
              className="min-h-11 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm text-text shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </label>
        </div>

        {filteredMenu.length ? (
          <div className="mt-8 overflow-hidden rounded-lg border border-primary/15 bg-white shadow-[0_24px_60px_rgba(72,92,44,0.10)]">
            <div className="relative overflow-hidden border-b border-primary/15 bg-[linear-gradient(135deg,#e8f5ef_0%,#f7fbef_46%,#fff7ed_100%)] px-5 py-6 md:px-8 md:py-8">
              <div
                className="absolute inset-x-0 bottom-0 h-1.5 bg-[linear-gradient(90deg,var(--primary),#2f9b8f,var(--accent))]"
                aria-hidden
              />
              <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, rgba(96,121,59,.14) 0 1px, transparent 1px), linear-gradient(60deg, rgba(47,155,143,.10) 0 1px, transparent 1px)",
                  backgroundSize: "34px 34px",
                }}
                aria-hidden
              />
              <div className="relative flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-primary">
                    Cozy Cafe
                  </p>
                  <h3 className="mt-2 text-3xl font-black leading-none text-text md:text-5xl">
                    {locale === "vi" ? "Menu ăn uống" : "Food & Drinks"}
                  </h3>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                  {locale === "vi"
                    ? "Thực đơn dễ đọc, giá rõ ràng, trình bày sáng và thoáng để hợp với trải nghiệm du lịch Phong Nha."
                    : "A readable menu with clear prices and a fresh travel-inspired look for a relaxed Phong Nha cafe experience."}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
              <aside className="border-b border-border bg-[linear-gradient(180deg,#f5f8ef,#ffffff)] lg:border-b-0 lg:border-r">
                <div className="flex gap-2 overflow-x-auto p-4 lg:sticky lg:top-24 lg:block lg:space-y-1 lg:overflow-visible">
                  {filteredMenu.map((category) => (
                    <a
                      key={`nav-${category.id}`}
                      href={`#menu-${category.id}`}
                      className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-md border border-transparent px-3 text-sm font-bold text-text-muted transition hover:border-primary/20 hover:bg-primary/8 hover:text-primary lg:flex lg:justify-start"
                    >
                      {category.title}
                    </a>
                  ))}
                </div>
              </aside>

              <div className="divide-y divide-border">
                {filteredMenu.map((category) => (
                  <article key={category.id} id={`menu-${category.id}`} className="scroll-mt-28 px-5 py-8 md:px-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="rounded-lg border border-primary/20 bg-primary/8 px-4 py-2 text-lg font-black uppercase leading-tight text-primary md:text-2xl">
                            {category.title}
                          </h3>
                          {category.viTitle ? (
                            <span className="rounded-full bg-[#2f9b8f]/10 px-3 py-1 text-xs font-bold text-[#20786f]">
                              {category.viTitle}
                            </span>
                          ) : null}
                        </div>
                        {category.description ? (
                          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
                            {category.description}
                          </p>
                        ) : null}
                      </div>
                      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/8 px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent">
                        {category.group === "food" ? <Utensils className="h-3.5 w-3.5" /> : <Coffee className="h-3.5 w-3.5" />}
                        {category.group === "food" ? menuCopy.food : menuCopy.drinks}
                      </span>
                    </div>

                    <ul className="mt-6 grid gap-x-10 md:grid-cols-2">
                      {category.items.map((item) => (
                        <li
                          key={`${category.id}-${item.name}-${item.price}`}
                          className="grid min-h-[78px] grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border/80 py-4"
                        >
                          <div className="min-w-0">
                            <div className="flex items-baseline gap-3">
                              <p className="text-[15px] font-extrabold leading-snug text-text md:text-base">
                                {item.name}
                              </p>
                              <span className="hidden h-px min-w-8 flex-1 border-b border-dotted border-primary/25 sm:block" aria-hidden />
                            </div>
                            {item.vi ? <p className="mt-1 text-sm font-semibold text-[#20786f]">{item.vi}</p> : null}
                            {item.note ? (
                              <p className="mt-1 text-sm leading-relaxed text-text-muted">{item.note}</p>
                            ) : null}
                          </div>
                          <p className="whitespace-nowrap text-right text-[15px] font-black text-accent md:text-base">
                            {item.price}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {!filteredMenu.length ? (
          <p className="mt-8 rounded-lg border border-border bg-surface p-6 text-center text-sm text-text-muted">
            {menuCopy.noResults}
          </p>
        ) : null}

        <div className="mt-10">
          <SectionHeader
            title={menuCopy.scansTitle}
            subtitle={menuCopy.scansSubtitle}
            centered={false}
            compact
          />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAFE_MENU_SCANS.map((image, index) => (
              <a
                key={image}
                href={image}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-lg border border-border bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-soft)]"
              >
                <OptimizedImage
                  src={image}
                  alt={`${menuCopy.scansTitle} ${index + 1}`}
                  width={900}
                  height={1200}
                  aspectRatio="3 / 4"
                  className="object-contain transition duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <article className="rounded-lg border border-border bg-surface p-5 shadow-sm md:p-6 lg:max-w-3xl">
            <h3 className="font-heading text-xl text-text">{menuCopy.phrasesTitle}</h3>
            <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {CAFE_PHRASES.map(([en, vi]) => (
                <div key={en} className="grid gap-1 border-b border-border pb-3">
                  <dt className="text-sm font-semibold text-text">{en}</dt>
                  <dd className="text-sm text-primary">{vi}</dd>
                </div>
              ))}
            </dl>
          </article>
        </div>
      </Section>

      {features ? (
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

        </Section>
      ) : null}

      <Section>
        <PageCta>
          <WhatsAppButton
            messageType="reserve_table"
            label={liveContent.reserveCtaLabel || labels.reserveTable}
            size="lg"
            className="min-h-12 rounded-lg px-10 shadow-sm"
          />
        </PageCta>
      </Section>
    </>
  );
}
