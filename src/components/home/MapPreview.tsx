"use client";

import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { useDictionary } from "@/components/providers/I18nProvider";
import { MapPin } from "lucide-react";

interface MapPreviewProps {
  embedUrl?: string;
  mapsUrl?: string;
}

export function MapPreview({ embedUrl, mapsUrl }: MapPreviewProps) {
  const dict = useDictionary();

  if (!embedUrl && !mapsUrl) return null;

  return (
    <section className="py-16 md:py-24" aria-labelledby="map-heading">
      <Container>
        <SectionHeader title={dict.home.map.title} subtitle={dict.home.map.subtitle} />
        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={dict.home.map.title}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full md:h-[420px]"
            />
          ) : (
            <div className="flex h-64 items-center justify-center bg-soft text-text-muted">
              <MapPin className="mr-2 h-5 w-5" aria-hidden />
              Map preview
            </div>
          )}
        </div>
        {mapsUrl && (
          <div className="mt-6 text-center">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 font-heading text-[15px] font-bold uppercase tracking-[0.04em] text-white transition-colors hover:bg-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {dict.home.map.getDirections}
            </a>
          </div>
        )}
      </Container>
    </section>
  );
}
