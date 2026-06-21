import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}
