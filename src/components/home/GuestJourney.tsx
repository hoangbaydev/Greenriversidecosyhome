"use client";

import Link from "next/link";
import { BedDouble, Map, UsersRound, Utensils } from "lucide-react";
import { MotionItem, MotionStagger } from "@/components/motion";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";

const journey = {
  en: [
    {
      title: "Stay by the river",
      description: "Comfortable rooms, social dorms, and an easy base for cave days.",
      href: "/stay",
      icon: BedDouble,
    },
    {
      title: "Eat & unwind",
      description: "Rooftop cafe, family dinners, sunset drinks, and local flavours.",
      href: "/eat-drink",
      icon: Utensils,
    },
    {
      title: "Explore Phong Nha",
      description: "Classic caves, jungle routes, countryside loops, and tour advice.",
      href: "/explore-phong-nha",
      icon: Map,
    },
    {
      title: "Meet people",
      description: "Weekly activities, shared meals, and a warm traveller community.",
      href: "/social-activities",
      icon: UsersRound,
    },
  ],
  vi: [
    {
      title: "Lưu trú bên sông",
      description: "Phòng riêng, dorm thân thiện và vị trí thuận tiện để đi tour hang động.",
      href: "/stay",
      icon: BedDouble,
    },
    {
      title: "Ăn uống & thư giãn",
      description: "Cafe rooftop, bữa tối gia đình, đồ uống hoàng hôn và hương vị địa phương.",
      href: "/eat-drink",
      icon: Utensils,
    },
    {
      title: "Khám phá Phong Nha",
      description: "Hang động, rừng núi, cung đường làng quê và tư vấn tour phù hợp.",
      href: "/explore-phong-nha",
      icon: Map,
    },
    {
      title: "Kết nối bạn mới",
      description: "Hoạt động hằng tuần, bữa ăn chung và cộng đồng du khách ấm áp.",
      href: "/social-activities",
      icon: UsersRound,
    },
  ],
} as const;

export function GuestJourney() {
  const locale = useLocale();
  const items = journey[locale];

  return (
    <section className="guest-journey relative z-10 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionStagger fast className="-mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <MotionItem key={item.href}>
                <Link
                  href={localizedPath(locale, item.href)}
                  className="guest-journey-card group block h-full rounded-lg border border-border bg-white p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span className="icon-badge icon-badge--md">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-heading text-[1.1rem] font-bold leading-snug text-text">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex font-heading text-[13px] font-bold uppercase tracking-[0.04em] text-primary transition-colors group-hover:text-primary-dark">
                    {locale === "vi" ? "Xem thêm" : "View more"}
                  </span>
                </Link>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
