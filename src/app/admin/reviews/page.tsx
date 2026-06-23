"use client";

import { useCallback, useState } from "react";
import { Plus, Trash2, Pencil, Star, Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  fetchReviews,
  saveReview,
  deleteReview,
} from "@/services/reviews.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import type { Review } from "@/types";
import { cn } from "@/lib/utils";

const emptyReview = (): Partial<Review> => ({
  author: "",
  rating: 5,
  source: "google",
  content: "",
  date: new Date().toISOString().split("T")[0],
  featured: true,
});

export default function AdminReviewsPage() {
  const fetchList = useCallback(async () => {
    try {
      return await fetchReviews();
    } catch {
      toast.error("Failed to load reviews");
      return [] as Review[];
    }
  }, []);

  const { data: reviews, loading, reload } = useAdminLoader(fetchList, [] as Review[]);
  const [editing, setEditing] = useState<Partial<Review> | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!editing?.author?.trim() || !editing.content?.trim()) {
      toast.error("Author and review content are required");
      return;
    }
    setSaving(true);
    try {
      const id = editing.id || Date.now().toString();
      await saveReview(id, {
        author: editing.author.trim(),
        content: editing.content.trim(),
        rating: editing.rating ?? 5,
        source: editing.source || "google",
        date: editing.date || new Date().toISOString().split("T")[0],
        featured: editing.featured ?? false,
      });
      toast.success("Review saved successfully!");
      setEditing(null);
      reload();
    } catch {
      toast.error("Failed to save review");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, author: string) => {
    if (!confirm(`Are you sure you want to delete the review by "${author}"?`)) return;
    try {
      await deleteReview(id);
      toast.success("Deleted successfully");
      reload();
    } catch {
      toast.error("Failed to delete review");
    }
  };

  if (loading) return <TableSkeleton />;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">Customer Reviews</h1>
          <p className="mt-1 text-sm text-gray-500">Manage reviews displayed on the website. Highlight best experiences from Google and Tripadvisor.</p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(emptyReview())} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> Add Review
          </Button>
        )}
      </div>

      {editing && (
        <Card className="border border-primary/20 bg-primary/5 p-6 dark:border-gray-800 dark:bg-gray-900 max-w-2xl">
          <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white mb-4">
            {editing.id ? "Edit Review Details" : "Create New Review Entry"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="rev-author">Author Name</Label>
              <Input
                id="rev-author"
                value={editing.author || ""}
                onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="e.g. John Doe"
              />
            </div>
            <div>
              <Label htmlFor="rev-rating">Star Rating (1 - 5)</Label>
              <Input
                id="rev-rating"
                type="number"
                min={1}
                max={5}
                value={editing.rating ?? 5}
                onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                className="mt-1.5 bg-white dark:bg-gray-950"
              />
            </div>
            <div>
              <Label htmlFor="rev-src">Source Channel</Label>
              <select
                id="rev-src"
                value={editing.source || "google"}
                onChange={(e) => setEditing({ ...editing, source: e.target.value as Review["source"] })}
                className="mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-white"
              >
                <option value="google">Google Reviews</option>
                <option value="tripadvisor">Tripadvisor</option>
              </select>
            </div>
            <div>
              <Label htmlFor="rev-date">Review Date</Label>
              <Input
                id="rev-date"
                type="date"
                value={editing.date || ""}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="rev-content">Review Feedback Text</Label>
              <Textarea
                id="rev-content"
                value={editing.content || ""}
                onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950 min-h-[100px]"
                placeholder="Write the text of the review here..."
              />
            </div>
            <div className="sm:col-span-2 flex items-center mt-2">
              <label className="flex items-center gap-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5"
                  checked={editing.featured ?? false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Feature on Homepage Slider
              </label>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Review"}
            </Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Reviews list grid */}
      <div className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">Active Reviews List ({reviews.length})</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.id} className="border border-gray-200 shadow-sm bg-white dark:border-gray-800 dark:bg-gray-900 p-5 flex flex-col justify-between group relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={cn(
                          "h-4 w-4",
                          idx < r.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-250 dark:text-gray-700"
                        )}
                      />
                    ))}
                  </div>
                  <span className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide shadow-sm",
                    r.source === "google"
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  )}>
                    {r.source}
                  </span>
                </div>
                <div className="relative">
                  <MessageSquare className="absolute -top-1 -left-2 h-8 w-8 text-gray-100 dark:text-gray-800/40 -z-0 transform -scale-x-100" />
                  <p className="relative z-10 text-sm italic text-gray-650 dark:text-gray-300 leading-relaxed pl-2 line-clamp-4">
                    &ldquo;{r.content}&rdquo;
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-4 flex items-center justify-between dark:border-gray-800">
                <div className="min-w-0">
                  <p className="font-heading font-semibold text-sm text-gray-900 dark:text-white truncate">{r.author}</p>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 mt-0.5">
                    <Calendar className="h-3 w-3" /> {r.date || "No Date"}
                    {r.featured && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-0.25 text-[8px] font-extrabold text-amber-700">FEATURED</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-0.5 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" onClick={() => setEditing(r)} title="Edit Review">
                    <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(r.id, r.author)}
                    title="Delete Review"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
          {reviews.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-400 font-medium">
              No reviews available yet. Click &ldquo;Add Review&rdquo; to seed client comments.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
