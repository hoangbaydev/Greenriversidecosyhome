import { cn } from "@/lib/utils";

export type ContainerSize = "small" | "content" | "large" | "hero" | "narrow";

const sizes: Record<ContainerSize, string> = {
  small: "max-w-[960px]",
  content: "max-w-[72rem]",
  large: "max-w-[80rem]",
  hero: "max-w-[80rem]",
  narrow: "max-w-[720px]",
};

/** @deprecated use ContainerSize */
export type LegacyContainerSize = "default" | "narrow" | "wide";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize | LegacyContainerSize;
}

const legacyMap: Record<LegacyContainerSize, ContainerSize> = {
  default: "content",
  narrow: "narrow",
  wide: "large",
};

export function Container({
  className,
  size = "content",
  ...props
}: ContainerProps) {
  const resolved =
    size === "default" || size === "wide"
      ? legacyMap[size]
      : (size as ContainerSize);

  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        sizes[resolved],
        className
      )}
      {...props}
    />
  );
}
