"use client";

import { motion } from "framer-motion";
import { useLocale, useDictionary } from "@/components/providers/I18nProvider";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";
import { getWhyStayItems } from "@/lib/content/brand";
import { BrandIconBadge } from "@/components/shared/BrandIconBadge";

export function WhyChooseSection() {
  const locale = useLocale();
  const items = getWhyStayItems(locale);
  const dict = useDictionary();

  return (
    <section id="why-stay" className="home-section section-breathe home-section--soft home-section--divider">
      <div className="mx-auto w-full px-5 sm:px-8 lg:px-10 max-w-[72rem]">
        {/* Header Block */}
        <header className="mb-10 text-center md:mb-12">
          <p className="text-eyebrow text-[#1c3312] dark:text-[#9fbd70] mb-2.5 uppercase tracking-[0.15em] font-bold">
            {locale === "vi" ? "Vì sao chọn chúng tôi" : "Why Guests Love Us"}
          </p>
          <h2 className="font-heading text-3xl font-black text-text sm:text-4xl">
            {dict.home.whyStay.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-text-muted">
            {dict.home.whyStay.subtitle}
          </p>
        </header>

        {/* Balanced 4-Column Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.article
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...defaultTransition, delay: i * 0.05 }}
              className="group p-6 md:p-7 flex flex-col rounded-[24px] bg-white border border-primary/5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-[#152213] dark:border-white/5"
            >
              {/* Circular Theme Icon Badge */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1c3312]/8 text-[#1c3312] transition-transform duration-300 group-hover:scale-105 dark:bg-[#9fbd70]/15 dark:text-[#9fbd70]">
                <BrandIconBadge
                  icon={item.icon}
                  className="!bg-transparent !border-none !shadow-none !p-0 !w-6 !h-6 !rounded-none text-current"
                />
              </div>

              {/* Title & Description */}
              <h3 className="font-heading mt-5 text-lg font-bold leading-tight text-text dark:text-[#f4f7ef]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted dark:text-[#c4cdbc]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
