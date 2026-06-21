import {
  Leaf,
  Heart,
  Waves,
  Users,
  Shield,
  MessageCircle,
  Coffee,
  Wifi,
  Map,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { BrandIcon } from "@/lib/content/brand";
import { cn } from "@/lib/utils";

const iconMap: Record<BrandIcon, LucideIcon> = {
  leaf: Leaf,
  heart: Heart,
  waves: Waves,
  users: Users,
  shield: Shield,
  message: MessageCircle,
  coffee: Coffee,
  wifi: Wifi,
  map: Map,
  utensils: Utensils,
};

export function BrandIconBadge({
  icon,
  className,
  size = "md",
}: {
  icon: BrandIcon;
  className?: string;
  size?: "sm" | "md";
}) {
  const Icon = iconMap[icon] || Heart;
  return (
    <span
      className={cn(
        "icon-badge",
        size === "sm" ? "icon-badge--sm" : "icon-badge--md",
        className
      )}
      aria-hidden
    >
      <Icon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
    </span>
  );
}
