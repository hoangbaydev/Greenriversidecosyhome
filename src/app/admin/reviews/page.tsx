"use client";

import { useCallback, useState } from "react";
import { Calendar, ExternalLink, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { fetchReviews, saveReview, deleteReview } from "@/services/reviews.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TableSkeleton } from "@/components/ui/skeleton";
import { useAdminLoader } from "@/hooks/use-admin-loader";
import type { Review } from "@/types";
import { cn } from "@/lib/utils";

const BOOKING_URL =
  "https://www.booking.com/hotel/vn/greenriver-guesthouse-and-restaurant.html";

const reviewSources: { value: Review["source"]; label: string }[] = [
  { value: "booking", label: "Booking.com" },
  { value: "airbnb", label: "Airbnb" },
  { value: "tripadvisor", label: "Tripadvisor" },
  { value: "hostelworld", label: "Hostelworld" },
  { value: "google", label: "Google Reviews" },
];

const emptyReview = (displayOrder: number): Partial<Review> => ({
  guestName: "",
  author: "",
  country: "",
  countryFlag: "",
  avatar: "",
  source: "booking",
  sourceUrl: BOOKING_URL,
  rating: 10,
  reviewTitle: "",
  reviewText: "",
  content: "",
  reviewDate: new Date().toISOString().split("T")[0],
  date: new Date().toISOString().split("T")[0],
  roomType: "",
  stayDuration: "",
  travellerType: "",
  featured: true,
  displayOrder,
  language: "en",
});

function getName(review: Partial<Review>) {
  return review.guestName || review.author || "";
}

function getText(review: Partial<Review>) {
  return review.reviewText || review.content || "";
}

function getDate(review: Partial<Review>) {
  return review.reviewDate || review.date || "";
}

function sourceLabel(source: Review["source"]) {
  return reviewSources.find((item) => item.value === source)?.label ?? source;
}

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
    const guestName = getName(editing ?? {}).trim();
    const reviewText = getText(editing ?? {}).trim();

    if (!guestName || !reviewText) {
      toast.error("Guest name and review text are required");
      return;
    }

    setSaving(true);
    try {
      const id = editing?.id || Date.now().toString();
      const date = getDate(editing ?? {}) || new Date().toISOString().split("T")[0];
      const source = editing?.source || "booking";
      const sourceUrl = editing?.sourceUrl?.trim() || (source === "booking" ? BOOKING_URL : "");

      await saveReview(id, {
        guestName,
        author: guestName,
        country: editing?.country?.trim() || "",
        countryFlag: editing?.countryFlag?.trim() || "",
        avatar: editing?.avatar?.trim() || "",
        avatarUrl: editing?.avatar?.trim() || editing?.avatarUrl || "",
        source,
        sourceUrl,
        rating: Number(editing?.rating ?? 10),
        reviewTitle: editing?.reviewTitle?.trim() || "",
        reviewText,
        content: reviewText,
        reviewDate: date,
        date,
        roomType: editing?.roomType?.trim() || "",
        stayDuration: editing?.stayDuration?.trim() || "",
        travellerType: editing?.travellerType?.trim() || "",
        featured: editing?.featured ?? false,
        displayOrder: Number(editing?.displayOrder ?? editing?.order ?? reviews.length + 1),
        order: Number(editing?.displayOrder ?? editing?.order ?? reviews.length + 1),
        language: editing?.language || "en",
      });

      toast.success("Review saved successfully");
      setEditing(null);
      reload();
    } catch {
      toast.error("Failed to save review");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, guestName: string) => {
    if (!confirm(`Delete the review by "${guestName}"?`)) return;
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
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
        <div>
          <h1 className="font-heading text-3xl font-bold text-gray-900 dark:text-white">
            Guest Reviews
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add verified guest reviews from Booking.com, Airbnb, Hostelworld, Tripadvisor, and Google.
          </p>
        </div>
        {!editing && (
          <Button onClick={() => setEditing(emptyReview(reviews.length + 1))} size="default" className="gap-2">
            <Plus className="h-4 w-4" /> Add Review
          </Button>
        )}
      </div>

      {editing && (
        <Card className="border border-primary/20 bg-primary/5 p-6 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-1 border-b border-primary/10 pb-4 dark:border-gray-800">
            <h2 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
              {editing.id ? "Edit Review" : "Create Review"}
            </h2>
            <p className="text-xs text-gray-500">
              Use the official Booking.com URL unless you later have a direct review link.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <Label htmlFor="rev-name">Guest Name</Label>
              <Input
                id="rev-name"
                value={getName(editing)}
                onChange={(e) => setEditing({ ...editing, guestName: e.target.value, author: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="e.g. Emily"
              />
            </div>
            <div>
              <Label htmlFor="rev-country">Country</Label>
              <Input
                id="rev-country"
                value={editing.country || ""}
                onChange={(e) => setEditing({ ...editing, country: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="Australia"
              />
            </div>
            <div>
              <Label htmlFor="rev-flag">Country Flag</Label>
              <Input
                id="rev-flag"
                value={editing.countryFlag || ""}
                onChange={(e) => setEditing({ ...editing, countryFlag: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="AU"
              />
            </div>
            <div>
              <Label htmlFor="rev-rating">Rating</Label>
              <Input
                id="rev-rating"
                type="number"
                min={1}
                max={10}
                step={0.1}
                value={editing.rating ?? 10}
                onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="9.6 or 5"
              />
            </div>

            <div>
              <Label htmlFor="rev-source">Source</Label>
              <select
                id="rev-source"
                value={editing.source || "booking"}
                onChange={(e) => {
                  const source = e.target.value as Review["source"];
                  setEditing({
                    ...editing,
                    source,
                    sourceUrl: source === "booking" && !editing.sourceUrl ? BOOKING_URL : editing.sourceUrl,
                  });
                }}
                className="mt-1.5 min-h-12 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white"
              >
                {reviewSources.map((source) => (
                  <option key={source.value} value={source.value}>
                    {source.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="rev-date">Review Date</Label>
              <Input
                id="rev-date"
                type="date"
                value={getDate(editing)}
                onChange={(e) => setEditing({ ...editing, reviewDate: e.target.value, date: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
              />
            </div>
            <div>
              <Label htmlFor="rev-order">Display Order</Label>
              <Input
                id="rev-order"
                type="number"
                value={editing.displayOrder ?? editing.order ?? ""}
                onChange={(e) => setEditing({ ...editing, displayOrder: Number(e.target.value), order: Number(e.target.value) })}
                className="mt-1.5 bg-white dark:bg-gray-950"
              />
            </div>
            <div>
              <Label htmlFor="rev-language">Language</Label>
              <Input
                id="rev-language"
                value={editing.language || "en"}
                onChange={(e) => setEditing({ ...editing, language: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="en"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="rev-url">Source URL</Label>
              <Input
                id="rev-url"
                value={editing.sourceUrl || ""}
                onChange={(e) => setEditing({ ...editing, sourceUrl: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder={BOOKING_URL}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="rev-avatar">Avatar URL</Label>
              <Input
                id="rev-avatar"
                value={editing.avatar || editing.avatarUrl || ""}
                onChange={(e) => setEditing({ ...editing, avatar: e.target.value, avatarUrl: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="Optional image URL"
              />
            </div>

            <div>
              <Label htmlFor="rev-room">Room Type</Label>
              <Input
                id="rev-room"
                value={editing.roomType || ""}
                onChange={(e) => setEditing({ ...editing, roomType: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="Deluxe Double Room"
              />
            </div>
            <div>
              <Label htmlFor="rev-stay">Stay Duration</Label>
              <Input
                id="rev-stay"
                value={editing.stayDuration || ""}
                onChange={(e) => setEditing({ ...editing, stayDuration: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="2 nights"
              />
            </div>
            <div>
              <Label htmlFor="rev-traveller">Traveller Type</Label>
              <Input
                id="rev-traveller"
                value={editing.travellerType || ""}
                onChange={(e) => setEditing({ ...editing, travellerType: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="Couple / Solo / Family"
              />
            </div>
            <div className="flex items-end">
              <label className="flex min-h-12 cursor-pointer items-center gap-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  className="h-4.5 w-4.5 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={editing.featured ?? false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                />
                Featured on Homepage
              </label>
            </div>

            <div className="md:col-span-2 xl:col-span-4">
              <Label htmlFor="rev-title">Review Title</Label>
              <Input
                id="rev-title"
                value={editing.reviewTitle || ""}
                onChange={(e) => setEditing({ ...editing, reviewTitle: e.target.value })}
                className="mt-1.5 bg-white dark:bg-gray-950"
                placeholder="Exceptional stay by the river"
              />
            </div>
            <div className="md:col-span-2 xl:col-span-4">
              <Label htmlFor="rev-text">Review Text</Label>
              <Textarea
                id="rev-text"
                value={getText(editing)}
                onChange={(e) => setEditing({ ...editing, reviewText: e.target.value, content: e.target.value })}
                className="mt-1.5 min-h-[130px] bg-white dark:bg-gray-950"
                placeholder="Paste the verified review text here..."
              />
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

      <div className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
          Active Reviews ({reviews.length})
        </h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => {
            const name = getName(review);
            const text = getText(review);
            const sourceUrl = review.sourceUrl || (review.source === "booking" ? BOOKING_URL : "");

            return (
              <Card
                key={review.id}
                className="group flex flex-col justify-between overflow-hidden border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-heading text-base font-bold text-gray-900 dark:text-white">
                        {name}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Order {review.displayOrder ?? review.order ?? "-"} - {review.countryFlag ? `${review.countryFlag} ` : ""}
                        {review.country || "No country"}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-primary">
                      {sourceLabel(review.source)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={cn(
                            "h-4 w-4",
                            idx < (review.rating > 5 ? Math.round(review.rating / 2) : Math.round(review.rating))
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-250 dark:text-gray-700"
                          )}
                        />
                      ))}
                    </div>
                    <span className="font-heading text-xl font-semibold text-primary">
                      {review.rating > 5 ? `${review.rating}/10` : `${review.rating}/5`}
                    </span>
                  </div>

                  {review.reviewTitle ? (
                    <p className="font-semibold text-gray-900 dark:text-white">{review.reviewTitle}</p>
                  ) : null}
                  <p className="line-clamp-4 text-sm leading-relaxed text-gray-650 dark:text-gray-300">
                    &ldquo;{text}&rdquo;
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div className="min-w-0 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    <p className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {getDate(review) || "No date"}
                    </p>
                    {review.featured ? (
                      <p className="mt-1 text-amber-700 dark:text-amber-400">Featured</p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 gap-0.5 opacity-80 transition-opacity group-hover:opacity-100">
                    {sourceUrl ? (
                      <Button variant="ghost" size="icon" asChild title="Open source">
                        <a href={sourceUrl} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                        </a>
                      </Button>
                    ) : null}
                    <Button variant="ghost" size="icon" onClick={() => setEditing(review)} title="Edit Review">
                      <Pencil className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(review.id, name)} title="Delete Review">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
          {reviews.length === 0 && (
            <div className="col-span-full py-12 text-center font-medium text-gray-400">
              No reviews yet. Add verified reviews manually from your booking platforms.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
