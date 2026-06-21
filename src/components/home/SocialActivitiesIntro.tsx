"use client";

import { getSocialActivitiesIntro } from "@/lib/content/brand";
import { useLocale } from "@/components/providers/I18nProvider";
import { Container } from "@/components/ui/container";

export function SocialActivitiesIntro() {
  const locale = useLocale();
  const { lead, paragraphs } = getSocialActivitiesIntro(locale);

  return (
    <section className="section-breathe bg-soft">
      <Container size="narrow">
        <p className="text-center text-eyebrow">{lead}</p>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-text-muted">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
