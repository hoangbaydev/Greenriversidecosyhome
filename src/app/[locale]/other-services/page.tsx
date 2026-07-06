import type { ElementType } from "react";
import {
  Bike,
  Car,
  ChevronDown,
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
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { MotionItem, MotionStagger } from "@/components/motion";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getPageContext } from "@/lib/i18n/get-dictionary";
import { createLocalizedMetadata, localizedBreadcrumb } from "@/lib/i18n/metadata";
import { getOtherServicesContent } from "@/lib/content/guest-pages";
import { getPageContent } from "@/lib/data/services";
import type { Locale } from "@/lib/i18n/config";

function isBulletLine(line: string) {
  const normalized = line.replace(/^\u00e2\u20ac\u00a2/, "•");
  return normalized.startsWith("•") || normalized.startsWith("-");
}

function cleanBulletLine(line: string) {
  return line.replace(/^(•|-|\u00e2\u20ac\u00a2)\s*/, "");
}

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
  "border-primary/25 bg-soft",
  "border-primary/20 bg-white",
  "border-accent/25 bg-[#fffaf4]",
];

const ICON_TONES = [
  "bg-soft text-primary",
  "bg-[#fff4e8] text-accent",
  "bg-[#eef5ea] text-primary-dark",
  "bg-white text-primary",
  "bg-[#f5f7ef] text-primary",
];

const SERVICE_CARD_LABELS = [
  "Laundry Service",
  "Bicycle Rental",
  "Motorbike Rental",
  "Taxi & Private Transfers",
  "Easy Rider Tours",
  "Massage Service",
  "Free Filtered Drinking Water",
  "Common Areas",
  "Luggage Storage",
  "Shower & Toilet Facilities",
  "Kayak Rental",
];

const INTERNAL_NOTES = [
  "Here is a natural website-ready version",
  "Dưới đây là bản viết lại",
  "website-ready version",
  "bản viết lại",
];

function cleanPublicText(text: string) {
  return text
    .split("\n")
    .filter((line) => !INTERNAL_NOTES.some((note) => line.includes(note)))
    .join("\n")
    .trim();
}

function getIntro(text: string) {
  const first = cleanPublicText(text).split(/\n{2,}/)[0]?.replace(/\s+/g, " ").trim() || "";
  return first.length > 128 ? `${first.slice(0, 128).trim()}...` : first;
}

function findServiceItem(
  label: string,
  items: Array<{ id: string; title: string; description: string; icon: string }>
) {
  const normalized = label.toLowerCase();
  if (normalized.includes("shower")) return items.find((item) => item.id === "luggage-shower");
  if (normalized.includes("luggage")) return items.find((item) => item.id === "luggage-shower");
  if (normalized.includes("kayak")) return items.find((item) => item.id === "sup-paddle-board");
  if (normalized.includes("common")) return items.find((item) => item.id === "relaxed-common-areas");
  if (normalized.includes("filtered")) return items.find((item) => item.id === "filtered-water");

  return items.find((item) => item.title.toLowerCase().includes(normalized.replace("service", "").trim()));
}

function renderDetailContent(text: string) {
  const paragraphs = cleanPublicText(text)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="grid gap-4 text-sm leading-relaxed text-text-muted md:grid-cols-2">
      {paragraphs.map((paragraph, paragraphIndex) => {
        const lines = paragraph.split("\n").map((line) => line.trim()).filter(Boolean);
        const heading = lines.length > 1 && !isBulletLine(lines[0]) ? lines[0] : paragraphIndex === 0 ? "Short intro" : "Details";
        const bodyLines = lines.length > 1 && !isBulletLine(lines[0]) ? lines.slice(1) : lines;
        const hasBullets = bodyLines.some(isBulletLine);

        return (
          <div key={`${heading}-${paragraphIndex}`} className="rounded-[var(--radius-card)] border border-border bg-soft/45 p-4">
            <h4 className="font-heading text-sm font-bold text-text">{heading}</h4>
            {hasBullets ? (
              <ul className="mt-2 space-y-1.5">
                {bodyLines.map((line, index) => (
                  <li key={`${line}-${index}`} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span>{cleanBulletLine(line)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2">{bodyLines.join(" ")}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

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
  const loc = locale as Locale;
  const p = dict.pages.otherServices;
  const [page, content] = await Promise.all([
    getPageContent(loc, "other-services"),
    Promise.resolve(getOtherServicesContent(loc)),
  ]);
  const allItems = content.sections.flatMap((section) => section.items);
  const serviceCards = SERVICE_CARD_LABELS.map((label) => {
    const item = findServiceItem(label, allItems);
    return item ? { label, item } : null;
  }).filter(Boolean) as Array<{ label: string; item: (typeof allItems)[number] }>;

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
      <PageHero
        title={page?.heroTitle || p.title}
        subtitle={page?.heroSubtitle || p.subtitle}
        image={page?.heroImage}
      />

      <Section>
        <PageIntro className="mb-8">{page?.intro || p.intro}</PageIntro>

        <MotionStagger className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map(({ label, item }, index) => {
            const Icon = SERVICE_ICONS[item.icon] ?? (label === "Kayak Rental" ? Waves : Droplets);
            const tone = ICON_TONES[index % ICON_TONES.length];

            return (
              <MotionItem key={`${label}-${item.id}`}>
                <a
                  href={`#${item.id}`}
                  className="group flex h-full gap-4 rounded-[var(--radius-card)] border border-border bg-white p-4 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[var(--shadow-soft)]"
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] ${tone}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-heading text-base font-bold leading-snug text-text group-hover:text-primary">
                      {label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-text-muted">
                      {getIntro(item.description)}
                    </span>
                  </span>
                </a>
              </MotionItem>
            );
          })}
        </MotionStagger>

        <MotionStagger className="space-y-10">
          {content.sections.map((section, sectionIndex) => (
            <MotionItem key={section.id} className="space-y-5">
              <div
                className={`rounded-[var(--radius-card)] border px-5 py-5 shadow-[var(--shadow-sm)] ${SECTION_ACCENTS[sectionIndex % SECTION_ACCENTS.length]}`}
              >
                <SectionHeader
                  title={section.title}
                  subtitle={section.subtitle}
                  centered={false}
                  compact
                />
              </div>
              <MotionStagger fast className="grid gap-3">
                {section.items.map((item, itemIndex) => {
                  const Icon = SERVICE_ICONS[item.icon] ?? Droplets;
                  const tone = ICON_TONES[(sectionIndex + itemIndex) % ICON_TONES.length];

                  return (
                    <MotionItem key={item.id}>
                      <details
                        id={item.id}
                        className="group scroll-mt-32 rounded-[var(--radius-card)] border border-border bg-white shadow-[var(--shadow-sm)] open:border-primary/25 open:shadow-[var(--shadow-soft)]"
                      >
                        <summary className="flex cursor-pointer list-none items-start gap-4 px-4 py-4 marker:hidden sm:px-5">
                          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-card)] ${tone}`}>
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-heading text-base font-bold leading-snug text-text">
                              {item.title}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-text-muted">
                              {getIntro(item.description)}
                            </span>
                          </span>
                          <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden />
                        </summary>
                        <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
                          {renderDetailContent(item.description)}
                        </div>
                      </details>
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
