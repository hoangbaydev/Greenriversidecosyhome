"use client";

import Link from "next/link";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { Section } from "@/components/ui/section";
import { useDictionary, useLocale } from "@/components/providers/I18nProvider";
import { localizedPath } from "@/lib/i18n/config";

export default function LocaleNotFound() {
  const dict = useDictionary();
  const locale = useLocale();

  return (
    <Section>
      <div className="mx-auto max-w-lg text-center">
        <p className="font-heading text-h1 text-primary">404</p>
        <h2 className="mt-4 font-heading text-h2 text-text">{dict.common.notFound}</h2>
        <p className="mt-3 text-body-lg text-text-muted">{dict.common.notFoundDesc}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href={localizedPath(locale, "/")}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-white hover:bg-primary/90"
          >
            {dict.common.goHome}
          </Link>
          <WhatsAppButton messageType="general" label={dict.common.contactUs} variant="secondary" />
        </div>
      </div>
    </Section>
  );
}
