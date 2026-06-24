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
import { RoomImageManager } from "@/components/admin/RoomImageManager";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import { useAdminI18n } from "@/components/admin/AdminI18nProvider";
import { useAdminToast } from "@/hooks/use-admin-toast";
import type { Room, RoomImage } from "@/types";
import { slugify, cn, formatPrice } from "@/lib/utils";
import { getRoomTitle, getRoomPrice } from "@/types";
import { extractStoragePathFromUrl } from "@/lib/firebase/storage";

const emptyRoom: Partial<Room> = {
  title: "",
  category: "Private Room",
  description: "",
  shortDescription: "",
  amenities: [],
  capacity: 2,
  price: 0,
  currency: "VND",
  images: [],
  roomImages: [],
  featured: false,
  order: 0,
  published: true,
  seoTitle: "",
  seoDescription: "",
};

type TabType = "basics" | "amenities" | "media" | "seo";

const CURRENT_ROOM_IDS = new Set([
  "deluxe-single-double",
  "deluxe-double-twin",
  "superior-double-twin",
  "deluxe-triple-room",
  "deluxe-4-bed-dorm",
  "deluxe-6-bed-dorm",
  "deluxe-6-bed-female-dorm",
  "deluxe-8-bed-dorm",
]);

function roomStorageId(room: Partial<Room>): string {
  const existingId = room.id || "";
  if (existingId && !existingId.startsWith("room-temp-")) return existingId;
  return room.slug || (room.title ? slugify(room.title) : "");
}

function isCurrentCatalogRoom(room: Partial<Room>): boolean {
  return CURRENT_ROOM_IDS.has(room.id || "") || CURRENT_ROOM_IDS.has(room.slug || "");
}

function isDormRoom(room: Partial<Room>): boolean {
  const value = `${room.title || ""} ${room.category || ""} ${room.slug || ""}`.toLowerCase();
  return value.includes("dorm") || value.includes("bed dorm") || value.includes("mixed") || value.includes("female");
}

