"use client";

import Link from "next/link";
import {
  Bus,
  CreditCard,
  HeartPulse,
  MapPinned,
  PackageCheck,
  Smartphone,
} from "lucide-react";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionLink } from "@/components/ui/section-link";
import { MotionItem, MotionStagger } from "@/components/motion";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";

const copy = {
  en: {
    eyebrow: "Useful Info",
    title: "Travel Essentials",
    subtitle: "Quick answers for transport, money, health, packing, and local travel tips before arriving in Phong Nha.",
    viewAll: "View Useful Information",
    items: [
      { title: "Transportation", description: "Getting here, buses, trains, flights, and transfers.", href: "/transportation", icon: Bus },
      { title: "Food & Cafes", description: "Where to eat, drink, work, and watch the sunset.", href: "/useful-info", icon: MapPinned },
      { title: "Money & ATM", description: "Cash, cards, ATM tips, and payment notes.", href: "/useful-info", icon: CreditCard },
      { title: "SIM Card", description: "Mobile data, eSIM, and rural coverage tips.", href: "/useful-info", icon: Smartphone },
      { title: "Health", description: "Pharmacy, clinic, and what to do if you feel unwell.", href: "/useful-info", icon: HeartPulse },
      { title: "What to Pack", description: "Simple essentials for caves, bikes, river days, and rain.", href: "/useful-info", icon: PackageCheck },
    ],
  },
  vi: {
    eyebrow: "Thông tin hữu ích",
    title: "Cẩm nang cần biết",
    subtitle: "Thông tin ngắn gọn về di chuyển, tiền tệ, sức khỏe, hành lý và mẹo trước khi tới Phong Nha.",
    viewAll: "Xem thông tin hữu ích",
    items: [
      { title: "Di chuyển", description: "Xe khách, tàu, máy bay và đưa đón đến Phong Nha.", href: "/transportation", icon: Bus },
      { title: "Ăn uống & cafe", description: "Gợi ý ăn uống, cafe, làm việc và ngắm hoàng hôn.", href: "/useful-info", icon: MapPinned },
      { title: "Tiền & ATM", description: "Tiền mặt, thẻ, ATM và lưu ý thanh toán.", href: "/useful-info", icon: CreditCard },
      { title: "SIM Card", description: "Dữ liệu di động, eSIM và sóng ở vùng nông thôn.", href: "/useful-info", icon: Smartphone },
      { title: "Sức khỏe", description: "Nhà thuốc, phòng khám và hỗ trợ khi cần.", href: "/useful-info", icon: HeartPulse },
      { title: "Nên mang gì", description: "Đồ cần thiết cho hang động, xe đạp, sông và mưa.", href: "/useful-info", icon: PackageCheck },
    ],
  },
} as const;

export function UsefulInfoPreview() {
  const locale = useLocale();
  const t = locale === "vi" ? copy.vi : copy.en;

  return (
    <HomeSection id="useful-info" background="soft" divider className="!pt-8 md:!pt-12">
      {/* Centered Header Layout */}
      <SectionHeader
        eyebrow={t.eyebrow}
        title={t.title}
        subtitle={t.subtitle}
      />

      <MotionStagger fast className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {t.items.map((item) => {
          const Icon = item.icon;
          return (
            <MotionItem key={item.title}>
              <Link
                href={localizedPath(locale, item.href)}
                className="group flex gap-5 rounded-[24px] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-[#152213]"
              >
                {/* Custom circular icon wrap */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary transition-all duration-300 group-hover:scale-105 dark:bg-primary/20 dark:text-primary-dark">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                
                <div className="flex flex-col justify-center">
                  <span className="block font-heading text-base font-bold leading-snug text-text group-hover:text-primary transition-colors dark:group-hover:text-primary-dark">
                    {item.title}
                  </span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-text-muted">
                    {item.description}
                  </span>
                </div>
              </Link>
            </MotionItem>
          );
        })}
      </MotionStagger>

      {/* Centered View All CTA Link */}
      {t.viewAll ? (
        <div className="mt-12 text-center">
          <SectionLink href={localizedPath(locale, "/useful-info")}>
            {t.viewAll}
          </SectionLink>
        </div>
      ) : null}
    </HomeSection>
  );
}
