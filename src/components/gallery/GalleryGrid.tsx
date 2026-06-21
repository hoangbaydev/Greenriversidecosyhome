"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { GalleryItem, GalleryCategory } from "@/types";

const CATEGORY_KEYS: (GalleryCategory | "all")[] = [
  "all",
  "rooms",
  "cafe",
  "food",
  "activities",
  "tours",
  "nature",
  "sunset",
  "community",
];

const ITEMS_PER_PAGE = 12;

export function GalleryGrid({
  items,
  loadMoreLabel,
  categoryLabels,
}: {
  items: GalleryItem[];
  loadMoreLabel?: string;
  categoryLabels?: Record<string, string>;
}) {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filtered = useMemo(() => {
    if (category === "all") return items;
    return items.filter((i) => i.category === category);
  }, [items, category]);

  const visible = filtered.slice(0, visibleCount);

  const labelFor = (cat: GalleryCategory | "all") =>
    categoryLabels?.[cat] || (cat === "all" ? "All" : cat);

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {CATEGORY_KEYS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setCategory(cat);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            className={`filter-chip ${
              category === cat ? "filter-chip--active" : "filter-chip--idle"
            }`}
          >
            {labelFor(cat)}
          </button>
        ))}
      </div>

      <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
        {visible.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.03 }}
            onClick={() => setSelected(item)}
            className="mb-4 block w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={item.title}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="img-hover w-full object-cover"
              loading="lazy"
            />
          </motion.button>
        ))}
      </div>

      {visibleCount < filtered.length && loadMoreLabel ? (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
            className="min-h-11 rounded-full bg-primary px-8 text-sm font-medium text-white hover:bg-primary/90"
          >
            {loadMoreLabel}
          </button>
        </div>
      ) : null}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelected(null)}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selected.imageUrl}
                alt={selected.title}
                className="max-h-[85vh] max-w-full rounded-lg object-contain"
              />
              <p className="mt-3 text-center text-white">{selected.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
