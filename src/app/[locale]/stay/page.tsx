import { getRooms } from "@/lib/data/services";
import { PageHero, PageIntro, PageCta, Section } from "@/components/ui/section";
import { RoomCard } from "@/components/shared/RoomCard";
import { StayWhySection } from "@/components/stay/StayWhySection";
import { ListingGrid } from "@/components/motion";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { EmptyState } from "@/components/ui/empty-state";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { resolvePageMeta } from "@/lib/cms/page-meta";
import { resolvePageHero } from "@/lib/cms/page-hero";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await getPageContext(params);
  const { title, description } = await resolvePageMeta(locale as Locale, "stay", "/stay");
  return createLocalizedMetadata(locale, { title, description, path: "/stay" });
}

export default async function StayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const p = dict.pages.stay;
  const [pageMeta, rooms] = await Promise.all([
    resolvePageMeta(loc, "stay", "/stay").then((r) => r.page),
    getRooms(),
  ]);

  const hero = resolvePageHero(pageMeta, { title: p.title, subtitle: p.subtitle });
  const labels = pageMeta?.labels;
  const whyTitle = p.whyStayTitle;
  const whySubtitle = p.whyStaySubtitle;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/stay" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      <Section>
        {pageMeta?.intro ? <PageIntro>{pageMeta.intro}</PageIntro> : null}
        {rooms.length === 0 ? (
          <EmptyState message={dict.common.contentNotPublished} />
        ) : (
          <ListingGrid>
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                priceFromLabel={labels?.priceFrom || p.startingFrom}
                perNightLabel={labels?.perNight}
                viewDetailsLabel={labels?.viewDetails || dict.common.viewDetails}
                bookRoomLabel={labels?.bookRoom || p.bookRoom}
                upToGuestsLabel={p.upToGuests}
              />
            ))}
          </ListingGrid>
        )}
        <PageCta>
          <WhatsAppButton
            messageType="book_room"
            label={pageMeta?.ctaLabel || p.bookWhatsApp}
            size="lg"
          />
        </PageCta>
      </Section>

      <StayWhySection locale={loc} title={whyTitle} subtitle={whySubtitle} />
    </>
  );
}
