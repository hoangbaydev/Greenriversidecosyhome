"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, defaultTransition, viewportOnce } from "@/lib/motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
  light?: boolean;
  accent?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  centered = true,
  light = false,
  accent = false,
  className,
}: SectionHeaderProps) {
  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
      transition={defaultTransition}
      className={cn("mb-8 md:mb-10", centered && "text-center", className)}
    >
      {eyebrow ? (
        <p className={cn("text-eyebrow mb-2.5", light ? "text-white/80" : undefined)}>{eyebrow}</p>
      ) : null}
      <h2 className={cn("text-h2", light ? "text-white" : "text-text")}>{title}</h2>
      {accent ? (
        <div className={cn("section-title-accent mt-3", centered && "mx-auto")} aria-hidden />
      ) : null}
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-[1.65] text-text-muted",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </motion.header>
  );
}
