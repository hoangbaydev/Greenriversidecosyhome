"use client";

import type * as React from "react";
import { cn } from "@/lib/utils";
import { MotionMount, MotionReveal } from "@/components/motion";
import {
  DEFAULT_BANNER_IMAGE,
  DEFAULT_BANNER_IMAGE_MOBILE,
  DEFAULT_BANNER_IMAGE_TABLET,
} from "@/lib/constants";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
  background?: "white" | "soft" | "primary" | "dark";
  narrow?: boolean;
}

const backgroundStyles = {
  white: "bg-white",
  soft: "bg-[#f8faf3]",
  primary: "bg-primary text-white",
  dark: "bg-text text-white",
};

export function Section({
  className,
  container = true,
  narrow = false,
  background = "white",
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("section-breathe", backgroundStyles[background], className)} {...props}>
      {container ? (
        <div
          className={cn(
            "mx-auto px-5 sm:px-8 lg:px-10",
            narrow ? "max-w-3xl" : "max-w-6xl"
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  centered = true,
  light = false,
  compact = false,
  showAccent = false,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  light?: boolean;
  compact?: boolean;
  showAccent?: boolean;
  className?: string;
}) {
  return (
    <MotionReveal
      as="header"
      className={cn(
        compact ? "mb-5" : "mb-9 md:mb-12",
        centered && "text-center",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("text-eyebrow mb-3", light ? "text-white/80" : undefined)}>{eyebrow}</p>
      ) : null}
      <h2 className={cn("text-h2", light ? "text-white" : "text-text")}>{title}</h2>
      {showAccent ? (
        <div className={cn("section-title-accent mt-3", centered && "mx-auto")} aria-hidden />
      ) : null}
      {subtitle ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-[1.75] text-text-muted md:text-[1.08rem]",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </MotionReveal>
  );
}

export function PageIntro({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <MotionReveal delay={0.06} className={cn("mb-10 md:mb-12", className)}>
      <p className="mx-auto max-w-2xl text-center text-base leading-[1.75] text-text-muted md:text-[1.08rem]">
        {children}
      </p>
    </MotionReveal>
  );
}

export function PageCta({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <MotionReveal delay={0.08} className={cn("mt-12 text-center", className)}>
      {children}
    </MotionReveal>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  image?: string;
  eyebrow?: string;
}) {
  return (
    <div className="relative flex min-h-[38vh] items-center justify-center overflow-hidden bg-primary sm:min-h-[44vh]">
      <picture className="absolute inset-0">
        <source media="(max-width: 640px)" srcSet={DEFAULT_BANNER_IMAGE_MOBILE} />
        <source media="(max-width: 1280px)" srcSet={DEFAULT_BANNER_IMAGE_TABLET} />
        <img
          src={DEFAULT_BANNER_IMAGE}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={(event) => {
            const target = event.currentTarget;
            if (target.dataset.fallbackApplied) return;
            target.dataset.fallbackApplied = "true";
            target.src = DEFAULT_BANNER_IMAGE;
          }}
        />
      </picture>
      <div className="page-hero-overlay absolute inset-0" />
      <MotionMount className="page-hero-content relative z-10 mx-auto max-w-3xl px-5 py-16 text-center sm:px-8 sm:py-20">
        {eyebrow ? <p className="text-eyebrow text-white/85">{eyebrow}</p> : null}
        <h1 className={cn("font-heading text-h1 text-white", eyebrow && "mt-2")}>{title}</h1>
        {subtitle ? (
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.7] text-white/90 md:text-[1.08rem]">{subtitle}</p>
        ) : null}
      </MotionMount>
    </div>
  );
}
