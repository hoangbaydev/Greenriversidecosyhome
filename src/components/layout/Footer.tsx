"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { useSiteData } from "@/components/providers/SiteDataProvider";
import { localizedPath } from "@/lib/i18n/config";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppButton";
import { Container } from "@/components/ui/container";
import { SocialIcon, type SocialPlatform } from "@/components/layout/SocialIcon";
import { SiteBrand } from "@/components/layout/SiteBrand";

const SOCIAL_KEYS: { key: SocialPlatform; field: "facebook" | "instagram" | "tiktok" | "youtube" | "tripadvisor" }[] = [
  { key: "tripadvisor", field: "tripadvisor" },
  { key: "facebook", field: "facebook" },
  { key: "instagram", field: "instagram" },
  { key: "tiktok", field: "tiktok" },
  { key: "youtube", field: "youtube" },
];

const STAY_LINKS = [
  { href: "/our-story", labelKey: "aboutUs" as const },
  { href: "/stay", labelKey: "rooms" as const },
  { href: "/eat-drink", labelKey: "eatDrink" as const },
];

const EXPERIENCE_LINKS = [
  { href: "/tours", label: "tours" as const },
  { href: "/social-activities", label: "activities" as const },
  { href: "/gallery", label: "gallery" as const },
  { href: "/blog", label: "news" as const },
];

function experienceLabel(
  dict: ReturnType<typeof useDictionary>,
  key: (typeof EXPERIENCE_LINKS)[number]["label"]
) {
  if (key === "news") return dict.footer.news;
  if (key === "activities") return dict.footer.activities;
  if (key === "tours") return dict.nav.tours;
  return dict.nav[key];
}

function displayPhone(value: string) {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("84") && digits.length >= 10) {
    const rest = digits.slice(2);
    return `(+84) ${rest.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3").trim()}`;
  }
  return value.startsWith("+") ? value : `+${value}`;
}

function FooterTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
      {children}
    </h3>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="block text-sm leading-6 text-white/68 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline"
    >
      {children}
    </Link>
  );
}

export function Footer() {
  const pathname = usePathname();
  const locale = useLocale();
  const dict = useDictionary();
  const { settings, contact } = useSiteData();

  if (pathname.startsWith("/admin")) return null;

  const siteName = settings?.siteName || dict.meta.siteName;
  const tagline = settings?.tagline || dict.meta.tagline;
  const social = settings?.socialLinks ?? {};
  const reception = contact?.phone || settings?.phone || "";
  const salesLine = contact?.whatsapp || settings?.whatsappNumber || "";
  const email = contact?.email || settings?.email || "";
  const address = contact?.address || settings?.address || "";
  const mapsUrl = contact?.googleMapsUrl || settings?.googleMapsUrl || "";

  const socialLinks = SOCIAL_KEYS.map(({ key, field }) => ({
    key,
    url: social[field],
  })).filter((item): item is { key: SocialPlatform; url: string } => Boolean(item.url));

  const showSalesLine =
    Boolean(salesLine) && salesLine.replace(/\D/g, "") !== reception.replace(/\D/g, "");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white" role="contentinfo">
      <Container size="large" className="py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] lg:grid-cols-[1.7fr_0.85fr_0.85fr_1.2fr] lg:gap-10">
          <div>
            <SiteBrand
              siteName={siteName}
              tagline={tagline}
              logoUrl={settings?.logoUrl}
              locale={locale}
              size="compact"
              nameClassName="!text-white"
              subtitleClassName="!text-white/50"
            />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
              {tagline}
            </p>
            {socialLinks.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {socialLinks.map(({ key, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/65 transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
                  >
                    <SocialIcon platform={key} className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <FooterTitle>{dict.nav.stay}</FooterTitle>
            <ul className="mt-3 space-y-1.5">
              {STAY_LINKS.map((item) => (
                <li key={item.href}>
                  <FooterLink href={localizedPath(locale, item.href)}>
                    {item.labelKey === "aboutUs"
                      ? dict.footer.aboutUs
                      : item.labelKey === "rooms"
                        ? dict.footer.rooms
                        : dict.nav.eatDrink}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>{dict.nav.explore}</FooterTitle>
            <ul className="mt-3 space-y-1.5">
              {EXPERIENCE_LINKS.map((item) => (
                <li key={item.href}>
                  <FooterLink href={localizedPath(locale, item.href)}>
                    {experienceLabel(dict, item.label)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <FooterTitle>{dict.footer.contactUs}</FooterTitle>
            <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/68">
              {showSalesLine ? (
                <li>
                  <WhatsAppLink messageType="general" className="hover:text-white">
                    {displayPhone(salesLine)}
                  </WhatsAppLink>
                </li>
              ) : null}
              {reception ? (
                <li>
                  <a href={`tel:${reception.replace(/\s/g, "")}`} className="hover:text-white">
                    {displayPhone(reception)}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-white">
                    {email}
                  </a>
                </li>
              ) : null}
              {address ? (
                <li className="leading-relaxed">
                  {mapsUrl ? (
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {address}
                    </a>
                  ) : (
                    address
                  )}
                </li>
              ) : null}
            </ul>
            {salesLine ? (
              <WhatsAppLink
                messageType="book_room"
                className="mt-4 inline-flex min-h-9 items-center justify-center rounded-md bg-white px-4 text-xs font-semibold text-primary-dark transition-colors hover:bg-white/90"
              >
                {dict.nav.bookNow}
              </WhatsAppLink>
            ) : null}
          </div>
        </div>
      </Container>

      <div className="border-t border-white/[0.08]">
        <Container size="large" className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/45">
            &copy; {year} {siteName}. {dict.footer.allRightsReserved}
          </p>
          <nav aria-label={dict.footer.legalNav} className="flex flex-wrap gap-x-4 gap-y-1">
            <FooterLink href={localizedPath(locale, "/terms")}>{dict.footer.terms}</FooterLink>
            <FooterLink href={localizedPath(locale, "/privacy")}>{dict.footer.privacy}</FooterLink>
            <FooterLink href={localizedPath(locale, "/contact")}>{dict.footer.contact}</FooterLink>
          </nav>
        </Container>
      </div>
    </footer>
  );
}
