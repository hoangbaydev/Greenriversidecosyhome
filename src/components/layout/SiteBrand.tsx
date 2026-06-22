"use client";

import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

const DEFAULT_LOGO = "/logo.png?v=2";

const LOGO_SIZES = {
  nav: "h-[3.25rem] w-[3.25rem] shrink-0 sm:h-14 sm:w-14",
  navWithText: "h-12 w-12 shrink-0 sm:h-[3.25rem] sm:w-[3.25rem]",
  footer: "h-14 w-14 shrink-0 sm:h-16 sm:w-16",
  compact: "h-9 w-9 shrink-0 sm:h-10 sm:w-10",
} as const;

function splitBrandName(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length <= 2) {
    return { title: name, subtitle: null as string | null };
  }
  return {
    title: parts.slice(0, -2).join(" "),
    subtitle: parts.slice(-2).join(" "),
  };
}

export function SiteBrand({
  siteName,
  tagline,
  logoUrl,
  locale,
  showName = true,
  size = "nav",
  className,
  nameClassName,
  subtitleClassName,
}: {
  siteName: string;
  tagline?: string | null;
  logoUrl?: string | null;
  locale: Locale;
  showName?: boolean;
  size?: keyof typeof LOGO_SIZES;
  className?: string;
  nameClassName?: string;
  subtitleClassName?: string;
}) {
  const base = logoUrl?.trim() || DEFAULT_LOGO;
  const src = base.includes("?") ? base : `${base}?v=2`;
  const { title, subtitle } = splitBrandName(siteName);
  const secondLine = subtitle || (size === "footer" ? tagline?.trim() : null);

  const logoClass = showName
    ? size === "footer"
      ? LOGO_SIZES.footer
      : LOGO_SIZES.navWithText
    : LOGO_SIZES[size === "nav" ? "nav" : size];

  return (
    <Link
      href={localizedPath(locale, "/")}
      className={cn("flex min-w-0 items-center gap-2 bg-transparent sm:gap-2.5", className)}
      aria-label={siteName}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className={cn(
          "block bg-transparent object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)]",
          logoClass
        )}
        decoding="async"
      />
      {showName ? (
        <span className="min-w-0 leading-tight">
          <span
            className={cn(
              "block truncate font-heading text-base sm:text-lg lg:text-xl font-bold text-primary-dark tracking-normal",
              nameClassName
            )}
          >
            {title}
          </span>
          {secondLine ? (
            <span
              className={cn(
                "mt-1.5 block truncate text-[13px] sm:text-sm font-medium text-text-muted/65 tracking-normal",
                subtitleClassName
              )}
            >
              {secondLine}
            </span>
          ) : null}
        </span>
      ) : null}
    </Link>
  );
}
