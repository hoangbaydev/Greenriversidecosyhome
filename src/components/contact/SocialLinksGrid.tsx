"use client";

import { useSiteData } from "@/components/providers/SiteDataProvider";
import { SocialIcon, type SocialPlatform } from "@/components/layout/SocialIcon";
import { WhatsAppButton, ZaloButton } from "@/components/whatsapp/WhatsAppButton";
import { cn } from "@/lib/utils";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const PLATFORMS: SocialPlatform[] = ["facebook", "instagram", "tiktok", "youtube", "tripadvisor"];

export function SocialLinksGrid({
  labels,
  className,
  whatsappLabel,
}: {
  labels: {
    followUs: string;
    whatsapp: string;
    phone: string;
    email: string;
    maps: string;
    address: string;
    hours: string;
    facebook: string;
    instagram: string;
    tiktok: string;
    youtube: string;
    tripadvisor: string;
  };
  className?: string;
  whatsappLabel?: string;
}) {
  const { settings, contact } = useSiteData();
  const social = settings?.socialLinks ?? {};
  const phone = contact?.phone || settings?.phone;
  const email = contact?.email || settings?.email;
  const mapsUrl = contact?.googleMapsUrl || settings?.googleMapsUrl;
  const address = contact?.address || settings?.address;
  const openingHours = contact?.openingHours;

  const platformLabels: Record<SocialPlatform, string> = {
    facebook: labels.facebook,
    instagram: labels.instagram,
    tiktok: labels.tiktok,
    youtube: labels.youtube,
    tripadvisor: labels.tripadvisor,
  };

  const cards = [
    {
      key: "phone",
      icon: Phone,
      label: labels.phone,
      value: phone,
      href: phone ? `tel:${phone.replace(/\s/g, "")}` : undefined,
    },
    {
      key: "email",
      icon: Mail,
      label: labels.email,
      value: email,
      href: email ? `mailto:${email}` : undefined,
    },
    {
      key: "address",
      icon: MapPin,
      label: labels.address,
      value: address,
      href: mapsUrl || undefined,
    },
    {
      key: "hours",
      icon: Clock,
      label: labels.hours,
      value: openingHours || "Daily · 7:00 – 22:00",
      href: undefined,
    },
  ].filter((card) => card.value);

  const renderValue = (val: string | undefined, key: string) => {
    if (!val) return "";
    if (key === "email") {
      const parts = val.split("@");
      if (parts.length === 2) {
        return (
          <>
            {parts[0]}
            <wbr />
            @{parts[1]}
          </>
        );
      }
    }
    return val;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <WhatsAppButton messageType="general" label={whatsappLabel || labels.whatsapp} size="lg" className="w-full sm:w-auto" />
        <ZaloButton label="Chat Zalo" size="lg" className="w-full sm:w-auto" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          const isLink = !!card.href;
          const content = (
            <>
              <span className="icon-badge icon-badge--md shrink-0">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-muted">{card.label}</p>
                <p className="mt-1.5 break-words text-sm font-semibold leading-snug text-text">
                  {renderValue(card.value, card.key)}
                </p>
              </div>
            </>
          );

          if (isLink && card.href) {
            return (
              <a
                key={card.key}
                href={card.href}
                target={card.key === "address" ? "_blank" : undefined}
                rel={card.key === "address" ? "noopener noreferrer" : undefined}
                className="social-link-card"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={card.key}
              className="social-link-card"
            >
              {content}
            </div>
          );
        })}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-muted">{labels.followUs}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {PLATFORMS.map((key) => {
            const href = social[key];
            if (!href) return null;
            return (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label={platformLabels[key]}
                title={platformLabels[key]}
              >
                <SocialIcon platform={key} className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
