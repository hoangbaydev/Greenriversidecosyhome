import {
  Leaf,
  Mountain,
  Ship,
  Utensils,
  Bus,
  MapPin,
  Users,
  Shield,
  Camera,
  Sparkles,
  Home,
  Clock,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  mountain: Mountain,
  ship: Ship,
  utensils: Utensils,
  bus: Bus,
  "map-pin": MapPin,
  users: Users,
  shield: Shield,
  camera: Camera,
  sparkles: Sparkles,
  home: Home,
  clock: Clock,
};

export function TourIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] || Sparkles;
  return <Icon className={className} aria-hidden />;
}
