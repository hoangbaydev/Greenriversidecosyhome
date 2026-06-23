import { getSiteSettings, getContactInformation, getFaqContent } from "@/lib/data/services";
import { breadcrumbSchema } from "@/lib/seo";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { FaqSection } from "@/components/home/FaqSection";
import { SocialLinksGrid } from "@/components/contact/SocialLinksGrid";
import { PageHero, PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/JsonLd";
import { EmptyState } from "@/components/ui/empty-state";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { resolvePageMeta } from "@/lib/cms/page-meta";
import { resolvePageHero } from "@/lib/cms/page-hero";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await getPageContext(params);
  const { title, description } = await resolvePageMeta(locale as Locale, "contact", "/contact");
  return createLocalizedMetadata(locale, { title, description, path: "/contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const loc = locale as Locale;
  const pageLabels = dict.pages.contact;

  const [page, faq, contactRaw, settings] = await Promise.all([
    resolvePageMeta(loc, "contact", "/contact").then((r) => r.page),
    getFaqContent(loc),
    getContactInformation(),
    getSiteSettings(),
  ]);

  const hero = resolvePageHero(page, {
    title: pageLabels.title,
    subtitle: pageLabels.subtitle,
    image: page?.heroImage,
  });

  const labels = {
    getInTouch: page?.labels?.getInTouch || pageLabels.getInTouch,
    phone: page?.labels?.phone || pageLabels.phone,
    email: page?.labels?.email || pageLabels.email,
    address: page?.labels?.address || pageLabels.address,
    hours: page?.labels?.hours || pageLabels.hours,
    viewOnMap: page?.labels?.viewOnMap || dict.common.viewOnMap,
    mapDirections: page?.labels?.mapDirections || pageLabels.mapDirections,
    mapTitle: page?.labels?.mapTitle || pageLabels.mapTitle,
  };

  const contact = {
    phone: contactRaw?.phone || settings?.phone || "",
    email: contactRaw?.email || settings?.email || "",
    address: contactRaw?.address || settings?.address || "",
    whatsapp: contactRaw?.whatsapp || settings?.whatsappNumber || "",
    googleMapsEmbed: contactRaw?.googleMapsEmbed || "",
    googleMapsUrl: contactRaw?.googleMapsUrl || settings?.googleMapsUrl || "",
    openingHours: contactRaw?.openingHours || "",
  };

  const ctaLabel = page?.ctaLabel || pageLabels.chatWhatsApp;
  const socialLabels = pageLabels.social;

  return (
    <>
      <FaqJsonLd faq={faq} />
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: hero.title, path: "/contact" },
          ])
        )}
      />
      <PageHero title={hero.title} subtitle={hero.subtitle} image={hero.image} />

      <Section>
        {page?.intro ? <PageIntro>{page.intro}</PageIntro> : null}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <SectionHeader title={labels.getInTouch} centered={false} compact />
            {!contact.phone && !contact.email && !contact.address ? (
              <EmptyState message={dict.common.contentNotPublished} />
            ) : (
              <SocialLinksGrid
                labels={{
                  followUs: socialLabels.followUs,
                  whatsapp: ctaLabel,
                  phone: labels.phone,
                  email: labels.email,
                  maps: socialLabels.maps,
                  address: labels.address,
                  hours: labels.hours,
                  facebook: socialLabels.facebook,
                  instagram: socialLabels.instagram,
                  tiktok: socialLabels.tiktok,
                  youtube: socialLabels.youtube,
                  tripadvisor: socialLabels.tripadvisor,
                }}
                whatsappLabel={ctaLabel}
              />
            )}
          </div>

          <div>
            {contact.googleMapsEmbed ? (
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-border shadow-[var(--shadow-soft)]">
                <iframe
                  src={contact.googleMapsEmbed}
                  width="100%"
                  height="360"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={labels.mapTitle}
                />
              </div>
            ) : contact.googleMapsUrl ? (
              <div className="flex h-[360px] items-center justify-center rounded-[var(--radius-card)] bg-soft shadow-[var(--shadow-sm)]">
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  {labels.viewOnMap}
                </a>
              </div>
            ) : null}
            {contact.googleMapsUrl ? (
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center text-sm font-semibold text-primary hover:underline"
              >
                {locale === "vi" ? "Chỉ đường trên Google Maps →" : "Get directions on Google Maps →"}
              </a>
            ) : null}
          </div>
        </div>
      </Section>

      {faq?.items?.length ? <FaqSection faq={faq} /> : null}
    </>
  );
}
