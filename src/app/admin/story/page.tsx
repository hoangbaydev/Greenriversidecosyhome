"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchStoryContent, saveStoryContent } from "@/services/content.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { FormSkeleton } from "@/components/ui/skeleton";
import type { StoryContent, TimelineEvent } from "@/types";
import { Plus, Trash2, BookOpen, Clock, Settings, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const LOCALES = ["en", "vi"] as const;

const emptyStory = (): StoryContent => ({
  heroTitle: "",
  heroSubtitle: "",
  heroImage: "",
  homepagePreviewTitle: "",
  homepagePreviewSubtitle: "",
  homepagePreviewExcerpt: "",
  homepagePreviewImage: "",
  homepagePreviewCta: "",
  sectionTitles: {},
  founderStory: "",
  familyJourney: "",
  philosophy: "",
  natureFamilyCommunity: "",
  lifeAtGreenRiverside: "",
  timeline: [],
});

type StoryTabType = "hero" | "narratives" | "timeline";

export default function AdminStoryPage() {
  const [locale, setLocale] = useState<(typeof LOCALES)[number]>("en");
  const [content, setContent] = useState<StoryContent>(emptyStory());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<StoryTabType>("hero");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await fetchStoryContent(locale);
        setContent(data ?? emptyStory());
      } catch {
        toast.error("Failed to load story content");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [locale]);

  const updateTimeline = (index: number, field: keyof TimelineEvent, value: string) => {
    const timeline = [...content.timeline];
    timeline[index] = { ...timeline[index], [field]: value };
    setContent({ ...content, timeline });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveStoryContent(locale, content);
      toast.success("Story saved successfully!");
    } catch {
      toast.error("Failed to save story content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <FormSkeleton />;

  const st = content.sectionTitles ?? {};

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Our Story & History</h1>
          <p className="mt-1 text-sm text-gray-500">Configure public editorial narratives, founder stories, and the chronological timeline.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl dark:bg-gray-800 self-start sm:self-center">
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
          {(["hero", "narratives", "timeline"] as StoryTabType[]).map((tab) => (
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
              {tab === "hero" ? "1. Hero & Preview" : tab === "narratives" ? "2. Chapters & Narratives" : "3. Chronological Timeline"}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {/* Hero & Preview Tab */}
          {activeTab === "hero" && (
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Sparkles className="h-5 w-5" /> Story Header Block
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="story-hero-t">Hero Title</Label>
                    <Input
                      id="story-hero-t"
                      value={content.heroTitle || ""}
                      onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-hero-sub">Hero Subtitle</Label>
                    <Textarea
                      id="story-hero-sub"
                      value={content.heroSubtitle || ""}
                      onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Hero Banner Image</Label>
                    <ImageUploader
                      folder="site"
                      images={content.heroImage ? [content.heroImage] : []}
                      onChange={(imgs) => setContent({ ...content, heroImage: imgs[0] || "" })}
                      maxImages={1}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 dark:border-gray-800 space-y-4">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Settings className="h-5 w-5" /> Homepage Teaser Preview
                </div>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="story-teaser-t">Teaser Preview Title</Label>
                    <Input
                      id="story-teaser-t"
                      value={content.homepagePreviewTitle || ""}
                      onChange={(e) => setContent({ ...content, homepagePreviewTitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-teaser-sub">Teaser Preview Subtitle</Label>
                    <Input
                      id="story-teaser-sub"
                      value={content.homepagePreviewSubtitle || ""}
                      onChange={(e) => setContent({ ...content, homepagePreviewSubtitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-teaser-ex">Teaser Preview Excerpt</Label>
                    <Textarea
                      id="story-teaser-ex"
                      value={content.homepagePreviewExcerpt || ""}
                      onChange={(e) => setContent({ ...content, homepagePreviewExcerpt: e.target.value })}
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="story-teaser-cta">Teaser Button Label</Label>
                    <Input
                      id="story-teaser-cta"
                      value={content.homepagePreviewCta || ""}
                      onChange={(e) => setContent({ ...content, homepagePreviewCta: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>Teaser Preview Image</Label>
                    <ImageUploader
                      folder="site"
                      images={content.homepagePreviewImage ? [content.homepagePreviewImage] : []}
                      onChange={(imgs) => setContent({ ...content, homepagePreviewImage: imgs[0] || "" })}
                      maxImages={1}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Narratives Tab */}
          {activeTab === "narratives" && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                <BookOpen className="h-5 w-5" /> Editorial Chapters
              </div>
              <p className="text-xs text-gray-400">Configure localized narratives for dynamic website categories.</p>
              {[
                ["founderStory", "Founder Story"],
                ["familyJourney", "Family Journey"],
                ["philosophy", "Philosophy"],
                ["natureFamilyCommunity", "Nature, Family & Community"],
                ["lifeAtGreenRiverside", "Life at Green Riverside"],
              ].map(([key, label]) => (
                <Card key={key} className="border border-gray-150 p-5 dark:border-gray-800 dark:bg-gray-950/20 space-y-4">
                  <h3 className="font-heading font-bold text-gray-800 dark:text-gray-200">{label}</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor={`title-${key}`}>Chapter Heading</Label>
                      <Input
                        id={`title-${key}`}
                        value={st[key as keyof typeof st] || ""}
                        onChange={(e) => setContent({ ...content, sectionTitles: { ...st, [key]: e.target.value } })}
                        className="mt-1.5 bg-white dark:bg-gray-950"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`content-${key}`}>Chapter Body Content</Label>
                      <Textarea
                        id={`content-${key}`}
                        value={content[key as keyof StoryContent] as string}
                        onChange={(e) => setContent({ ...content, [key]: e.target.value })}
                        className="mt-1.5 bg-white dark:bg-gray-950 min-h-[140px]"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-lg">
                  <Clock className="h-5 w-5" /> History Timeline
                </div>
                <Button size="sm" onClick={() => setContent({ ...content, timeline: [...content.timeline, { year: "", title: "", description: "" }] })} className="gap-1.5">
                  <Plus className="h-4 w-4" /> Add Event
                </Button>
              </div>

              <div>
                <Label htmlFor="timeline-sec-t">Timeline Main Heading</Label>
                <Input
                  id="timeline-sec-t"
                  value={st.timeline || ""}
                  onChange={(e) => setContent({ ...content, sectionTitles: { ...st, timeline: e.target.value } })}
                  className="mt-1.5"
                />
              </div>

              <div className="space-y-4 mt-6">
                {content.timeline.map((event, i) => (
                  <Card key={i} className="border border-gray-200 p-5 dark:border-gray-800 dark:bg-gray-950/10 space-y-4 group relative">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-primary">Timeline Step {i + 1}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setContent({ ...content, timeline: content.timeline.filter((_, j) => j !== i) })}
                        title="Delete Step"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <Label>Year / Label</Label>
                        <Input
                          placeholder="e.g. 2018"
                          value={event.year}
                          onChange={(e) => updateTimeline(i, "year", e.target.value)}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>Event Title</Label>
                        <Input
                          placeholder="e.g. Homestead Construction"
                          value={event.title}
                          onChange={(e) => updateTimeline(i, "title", e.target.value)}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <Label>Detailed Description</Label>
                        <Textarea
                          placeholder="Describe the milestone or historical event..."
                          value={event.description}
                          onChange={(e) => updateTimeline(i, "description", e.target.value)}
                          className="mt-1.5 bg-white dark:bg-gray-950"
                          rows={2}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
                {content.timeline.length === 0 && (
                  <div className="text-center py-12 text-gray-400 font-medium">
                    No timeline events created yet. Add one to show chronological milestones.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-gray-950/20">
          <Button onClick={handleSave} disabled={saving} size="default" className="min-w-[120px]">
            {saving ? "Saving..." : "Save Story"}
          </Button>
          {activeTab !== "timeline" && (
            <Button variant="outline" size="sm" onClick={() => {
              const tabs: StoryTabType[] = ["hero", "narratives", "timeline"];
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
