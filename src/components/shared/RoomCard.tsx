"use client";

import Link from "next/link";
import type { Room } from "@/types";
import { getRoomTitle, getRoomPrice } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";
import { HomeSection } from "@/components/ui/home-section";
import { SectionHeader } from "@/components/ui/section-header";
import { SectionActions } from "@/components/ui/section-actions";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { ListingGrid } from "@/components/motion";
import { EmptyState } from "@/components/ui/empty-state";

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
  priceFromLabel,
  perNightLabel,
  viewDetailsLabel,
  bookRoomLabel,
}: {
  room: Room;
  priceFromLabel?: string;
  perNightLabel?: string;
  viewDetailsLabel?: string;
  bookRoomLabel?: string;
}) {
  const locale = useLocale();
  const title = getRoomTitle(room);
  const price = getRoomPrice(room);
  const description = room.shortDescription || room.description;
  const images = getRoomDisplayImages(room);
  const cover = images[0];
  const unitLabel = isDormRoom(room)
    ? locale === "vi"
      ? "/ giường"
      : "/ bed"
    : perNightLabel || (locale === "vi" ? "/ đêm" : "/ night");

  return (
    <article className="page-card page-card--lift group flex h-full flex-col">
      <Link
        href={localizedPath(locale, `/stay/${room.slug}`)}
        className="relative block aspect-[4/3] overflow-hidden bg-soft after:absolute after:inset-0 after:bg-gradient-to-t after:from-black/20 after:via-black/0 after:to-transparent"
        tabIndex={-1}
        aria-hidden
      >
        {cover ? (
          <OptimizedImage
            src={cover}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="img-hover object-cover"
          />
        ) : null}
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-[1.28rem] leading-tight text-text sm:text-[1.4rem]">
          <Link
            href={localizedPath(locale, `/stay/${room.slug}`)}
            className="transition-colors hover:text-primary"
          >
            {title}
          </Link>
        </h3>
        {description ? (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-[1.7] text-text-muted">
            {description}
          </p>
        ) : null}
        
        {room.amenities && room.amenities.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-text-muted">
            {room.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="meta-pill">
                {amenity}
              </span>
            ))}
          </div>
        ) : null}

        <p className="mt-5 border-t border-border pt-4 text-base font-semibold text-primary sm:text-lg">
          {price > 0 ? (
            <>
              <span className="text-sm font-normal text-text-muted">
                {priceFromLabel || (locale === "vi" ? "Từ" : "From")}{" "}
              </span>
              {formatPrice(price, room.currency)}
              <span className="ml-1 text-sm font-normal text-text-muted">
                {unitLabel}
              </span>
            </>
          ) : (
            <span className="text-sm font-normal text-text-muted">
              {locale === "vi" ? "Liên hệ" : "Contact us"}
            </span>
          )}
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {viewDetailsLabel ? (
            <Link
              href={localizedPath(locale, `/stay/${room.slug}`)}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-primary/20 bg-white px-5 text-sm font-semibold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:bg-soft hover:shadow-[var(--shadow-soft)] sm:w-auto"
            >
              {viewDetailsLabel}
            </Link>
          ) : null}
          {bookRoomLabel ? (
            <WhatsAppButton
              messageType="book_room"
              customMessage={`Hi Green Riverside! I'd like to book the ${title}. Could you please help me with availability and rates?`}
              label={bookRoomLabel}
              size="sm"
              className="min-h-11 px-5 text-sm font-semibold sm:w-auto"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function RoomCard({
  room,
  priceFromLabel,
  perNightLabel,
  viewDetailsLabel,
  bookRoomLabel,
}: {
  room: Room;
  priceFromLabel?: string;
  perNightLabel?: string;
  viewDetailsLabel?: string;
  bookRoomLabel?: string;
  upToGuestsLabel?: string;
}) {
  return (
    <PremiumRoomCard
      room={room}
      priceFromLabel={priceFromLabel}
      perNightLabel={perNightLabel}
      viewDetailsLabel={viewDetailsLabel}
      bookRoomLabel={bookRoomLabel}
    />
  );
}

export function AccommodationPreview({
  rooms,
  title,
  subtitle,
  bookLabel,
  viewAllLabel,
  emptyMessage,
  priceFromLabel,
  perNightLabel,
  viewDetailsLabel,
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
  rateNote?: string;
}) {
  const locale = useLocale();

  if (!title && !rooms.length) return null;

  if (!rooms.length) {
    return (
      <HomeSection id="stay" background="soft" divider>
        {title ? <SectionHeader eyebrow="Stay" title={title} subtitle={subtitle} /> : null}
        {emptyMessage ? <EmptyState message={emptyMessage} /> : null}
      </HomeSection>
    );
  }

  return (
    <HomeSection id="stay" background="soft" divider>
      {title ? <SectionHeader eyebrow="Stay" title={title} subtitle={subtitle} /> : null}
      {rateNote ? (
        <p className="-mt-5 mb-10 text-center text-sm italic text-text-muted">{rateNote}</p>
      ) : null}

      <ListingGrid>
        {rooms.slice(0, 3).map((room) => (
          <PremiumRoomCard
            key={room.id}
            room={room}
            priceFromLabel={priceFromLabel}
            perNightLabel={perNightLabel}
            viewDetailsLabel={viewDetailsLabel}
          />
        ))}
      </ListingGrid>

      <SectionActions
        primaryLabel={bookLabel}
        primaryMessageType="book_room"
        secondaryLabel={viewAllLabel}
        secondaryHref={viewAllLabel ? localizedPath(locale, "/stay") : undefined}
      />
    </HomeSection>
  );
}
