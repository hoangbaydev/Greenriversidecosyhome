"use client";

import Link from "next/link";
import { Snowflake, Wifi, Users, ShowerHead, Tv, Refrigerator, Trees, type LucideIcon } from "lucide-react";
import type { Room } from "@/types";
import { getRoomTitle } from "@/types";
import { cn } from "@/lib/utils";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { ListingGrid } from "@/components/motion";
import { EmptyState } from "@/components/ui/empty-state";
import { buttonVariants } from "@/components/ui/button";

function getRoomDisplayImages(room: Room): string[] {
  const metadataImages = room.roomImages
    ?.filter((image) => image.imageUrl)
    .sort((a, b) => {
      if (a.isCover && !b.isCover) return -1;
      if (!a.isCover && b.isCover) return 1;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    })
    .map((image) => image.imageUrl);

  return room.images?.length ? room.images : metadataImages ?? [];
}

function isDormRoom(room: Room): boolean {
  return room.category?.toLowerCase().includes("dorm") || room.title?.toLowerCase().includes("dorm");
}

function PremiumRoomCard({
  room,
}: {
  room: Room;
  priceFromLabel?: string;
  perNightLabel?: string;
  viewDetailsLabel?: string;
  bookRoomLabel?: string;
}) {
  const locale = useLocale();
  const title = getRoomTitle(room);
  const images = getRoomDisplayImages(room);
  const cover = images[0];

  // Predefined list of featured amenities to highlight dynamically
  const featuredList = [
    {
      key: "ac",
      keywords: ["ac", "conditioner", "điều hòa"],
      icon: Snowflake,
      label: "AC"
    },
    {
      key: "wifi",
      keywords: ["wifi", "internet"],
      icon: Wifi,
      label: "Free WiFi"
    },
    {
      key: "balcony",
      keywords: ["balcony", "ban công"],
      icon: Trees,
      label: locale === "vi" ? "Ban công" : "Balcony"
    },
    {
      key: "ensuite",
      keywords: ["ensuite", "khép kín", "riêng", "bathroom", "phòng tắm"],
      icon: ShowerHead,
      label: locale === "vi" ? "Khép kín" : "Ensuite"
    },
    {
      key: "tv",
      keywords: ["tv", "television", "truyền hình"],
      icon: Tv,
      label: locale === "vi" ? "Smart TV" : "Smart TV"
    },
    {
      key: "minibar",
      keywords: ["minibar", "tủ lạnh", "refrigerator", "fridge"],
      icon: Refrigerator,
      label: locale === "vi" ? "Minibar" : "Minibar"
    }
  ];

  const activeFeatures: { icon: LucideIcon; label: string }[] = [];
  
  featuredList.forEach((feat) => {
    const hasFeat = room.amenities?.some((a) =>
      feat.keywords.some((k) => a.toLowerCase().includes(k))
    );
    if (hasFeat) {
      activeFeatures.push({ icon: feat.icon, label: feat.label });
    }
  });

  // Fallbacks if not enough featured amenities are present
  if (activeFeatures.length < 2) {
    activeFeatures.push({
      icon: Users,
      label: locale === "vi" ? `${room.capacity || 2} khách` : `Up to ${room.capacity || 2}`
    });
  }

  const renderedFeatures = activeFeatures.slice(0, 2);

  // Badge text logic for image overlay: show only for Dorm or Single rooms
  const isDorm = isDormRoom(room);
  const isSingle = title.toLowerCase().includes("single") || room.category?.toLowerCase().includes("single");
  const showBadge = isDorm || isSingle;
  const imageBadge = isDorm
    ? locale === "vi" ? "Phòng Dorm" : "Best for Solo"
    : locale === "vi" ? "Phòng Đơn" : "Best for Solo";

  const buttonLabel = locale === "vi" ? "Chi tiết phòng" : "Room Details";

  return (
    <article className="group relative flex h-full flex-col rounded-[24px] border border-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-[#151d14]">
      {/* Full-bleed Top Image */}
      <Link
        href={localizedPath(locale, `/stay/${room.slug}`)}
        className="relative block aspect-[4/3] w-full overflow-hidden rounded-t-[24px] bg-soft"
        tabIndex={-1}
        aria-hidden
      >
        {cover ? (
          <OptimizedImage
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-soft text-text-muted">
            No image
          </div>
        )}

        {/* Dynamic Image Overlay Badge */}
        {showBadge && (
          <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[#0f2910] px-3.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm transition-colors dark:bg-[#1b2518] dark:text-primary-dark">
            {imageBadge}
          </span>
        )}
      </Link>

      {/* Card Content Area */}
      <div className="flex flex-1 flex-col p-6">
        {/* Room Title */}
        <h3 className="font-heading text-lg font-bold leading-tight text-primary sm:text-xl dark:text-[#9fbd70]">
          <Link
            href={localizedPath(locale, `/stay/${room.slug}`)}
            className="transition-colors hover:text-primary-dark dark:hover:text-white"
          >
            {title}
          </Link>
        </h3>

        {/* Quick Info/Features Section (Render exactly 2 inline features) */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-muted">
          {renderedFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <span key={`${feat.label}-${idx}`} className="inline-flex items-center gap-1.5 font-medium">
                <Icon className="h-4 w-4 text-primary dark:text-[#9fbd70]" />
                {feat.label}
              </span>
            );
          })}
        </div>

        {/* Spacing alignment */}
        <div className="flex-1 min-h-[1.5rem]" />

        {/* Single Outlined CTA Button */}
        <div className="mt-5">
          <Link
            href={localizedPath(locale, `/stay/${room.slug}`)}
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "w-full text-sm font-bold rounded-full border-primary text-primary hover:bg-soft transition-all text-center flex items-center justify-center min-h-11 dark:border-primary/60 dark:text-primary-dark dark:hover:bg-[#1b2518]"
            )}
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function RoomCard({
  room,
}: {
  room: Room;
  priceFromLabel?: string;
  perNightLabel?: string;
  viewDetailsLabel?: string;
  bookRoomLabel?: string;
  upToGuestsLabel?: string;
}) {
  return <PremiumRoomCard room={room} />;
}

