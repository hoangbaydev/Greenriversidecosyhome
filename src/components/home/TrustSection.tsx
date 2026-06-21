"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { useDictionary } from "@/components/providers/I18nProvider";
import { fadeUp, staggerContainer, defaultTransition, viewportOnce } from "@/lib/motion";

const stats = [
  { key: "years" as const, value: "10+" },
  { key: "guests" as const, value: "5,000+" },
  { key: "countries" as const, value: "50+" },
  { key: "rating" as const, value: "4.9" },
];

export function TrustSection() {
  const dict = useDictionary();
  const t = dict.home.trust;

  return (
    <section className="border-y border-border/60 bg-white py-16 md:py-24" aria-labelledby="trust-heading">
      <Container>
        <SectionHeader title={t.title} subtitle={t.subtitle} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
        >
          {stats.map(({ key, value }) => (
            <motion.div
              key={key}
              variants={fadeUp}
              transition={defaultTransition}
              className="text-center"
            >
              <p className="font-heading text-4xl font-semibold text-primary md:text-5xl tracking-tight">
                {value}
              </p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-text-muted">
                {t[key]}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
