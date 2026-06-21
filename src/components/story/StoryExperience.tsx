"use client";

import { motion } from "framer-motion";
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
  const values = parseStoryValues(story.natureFamilyCommunity, locale);

  const pillars = ["Stay", "Eat", "Explore", "Connect"];

  return (
    <>
      {(story.homepagePreviewExcerpt || story.heroSubtitle) ? (
        <section className="section-breathe bg-soft">
          <div className="mx-auto max-w-3xl px-5 text-center sm:px-8 lg:px-10">
            <p className="text-eyebrow">{story.heroTitle || (locale === "vi" ? "Câu chuyện" : "Our Story")}</p>
            <h2 className="font-heading mt-2 text-h1 text-text">
              {story.heroSubtitle || (locale === "vi" ? "Gặp gỡ gia đình Green Riverside" : "Meet the Family Behind Green Riverside")}
            </h2>
            {story.homepagePreviewExcerpt ? (
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-muted">
                {story.homepagePreviewExcerpt}
              </p>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="section-breathe bg-white">
        <div className="editorial-split editorial-split--reverse mx-auto max-w-[1140px] px-5 sm:px-8 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={defaultTransition}
            className="editorial-split__content"
          >
            <p className="text-eyebrow">{locale === "vi" ? "Gặp gỡ Linh" : "Meet Linh & Family"}</p>
            <h2 className="font-heading mt-3 text-h1 text-text">
              {titles.founderStory || (locale === "vi" ? "Gặp gỡ Linh" : "Meet Linh")}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-text-muted">{story.founderStory}</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {roles.map((role) => (
                <li key={role} className="stat-pill">
                  {role}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.08 }}
            className="editorial-split__media relative aspect-[4/5] min-h-[420px] overflow-hidden rounded-[var(--radius-card)]"
          >
            <OptimizedImage
              src={story.heroImage || SAMPLE_IMAGES.homestay}
              alt="Linh and family"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {story.timeline?.length ? (
        <section className="section-breathe bg-soft">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
            <h2 className="font-heading text-center text-h2 text-text">
              {titles.timeline || (locale === "vi" ? "Hành trình" : "Our Journey")}
            </h2>
            <div className="relative mt-12 border-l-2 border-primary/20 pl-8">
              {story.timeline.map((event) => (
                <div key={event.year} className="relative mb-10 last:mb-0">
                  <div className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <span className="text-sm font-semibold text-primary">{event.year}</span>
                  <h3 className="font-heading mt-1 text-lg text-text">{event.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-breathe bg-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-h2 text-text">
            {titles.familyJourney || (locale === "vi" ? "Hơn cả một hostel" : "More Than a Hostel")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-muted">{story.familyJourney}</p>
        </div>
      </section>

      <section className="section-breathe bg-soft">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-heading text-h2 text-text">
            {titles.philosophy || (locale === "vi" ? "Triết lý" : "Our Philosophy")}
          </h2>
          <div className="quote-block mt-10">
            <p>Come as our guest, leave as our family.</p>
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-text-muted">{story.philosophy}</p>
        </div>
      </section>

      <section className="section-breathe bg-white">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-8 lg:px-10">
          <h2 className="font-heading text-center text-h2 text-text">
            {titles.natureFamilyCommunity || "Nature · Family · Community"}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <article key={v.title} className="experience-card p-8 text-center">
                {v.emoji ? (
                  <span className="text-3xl" aria-hidden>
                    {v.emoji}
                  </span>
                ) : null}
                <h3 className="font-heading mt-4 text-h4 text-text">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-breathe bg-white">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-heading text-h2 text-text">
            {titles.lifeAtGreenRiverside || "Stay · Eat · Explore · Connect"}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-muted">
            {story.lifeAtGreenRiverside || story.familyJourney}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {pillars.map((p) => (
              <span key={p} className="stat-pill">
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
