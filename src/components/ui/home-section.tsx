import * as React from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerSize } from "@/components/ui/container";

type HomeSectionBg = "white" | "soft" | "primary" | "dark";

const bgMap: Record<HomeSectionBg, string> = {
  white: "home-section--white",
  soft: "home-section--soft",
  primary: "bg-primary text-white",
  dark: "bg-[#121212] text-white",
};

export function HomeSection({
  id,
  background = "white",
  container = "content",
  divider = false,
  className,
  children,
}: {
  id?: string;
  background?: HomeSectionBg;
  container?: ContainerSize;
  divider?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "home-section section-breathe",
        bgMap[background],
        divider && "home-section--divider",
        className
      )}
    >
      <Container size={container}>{children}</Container>
    </section>
  );
}
