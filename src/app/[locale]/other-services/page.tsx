import type { ElementType } from "react";
import {
  Bike,
  Car,
  Droplets,
  GlassWater,
  HeartPulse,
  Luggage,
  Route,
  Shirt,
  Sofa,
  Waves,
} from "lucide-react";
import { PageCta, PageHero, PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { MotionItem, MotionStagger } from "@/components/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { getOtherServicesContent } from "@/lib/content/guest-pages";
import type { Locale } from "@/lib/i18n/config";

const SERVICE_ICONS: Record<string, ElementType> = {
  bike: Bike,
  car: Car,
  luggage: Luggage,
  massage: HeartPulse,
  motorbike: Bike,
  route: Route,
  shirt: Shirt,
  sofa: Sofa,
  water: GlassWater,
  waves: Waves,
};

const SECTION_ACCENTS = [
  "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20",
  "border-sky-500 bg-sky-50/50 dark:bg-sky-950/20",
  "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20",
];

const ICON_TONES = [
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const p = dict.pages.otherServices;

  return createLocalizedMetadata(locale, {
    title: p.metaTitle,
    description: p.metaDescription,
    path: "/other-services",
  });
}

export default async function OtherServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const p = dict.pages.otherServices;
  const content = getOtherServicesContent(locale as Locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: p.title, path: "/other-services" },
          ])
        )}
      />
      <PageHero title={p.title} subtitle={p.subtitle} />

      <Section>
        <PageIntro>{p.intro}</PageIntro>
        <MotionStagger className="space-y-12">
          {content.sections.map((section, sectionIndex) => (
            <MotionItem key={section.id} className="space-y-5">
              <div
                className={`border-l-4 px-5 py-4 ${SECTION_ACCENTS[sectionIndex % SECTION_ACCENTS.length]}`}
              >
                <SectionHeader
                  title={section.title}
                  subtitle={section.subtitle}
                  centered={false}
                  compact
                />
              </div>
              <MotionStagger fast className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item, itemIndex) => {
                  const Icon = SERVICE_ICONS[item.icon] ?? Droplets;
                  const tone = ICON_TONES[(sectionIndex + itemIndex) % ICON_TONES.length];

                  return (
                    <MotionItem key={item.id}>
                      <Card className="h-full">
                      <CardHeader className="gap-4">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <CardTitle className="text-base leading-snug">{item.title}</CardTitle>
                          <CardDescription className="mt-2 leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      </Card>
                    </MotionItem>
                  );
                })}
              </MotionStagger>
            </MotionItem>
          ))}
        </MotionStagger>
        <PageCta>
          <WhatsAppButton messageType="general" label={p.ctaLabel} size="lg" />
        </PageCta>
      </Section>
    </>
  );
}
