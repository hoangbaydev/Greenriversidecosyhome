import { notFound } from "next/navigation";
import { createMetadata, breadcrumbSchema } from "@/lib/seo";
import { getRoomBySlug, getAllRoomSlugs, getPageContent } from "@/lib/data/services";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { Section } from "@/components/ui/section";
import { getRoomTitle, getRoomPrice, getRoomCapacity } from "@/types";
import { Users, Check } from "lucide-react";
import { locales, type Locale } from "@/lib/i18n/config";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { localizedBreadcrumb } from "@/lib/i18n/metadata";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllRoomSlugs();
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = await getPageContext(params);
  const room = await getRoomBySlug(slug);
  if (!room) return {};
  const title = getRoomTitle(room);
  return createMetadata({
    title: room.seoTitle || `${title} | Green Riverside Cosy Home`,
    description: room.seoDescription || room.shortDescription,
    path: `/${locale}/stay/${slug}`,
    image: room.images[0],
  });
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug, locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const [room, page] = await Promise.all([
    getRoomBySlug(slug),
    getPageContent(loc, "stay"),
  ]);
  if (!room) notFound();

  const labels = page?.labels;
  const title = getRoomTitle(room);
  const price = getRoomPrice(room);
  const capacity = getRoomCapacity(room);
  const guestsText = labels?.upToGuests?.includes("{count}")
    ? labels.upToGuests.replace("{count}", String(capacity))
    : labels?.guests
      ? `${labels.guests}: ${capacity}`
      : null;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: dict.nav.stay, path: "/stay" },
            { name: title, path: `/stay/${slug}` },
          ])
        )}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-4">
            {room.images.map((img, i) => (
              <div key={img} className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-full aspect-[16/10]" : "aspect-square"}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={`${title} ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <Badge variant="secondary">{room.category}</Badge>
            <h1 className="mt-4 font-heading text-h1 text-text">{title}</h1>
            {guestsText ? (
              <div className="mt-2 flex items-center gap-2 text-text/60">
                <Users className="h-4 w-4" aria-hidden />
                {guestsText}
              </div>
            ) : null}
            <p className="prose-content mt-6">{room.description}</p>
            {room.amenities.length > 0 && labels?.amenities ? (
              <div className="mt-8">
                <h2 className="font-heading text-h2">{labels.amenities}</h2>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {room.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-center gap-2 text-sm text-text/70">
                      <Check className="h-4 w-4 text-secondary" aria-hidden />
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {price > 0 ? (
              <div className="mt-8 rounded-2xl bg-soft p-6">
                {labels?.startingFrom ? (
                  <p className="text-sm text-text/60">{labels.startingFrom}</p>
                ) : null}
                <p className="font-heading text-card-title text-primary">
                  {formatPrice(price, room.currency)}
                  {labels?.perNight ? (
                    <span className="text-base font-normal text-text/50">{labels.perNight}</span>
                  ) : null}
                </p>
                {labels?.bookRoom ? (
                  <WhatsAppButton
                    messageType="book_room"
                    customMessage={`Hi! I'd like to book the ${title}.`}
                    label={labels.bookRoom}
                    className="mt-4 w-full"
                    size="lg"
                  />
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
