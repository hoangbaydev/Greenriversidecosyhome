"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { MotionReveal } from "@/components/motion";
import type { WhatsAppMessageType } from "@/lib/whatsapp";

export function SectionActions({
  primaryLabel,
  primaryMessageType = "general",
  secondaryLabel,
  secondaryHref,
  className,
}: {
  primaryLabel?: string;
  primaryMessageType?: WhatsAppMessageType;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}) {
  if (!primaryLabel && !secondaryLabel) return null;

  return (
    <MotionReveal delay={0.08}>
    <div
      className={cn(
        "mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4",
        className
      )}
    >
      {primaryLabel ? (
        <WhatsAppButton
          messageType={primaryMessageType}
          label={primaryLabel}
          size="lg"
          className="min-h-12 px-8"
        />
      ) : null}
      {secondaryLabel && secondaryHref ? (
        <Link
          href={secondaryHref}
          className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary/25 bg-white px-8 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-soft hover:shadow-md"
        >
          {secondaryLabel}
        </Link>
      ) : null}
    </div>
    </MotionReveal>
  );
}
