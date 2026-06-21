"use client";

import { useCallback, useState } from "react";
import { Plus, Pencil, Trash2, Star, Eye, Sparkles, Bed, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  fetchAllRooms,
  saveRoom,
  deleteRoom,
} from "@/services/rooms.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import { useAdminDict } from "@/components/admin/AdminI18nProvider";
import { useAdminToast } from "@/hooks/use-admin-toast";
import type { Room } from "@/types";
import { slugify, cn } from "@/lib/utils";
import { getRoomTitle, getRoomPrice } from "@/types";

const emptyRoom: Partial<Room> = {
  title: "",
  category: "Private Room",
  description: "",
  shortDescription: "",
  amenities: [],
  capacity: 2,
  price: 0,
  currency: "USD",
  images: [],
  featured: false,
  order: 0,
  published: true,
  seoTitle: "",
  seoDescription: "",
};

type TabType = "basics" | "amenities" | "media" | "seo";

export default function AdminRoomsPage() {
  const dict = useAdminDict();
  const t = useAdminToast();
  const fetchList = useCallback(async () => {
    try {
      return (await fetchAllRooms()).sort((a, b) => a.order - b.order);
    } catch {
      t.failedToLoad();
      return [] as Room[];
    }
  }, [t]);

  const { data: rooms, loading, reload } = useAdminLoader(fetchList, [] as Room[]);
  const [editing, setEditing] = useState<Partial<Room> | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("basics");
  const [saving, setSaving] = useState(false);

  const startEditing = (room: Partial<Room> | null) => {
    setEditing(room);
    setActiveTab("basics");
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      t.titleRequired();
      return;
    }
    setSaving(true);
    try {
      const id = editing.id || slugify(editing.title);
      const room: Omit<Room, "id"> = {
        slug: editing.slug || slugify(editing.title),
        title: editing.title,
        name: editing.title,
        category: editing.category || "Room",
        description: editing.description || "",
        shortDescription: editing.shortDescription || "",
        amenities: editing.amenities || [],
        capacity: editing.capacity ?? 2,
        occupancy: editing.capacity ?? 2,
        price: editing.price ?? 0,
        priceFrom: editing.price ?? 0,
        currency: editing.currency || "USD",
        images: editing.images || [],
        featured: editing.featured ?? false,
        order: editing.order ?? rooms.length + 1,
        published: editing.published ?? true,
        seoTitle: editing.seoTitle || "",
        seoDescription: editing.seoDescription || "",
        createdAt: editing.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveRoom(id, room);
      t.saved();
      startEditing(null);
      reload();
    } catch {
      t.failedToSave();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!t.confirmDelete()) return;
    try {
      await deleteRoom(id);
      t.deleted();
      reload();
    } catch {
      t.failedToDelete();
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
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
            {dict.crud.rooms.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">Manage overnight accommodations, configure categories, pricing, features, and meta SEO parameters.</p>
        </div>
        {!editing && (
          <Button onClick={() => startEditing({ ...emptyRoom, order: rooms.length + 1 })} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> {dict.crud.rooms.new}
          </Button>
        )}
      </div>

      {editing && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          {/* Tab Navigation Header */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 px-4 pt-3 dark:border-gray-800 dark:bg-gray-950/20">
            {(["basics", "amenities", "media", "seo"] as TabType[]).map((tab) => (
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
                {tab === "basics" ? "1. Room Basics" : tab === "amenities" ? "2. Amenities" : tab === "media" ? "3. Media Upload" : "4. SEO Controls"}
              </button>
            ))}
          </div>

          <div className="p-6 space-y-6">
            {/* 1. Basics Tab */}
            {activeTab === "basics" && (
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <Label htmlFor="room-title">Room Title</Label>
                  <Input
                    id="room-title"
                    placeholder="e.g. Deluxe River View Room"
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="room-slug">URL Slug</Label>
                  <Input
                    id="room-slug"
                    placeholder="e.g. deluxe-river-view"
                    value={editing.slug || ""}
                    onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="room-cat">Category</Label>
                  <Input
                    id="room-cat"
                    placeholder="e.g. Private Room or Dormitory"
                    value={editing.category || ""}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="room-price">Price Per Night (USD)</Label>
                    <Input
                      id="room-price"
                      type="number"
                      placeholder="e.g. 35"
                      value={editing.price ?? ""}
                      onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="room-cap">Adult Capacity</Label>
                    <Input
                      id="room-cap"
                      type="number"
                      placeholder="e.g. 2"
                      value={editing.capacity ?? ""}
                      onChange={(e) => setEditing({ ...editing, capacity: Number(e.target.value) })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="room-order">Display Order</Label>
                  <Input
                    id="room-order"
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
                  <Label htmlFor="room-short">Short Description (for listings / hero cards)</Label>
                  <Input
                    id="room-short"
                    placeholder="Short highlight hook summary..."
                    value={editing.shortDescription || ""}
                    onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="room-desc">Long Description</Label>
                  <Textarea
                    id="room-desc"
                    placeholder="Detailed explanation of the room layouts, beds, and views..."
                    value={editing.description || ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="mt-1.5"
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* 2. Amenities Tab */}
            {activeTab === "amenities" && (
              <div className="space-y-4">
                <Label htmlFor="room-amenities">Amenities / Room Features (comma separated list)</Label>
                <Textarea
                  id="room-amenities"
                  placeholder="Air conditioning, Hot shower, Mountain view, Private balcony, Free Wi-Fi..."
                  value={(editing.amenities || []).join(", ")}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      amenities: e.target.value
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean),
                    })
                  }
                  className="mt-1.5"
                  rows={4}
                />
                <span className="text-xs text-gray-400 block">Separate amenities with commas. They will be formatted dynamically as checked bullet items on the room details page.</span>
              </div>
            )}

            {/* 3. Media Tab */}
            {activeTab === "media" && (
              <div>
                <Label className="text-base font-bold text-gray-800 dark:text-gray-200">Room Media Gallery</Label>
                <p className="text-xs text-gray-400 mb-2">Upload visual assets. The first asset serves as the primary room card cover.</p>
                <ImageUploader
                  folder="rooms"
                  images={editing.images || []}
                  onChange={(images) => setEditing({ ...editing, images })}
                  className="mt-2"
                />
              </div>
            )}

            {/* 4. SEO Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-3 text-sm text-primary">
                  <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Search Engine Optimization</span>
                    <p className="mt-1 text-xs text-primary/80 leading-relaxed">Customize metadata explicitly for Google Search crawls. Defaults automatically to the Room Title and Short Description if left empty.</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="room-seo-title">Custom Meta Title</Label>
                      <span className={cn("text-xs font-bold", seoTitlePreview.length > 60 ? "text-rose-500" : "text-emerald-500")}>
                        {seoTitlePreview.length} / 60 characters
                      </span>
                    </div>
                    <Input
                      id="room-seo-title"
                      placeholder="e.g. Deluxe Room with Scenic River View | Green Riverside"
                      value={editing.seoTitle || ""}
                      onChange={(e) => setEditing({ ...editing, seoTitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="room-seo-desc">Custom Meta Description</Label>
                      <span className={cn("text-xs font-bold", seoDescPreview.length > 160 || seoDescPreview.length < 120 ? "text-amber-500" : "text-emerald-500")}>
                        {seoDescPreview.length} / 160 characters (ideal: 120-160)
                      </span>
                    </div>
                    <Textarea
                      id="room-seo-desc"
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
                  <div className="mt-2.5 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-850 dark:bg-gray-950/40">
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                      <Globe className="h-3 w-3" /> https://greenriversidecosyhome.com &gt; stay &gt; {editing.slug || "deluxe-room"}
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
                {saving ? dict.common.saving : dict.common.save}
              </Button>
              <Button variant="ghost" onClick={() => startEditing(null)}>
                Cancel
              </Button>
            </div>
            {activeTab !== "seo" && (
              <Button variant="outline" size="sm" onClick={() => {
                const tabs: TabType[] = ["basics", "amenities", "media", "seo"];
                const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
                setActiveTab(tabs[nextIdx]);
              }}>
                Next Step &rarr;
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Grid of Rooms List */}
      <div className="mt-8 space-y-4">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Available Rooms ({rooms.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room.id} className="border border-gray-200 shadow-sm bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {room.images && room.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={room.images[0]} alt={room.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400"><Bed className="h-8 w-8" /></div>
                )}
                {/* Status Badges Overlay */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {room.published ? (
                    <span className="rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">Published</span>
                  ) : (
                    <span className="rounded bg-gray-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">Draft</span>
                  )}
                  {room.featured && (
                    <span className="rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-white text-white" /> Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{getRoomTitle(room)}</h3>
                  <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider font-semibold">{room.category} · Order: {room.order} · Max Guests: {room.capacity}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{room.shortDescription}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <span className="text-base font-extrabold text-primary dark:text-primary-dark">
                    ${getRoomPrice(room)} <span className="text-xs text-gray-400 font-normal">/ night</span>
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(room)} title="Edit Room">
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                    <a href={`/stay/${room.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="View Public Page">
                      <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(room.id)}
                      title="Delete Room"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {rooms.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No rooms yet. Add your first room to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
