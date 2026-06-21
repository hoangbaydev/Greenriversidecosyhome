"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale, localizedPath, stripLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  className,
  inverted = false,
  variant = "pill",
}: {
  className?: string;
  inverted?: boolean;
  variant?: "pill" | "minimal";
}) {
  const pathname = usePathname();
  const currentLocale = (pathname.split("/")[1] as Locale) || "en";
  const pathWithoutLocale = stripLocale(pathname);

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-1 text-xs font-semibold uppercase", className)} role="group" aria-label="Language">
        {locales.map((loc, index) => {
          const isActive = loc === currentLocale;
          return (
            <span key={loc} className="flex items-center gap-1">
              {index > 0 ? <span className="select-none text-border">/</span> : null}
              <Link
                href={localizedPath(loc, pathWithoutLocale)}
                className={cn(
                  "inline-flex h-8 min-w-8 items-center justify-center rounded-md transition-colors",
                  isActive
                    ? inverted
                      ? "text-white"
                      : "font-bold text-primary"
                    : inverted
                      ? "text-white/60 hover:text-white"
                      : "text-text-muted hover:text-primary"
                )}
                aria-current={isActive ? "true" : undefined}
                lang={loc}
              >
                {loc}
              </Link>
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-0.5 rounded-lg border border-border bg-soft/50 p-1", className)}
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const isActive = loc === currentLocale;
        return (
          <Link
            key={loc}
            href={localizedPath(loc, pathWithoutLocale)}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold uppercase transition-colors",
              isActive
                ? "bg-primary text-white"
                : "text-text-muted hover:bg-white hover:text-primary"
            )}
            aria-current={isActive ? "true" : undefined}
            lang={loc}
          >
            {loc}
          </Link>
        );
      })}
    </div>
  );
}
