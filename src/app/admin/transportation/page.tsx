"use client";

import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Truck, ArrowRight, Eye, Star } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  fetchAllTransportation,
  saveTransportation,
  deleteTransportation,
} from "@/services/transportation.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import type { Transportation } from "@/types";
import { slugify } from "@/lib/utils";

const emptyItem: Partial<Transportation> = {
  title: "",
  price: 0,
  route: "",
  description: "",
  featured: false,
  published: true,
  order: 1,
  icon: "car",
};

export default function AdminTransportationPage() {
  const fetchList = useCallback(
    async () => {
      try {
        return (await fetchAllTransportation()).sort((a, b) => a.order - b.order);
      } catch {
        toast.error("Failed to load transportation options");
        return [] as Transportation[];
      }
    },
    []
  );

  const { data: items, loading, reload } = useAdminLoader(fetchList, [] as Transportation[]);
  const [editing, setEditing] = useState<Partial<Transportation> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.title?.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const id = editing.id || slugify(editing.title);
      await saveTransportation(id, {
        slug: slugify(editing.title),
        title: editing.title,
        name: editing.title,
        description: editing.description || "",
        shortDescription: editing.shortDescription || editing.route || "",
        price: editing.price ?? 0,
        priceFrom: editing.price ?? 0,
        route: editing.route || "",
        currency: "USD",
        icon: editing.icon || "car",
        featured: editing.featured ?? false,
        order: editing.order ?? items.length + 1,
        published: editing.published ?? true,
        createdAt: editing.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      toast.success("Transportation option saved!");
      setEditing(null);
      reload();
    } catch {
      toast.error("Failed to save option");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteTransportation(id);
      toast.success("Deleted successfully");
      reload();
    } catch {
      toast.error("Failed to delete option");
    }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Transportation Routes</h1>
          <p className="mt-1 text-sm text-gray-500">Configure private cars, shared shuttle buses, airport pickups, and motorcycle rentals.</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing({ ...emptyItem, order: items.length + 1 })} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> Add Route / Option
          </Button>
        )}
      </div>

      {editing && (
        <Card className="border border-primary/20 bg-primary/5 p-6 dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-4">
            {editing.id ? "Edit Transportation Options" : "Add New Transport Route"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="trans-title">Service Title</Label>
              <Input
                id="trans-title"
                placeholder="e.g. Private Car Transfer"
                value={editing.title || ""}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="trans-price">Price (USD)</Label>
                <Input
                  id="trans-price"
                  type="number"
                  placeholder="35"
                  value={editing.price ?? ""}
                  onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                  className="mt-1.5 bg-white dark:bg-gray-950"
                />
              </div>
              <div>
                <Label htmlFor="trans-order">Display Order</Label>
                <Input
                  id="trans-order"
                  type="number"
                  value={editing.order ?? 1}
                  onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })}
                  className="mt-1.5 bg-white dark:bg-gray-950"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="trans-route">Route Summary (e.g. Dong Hoi Airport → Phong Nha)</Label>
              <Input
                id="trans-route"
                value={editing.route || ""}
                onChange={(e) => setEditing({ ...editing, route: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="Dong Hoi Airport → Phong Nha"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="trans-desc">Service Description / Inclusions</Label>
              <Textarea
                id="trans-desc"
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                rows={3}
                placeholder="Describe route schedules, car types, capacity, and pick-up details..."
              />
            </div>
            <div className="flex items-center gap-6 sm:col-span-2 mt-2">
              <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                  checked={editing.featured ?? false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Feature Route
              </label>
              <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                  checked={editing.published ?? true}
                  onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                />
                Publish Route
              </label>
            </div>
          </div>
          <div className="mt-6 flex gap-2 border-t border-gray-150/50 pt-5 dark:border-gray-800">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Service"}
            </Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Grid of items */}
      <div className="mt-8 space-y-4">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Active Transport Options ({items.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="border border-gray-200 shadow-sm bg-white dark:border-gray-800 dark:bg-gray-900 p-5 flex flex-col justify-between group relative overflow-hidden">
              {/* Overlay featured badge */}
              <div className="absolute top-3 right-3 flex gap-1.5">
                {item.published ? (
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">Published</span>
                ) : (
                  <span className="rounded bg-gray-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gray-700">Draft</span>
                )}
                {item.featured && (
                  <span className="rounded bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-700 flex items-center gap-0.5">
                    <Star className="h-2.5 w-2.5 fill-amber-700 text-amber-700" /> Featured
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary-dark/20">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 dark:text-white leading-tight">{item.title || item.name}</h3>
                    <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Order: {item.order}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-2.5 rounded-lg border border-gray-150/40 dark:bg-gray-950/40 dark:border-gray-800/40 text-xs font-semibold text-gray-650 dark:text-gray-300 flex items-center gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" /> Route: {item.route || "No Route Specified"}
                </div>

                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-4 flex items-center justify-between dark:border-gray-800">
                <span className="text-lg font-extrabold text-primary dark:text-primary-dark">
                  ${item.price ?? item.priceFrom} <span className="text-[10px] text-gray-400 font-normal">USD</span>
                </span>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(item)} title="Edit Options">
                    <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <a href="/transportation" target="_blank" rel="noopener noreferrer" className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" title="View Public Page">
                    <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(item.id, item.title || item.name || "Route")}
                    title="Delete Option"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 font-medium">
              No transportation routes defined yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
