"use client";

import { getWhyStayItems } from "@/lib/content/brand";
import type { Locale } from "@/lib/i18n/config";
import { BrandIconBadge } from "@/components/shared/BrandIconBadge";
import { Section, SectionHeader } from "@/components/ui/section";
import { MotionStagger, MotionItem } from "@/components/motion";

export function StayWhySection({
  locale,
  title,
  subtitle,
}: {
  locale: Locale;
  title: string;
  subtitle?: string;
}) {
  const items = getWhyStayItems(locale);

  return (
    <Section background="soft">
      <SectionHeader
        eyebrow={locale === "vi" ? "Lợi ích" : "Included"}
        title={title}
        subtitle={subtitle}
      />
      <MotionStagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <MotionItem key={item.title}>
            <article className="experience-card h-full p-6">
              <BrandIconBadge icon={item.icon} />
              <h3 className="font-heading mt-4 text-base leading-snug text-text">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
            </article>
          </MotionItem>
        ))}
      </MotionStagger>
    </Section>
  );
}
