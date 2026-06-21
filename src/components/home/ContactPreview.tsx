"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import type { HomepageSectionHeading } from "@/types";
import { useLocale } from "@/components/providers/I18nProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionActions } from "@/components/ui/section-actions";
import { MotionReveal } from "@/components/motion";

interface ContactPreviewProps {
  heading?: HomepageSectionHeading;
  ctaLabel?: string;
  contactLinkLabel?: string;
  viewOnMapLabel?: string;
}

export function ContactPreview({
  heading,
  ctaLabel,
  contactLinkLabel,
  viewOnMapLabel,
}: ContactPreviewProps) {
  const locale = useLocale();
  const { settings, contact } = useSiteData();

  const phone = contact?.phone || settings?.phone;
  const email = contact?.email || settings?.email;
  const address = contact?.address || settings?.address;
  const mapsEmbed = contact?.googleMapsEmbed;
  const mapsUrl = contact?.googleMapsUrl || settings?.googleMapsUrl;

  if (!heading?.title && !phone && !email && !address) return null;

  return (
    <HomeSection id="contact" background="white" divider>
      {heading?.title ? (
        <SectionHeader eyebrow="Plan Your Stay" title={heading.title} subtitle={heading.subtitle} />
      ) : null}

      <div className="editorial-split">
        <MotionReveal variant="fadeLeft" className="editorial-split__content space-y-8">
          <ul className="space-y-5">
            {address ? (
              <li className="flex items-start gap-4 text-text-muted">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="text-body-lg">{address}</span>
              </li>
            ) : null}
            {phone ? (
              <li className="flex items-center gap-4 text-text-muted">
                <Phone className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-body-lg hover:text-primary">
                  {phone}
                </a>
              </li>
            ) : null}
            {email ? (
              <li className="flex items-center gap-4 text-text-muted">
                <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <a href={`mailto:${email}`} className="text-body-lg hover:text-primary">
                  {email}
                </a>
              </li>
            ) : null}
          </ul>
          <SectionActions
            primaryLabel={ctaLabel}
            primaryMessageType="general"
            secondaryLabel={contactLinkLabel}
            secondaryHref={contactLinkLabel ? localizedPath(locale, "/contact") : undefined}
            className="mt-0 justify-start sm:justify-start"
          />
        </MotionReveal>

        {mapsEmbed || mapsUrl ? (
          <MotionReveal variant="fadeRight" delay={0.08} className="editorial-split__media overflow-hidden rounded-[var(--radius-card)] border border-border bg-white shadow-[var(--shadow-soft)]">
            {mapsEmbed ? (
              <iframe
                src={mapsEmbed}
                title={heading?.title || "Map"}
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full md:h-[420px]"
              />
            ) : mapsUrl && viewOnMapLabel ? (
              <div className="flex h-[360px] items-center justify-center md:h-[420px]">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {viewOnMapLabel}
                </a>
              </div>
            ) : null}
          </MotionReveal>
        ) : null}
      </div>
    </HomeSection>
  );
}
