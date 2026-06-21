import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { DocumentLang } from "@/components/providers/DocumentLang";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { hotelSchema, restaurantSchema } from "@/lib/seo";
import { PageContentTransition } from "@/components/motion";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";
import { SiteDataProvider } from "@/components/providers/SiteDataProvider";
import { getSiteSettings, getContactInformation } from "@/lib/data/services";
import { createLocalizedMetadata } from "@/lib/i18n/metadata";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};

  const dict = await getDictionary(localeParam);
  const settings = await getSiteSettings();
  const siteName = settings?.siteName || "Green Riverside Cosy Home";
  const path = "/";
  const isVietnamese = localeParam === "vi";

  return createLocalizedMetadata(localeParam as Locale, {
    title: isVietnamese ? siteName : settings?.seo?.defaultTitle || siteName,
    description: isVietnamese
      ? dict.meta.description
      : settings?.seo?.defaultDescription || settings?.tagline || dict.meta.description,
    path,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const dict = await getDictionary(localeParam);

  const [settings, contact] = await Promise.all([
    getSiteSettings(),
    getContactInformation(),
  ]);

  return (
    <>
      <DocumentLang locale={localeParam as Locale} />
      <JsonLd data={[hotelSchema(localeParam as Locale), restaurantSchema(localeParam as Locale)]} />
      <I18nProvider locale={localeParam as Locale} dict={dict}>
        <SiteDataProvider settings={settings} contact={contact}>
          <Navbar />
          <main id="main-content" className="flex-1">
            <PageContentTransition>{children}</PageContentTransition>
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </SiteDataProvider>
      </I18nProvider>
      <AnalyticsProvider />
    </>
  );
}
