"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem } from "@/types";
import Link from "next/link";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { fastTransition } from "@/lib/motion";
import { MotionStagger, MotionItem } from "@/components/motion";

const aspectPatterns = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[5/4]"];

export function GalleryPreview({
  items,
  title,
  subtitle,
  viewAllLabel,
}: {
  items: GalleryItem[];
  title?: string;
  subtitle?: string;
  viewAllLabel?: string;
}) {
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const locale = useLocale();
  const dict = useDictionary();

  if (!items.length) return null;

  return (
    <HomeSection id="gallery" background="white" divider>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        {title ? (
          <SectionHeader
            eyebrow="Gallery"
            title={title}
            subtitle={subtitle}
            centered={false}
            className="mb-0"
          />
        ) : null}
        {viewAllLabel ? (
          <Link
            href={localizedPath(locale, "/gallery")}
            className="shrink-0 text-sm font-semibold text-primary hover:text-primary-dark"
          >
            {viewAllLabel} →
          </Link>
        ) : null}
      </div>

      <MotionStagger fast className="masonry-gallery mt-12">
        {items.map((item, index) => (
          <MotionItem key={item.id}>
          <button
            type="button"
            onClick={() => setSelected(item)}
            className="masonry-gallery__item group block w-full overflow-hidden rounded-[var(--radius-card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={item.title}
          >
            <div className={`relative w-full overflow-hidden ${aspectPatterns[index % aspectPatterns.length]}`}>
              <OptimizedImage
                src={item.imageUrl}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="img-hover"
              />
            </div>
          </button>
          </MotionItem>
        ))}
      </MotionStagger>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fastTransition}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal
            aria-label={selected.title}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label={dict.nav.closeMenu}
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={fastTransition}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-5xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="max-h-[85vh] rounded-[var(--radius-card)] object-contain"
              />
              <p className="mt-4 text-center text-sm text-white/90">{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </HomeSection>
  );
}
