"use client";

import { useCallback, useState } from "react";
import { Trash2, Image as ImageIcon, Filter, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  fetchGalleryItems,
  saveGalleryItem,
  deleteGalleryItem,
} from "@/services/gallery.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import type { GalleryItem, GalleryCategory } from "@/types";
import { cn } from "@/lib/utils";

const CATEGORIES: GalleryCategory[] = [
  "rooms", "cafe", "food", "tours", "activities", "nature", "sunset", "community",
];

export default function AdminGalleryPage() {
  const fetchList = useCallback(
    async () => {
      try {
        return (await fetchGalleryItems()).sort((a, b) => a.order - b.order);
      } catch {
        toast.error("Failed to load gallery items");
        return [] as GalleryItem[];
      }
    },
    []
  );

  const { data: items, loading, reload } = useAdminLoader(fetchList, [] as GalleryItem[]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("rooms");
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<GalleryCategory | "all">("all");
  const [saving, setSaving] = useState(false);

  const handleAddBatch = async () => {
    if (!pendingImages.length) {
      toast.error("Upload at least one image");
      return;
    }
    setSaving(true);
    try {
      for (let i = 0; i < pendingImages.length; i++) {
        const id = `${Date.now()}-${i}`;
        await saveGalleryItem(id, {
          title: title.trim() || `Image ${items.length + i + 1}`,
          category,
          imageUrl: pendingImages[i],
          order: items.length + i + 1,
          featured: false,
          createdAt: new Date().toISOString(),
        });
      }
      toast.success(`${pendingImages.length} image(s) successfully added to gallery!`);
      setTitle("");
      setPendingImages([]);
      reload();
    } catch {
      toast.error("Failed to save gallery items");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from the gallery?`)) return;
    try {
      await deleteGalleryItem(id);
      toast.success("Image removed from gallery");
      reload();
    } catch {
      toast.error("Failed to delete image");
    }
  };

  if (loading) return <TableSkeleton />;

  const filteredItems = activeFilter === "all"
    ? items
    : items.filter((item) => item.category === activeFilter);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Media Gallery</h1>
          <p className="mt-1 text-sm text-gray-500">Configure photo streams displayed across dynamic site components.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <Card className="border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-1">
              <Sparkles className="h-4.5 w-4.5 text-primary" /> Upload Media
            </h2>
            <p className="text-xs text-gray-400 mb-4">Add single or multiple high-definition photos directly to selected collections.</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="gal-title">Title (optional)</Label>
                <Input
                  id="gal-title"
                  placeholder="e.g. Sunny morning by the river"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="gal-cat">Gallery Collection Category</Label>
                <select
                  id="gal-cat"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as GalleryCategory)}
                  className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white capitalize"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Media Source Files</Label>
                <ImageUploader
                  folder="gallery"
                  images={pendingImages}
                  onChange={setPendingImages}
                  className="mt-1.5"
                  maxImages={12}
                />
              </div>
              <Button
                onClick={handleAddBatch}
                className="w-full mt-2"
                disabled={!pendingImages.length || saving}
              >
                {saving ? "Saving..." : `Save ${pendingImages.length || ""} Image(s)`}
              </Button>
            </div>
          </Card>
        </div>

        {/* Gallery Catalog Grid with category filters */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Filter className="h-4.5 w-4.5 text-primary" /> Gallery Stream ({filteredItems.length})
            </h2>
            <div className="flex flex-wrap gap-1 bg-gray-100 p-1 rounded-xl dark:bg-gray-800 self-start">
              <button
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all",
                  activeFilter === "all"
                    ? "bg-white text-primary shadow-sm dark:bg-gray-800 dark:text-white"
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                )}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveFilter(c)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all",
                    activeFilter === c
                      ? "bg-white text-primary shadow-sm dark:bg-gray-800 dark:text-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 flex flex-col justify-between group shadow-sm hover:shadow transition-all"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3.5">
                  <div className="min-w-0 pr-2">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate" title={item.title}>
                      {item.title}
                    </p>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Order: {item.order}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id, item.title)}
                    title="Remove Photo"
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </Card>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-full py-16 text-center text-gray-400 font-medium">
                <ImageIcon className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                No photos in this category yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
