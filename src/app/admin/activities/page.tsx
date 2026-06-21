"use client";

import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Calendar, Clock, Star } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  fetchActivities,
  saveActivity,
  deleteActivity,
} from "@/services/activities.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import type { Activity } from "@/types";
import { WEEK_DAYS } from "@/lib/constants";

const emptyActivity: Partial<Activity> = {
  title: "",
  description: "",
  dayOfWeek: "Monday",
  time: "7:00 PM",
  icon: "utensils",
  images: [],
  featured: false,
  order: 1,
};

export default function AdminActivitiesPage() {
  const fetchList = useCallback(
    async () => {
      try {
        return (await fetchActivities()).sort((a, b) => a.order - b.order);
      } catch {
        toast.error("Failed to load activities");
        return [] as Activity[];
      }
    },
    []
  );

  const { data: activities, loading, reload } = useAdminLoader(fetchList, [] as Activity[]);
  const [editing, setEditing] = useState<Partial<Activity> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const id = editing.id || editing.title.toLowerCase().replace(/\s+/g, "-");
      await saveActivity(id, {
        title: editing.title,
        name: editing.title,
        description: editing.description || "",
        dayOfWeek: editing.dayOfWeek || "Monday",
        time: editing.time || "7:00 PM",
        icon: editing.icon || "utensils",
        images: editing.images || [],
        featured: editing.featured ?? false,
        order: editing.order ?? activities.length + 1,
        updatedAt: new Date().toISOString(),
      });
      toast.success("Activity saved successfully!");
      setEditing(null);
      reload();
    } catch {
      toast.error("Failed to save activity");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      await deleteActivity(id);
      toast.success("Deleted successfully");
      reload();
    } catch {
      toast.error("Failed to delete activity");
    }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Community Activities</h1>
          <p className="mt-1 text-sm text-gray-500">Configure weekly social events, dinners, classes, and gatherings.</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing({ ...emptyActivity, order: activities.length + 1 })} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> Add Event / Activity
          </Button>
        )}
      </div>

      {editing && (
        <Card className="border border-primary/20 bg-primary/5 p-6 dark:border-gray-850 dark:bg-gray-900 overflow-hidden">
          <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-4">
            {editing.id ? "Edit Activity Details" : "Create New Community Event"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="act-title">Activity Title</Label>
              <Input
                id="act-title"
                value={editing.title || ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="e.g. Family Dinner Buffet"
              />
            </div>
            <div>
              <Label htmlFor="act-time">Schedule Time (e.g. 7:00 PM)</Label>
              <Input
                id="act-time"
                value={editing.time || ""}
                onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="7:00 PM"
              />
            </div>
            <div>
              <Label htmlFor="act-day">Day of Week</Label>
              <select
                id="act-day"
                value={editing.dayOfWeek || "Monday"}
                onChange={(e) => setEditing({ ...editing, dayOfWeek: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              >
                {WEEK_DAYS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="act-ord">Display Order</Label>
                <Input
                  id="act-ord"
                  type="number"
                  value={editing.order ?? 1}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                  className="mt-1.5 bg-white dark:bg-gray-950"
                />
              </div>
              <div className="flex items-center mt-6">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                    checked={editing.featured ?? false}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  />
                  Feature Event
                </label>
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="act-desc">Event Description</Label>
              <Textarea
                id="act-desc"
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                rows={3}
                placeholder="Describe what guests will enjoy during this gathering..."
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Event Cover Images</Label>
              <ImageUploader
                folder="activities"
                images={editing.images || []}
                onChange={(images) => setEditing({ ...editing, images })}
                className="mt-1.5"
              />
            </div>
          </div>
          <div className="mt-6 flex gap-2 border-t border-gray-150/50 pt-5 dark:border-gray-800">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Activity"}
            </Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Grid of Activities */}
      <div className="mt-8 space-y-4">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Seeded Weekly Events ({activities.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((a) => (
            <Card key={a.id} className="border border-gray-200 shadow-sm bg-white dark:border-gray-800 dark:bg-gray-900 overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                {a.images && a.images[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.images[0]} alt={a.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-gray-400"><Calendar className="h-8 w-8" /></div>
                )}
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="rounded bg-primary/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5" /> {a.dayOfWeek}
                  </span>
                  {a.featured && (
                    <span className="rounded bg-amber-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-white text-white" /> Featured
                    </span>
                  )}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-primary transition-colors">{a.title || a.name}</h3>
                  <p className="mt-1 text-xs text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-gray-450" /> {a.time} · Order: {a.order}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{a.description}</p>
                </div>
                <div className="flex items-center justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setEditing(a)} title="Edit Activity">
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(a.id, a.title || a.name || "Activity")}
                      title="Delete Activity"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {activities.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              No weekly activities found. Get started by creating one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