export function AccommodationPreview({
  rooms,
  title,
  subtitle,
  viewAllLabel,
  emptyMessage,
  rateNote,
}: {
  rooms: Room[];
  title?: string;
  subtitle?: string;
  bookLabel?: string;
  viewAllLabel?: string;
  emptyMessage?: string;
  priceFromLabel?: string;
  perNightLabel?: string;
  viewDetailsLabel?: string;
  bookRoomLabel?: string;
  rateNote?: string;
}) {
  const locale = useLocale();

  if (!title && !rooms.length) return null;

  if (!rooms.length) {
    return (
      <HomeSection id="stay" background="soft" divider>
        <SectionHeader
          eyebrow={locale === "vi" ? "Lưu trú" : "Stay"}
          title={title || ""}
          subtitle={subtitle}
        />
        {emptyMessage ? <EmptyState message={emptyMessage} /> : null}
      </HomeSection>
    );
  }

  return (
    <HomeSection id="stay" background="soft" divider>
      <SectionHeader
        eyebrow={locale === "vi" ? "Lưu trú" : "Stay"}
        title={title || ""}
        subtitle={subtitle}
      />

      {rateNote ? (
        <p className="-mt-5 mb-6 text-center text-sm italic text-text-muted">{rateNote}</p>
      ) : null}

      {viewAllLabel && (
        <div className="text-center -mt-2 mb-10">
          <Link
            href={localizedPath(locale, "/stay")}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark underline underline-offset-4 decoration-primary whitespace-nowrap dark:text-[#9fbd70] dark:decoration-[#9fbd70]"
          >
            {viewAllLabel} <span className="text-base">&rarr;</span>
          </Link>
        </div>
      )}

      <ListingGrid>
        {rooms.slice(0, 3).map((room) => (
          <PremiumRoomCard key={room.id} room={room} />
        ))}
      </ListingGrid>
    </HomeSection>
  );
}
