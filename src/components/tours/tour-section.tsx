"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { MotionReveal } from "@/components/motion";

export function TourSection({
  id,
  background = "white",
  className,
  children,
}: {
  id?: string;
  background?: "white" | "soft";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "tour-section",
        background === "soft" ? "bg-soft" : "bg-white",
        className
      )}
    >
      <Container size="content">{children}</Container>
    </section>
  );
}

export function TourSectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}) {
  return (
    <MotionReveal
      as="header"
      className={cn("mb-8 md:mb-10", centered && "text-center", className)}
    >
      <h2 className="text-h2 text-text">{title}</h2>
      {subtitle ? (
        <p className={cn("mt-3 max-w-2xl text-base text-text-muted", centered && "mx-auto")}>
          {subtitle}
        </p>
      ) : null}
    </MotionReveal>
  );
}
