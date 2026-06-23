"use client";

import { useCallback, useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, Sparkles, MapPin, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { fetchAllTours, saveTour, deleteTour } from "@/services/tours.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import type { Tour, TourFaqItem, TourTimelineItem } from "@/types";
import { slugify, cn } from "@/lib/utils";
import { getTourTitle, getTourPrice } from "@/types";

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function timelineToText(items: TourTimelineItem[] = []): string {
  return items.map((item) => `${item.time} | ${item.title}`).join("\n");
}

function parseTimeline(text: string): TourTimelineItem[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [time, ...rest] = line.split("|");
      return { time: time?.trim() || "", title: rest.join("|").trim() };
    })
    .filter((item) => item.time && item.title);
}

function faqToText(items: TourFaqItem[] = []): string {
  return items.map((item) => `${item.question} | ${item.answer}`).join("\n");
}

function parseFaq(text: string): TourFaqItem[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [question, ...rest] = line.split("|");
      return { question: question?.trim() || "", answer: rest.join("|").trim() };
    })
    .filter((item) => item.question && item.answer);
}

type TabType = "basics" | "experience" | "media" | "seo";

export default function AdminToursPage() {
  const fetchList = useCallback(async () => {
    try {
      return (await fetchAllTours()).sort((a, b) => a.order - b.order);
    } catch {
      toast.error("Failed to load tours");
      return [] as Tour[];
    }
  }, []);

  const { data: tours, loading, reload } = useAdminLoader(fetchList, [] as Tour[]);
  const [editing, setEditing] = useState<Partial<Tour> | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("basics");
  const [timelineText, setTimelineText] = useState("");
  const [faqText, setFaqText] = useState("");
  const [saving, setSaving] = useState(false);

  const startEditing = (tour: Partial<Tour> | null) => {
    setEditing(tour);
    setActiveTab("basics");
    if (tour) {
      setTimelineText(timelineToText(tour.timeline));
      setFaqText(faqToText(tour.faq));
    } else {
      setTimelineText("");
      setFaqText("");
    }
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const id = editing.id || slugify(editing.title);
      await saveTour(id, {
        slug: editing.slug || slugify(editing.title),
        title: editing.title,
        name: editing.title,
        description: editing.description || "",
        shortDescription: editing.shortDescription || "",
        duration: editing.duration || "Full Day",
        price: editing.price ?? 0,
        priceFrom: editing.price ?? 0,
        currency: editing.currency || "VND",
        highlights: editing.highlights || [],
        images: editing.images || [],
        featured: editing.featured ?? false,
        order: editing.order ?? tours.length + 1,
        published: editing.published ?? true,
        heroLabel: editing.heroLabel || "",
        departure: editing.departure || "",
        returnTime: editing.returnTime || "",
        priceUsdApprox: editing.priceUsdApprox || undefined,
        overviewHeading: editing.overviewHeading || "",
        overviewText: editing.overviewText || "",
        overviewImage: editing.overviewImage || "",
        timeline: parseTimeline(timelineText),
        included: editing.included || [],
        excluded: editing.excluded || [],
        whatToBring: editing.whatToBring || [],
        faq: parseFaq(faqText),
        childDiscountNote: editing.childDiscountNote || "",
        galleryImages: editing.galleryImages || [],
        ctaHeading: editing.ctaHeading || "",
        ctaSubheading: editing.ctaSubheading || "",
        ctaImage: editing.ctaImage || "",
        seoTitle: editing.seoTitle || "",
        seoDescription: editing.seoDescription || "",
        createdAt: editing.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      toast.success("Tour saved successfully!");
      startEditing(null);
      reload();
    } catch {
      toast.error("Failed to save tour");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <TableSkeleton />;

  // Derived variables for SEO tab
  const seoTitlePreview = editing?.seoTitle || editing?.title || "";
  const seoDescPreview = editing?.seoDescription || editing?.shortDescription || "";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Tours & Experiences</h1>
          <p className="mt-1 text-sm text-gray-500">Configure catalog prices, detailed itineraries, highlights, and custom SEO configurations.</p>
        </div>
        {!editing && (
          <Button onClick={() => startEditing({ currency: "VND", order: tours.length + 1 })} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> Add New Tour
          </Button>
        )}
      </div>

      {editing && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          {/* Tab Navigation Header */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 px-4 pt-3 dark:border-gray-800 dark:bg-gray-950/20">
            {(["basics", "experience", "media", "seo"] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "border-b-2 px-4 py-2.5 text-sm font-semibold capitalize transition-all focus:outline-none focus:ring-0",
                  activeTab === tab
                    ? "border-primary text-primary dark:border-primary-dark"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                {tab === "basics" ? "1. Basics" : tab === "experience" ? "2. Details & Timeline" : tab === "media" ? "3. Media" : "4. SEO Options"}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            {/* 1. Basics Tab */}
            {activeTab === "basics" && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="tour-title">Tour Title</Label>
                  <Input
                    id="tour-title"
                    placeholder="e.g. Half-Day Phong Nha Cave Tour"
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="tour-slug">URL Slug</Label>
                  <Input
                    id="tour-slug"
                    placeholder="e.g. phong-nha-cave-half-day"
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="tour-duration">Duration</Label>
                  <Input
                    id="tour-duration"
                    placeholder="e.g. Half Day or 2 Days 1 Night"
                    value={editing.duration || ""}
                    onChange={(e) => setEditing({ ...editing, duration: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tour-price">Price (VND)</Label>
                    <Input
                      id="tour-price"
                      type="number"
                      placeholder="650000"
                      value={editing.price ?? ""}
                      onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tour-price-usd">Approx USD Price</Label>
                    <Input
                      id="tour-price-usd"
                      type="number"
                      placeholder="e.g. 28"
                      value={editing.priceUsdApprox ?? ""}
                      onChange={(e) => setEditing({ ...editing, priceUsdApprox: Number(e.target.value) || undefined })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="tour-order">Display Order</Label>
                  <Input
                    id="tour-order"
                    type="number"
                    value={editing.order ?? ""}
                    onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div className="flex items-center gap-6 mt-8 sm:col-span-2">
                  <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                      checked={editing.featured ?? false}
                      onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    />
                    Feature on Homepage
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                      checked={editing.published ?? true}
                      onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                    />
                    Publish Live
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-short">Short Summary (Hero / Catalog List)</Label>
                  <Input
                    id="tour-short"
                    placeholder="Short highlight hook for listings..."
                    value={editing.shortDescription || ""}
                    onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-desc">Long Description (Fallback summary)</Label>
                  <Textarea
                    id="tour-desc"
                    placeholder="Fallback description content if details are unavailable..."
                    value={editing.description || ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* 2. Details Tab */}
            {activeTab === "experience" && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="tour-hero-lbl">Hero Category Label</Label>
                  <Input
                    id="tour-hero-lbl"
                    placeholder="e.g. Classic Tour or Adventure Tour"
                    value={editing.heroLabel || ""}
                    onChange={(e) => setEditing({ ...editing, heroLabel: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tour-dep">Departure Time</Label>
                    <Input
                      id="tour-dep"
                      placeholder="e.g. 2:30 PM"
                      value={editing.departure || ""}
                      onChange={(e) => setEditing({ ...editing, departure: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tour-ret">Return Time</Label>
                    <Input
                      id="tour-ret"
                      placeholder="e.g. 7:00 PM"
                      value={editing.returnTime || ""}
                      onChange={(e) => setEditing({ ...editing, returnTime: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-child-disc">Child & Ticket Policy Notes</Label>
                  <Input
                    id="tour-child-disc"
                    placeholder="e.g. Children under 1.3 meters are free of charge."
                    value={editing.childDiscountNote || ""}
                    onChange={(e) => setEditing({ ...editing, childDiscountNote: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-highlights">Highlights (comma-separated list)</Label>
                  <Input
                    id="tour-highlights"
                    placeholder="Highlight 1, Highlight 2, Highlight 3..."
                    value={(editing.highlights || []).join(", ")}
                    onChange={(e) => setEditing({ ...editing, highlights: splitList(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2 border-t border-gray-100 pt-5 dark:border-gray-800">
                  <h3 className="font-heading font-semibold text-gray-800 dark:text-gray-200">Editorial Section</h3>
                </div>
                <div>
                  <Label htmlFor="tour-over-heading">Overview Section Heading</Label>
                  <Input
                    id="tour-over-heading"
                    placeholder="e.g. Overview"
                    value={editing.overviewHeading || ""}
                    onChange={(e) => setEditing({ ...editing, overviewHeading: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-over-txt">Overview Text Blocks (use double line breaks for paragraph breaks)</Label>
                  <Textarea
                    id="tour-over-txt"
                    placeholder="Detailed introduction narrative for the tour detail page..."
                    value={editing.overviewText || ""}
                    onChange={(e) => setEditing({ ...editing, overviewText: e.target.value })}
                    className="mt-1.5"
                    rows={6}
                  />
                </div>
                <div className="sm:col-span-2 border-t border-gray-100 pt-5 dark:border-gray-800">
                  <h3 className="font-heading font-semibold text-gray-800 dark:text-gray-200">Itinerary Timeline</h3>
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <Label htmlFor="tour-timeline">Itinerary List (Format: Time | Title)</Label>
                    <span className="text-xs text-gray-400">One timeline step per line</span>
                  </div>
                  <Textarea
                    id="tour-timeline"
                    placeholder="2:30 PM | Pick-Up from Accommodation&#10;3:00 PM | Son River Cruise&#10;4:30 PM | Explore Phong Nha Cave"
                    value={timelineText}
                    onChange={(e) => setTimelineText(e.target.value)}
                    className="mt-1 font-mono text-sm"
                    rows={8}
                  />
                </div>
                <div className="sm:col-span-2 border-t border-gray-100 pt-5 dark:border-gray-800">
                  <h3 className="font-heading font-semibold text-gray-800 dark:text-gray-200">Package Rules & What to Bring</h3>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-inc">Inclusions (comma separated)</Label>
                  <Input
                    id="tour-inc"
                    placeholder="English guide, Buggy, Lunch, Water..."
                    value={(editing.included || []).join(", ")}
                    onChange={(e) => setEditing({ ...editing, included: splitList(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-exc">Exclusions (comma separated)</Label>
                  <Input
                    id="tour-exc"
                    placeholder="Tips, Personal expenses..."
                    value={(editing.excluded || []).join(", ")}
                    onChange={(e) => setEditing({ ...editing, excluded: splitList(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="tour-bring">What To Bring (comma separated)</Label>
                  <Input
                    id="tour-bring"
                    placeholder="Comfortable shoes, Swimwear, Sunscreen..."
                    value={(editing.whatToBring || []).join(", ")}
                    onChange={(e) => setEditing({ ...editing, whatToBring: splitList(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2 border-t border-gray-100 pt-5 dark:border-gray-800">
                  <Label htmlFor="tour-faq">Tour FAQ Accordions (Format: Question | Answer)</Label>
                  <Textarea
                    id="tour-faq"
                    placeholder="How do I book? | Message Ms. Linh on WhatsApp for quick scheduling.&#10;Is lunch included? | Yes, a full local lunch is included."
                    value={faqText}
                    onChange={(e) => setFaqText(e.target.value)}
                    className="mt-1.5 font-mono text-sm"
                    rows={5}
                  />
                </div>
              </div>
            )}

            {/* 3. Media Tab */}
            {activeTab === "media" && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-bold text-gray-800 dark:text-gray-200">Main Tour Images</Label>
                  <p className="text-xs text-gray-400 mb-2">First image serves as the main hero banner of the tour.</p>
                  <ImageUploader
                    folder="tours"
                    images={editing.images || []}
                    onChange={(images) => setEditing({ ...editing, images })}
                    className="mt-2"
                  />
                </div>
                <div className="border-t border-gray-100 pt-5 dark:border-gray-800">
                  <Label className="text-base font-bold text-gray-800 dark:text-gray-200">Extra Gallery Images</Label>
                  <p className="text-xs text-gray-400 mb-2">Sub-gallery grid displaying tourist snaps or scenery snaps.</p>
                  <ImageUploader
                    folder="tours"
                    images={editing.galleryImages || []}
                    onChange={(galleryImages) => setEditing({ ...editing, galleryImages })}
                    className="mt-2"
                  />
                </div>
              </div>
            )}

            {/* 4. SEO Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-3 text-sm text-primary">
                  <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Search Engine Optimization</span>
                    <p className="mt-1 text-xs text-primary/80 leading-relaxed">Customize your metadata specifically for Google, Bing, and Facebook crawls. If left empty, these fields will fall back automatically to the Tour Title and Short Description.</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="tour-seo-title">Custom Meta Title</Label>
                      <span className={cn("text-xs font-bold", seoTitlePreview.length > 60 ? "text-rose-500" : "text-emerald-500")}>
                        {seoTitlePreview.length} / 60 characters
                      </span>
                    </div>
                    <Input
                      id="tour-seo-title"
                      placeholder="e.g. Half-Day Phong Nha Cave Tour & Countryside Farm | Linh Linh"
                      value={editing.seoTitle || ""}
                      onChange={(e) => setEditing({ ...editing, seoTitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="tour-seo-desc">Custom Meta Description</Label>
                      <span className={cn("text-xs font-bold", seoDescPreview.length > 160 || seoDescPreview.length < 120 ? "text-amber-500" : "text-emerald-500")}>
                        {seoDescPreview.length} / 160 characters (ideal: 120-160)
                      </span>
                    </div>
                    <Textarea
                      id="tour-seo-desc"
                      placeholder="Enter a custom meta description for search result snippet..."
                      value={editing.seoDescription || ""}
                      onChange={(e) => setEditing({ ...editing, seoDescription: e.target.value })}
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Google Snippet Simulator */}
                <div className="border-t border-gray-150 pt-5 dark:border-gray-800">
                  <Label className="text-sm font-semibold text-gray-500">Google Search Result Mock Preview</Label>
                  <div className="mt-2.5 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950/40">
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                      <Globe className="h-3 w-3" /> https://greenriversidecosyhome.com &gt; tours &gt; {editing.slug || "phong-nha"}
                    </p>
                    <h4 className="mt-1 text-lg font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer leading-tight">
                      {seoTitlePreview || "Please enter details to populate snippet..."}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-normal">
                      {seoDescPreview || "Description snippet preview details will display here."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Button Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-950/20">
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={saving} size="default" className="min-w-[100px]">
                {saving ? "Saving..." : "Save Tour"}
              </Button>
              <Button variant="ghost" onClick={() => startEditing(null)}>
                Cancel
              </Button>
            </div>
            {activeTab !== "seo" && (
              <Button variant="outline" size="sm" onClick={() => {
                const tabs: TabType[] = ["basics", "experience", "media", "seo"];
                const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
                setActiveTab(tabs[nextIdx]);
              }}>
                Next Step &rarr;
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Grid of Tours list */}
      <div className="mt-8 space-y-4">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Active Tours Catalog ({tours.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <Card key={tour.id} className="border border-gray-200 shadow-sm bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {tour.images && tour.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={tour.images[0]} alt={tour.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400"><MapPin className="h-8 w-8" /></div>
                )}
                {/* Status Badges Overlay */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {tour.published ? (
                    <span className="rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">Published</span>
                  ) : (
                    <span className="rounded bg-gray-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">Draft</span>
                  )}
                  {tour.featured && (
                    <span className="rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-white text-white" /> Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{getTourTitle(tour)}</h3>
                  <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider font-semibold">{tour.duration} · Order: {tour.order}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{tour.shortDescription}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <span className="text-base font-extrabold text-primary dark:text-primary-dark">
                    {getTourPrice(tour).toLocaleString()} {tour.currency || "VND"}
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(tour)} title="Edit Tour">
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                    <a href={`/tours/${tour.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="View Public Page">
                      <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${getTourTitle(tour)}"?`)) {
                          deleteTour(tour.id)
                            .then(reload)
                            .then(() => toast.success("Deleted successfully"));
                        }
                      }}
                      title="Delete Tour"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
