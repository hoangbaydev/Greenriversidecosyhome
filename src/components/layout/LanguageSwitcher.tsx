"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { locales, localizedPath, stripLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const LOCALE_DETAILS = {
  en: { label: "English", flag: "🇬🇧" },
  vi: { label: "Tiếng Việt", flag: "🇻🇳" },
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
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (variant === "pill") {
    return (
      <div
        translate="no"
        className={cn(
          "notranslate flex w-full items-center gap-1 rounded-full border border-border bg-soft/50 p-1 shadow-sm",
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
                "inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-text-muted hover:bg-white hover:text-primary"
              )}
              aria-current={isActive ? "true" : undefined}
              lang={loc}
            >
              <span aria-hidden className="text-base leading-none">
                {itemDetails.flag}
              </span>
              <span>{itemDetails.label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  const details = LOCALE_DETAILS[currentLocale];

  return (
    <div ref={containerRef} translate="no" className={cn("notranslate relative inline-block text-left", className)}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "inline-flex min-h-10 items-center justify-between gap-2 rounded-full border px-3.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow active:translate-y-0",
          inverted
            ? "border-white/20 bg-white/10 text-white hover:bg-white/18"
            : "border-border bg-white/85 text-text hover:border-primary/25 hover:bg-soft"
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span aria-hidden className="text-base leading-none">
          {details.flag}
        </span>
        <span className="language-label font-sans text-sm font-semibold">{details.label}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 opacity-70 transition-transform duration-200",
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
            className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-xl border border-border bg-white p-1.5 text-text shadow-[0_18px_38px_rgba(28,36,18,0.12)]"
          >
            {locales.map((loc) => {
              const itemDetails = LOCALE_DETAILS[loc];
              const isActive = loc === currentLocale;
              return (
                <a
                  key={loc}
                  href={localizedPath(loc, pathWithoutLocale)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors",
                    isActive
                      ? "bg-soft text-primary"
                      : "text-text-muted hover:bg-soft/75 hover:text-primary"
                  )}
                  lang={loc}
                >
                  <span aria-hidden className="text-base leading-none">
                    {itemDetails.flag}
                  </span>
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
