"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchCafeContent, saveCafeContent } from "@/services/content.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormSkeleton } from "@/components/ui/skeleton";
import type { CafeContent } from "@/types";
import { Plus, Trash2, Coffee, Layers, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "vi"] as const;

const emptyCafe = (): CafeContent => ({
  title: "",
  subtitle: "",
  description: "",
  reserveCtaLabel: "",
  features: [],
  menuCategories: [],
  images: [],
});

type CafeTabType = "basics" | "features" | "menu";

export default function AdminCafePage() {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>("en");
  const [content, setContent] = useState<CafeContent>(emptyCafe());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<CafeTabType>("basics");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchCafeContent(locale);
        setContent(data ?? emptyCafe());
      } catch {
        toast.error("Failed to load cafe content");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [locale]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveCafeContent(locale, content);
      toast.success("Cafe content saved successfully!");
    } catch {
      toast.error("Failed to save cafe content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <FormSkeleton />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Eat & Drink</h1>
          <p className="mt-1 text-sm text-gray-500">Configure rooftop cafe narrative, food collections, highlights, and menu templates.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl dark:bg-gray-855 self-start sm:self-center">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={cn(
                "rounded-lg px-4 py-1.5 text-xs font-bold transition-all uppercase",
                locale === l
                  ? "bg-white text-primary shadow-sm dark:bg-gray-800 dark:text-white"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              )}
            >
              {l === "en" ? "English" : "Tiếng Việt"}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
        {/* Tab Navigation Header */}
        <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 px-4 pt-3 dark:border-gray-800 dark:bg-gray-950/20">
          {(["basics", "features", "menu"] as CafeTabType[]).map((tab) => (
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
              {tab === "basics" ? "1. Page Basics" : tab === "features" ? "2. Cafe Features" : "3. Menu Sections"}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Basics Tab */}
          {activeTab === "basics" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <Sparkles className="h-5 w-5" /> Restaurant & Cafe Intro
              </div>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="cafe-title">Section Title</Label>
                  <Input
                    id="cafe-title"
                    value={content.title || ""}
                    onChange={(e) => setContent({ ...content, title: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="cafe-sub">Section Subtitle</Label>
                  <Input
                    id="cafe-sub"
                    value={content.subtitle || ""}
                    onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="cafe-desc">Long Description Narrative</Label>
                  <Textarea
                    id="cafe-desc"
                    value={content.description || ""}
                    onChange={(e) => setContent({ ...content, description: e.target.value })}
                    className="mt-1.5"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="cafe-cta">Table Booking Button Label</Label>
                  <Input
                    id="cafe-cta"
                    value={content.reserveCtaLabel || ""}
                    onChange={(e) => setContent({ ...content, reserveCtaLabel: e.target.value })}
                    className="mt-1.5"
                    placeholder="e.g. Reserve Table"
                  />
                </div>
                <div>
                  <Label>Cafe Gallery Images</Label>
                  <p className="text-xs text-gray-400 mb-2">Display rooftop views, specialty coffee, and local Vietnamese dishes.</p>
                  <ImageUploader
                    folder="cafe"
                    images={content.images || []}
                    onChange={(imgs) => setContent({ ...content, images: imgs })}
                    maxImages={6}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Coffee className="h-5 w-5" /> Cozy Cafe Highlights
                </div>
                <Button size="sm" onClick={() => setContent({ ...content, features: [...content.features, { title: "", description: "", icon: "coffee" }] })} className="gap-1.5">
                  <Plus className="h-4 w-4" /> Add Feature
                </Button>
              </div>

              <div className="space-y-4">
                {content.features.map((f, i) => (
                  <Card key={i} className="border border-gray-200 p-5 dark:border-gray-800 dark:bg-gray-950/10 space-y-4 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">Feature Highlight {i + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setContent({ ...content, features: content.features.filter((_, j) => j !== i) })}
                        title="Delete Feature"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label>Feature Title</Label>
                        <Input
                          placeholder="e.g. Riverside Morning Sunrise"
                          value={f.title}
                          onChange={(e) => {
                            const features = [...content.features];
                            features[i] = { ...f, title: e.target.value };
                            setContent({ ...content, features });
                          }}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div>
                        <Label>Feature Icon Identifier (Lucide alias)</Label>
                        <Input
                          placeholder="e.g. coffee or waves"
                          value={f.icon}
                          onChange={(e) => {
                            const features = [...content.features];
                            features[i] = { ...f, icon: e.target.value };
                            setContent({ ...content, features });
                          }}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Short Narrative</Label>
                        <Textarea
                          placeholder="Provide a quick preview of this rooftop experience..."
                          value={f.description}
                          onChange={(e) => {
                            const features = [...content.features];
                            features[i] = { ...f, description: e.target.value };
                            setContent({ ...content, features });
                          }}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                {content.features.length === 0 && (
                  <div className="text-center py-12 text-gray-400 font-medium">
                    No highlights added yet. Click &ldquo;Add Feature&rdquo; to configure.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Menu Sections Tab */}
          {activeTab === "menu" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Layers className="h-5 w-5" /> Restaurant Menu Sections
                </div>
                <Button size="sm" onClick={() => setContent({ ...content, menuCategories: [...content.menuCategories, { name: "", items: [] }] })} className="gap-1.5">
                  <Plus className="h-4 w-4" /> Add Category
                </Button>
              </div>

              <div className="space-y-4">
                {content.menuCategories.map((cat, i) => (
                  <Card key={i} className="border border-gray-200 p-5 dark:border-gray-800 dark:bg-gray-950/10 space-y-4 relative">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">Menu Category {i + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setContent({ ...content, menuCategories: content.menuCategories.filter((_, j) => j !== i) })}
                        title="Delete Category"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label>Category Label Name</Label>
                        <Input
                          placeholder="e.g. Specialty Coffees or Main Dishes"
                          value={cat.name}
                          onChange={(e) => {
                            const menuCategories = [...content.menuCategories];
                            menuCategories[i] = { ...cat, name: e.target.value };
                            setContent({ ...content, menuCategories });
                          }}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <Label>Menu Items & Pricing (One item per line)</Label>
                          <span className="text-[10px] text-gray-400">Format: Cappuccino - $2.5 or Pho Bo - 45,000 VND</span>
                        </div>
                        <Textarea
                          placeholder="Cappuccino - $2.5&#10;Espresso - $2.0&#10;Vietnamese Milk Coffee - 25,000 VND"
                          value={cat.items.join("\n")}
                          onChange={(e) => {
                            const menuCategories = [...content.menuCategories];
                            menuCategories[i] = { ...cat, items: e.target.value.split("\n").filter(Boolean) };
                            setContent({ ...content, menuCategories });
                          }}
                          className="mt-1 font-mono text-sm bg-white dark:bg-gray-950"
                          rows={6}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                {content.menuCategories.length === 0 && (
                  <div className="text-center py-12 text-gray-400 font-medium">
                    No menu categories populated. Click &ldquo;Add Category&rdquo; to get started.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-950/20">
          <Button onClick={handleSave} disabled={saving} size="default" className="min-w-[120px]">
            {saving ? "Saving..." : "Save Cafe Content"}
          </Button>
          {activeTab !== "menu" && (
            <Button variant="outline" size="sm" onClick={() => {
              const tabs: CafeTabType[] = ["basics", "features", "menu"];
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
