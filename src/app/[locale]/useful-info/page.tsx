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
  ChevronDown,
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
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { getUsefulInfoContent } from "@/lib/content/guest-pages";
import { getPageContent } from "@/lib/data/services";
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

const INTERNAL_NOTES = [
  "Here is a natural website-ready version",
  "Dưới đây là bản viết lại",
  "website-ready version",
  "bản viết lại",
];

const CATEGORY_LABELS = [
  "Contact & Booking",
  "Policies",
  "Transportation",
  "Food & Cafes",
  "Nightlife",
  "Attractions",
  "Swimming Spots",
  "Motorbike & Bicycle",
  "Gym & Yoga",
  "Money & ATM",
  "SIM Card",
  "Shopping",
  "Health",
  "Visa",
  "Weather",
  "Safety",
  "Packing Tips",
];

function cleanPublicText(text: string) {
  return text
    .split("\n")
    .filter((line) => !INTERNAL_NOTES.some((note) => line.includes(note)))
    .join("\n")
    .trim();
}

function toPreview(text: string) {
  const clean = cleanPublicText(text).replace(/\s+/g, " ");
  return clean.length > 132 ? `${clean.slice(0, 132).trim()}...` : clean;
}

function renderCompactText(text: string) {
  const paragraphs = cleanPublicText(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="space-y-3 text-sm leading-relaxed text-text-muted">
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

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
  const loc = locale as Locale;
  const p = dict.pages.usefulInfo;
  const [page, content] = await Promise.all([
    getPageContent(loc, "useful-info"),
    Promise.resolve(getUsefulInfoContent(loc)),
  ]);
  const flatItems = content.sections.flatMap((section) =>
    section.items.map((item) => ({ ...item, sectionTitle: section.title, sectionId: section.id }))
  );
  const quickCategories = CATEGORY_LABELS.map((label, index) => {
    const item = flatItems[index % flatItems.length];
    return {
      label,
      href: `#${item?.id || content.sections[0]?.id || "useful-info"}`,
      icon: item?.icon || "map",
    };
  });

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
      <PageHero
        title={page?.heroTitle || p.title}
        subtitle={page?.heroSubtitle || p.subtitle}
        image={page?.heroImage}
      />

      <Section>
        <PageIntro className="mb-8">{page?.intro || p.intro}</PageIntro>

        <div className="mb-10 rounded-[var(--radius-card)] border border-primary/15 bg-soft p-4 shadow-[var(--shadow-sm)] sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-eyebrow mb-2">Quick Guide</p>
              <h2 className="font-heading text-2xl text-text">Find what you need faster</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-text-muted">
              Browse by topic, then open only the details you need.
            </p>
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {quickCategories.map((category, index) => {
              const Icon = INFO_ICONS[category.icon] ?? CircleHelp;
              return (
                <a
                  key={`${category.label}-${index}`}
                  href={category.href}
                  className="group flex min-h-12 items-center gap-3 rounded-[var(--radius-card)] border border-border bg-white px-3 py-2 text-sm font-semibold text-text transition hover:border-primary/25 hover:text-primary hover:shadow-[var(--shadow-sm)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-card)] bg-soft text-primary">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="min-w-0 leading-snug">{category.label}</span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-10">
          {content.sections.map((section, sectionIndex) => (
            <div key={section.id} id={section.id} className="scroll-mt-28 space-y-5">
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
              <div className="grid gap-3">
                {section.items.map((item, itemIndex) => {
                  const Icon = INFO_ICONS[item.icon] ?? CircleHelp;
                  const tone = ICON_TONES[(sectionIndex + itemIndex) % ICON_TONES.length];

                  return (
                    <details
                      key={item.id}
                      id={item.id}
                      className="group scroll-mt-32 rounded-[var(--radius-card)] border border-border bg-white shadow-[var(--shadow-sm)] open:border-primary/25 open:shadow-[var(--shadow-soft)]"
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-4 px-4 py-4 marker:hidden sm:px-5">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] ring-1 ring-inset ring-primary/10 ${tone}`}>
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-heading text-[1.05rem] font-bold leading-snug text-text">
                            {item.title}
                          </span>
                          <span className="mt-1 block text-sm leading-relaxed text-text-muted">
                            {toPreview(item.description)}
                          </span>
                        </span>
                        <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
                        {renderCompactText(item.description)}
                      </div>
                    </details>
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
