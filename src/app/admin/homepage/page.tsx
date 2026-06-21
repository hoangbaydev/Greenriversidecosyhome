"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  fetchHomepageContent,
  saveHomepageContent,
} from "@/services/homepage.service";
import { fetchAllRooms } from "@/services/rooms.service";
import { fetchAllTours } from "@/services/tours.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormSkeleton } from "@/components/ui/skeleton";
import type { HomepageContent, Room, Tour, WhyChooseItem } from "@/types";
import { normalizeHomepage } from "@/types";
import { Plus, Trash2, Heart, Layers, Layout, Star, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const defaultContent: HomepageContent = {
  heroTitle: "",
  heroSubtitle: "",
  heroImage: "",
  heroEyebrow: "",
  heroPillars: [],
  heroScrollHint: "",
  primaryCtaLabel: "",
  primaryCtaMessageType: "book_room",
  secondaryCtaLabel: "",
  secondaryCtaLink: "",
  whyChooseTitle: "",
  whyChooseItems: [],
  featuredRoomIds: [],
  featuredTourIds: [],
  finalCtaTitle: "",
  finalCtaSubtitle: "",
  sections: {},
};

type HomeTabType = "hero" | "whychoose" | "featured" | "headings";

export default function AdminHomepagePage() {
  const [content, setContent] = useState<HomepageContent>(defaultContent);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<HomeTabType>("hero");

  useEffect(() => {
    async function load() {
      try {
        const [homepage, allRooms, allTours] = await Promise.all([
          fetchHomepageContent(),
          fetchAllRooms(),
          fetchAllTours(),
        ]);
        setContent(homepage ? normalizeHomepage(homepage) : defaultContent);
        setRooms(allRooms);
        setTours(allTours);
      } catch {
        toast.error("Failed to load homepage content");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateWhyChoose = (index: number, field: keyof WhyChooseItem, value: string) => {
    const items = [...content.whyChooseItems];
    items[index] = { ...items[index], [field]: value };
    setContent({ ...content, whyChooseItems: items });
  };

  const addWhyChoose = () => {
    setContent({
      ...content,
      whyChooseItems: [
        ...content.whyChooseItems,
        { title: "", description: "", icon: "heart" },
      ],
    });
  };

  const updateSection = (
    key: keyof NonNullable<HomepageContent["sections"]>,
    field: "title" | "subtitle" | "ctaLabel",
    value: string
  ) => {
    setContent({
      ...content,
      sections: {
        ...content.sections,
        [key]: { ...content.sections?.[key], [field]: value },
      },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveHomepageContent({
        ...content,
        heroHeadline: content.heroTitle,
        heroSubheadline: content.heroSubtitle,
      });
      toast.success("Homepage content saved successfully!");
    } catch {
      toast.error("Failed to save homepage content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Homepage Configuration</h1>
          <p className="mt-1 text-sm text-gray-500">Customize the hero banner, brand values, featured catalog displays, and block captions.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        {/* Tab Navigation Header */}
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 px-4 pt-3 dark:border-gray-800 dark:bg-gray-950/20">
          {(["hero", "whychoose", "featured", "headings"] as HomeTabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 px-4 py-2.5 text-sm font-semibold capitalize transition-all focus:outline-none focus:ring-0",
                activeTab === tab
                  ? "border-primary text-primary dark:border-primary-dark"
                  : "border-transparent text-gray-500 hover:text-gray-750 dark:text-gray-400 dark:hover:text-gray-250"
              )}
            >
              {tab === "hero" ? "1. Hero Banner" : tab === "whychoose" ? "2. Brand Values" : tab === "featured" ? "3. Featured Slider" : "4. Section Headings"}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Hero Tab */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <Sparkles className="h-5 w-5" /> Homepage Hero Setup
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="home-hero-t">Hero Main Title</Label>
                  <Input
                    id="home-hero-t"
                    value={content.heroTitle || ""}
                    onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="home-hero-sub">Hero Subtitle</Label>
                  <Textarea
                    id="home-hero-sub"
                    value={content.heroSubtitle || ""}
                    onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Hero Background Image</Label>
                  <ImageUploader
                    folder="hero"
                    images={content.heroImage ? [content.heroImage] : []}
                    onChange={(imgs) => setContent({ ...content, heroImage: imgs[0] || "" })}
                    maxImages={1}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="home-hero-p-cta">Primary CTA Button Label</Label>
                    <Input
                      id="home-hero-p-cta"
                      value={content.primaryCtaLabel || ""}
                      onChange={(e) => setContent({ ...content, primaryCtaLabel: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="home-hero-p-msg">Primary CTA WhatsApp Message Type</Label>
                    <Input
                      id="home-hero-p-msg"
                      value={content.primaryCtaMessageType || ""}
                      onChange={(e) => setContent({ ...content, primaryCtaMessageType: e.target.value })}
                      className="mt-1.5"
                      placeholder="book_room"
                    />
                  </div>
                  <div>
                    <Label htmlFor="home-hero-s-cta">Secondary CTA Button Label</Label>
                    <Input
                      id="home-hero-s-cta"
                      value={content.secondaryCtaLabel || ""}
                      onChange={(e) => setContent({ ...content, secondaryCtaLabel: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="home-hero-s-link">Secondary CTA Link Route</Label>
                    <Input
                      id="home-hero-s-link"
                      value={content.secondaryCtaLink || ""}
                      onChange={(e) => setContent({ ...content, secondaryCtaLink: e.target.value })}
                      className="mt-1.5"
                      placeholder="e.g. /tours"
                    />
                  </div>
                  <div>
                    <Label htmlFor="home-hero-eyebrow">Hero Eyebrow Label</Label>
                    <Input
                      id="home-hero-eyebrow"
                      value={content.heroEyebrow || ""}
                      onChange={(e) => setContent({ ...content, heroEyebrow: e.target.value })}
                      className="mt-1.5"
                      placeholder="e.g. Phong Nha, Vietnam"
                    />
                  </div>
                  <div>
                    <Label htmlFor="home-hero-scroll">Scroll Hint Text</Label>
                    <Input
                      id="home-hero-scroll"
                      value={content.heroScrollHint || ""}
                      onChange={(e) => setContent({ ...content, heroScrollHint: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="home-hero-pillars">Hero Pillars list (One word per line)</Label>
                    <Textarea
                      id="home-hero-pillars"
                      value={(content.heroPillars || []).join("\n")}
                      onChange={(e) => setContent({ ...content, heroPillars: e.target.value.split("\n").filter(Boolean) })}
                      className="mt-1.5 font-mono text-sm"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Why Choose Us Tab */}
          {activeTab === "whychoose" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Heart className="h-5 w-5" /> Brand Key Values
                </div>
                <Button size="sm" onClick={addWhyChoose} className="gap-1.5">
                  <Plus className="h-4 w-4" /> Add Item
                </Button>
              </div>

              <div>
                <Label htmlFor="why-title">Why Choose Us Block Title</Label>
                <Input
                  id="why-title"
                  value={content.whyChooseTitle || ""}
                  onChange={(e) => setContent({ ...content, whyChooseTitle: e.target.value })}
                  className="mt-1.5"
                />
              </div>

              <div className="space-y-4">
                {content.whyChooseItems.map((item, i) => (
                  <Card key={i} className="border border-gray-205 p-5 dark:border-gray-800 dark:bg-gray-950/10 space-y-4 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">Value Item {i + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setContent({ ...content, whyChooseItems: content.whyChooseItems.filter((_, j) => j !== i) })}
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Value Title</Label>
                        <Input
                          placeholder="e.g. Riverside View"
                          value={item.title}
                          onChange={(e) => updateWhyChoose(i, "title", e.target.value)}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div>
                        <Label>Lucide Icon ID</Label>
                        <Input
                          placeholder="e.g. heart or waves"
                          value={item.icon}
                          onChange={(e) => updateWhyChoose(i, "icon", e.target.value)}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Value description narrative</Label>
                        <Textarea
                          placeholder="Provide a quick summary narrative..."
                          value={item.description}
                          onChange={(e) => updateWhyChoose(i, "description", e.target.value)}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                {content.whyChooseItems.length === 0 && (
                  <div className="text-center py-12 text-gray-400 font-medium">
                    No value parameters added yet. Click &ldquo;Add Item&rdquo; to configure.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Featured Content Tab */}
          {activeTab === "featured" && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Star className="h-5 w-5" /> Homepage Featured Catalog Cards
                </div>
                <p className="text-xs text-gray-400">Select which accommodation units and tours to feature on the homepage.</p>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="font-semibold text-gray-700 dark:text-gray-300">Feature Accommodation Rooms (Hold Ctrl to select multiple)</Label>
                    <select
                      multiple
                      value={content.featuredRoomIds}
                      onChange={(e) => setContent({ ...content, featuredRoomIds: Array.from(e.target.selectedOptions, (o) => o.value) })}
                      className="mt-1.5 h-44 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
                    >
                      {rooms.map((r) => (
                        <option key={r.id} value={r.id}>{r.title || r.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="font-semibold text-gray-700 dark:text-gray-300">Feature Tour Packages (Hold Ctrl to select multiple)</Label>
                    <select
                      multiple
                      value={content.featuredTourIds}
                      onChange={(e) => setContent({ ...content, featuredTourIds: Array.from(e.target.selectedOptions, (o) => o.value) })}
                      className="mt-1.5 h-44 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
                    >
                      {tours.map((t) => (
                        <option key={t.id} value={t.id}>{t.title || t.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 dark:border-gray-800 space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Layout className="h-5 w-5" /> Final CTA Section
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="home-fcta-t">FCTA Main Title</Label>
                    <Input
                      id="home-fcta-t"
                      value={content.finalCtaTitle || ""}
                      onChange={(e) => setContent({ ...content, finalCtaTitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="home-fcta-sub">FCTA Subtitle</Label>
                    <Input
                      id="home-fcta-sub"
                      value={content.finalCtaSubtitle || ""}
                      onChange={(e) => setContent({ ...content, finalCtaSubtitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Headings Tab */}
          {activeTab === "headings" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <Layers className="h-5 w-5" /> Page Block Layout Headings
              </div>
              <p className="text-xs text-gray-400">Configure headings, descriptions, and dynamic listing link tags for each homepage section.</p>
              <div className="grid gap-6 sm:grid-cols-2">
                {(["story", "accommodation", "tours", "cafe", "activities", "reviews", "gallery", "blog", "contact"] as const).map((key) => (
                  <Card key={key} className="border border-gray-150 p-5 dark:border-gray-800 dark:bg-gray-950/20 space-y-4">
                    <h3 className="font-heading font-bold text-gray-850 dark:text-gray-250 capitalize">{key.replace("-", " ")} Block</h3>
                    <div className="grid gap-3">
                      <div>
                        <Label>Block Heading</Label>
                        <Input
                          placeholder="Block Title"
                          value={content.sections?.[key]?.title || ""}
                          onChange={(e) => updateSection(key, "title", e.target.value)}
                          className="mt-1 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div>
                        <Label>Block Description / Subtitle</Label>
                        <Input
                          placeholder="Block Subtitle"
                          value={content.sections?.[key]?.subtitle || ""}
                          onChange={(e) => updateSection(key, "subtitle", e.target.value)}
                          className="mt-1 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div>
                        <Label>Block View-All Button Label</Label>
                        <Input
                          placeholder="CTA Label"
                          value={content.sections?.[key]?.ctaLabel || ""}
                          onChange={(e) => updateSection(key, "ctaLabel", e.target.value)}
                          className="mt-1 bg-white dark:bg-gray-950"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-950/20">
          <Button onClick={handleSave} disabled={saving} size="default" className="min-w-[120px]">
            {saving ? "Saving..." : "Save Homepage"}
          </Button>
          {activeTab !== "headings" && (
            <Button variant="outline" size="sm" onClick={() => {
              const tabs: HomeTabType[] = ["hero", "whychoose", "featured", "headings"];
              const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
              setActiveTab(tabs[nextIdx]);
            }}>
              Next Step &rarr;
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
