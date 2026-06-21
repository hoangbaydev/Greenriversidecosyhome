"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchPageContent, savePageContent, PAGE_KEYS } from "@/services/page-content.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormSkeleton } from "@/components/ui/skeleton";
import type { PageContent, PageKey, PageLabels } from "@/types";

const LOCALES = ["en", "vi"] as const;

const emptyPage = (pageKey: PageKey, locale: string): PageContent => ({
  pageKey,
  locale,
  heroTitle: "",
  heroSubtitle: "",
  heroImage: "",
  intro: "",
  metaTitle: "",
  metaDescription: "",
  ctaLabel: "",
  secondaryCtaLabel: "",
  labels: {},
});

const LABEL_FIELDS: { key: keyof PageLabels; label: string; pages: PageKey[] }[] = [
  { key: "priceFrom", label: "Price from prefix", pages: ["stay"] },
  { key: "perNight", label: "Per night suffix", pages: ["stay"] },
  { key: "viewDetails", label: "View details link", pages: ["stay", "tours"] },
  { key: "viewAll", label: "View all link", pages: ["stay", "tours", "gallery", "blog"] },
  { key: "amenities", label: "Amenities heading", pages: ["stay"] },
  { key: "guests", label: "Guests label", pages: ["stay"] },
  { key: "upToGuests", label: "Up to guests (use {count})", pages: ["stay"] },
  { key: "startingFrom", label: "Starting from label", pages: ["stay", "tours"] },
  { key: "bookRoom", label: "Book room button", pages: ["stay"] },
  { key: "highlights", label: "Highlights heading", pages: ["tours"] },
  { key: "bookTour", label: "Book tour button", pages: ["tours"] },
  { key: "searchPlaceholder", label: "Search placeholder", pages: ["blog"] },
  { key: "noResults", label: "No results message", pages: ["blog"] },
  { key: "loadMore", label: "Load more button", pages: ["gallery"] },
  { key: "allCategory", label: "All categories label", pages: ["gallery"] },
  { key: "filterByCategory", label: "Filter subtitle", pages: ["gallery"] },
  { key: "getInTouch", label: "Contact section title", pages: ["contact"] },
  { key: "phone", label: "Phone label", pages: ["contact"] },
  { key: "email", label: "Email label", pages: ["contact"] },
  { key: "address", label: "Address label", pages: ["contact"] },
  { key: "hours", label: "Hours label", pages: ["contact"] },
  { key: "mapTitle", label: "Map iframe title", pages: ["contact"] },
  { key: "mapDirections", label: "Map directions link", pages: ["contact"] },
  { key: "viewOnMap", label: "View on map link", pages: ["contact"] },
  { key: "scheduleTitle", label: "Schedule section title", pages: ["social-activities"] },
  { key: "scheduleSubtitle", label: "Schedule section subtitle", pages: ["social-activities"] },
  { key: "communityTitle", label: "Community section title", pages: ["social-activities"] },
];

export default function AdminPagesPage() {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>("en");
  const [pageKey, setPageKey] = useState<PageKey>("stay");
  const [content, setContent] = useState<PageContent>(emptyPage("stay", "en"));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchPageContent(locale, pageKey);
        setContent(data ?? emptyPage(pageKey, locale));
      } catch {
        toast.error("Failed to load page content");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [locale, pageKey]);

  const updateLabel = (key: keyof PageLabels, value: string) => {
    setContent({
      ...content,
      labels: { ...content.labels, [key]: value },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await savePageContent(locale, { ...content, pageKey, locale });
      toast.success("Page saved");
    } catch {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const pageLabels = LABEL_FIELDS.filter((f) => f.pages.includes(pageKey));

  if (loading) return <FormSkeleton />;

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold dark:text-white">Page Content</h1>
      <p className="mt-1 text-sm text-gray-500">Hero, intro, CTAs, labels, and SEO for each public page.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {LOCALES.map((l) => (
          <Button key={l} variant={locale === l ? "default" : "secondary"} size="sm" onClick={() => setLocale(l)}>
            {l.toUpperCase()}
          </Button>
        ))}
      </div>

      <div className="mt-4">
        <Label>Page</Label>
        <select
          value={pageKey}
          onChange={(e) => setPageKey(e.target.value as PageKey)}
          className="mt-1 w-full max-w-md rounded-lg border px-3 py-2 text-sm dark:bg-gray-800"
        >
          {PAGE_KEYS.map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </div>

      <div className="mt-6 space-y-8">
        <section className="rounded-2xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="font-semibold dark:text-white">Hero & Intro</h2>
          <div className="mt-4 grid gap-4">
            <div><Label>Hero Title</Label><Input value={content.heroTitle} onChange={(e) => setContent({ ...content, heroTitle: e.target.value })} className="mt-1" /></div>
            <div><Label>Hero Subtitle</Label><Textarea value={content.heroSubtitle || ""} onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })} className="mt-1" /></div>
            <div><Label>Hero Image</Label><ImageUploader folder="site" images={content.heroImage ? [content.heroImage] : []} onChange={(imgs) => setContent({ ...content, heroImage: imgs[0] || "" })} maxImages={1} className="mt-2" /></div>
            <div><Label>Page Intro</Label><Textarea value={content.intro || ""} onChange={(e) => setContent({ ...content, intro: e.target.value })} className="mt-1" /></div>
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="font-semibold dark:text-white">Buttons & CTAs</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><Label>Primary CTA Label</Label><Input value={content.ctaLabel || ""} onChange={(e) => setContent({ ...content, ctaLabel: e.target.value })} className="mt-1" /></div>
            <div><Label>Secondary CTA Label</Label><Input value={content.secondaryCtaLabel || ""} onChange={(e) => setContent({ ...content, secondaryCtaLabel: e.target.value })} className="mt-1" /></div>
          </div>
        </section>

        {pageLabels.length > 0 ? (
          <section className="rounded-2xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-semibold dark:text-white">Page Labels</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {pageLabels.map(({ key, label }) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Input value={content.labels?.[key] || ""} onChange={(e) => updateLabel(key, e.target.value)} className="mt-1" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="font-semibold dark:text-white">SEO</h2>
          <div className="mt-4 grid gap-4">
            <div><Label>Meta Title</Label><Input value={content.metaTitle || ""} onChange={(e) => setContent({ ...content, metaTitle: e.target.value })} className="mt-1" /></div>
            <div><Label>Meta Description</Label><Textarea value={content.metaDescription || ""} onChange={(e) => setContent({ ...content, metaDescription: e.target.value })} className="mt-1" /></div>
          </div>
        </section>

        <Button onClick={handleSave} disabled={saving} size="lg">{saving ? "Saving..." : "Save Page"}</Button>
      </div>
    </div>
  );
}