function normalizeRoomImages(room: Partial<Room>): RoomImage[] {
  if (room.roomImages?.length) {
    return room.roomImages
      .map((img, index) => ({
        ...img,
        roomId: roomStorageId(room),
        sortOrder: img.sortOrder ?? index,
        isCover: img.isCover ?? index === 0,
      }))
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  return (room.images || []).map((url, index) => ({
    id: `legacy-${index}-${slugify(url).slice(0, 24)}`,
    imageUrl: url,
    imagePath: extractStoragePathFromUrl(url) || "",
    roomId: roomStorageId(room),
    sortOrder: index,
    isCover: index === 0,
    altText: `${room.title || "Room"} at Green Riverside Cosy Home`,
    title: room.title || "Room",
    description: `${room.title || "Room"} accommodation preview`,
    uploadedAt: new Date().toISOString(),
  }));
}

export default function AdminRoomsPage() {
  const { dict, locale } = useAdminI18n();
  const publicLocalePrefix = locale === "vi" ? "/vi" : "/en";
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
  const [showAllRooms, setShowAllRooms] = useState(false);
  const [showAdvancedBasics, setShowAdvancedBasics] = useState(false);

  const startEditing = (room: Partial<Room> | null) => {
    setEditing(room ? { ...room, roomImages: normalizeRoomImages(room) } : null);
    setActiveTab("basics");
  };

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      t.titleRequired();
      return;
    }
    setSaving(true);
    try {
      // Use existing ID unless it was a temporary ID
      const originalId = editing.id || "";
      const isTemp = originalId.startsWith("room-temp-");
      const id = !originalId || isTemp ? slugify(editing.slug || editing.title) : originalId;

      // Update roomImages roomId fields if they had a temporary ID
      const roomImages = (editing.roomImages || []).map((img) => ({
        ...img,
        roomId: id,
      }));

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
        currency: editing.currency || "VND",
        images: roomImages.map((img) => img.imageUrl),
        roomImages,
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
    } catch (error) {
      console.error("Failed to save room", error);
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
    } catch (error) {
      console.error("Failed to delete room", error);
      t.failedToDelete();
    }
  };

  if (loading) return <TableSkeleton />;

  // Derived variables for SEO tab
  const seoTitlePreview = editing?.seoTitle || editing?.title || "";
  const seoDescPreview = editing?.seoDescription || editing?.shortDescription || "";
  const currentRooms = rooms.filter(isCurrentCatalogRoom);
  const archivedRooms = rooms.filter((room) => !isCurrentCatalogRoom(room));
  const displayedRooms = showAllRooms || currentRooms.length === 0 ? rooms : currentRooms;
  const roomDict = dict.crud.rooms;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
            {roomDict.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{roomDict.subtitle}</p>
        </div>
        {!editing && (
          <Button onClick={() => startEditing({ ...emptyRoom, order: rooms.length + 1 })} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> {roomDict.new}
          </Button>
        )}
      </div>

      {editing && (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          {/* Tab Navigation Header */}
          <div className="flex flex-wrap border-b border-gray-200 bg-gray-50/50 px-4 pt-2 dark:border-gray-800 dark:bg-gray-950/20">
            {(["basics", "amenities", "media", "seo"] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "border-b-2 px-3 py-2 text-xs font-bold uppercase tracking-wide transition-all focus:outline-none focus:ring-0",
                  activeTab === tab
                    ? "border-primary text-primary dark:border-primary-dark"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                )}
              >
                {tab === "basics" ? roomDict.tabs.basics : tab === "amenities" ? roomDict.tabs.amenities : tab === "media" ? roomDict.tabs.media : roomDict.tabs.seo}
              </button>
            ))}
          </div>

          <div className="p-4 md:p-5 space-y-5">
            {/* 1. Basics Tab */}
            {activeTab === "basics" && (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                <div className="xl:col-span-3">
                  <Label htmlFor="room-title">{roomDict.form.title}</Label>
                  <Input
                    id="room-title"
                    placeholder={roomDict.form.titlePlaceholder}
                    value={editing.title || ""}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div className="xl:col-span-1">
                  <Label htmlFor="room-price">{roomDict.form.price}</Label>
                  <Input
                    id="room-price"
                    type="number"
                    placeholder={roomDict.form.pricePlaceholder}
                    value={editing.price ?? ""}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value), currency: "VND" })}
                    className="mt-1.5"
                  />
                </div>
                <div className="xl:col-span-1">
                  <Label htmlFor="room-cap">{roomDict.form.capacity}</Label>
                  <Input
                    id="room-cap"
                    type="number"
                    placeholder={roomDict.form.capacityPlaceholder}
                    value={editing.capacity ?? ""}
                    onChange={(e) => setEditing({ ...editing, capacity: Number(e.target.value) })}
                    className="mt-1.5"
                  />
                </div>
                <div className="flex items-end gap-5 xl:col-span-1">
                  <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                      checked={editing.featured ?? false}
                      onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    />
                    {roomDict.form.featured}
                  </label>
                  <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                      checked={editing.published ?? true}
                      onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                    />
                    {roomDict.form.published}
                  </label>
                </div>
                <div className="md:col-span-2 xl:col-span-3">
                  <Label htmlFor="room-short">{roomDict.form.shortDescription}</Label>
                  <Input
                    id="room-short"
                    placeholder={roomDict.form.shortDescriptionPlaceholder}
                    value={editing.shortDescription || ""}
                    onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="md:col-span-2 xl:col-span-3">
                  <Label htmlFor="room-desc">{roomDict.form.longDescription}</Label>
                  <Textarea
                    id="room-desc"
                    placeholder={roomDict.form.longDescriptionPlaceholder}
                    value={editing.description || ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                    className="mt-1.5"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2 xl:col-span-6 rounded-xl border border-dashed border-gray-200 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-950/30">
                  <button
                    type="button"
                    className="text-sm font-semibold text-primary hover:underline"
                    onClick={() => setShowAdvancedBasics((value) => !value)}
                  >
                    {showAdvancedBasics ? roomDict.form.hideAdvanced : roomDict.form.showAdvanced}
                  </button>
                  <p className="mt-1 text-xs text-gray-500">
                    {roomDict.form.advancedHelp}
                  </p>
                  {showAdvancedBasics && (
                    <div className="mt-3 grid gap-4 md:grid-cols-3">
                      <div>
                        <Label htmlFor="room-slug">{roomDict.form.slug}</Label>
                        <Input
                          id="room-slug"
                          placeholder={roomDict.form.slugPlaceholder}
                          value={editing.slug || ""}
                          onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="room-cat">{roomDict.form.category}</Label>
                        <Input
                          id="room-cat"
                          placeholder={roomDict.form.categoryPlaceholder}
                          value={editing.category || ""}
                          onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="room-order">{roomDict.form.order}</Label>
                        <Input
                          id="room-order"
                          type="number"
                          value={editing.order ?? ""}
                          onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. Amenities Tab */}
            {activeTab === "amenities" && (
              <div className="space-y-4">
                <Label htmlFor="room-amenities">{roomDict.form.amenitiesLabel}</Label>
                <Textarea
                  id="room-amenities"
                  placeholder={roomDict.form.amenitiesPlaceholder}
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
                <span className="text-xs text-gray-400 block">{roomDict.form.amenitiesHelp}</span>
              </div>
            )}

            {/* 3. Media Tab */}
            {activeTab === "media" && (
              <div>
                <Label className="text-base font-bold text-gray-800 dark:text-gray-200">{roomDict.form.mediaTitle}</Label>
                <p className="mb-4 text-xs text-gray-500">{roomDict.form.mediaHelp}</p>
                <RoomImageManager
                  roomId={roomStorageId(editing)}
                  roomTitle={editing.title || ""}
                  roomImages={editing.roomImages || []}
                  onChange={(roomImages) =>
                    setEditing({
                      ...editing,
                      roomImages,
                      images: roomImages.map((img) => img.imageUrl),
                    })
                  }
                />
              </div>
            )}

            {/* 4. SEO Tab */}
            {activeTab === "seo" && (
              <div className="space-y-6">
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex gap-3 text-sm text-primary">
                  <Sparkles className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{dict.common.seoTitle}</span>
                    <p className="mt-1 text-xs text-primary/80 leading-relaxed">{dict.common.seoHelp}</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="room-seo-title">{dict.common.customMetaTitle}</Label>
                      <span className={cn("text-xs font-bold", seoTitlePreview.length > 60 ? "text-rose-500" : "text-emerald-500")}>
                        {seoTitlePreview.length} / 60 {dict.common.characters}
                      </span>
                    </div>
                    <Input
                      id="room-seo-title"
                      placeholder="Deluxe Room with Scenic River View | Green Riverside"
                      value={editing.seoTitle || ""}
                      onChange={(e) => setEditing({ ...editing, seoTitle: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <Label htmlFor="room-seo-desc">{dict.common.customMetaDescription}</Label>
                      <span className={cn("text-xs font-bold", seoDescPreview.length > 160 || seoDescPreview.length < 120 ? "text-amber-500" : "text-emerald-500")}>
                        {seoDescPreview.length} / 160 {dict.common.characters} ({dict.common.idealLength})
                      </span>
                    </div>
                    <Textarea
                      id="room-seo-desc"
                      placeholder={dict.common.emptySeoDescription}
                      value={editing.seoDescription || ""}
                      onChange={(e) => setEditing({ ...editing, seoDescription: e.target.value })}
                      className="mt-1.5"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Google Snippet Simulator */}
                <div className="border-t border-gray-150 pt-5 dark:border-gray-800">
                  <Label className="text-sm font-semibold text-gray-500">{dict.common.seoPreview}</Label>
                  <div className="mt-2.5 rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-950/40">
                    <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                      <Globe className="h-3 w-3" /> https://greenriversidecosyhome.com &gt; stay &gt; {editing.slug || "deluxe-room"}
                    </p>
                    <h4 className="mt-1 text-lg font-medium text-blue-800 dark:text-blue-400 hover:underline cursor-pointer leading-tight">
                      {seoTitlePreview || dict.common.emptySeoTitle}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-normal">
                      {seoDescPreview || dict.common.emptySeoDescription}
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
                {dict.common.cancel}
              </Button>
            </div>
            {activeTab !== "seo" && (
              <Button variant="outline" size="sm" onClick={() => {
                const tabs: TabType[] = ["basics", "amenities", "media", "seo"];
                const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
                setActiveTab(tabs[nextIdx]);
              }}>
                {roomDict.form.next}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Grid of Rooms List */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
              {showAllRooms ? roomDict.list.allTitle : roomDict.list.currentTitle} ({displayedRooms.length})
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {showAllRooms
                ? roomDict.list.allHelp
                : roomDict.list.currentHelp}
            </p>
          </div>
          {archivedRooms.length > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowAllRooms((value) => !value)}
            >
              {showAllRooms ? roomDict.list.hideArchived : roomDict.list.showArchived.replace("{count}", String(archivedRooms.length))}
            </Button>
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayedRooms.map((room) => (
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
                    <span className="rounded bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">{dict.common.published}</span>
                  ) : (
                    <span className="rounded bg-gray-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">{dict.common.draft}</span>
                  )}
                  {room.featured && (
                    <span className="rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-white text-white" /> {dict.common.featured}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{getRoomTitle(room)}</h3>
                  <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider font-semibold">{room.category} - {roomDict.list.order}: {room.order} - {roomDict.list.capacity}: {room.capacity}</p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{room.shortDescription}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <span className="text-base font-extrabold text-primary dark:text-primary-dark">
                    {formatPrice(getRoomPrice(room), room.currency || "VND")} <span className="text-xs text-gray-400 font-normal">{isDormRoom(room) ? roomDict.list.perBed : roomDict.list.perNight}</span>
                  </span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => startEditing(room)} title={dict.common.edit}>
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                    <a href={`${publicLocalePrefix}/stay/${room.slug}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title={dict.common.viewPublicPage}>
                      <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(room.id)}
                      title={dict.common.delete}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {displayedRooms.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              {roomDict.list.empty}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
