import type { ElementType } from "react";
import {
  Backpack,
  Banknote,
  Beer,
  Bike,
  CarTaxiFront,
  CircleHelp,
  CloudRain,
  CloudSun,
  Coffee,
  CreditCard,
  Dumbbell,
  HeartPulse,
  KeyRound,
  Leaf,
  MapPinned,
  Pill,
  Plane,
  ShoppingBasket,
  Smartphone,
  Stamp,
  Sunrise,
  Utensils,
  Waves,
} from "lucide-react";
import { PageCta, PageHero, PageIntro, Section, SectionHeader } from "@/components/ui/section";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { getUsefulInfoContent } from "@/lib/content/guest-pages";
import type { Locale } from "@/lib/i18n/config";

const INFO_ICONS: Record<string, ElementType> = {
  backpack: Backpack,
  beer: Beer,
  bike: Bike,
  card: CreditCard,
  coffee: Coffee,
  dumbbell: Dumbbell,
  health: HeartPulse,
  key: KeyRound,
  leaf: Leaf,
  map: MapPinned,
  money: Banknote,
  phone: Smartphone,
  pill: Pill,
  plane: Plane,
  rain: CloudRain,
  shopping: ShoppingBasket,
  sunrise: Sunrise,
  taxi: CarTaxiFront,
  utensils: Utensils,
  visa: Stamp,
  waves: Waves,
  weather: CloudSun,
};

const SECTION_ACCENTS = [
  "border-primary/20 bg-white",
  "border-primary/20 bg-[#f8faf3]",
  "border-primary/20 bg-white",
  "border-primary/20 bg-[#fffaf4]",
];

const ICON_TONES = [
  "bg-soft text-primary",
  "bg-[#fff4e8] text-accent",
  "bg-[#eef5ea] text-primary-dark",
  "bg-white text-primary",
  "bg-[#f5f7ef] text-primary",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale, dict } = await getPageContext(params);
  const p = dict.pages.usefulInfo;

  return createLocalizedMetadata(locale, {
    title: p.metaTitle,
    description: p.metaDescription,
    path: "/useful-info",
  });
}

export default async function UsefulInfoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getPageContext(params);
  const p = dict.pages.usefulInfo;
  const content = getUsefulInfoContent(locale as Locale);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          localizedBreadcrumb(locale, [
            { name: dict.nav.home, path: "/" },
            { name: p.title, path: "/useful-info" },
          ])
        )}
      />
      <PageHero title={p.title} subtitle={p.subtitle} />

      <Section>
        <PageIntro>{p.intro}</PageIntro>
        <div className="space-y-14">
          {content.sections.map((section, sectionIndex) => (
            <div key={section.id} id={section.id} className="scroll-mt-28 space-y-6">
              <div
                className={`rounded-[var(--radius-card)] border px-5 py-5 shadow-[var(--shadow-sm)] sm:px-6 ${SECTION_ACCENTS[sectionIndex % SECTION_ACCENTS.length]}`}
              >
                <SectionHeader
                  title={section.title}
                  subtitle={section.subtitle}
                  centered={false}
                  compact
                  className="!mb-0"
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {section.items.map((item, itemIndex) => {
                  const Icon = INFO_ICONS[item.icon] ?? CircleHelp;
                  const tone = ICON_TONES[(sectionIndex + itemIndex) % ICON_TONES.length];

                  return (
                    <Card key={item.id} className="h-full">
                      <CardHeader className="flex-row items-start gap-4">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] ring-1 ring-inset ring-primary/10 ${tone}`}>
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <CardTitle className="text-[1.05rem] leading-snug">{item.title}</CardTitle>
                          <CardDescription className="mt-2 leading-relaxed">
                            {item.description}
                          </CardDescription>
                        </div>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <PageCta>
          <WhatsAppButton messageType="general" label={p.ctaLabel} size="lg" />
        </PageCta>
      </Section>
    </>
  );
}
