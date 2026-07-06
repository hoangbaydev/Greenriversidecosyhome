"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { getLinhRoles, parseStoryValues } from "@/lib/content/brand";
import { useLocale } from "@/components/providers/I18nProvider";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";
import { SAMPLE_IMAGES } from "@/lib/sample-media";
import type { StoryContent } from "@/types";

export function StoryExperience({ story }: { story: StoryContent }) {
  const locale = useLocale();
  const titles = story.sectionTitles ?? {};
  const roles = getLinhRoles(locale);
  const values = parseStoryValues(story.natureFamilyCommunity, locale) as Array<{ marker: string; title: string; body: string }>;

  const pillars = locale === "vi"
    ? ["Lưu trú", "Ẩm thực", "Khám phá", "Kết nối"]
    : ["Stay", "Eat", "Explore", "Connect"];

  return (
    <>
      {/* Section 1: Intro under Hero */}
      {story.homepagePreviewExcerpt || story.heroSubtitle ? (
        <section className="section-breathe bg-soft !pb-10">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-10">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1c3312]/70 dark:text-[#9fbd70]/70">
              {locale === "vi" ? "GIỚI THIỆU" : "INTRODUCTION"}
            </span>
            <p className="mx-auto mt-6 text-lg md:text-xl font-light leading-relaxed text-[#1c3312] dark:text-[#9fbd70] max-w-2xl italic">
              “{story.homepagePreviewExcerpt || story.heroSubtitle}”
            </p>
          </div>
        </section>
      ) : null}

      {/* Section 2: Meet Linh & Family */}
      <section className="section-breathe bg-white">
        <div className="editorial-split editorial-split--reverse mx-auto max-w-[1140px] items-center gap-12 lg:gap-16 px-5 sm:px-8 lg:px-10">
          {/* Right Column (Left on Desktop): Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={defaultTransition}
            className="editorial-split__content"
          >
            <p className="text-eyebrow text-[#1c3312] dark:text-[#9fbd70] mb-2">
              {locale === "vi" ? "Gặp gỡ Linh & Gia đình" : "Meet Linh & Family"}
            </p>
            <h2 className="font-heading text-3xl font-bold text-text sm:text-4xl">
              {titles.founderStory || (locale === "vi" ? "Gặp gỡ Linh" : "Meet Linh")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted">
              {story.founderStory}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {roles.map((role) => (
                <li 
                  key={role} 
                  className="rounded-full bg-[#1c3312]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#1c3312] dark:bg-[#9fbd70]/15 dark:text-[#9fbd70]"
                >
                  {role}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Left Column (Right on Desktop): Image with overlapping badge */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.08 }}
            className="relative w-full max-w-[540px] mx-auto pb-10 sm:pb-8 lg:pb-0"
          >
            {/* Main Rounded Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] shadow-md sm:max-h-[640px] lg:aspect-auto lg:min-h-[520px]">
              <OptimizedImage
                src={story.heroImage || SAMPLE_IMAGES.homestay}
                alt={locale === "vi" ? "Linh và gia đình" : "Linh and family"}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Overlapping Badge */}
            <div className="absolute -bottom-4 -right-2 w-[220px] rounded-[24px] bg-[#fce5d8] p-5 shadow-lg border border-[#f9cbaf]/40 dark:bg-[#281b12] dark:border-primary/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c3312] text-white dark:bg-[#9fbd70] dark:text-primary">
                <Heart className="h-5 w-5 fill-current" />
              </div>
              <h4 className="mt-3 font-heading text-base font-bold text-[#1c3312] dark:text-primary-dark leading-tight">
                {locale === "vi" ? "Host Linh & Gia đình" : "Meet Host Linh"}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-text-muted">
                {locale === "vi" 
                  ? "Đón tiếp chu đáo bằng cả tấm lòng."
                  : "Welcoming you with warm local hospitality."}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Timeline */}
      {story.timeline?.length ? (
        <section className="section-breathe bg-soft">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
            <h2 className="font-heading text-center text-3xl font-bold text-text sm:text-4xl">
              {titles.timeline || (locale === "vi" ? "Hành trình" : "Our Journey")}
            </h2>
            <div className="relative mt-16 border-l-2 border-[#1c3312]/20 pl-8 space-y-12 max-w-2xl mx-auto">
              {story.timeline.map((event) => (
                <div key={event.year} className="relative group">
                  {/* Glowing bullet point */}
                  <div className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1c3312] shadow-sm transition-all group-hover:scale-110 dark:bg-[#9fbd70]">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <span className="font-sans text-sm font-bold text-[#1c3312] dark:text-[#9fbd70] tracking-wider uppercase">
                    {event.year}
                  </span>
                  <h3 className="font-heading mt-2 text-xl font-bold text-text group-hover:text-[#1c3312] transition-colors dark:group-hover:text-[#9fbd70]">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Section 4: Callout Card (More Than a Hostel) */}
      <section className="section-breathe bg-white">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] bg-soft p-8 md:p-12 shadow-sm border border-[#1c3312]/5 dark:bg-[#152213] dark:border-primary/10">
            <h2 className="font-heading text-2xl font-bold text-[#1c3312] dark:text-[#9fbd70] sm:text-3xl">
              {titles.familyJourney || (locale === "vi" ? "Hơn cả một hostel" : "More Than a Hostel")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-muted max-w-xl mx-auto">
              {story.familyJourney}
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: Philosophy Quote Block */}
      <section className="section-breathe bg-soft !py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1c3312]/70 dark:text-[#9fbd70]/70">
            {titles.philosophy || (locale === "vi" ? "Triết lý" : "Our Philosophy")}
          </span>

          {/* Premium Large Quote Display */}
          <div className="mt-8 relative px-6 py-4">
            <span className="absolute left-0 top-0 text-6xl font-serif text-[#1c3312]/15 dark:text-[#9fbd70]/20 select-none">“</span>
            <p className="font-heading text-2xl md:text-3xl italic font-semibold text-[#1c3312] dark:text-[#9fbd70] leading-snug">
              {locale === "vi" ? "Đến như khách, về như người thân." : "Come as our guest, leave as our family."}
            </p>
            <span className="absolute right-0 bottom-0 text-6xl font-serif text-[#1c3312]/15 dark:text-[#9fbd70]/20 select-none">”</span>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-text-muted">
            {story.philosophy}
          </p>
        </div>
      </section>

      {/* Section 6: Value Cards Grid */}
      <section className="section-breathe bg-white">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-center text-3xl font-bold text-[#1c3312] dark:text-[#9fbd70] sm:text-4xl">
            {titles.natureFamilyCommunity || (locale === "vi" ? "Thiên nhiên · Gia đình · Cộng đồng" : "Nature · Family · Community")}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article 
                key={value.title} 
                className="group rounded-[24px] bg-soft p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-[#152213]"
              >
                {/* Custom circular marker tag */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1c3312]/8 text-[#1c3312] transition-transform duration-300 group-hover:scale-105 dark:bg-[#9fbd70]/15 dark:text-[#9fbd70] font-bold text-sm uppercase">
                  {value.marker ? value.marker.substring(0, 2) : value.title.substring(0, 2)}
                </div>
                <h3 className="font-heading mt-6 text-xl font-bold text-text">
                  {value.title}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-text-muted">
                  {value.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: concluding CTA Banner Card */}
      <section className="section-breathe bg-white !pt-0">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-[32px] bg-[#1c3312] px-8 py-12 md:py-16 text-center text-white shadow-lg dark:bg-[#121e0f]">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-white">
              {titles.lifeAtGreenRiverside || pillars.join(" · ")}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
              {story.lifeAtGreenRiverside || (locale === "vi" 
                ? "Khám phá Phong Nha qua lăng kính bản địa — lưu trú, ẩm thực, trải nghiệm và sẻ chia cùng chúng tôi." 
                : "Explore Phong Nha through local eyes — stay with us, share home-cooked meals, and connect with travellers.")}
            </p>

            {/* Glowing frosted pills list */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {pillars.map((pillar) => (
                <span 
                  key={pillar} 
                  className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold tracking-wider uppercase text-white backdrop-blur-sm border border-white/5"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
