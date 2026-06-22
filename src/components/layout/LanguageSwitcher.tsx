"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { locales, type Locale, localizedPath, stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const LOCALE_DETAILS = {
  en: { label: "English" },
  vi: { label: "Tiếng Việt" },
} as const;

export function LanguageSwitcher({
  className,
  inverted = false,
  variant = "dropdown",
}: {
  className?: string;
  inverted?: boolean;
  variant?: "dropdown" | "pill";
}) {
  const pathname = usePathname();
  const currentLocale = (pathname.split("/")[1] as Locale) || "en";
  const pathWithoutLocale = stripLocale(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (variant === "pill") {
    return (
      <div
        className={cn(
          "flex items-center gap-1 rounded-full border border-border bg-soft/50 p-1 w-full",
          className
        )}
        role="group"
        aria-label="Language"
      >
        {locales.map((loc) => {
          const itemDetails = LOCALE_DETAILS[loc];
          const isActive = loc === currentLocale;
          return (
            <a
              key={loc}
              href={localizedPath(loc, pathWithoutLocale)}
              className={cn(
                "flex-1 inline-flex h-9 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold uppercase transition-all duration-300",
                isActive
                  ? "bg-primary text-white shadow-sm font-bold"
                  : "text-text-muted hover:bg-white hover:text-primary"
              )}
              aria-current={isActive ? "true" : undefined}
              lang={loc}
            >
              <span>{itemDetails.label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  const details = LOCALE_DETAILS[currentLocale];

  return (
    <div ref={containerRef} className={cn("relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex h-9 items-center justify-between gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow active:scale-95",
          inverted
            ? "border-white/20 bg-white/10 text-white hover:bg-white/25"
            : "border-border bg-white/50 text-text hover:bg-soft"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="font-sans text-sm font-medium">{details.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-1.5 w-40 origin-top-right rounded-xl border border-border bg-white p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
          >
            {locales.map((loc) => {
              const itemDetails = LOCALE_DETAILS[loc];
              const isActive = loc === currentLocale;
              return (
                <a
                  key={loc}
                  href={localizedPath(loc, pathWithoutLocale)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors",
                    isActive
                      ? "bg-soft text-primary font-semibold"
                      : "text-text-muted hover:bg-soft/75 hover:text-primary"
                  )}
                  lang={loc}
                >
                  <span>{itemDetails.label}</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
