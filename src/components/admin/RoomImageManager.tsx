"use client";

import { useCallback, useMemo, useState, useRef } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Upload,
  X,
  GripVertical,
  Loader2,
  Star,
  Trash2,
  RefreshCw,
  Info,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  uploadRoomImage,
  deleteImage,
  getUploadableImageHint,
  isUploadableImage,
} from "@/lib/firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { RoomImage } from "@/types";
import { toast } from "sonner";

interface RoomImageManagerProps {
  roomId: string;
  roomTitle: string;
  roomImages: RoomImage[];
  onChange: (images: RoomImage[]) => void;
  maxImages?: number;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getImageUploadErrorMessage(error: unknown): string {
  return error instanceof Error && error.message
    ? error.message
    : "An error occurred during image compression or upload.";
}

function normalizeCoverFirst(images: RoomImage[]): RoomImage[] {
  const sorted = [...images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const coverIndex = sorted.findIndex((img) => img.isCover);

  if (coverIndex > 0) {
    const [cover] = sorted.splice(coverIndex, 1);
    sorted.unshift(cover);
  }

  if (coverIndex === -1 && sorted.length > 0) {
    sorted[0] = { ...sorted[0], isCover: true };
  }

  return sorted.map((img, index) => ({
    ...img,
    sortOrder: index,
    isCover: index === 0,
  }));
}

// Inner Sortable Item
function SortableImageItem({
  image,
  onRemove,
  onSetCover,
  onEditSeo,
  onReplace,
  replacementProgress,
  replacementPreviewUrl,
}: {
  image: RoomImage;
  onRemove: () => void;
  onSetCover: () => void;
  onEditSeo: () => void;
  onReplace: () => void;
  replacementProgress?: number;
  replacementPreviewUrl?: string;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative aspect-[4/3] overflow-hidden rounded-xl border bg-gray-50 transition-all duration-300 dark:bg-gray-900",
        image.isCover
          ? "border-amber-400 ring-2 ring-amber-400/30 dark:border-amber-500 shadow-md"
          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700",
        isDragging && "opacity-50 scale-95"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={replacementPreviewUrl || image.imageUrl}
        alt={image.altText || "Room Image"}
        loading="lazy"
        decoding="async"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
        className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
      />

      {/* Cover Label Badge */}
      {image.isCover && (
        <span className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
          <Star className="h-3 w-3 fill-current" /> COVER
        </span>
      )}

      {typeof replacementProgress === "number" && (
        <div className="absolute inset-x-2 bottom-2 z-20 rounded-lg bg-white/95 p-2 shadow-sm dark:bg-gray-900/95">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
            <span>Replacing</span>
            <span>{Math.round(replacementProgress)}%</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full bg-primary transition-all duration-150"
              style={{ width: `${replacementProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Hover Control Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-3 z-10">
        <div className="flex items-center justify-between">
          {/* Drag Handle */}
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white hover:bg-white/45 hover:scale-105 active:scale-95 transition-all cursor-grab active:cursor-grabbing shadow-sm"
            title="Drag to reorder"
          >
            <GripVertical className="h-4 w-4" />
          </button>

          {/* Delete Action */}
          <button
            type="button"
            onClick={onRemove}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/90 hover:bg-red-650 hover:scale-105 active:scale-95 text-white transition-all shadow-sm"
            title="Delete Image"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-col gap-1.5">
          {/* SEO Text Details Indicator */}
          {image.altText && (
            <p className="text-[10px] font-semibold text-gray-200 line-clamp-1 bg-black/45 px-2 py-1 rounded-lg backdrop-blur-xs">
              Alt: {image.altText}
            </p>
          )}

          {/* Control Action Buttons */}
          <div className="flex items-center gap-1.5">
            {!image.isCover && (
              <button
                type="button"
                onClick={onSetCover}
                className="flex-1 rounded-lg bg-amber-500 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-amber-600 transition-all active:scale-[0.97]"
              >
                Set Cover
              </button>
            )}
            <button
              type="button"
              onClick={onEditSeo}
              className="flex-1 rounded-lg bg-blue-600 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-blue-700 transition-all active:scale-[0.97]"
            >
              SEO Meta
            </button>
            <button
              type="button"
              onClick={onReplace}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 hover:bg-white/25 hover:scale-105 active:scale-95 text-white transition-all"
              title="Replace File"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RoomImageManager({
  roomId,
  roomTitle,
  roomImages,
  onChange,
  maxImages = 15,
  className,
}: RoomImageManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<
    { id: string; name: string; progress: number; previewUrl: string }[]
  >([]);
  const [replacePending, setReplacePending] = useState<{
    imageId: string;
    name: string;
    progress: number;
    previewUrl: string;
  } | null>(null);
  const [seoEditImage, setSeoEditImage] = useState<RoomImage | null>(null);
  const [replacingImageId, setReplacingImageId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const orderedRoomImages = useMemo(() => normalizeCoverFirst(roomImages), [roomImages]);

  // Helper to handle and optimize files before uploading
  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      if (uploading) return;

      if (!roomId) {
        toast.error("Please fill in Room Title first so images can be stored under the correct room slug.");
        return;
      }

      const selectedFiles = Array.from(files);
      const fileArray = selectedFiles.filter(isUploadableImage);

      if (fileArray.length < selectedFiles.length) {
        toast.warning(`Some files were skipped. ${getUploadableImageHint()}`);
      }

      if (!fileArray.length) return;

      const remaining = maxImages - orderedRoomImages.length;
      const toUpload = fileArray.slice(0, remaining);

      if (toUpload.length < fileArray.length) {
        toast.warning(`Maximum ${maxImages} images allowed. Selected items were truncated.`);
      }

      if (!toUpload.length) return;

      setUploading(true);
      
      // Initialize pending uploads
      const initialPendings = toUpload.map((file, idx) => ({
        id: `${Date.now()}-${idx}`,
        name: file.name,
        progress: 0,
        previewUrl: URL.createObjectURL(file),
      }));
      setPendingUploads(initialPendings);

      const newlyUploaded: RoomImage[] = [];
      let savedBytes = 0;

      try {
        for (let i = 0; i < toUpload.length; i++) {
          const file = toUpload[i];
          const pendingId = initialPendings[i].id;
          
          // Check if this should be the cover image
          // Cover is true if there are no existing images and this is the first image of the batch
          const hasCover = orderedRoomImages.some((img) => img.isCover);
          const isCover = !hasCover && i === 0;

          // Perform compression and upload
          const result = await uploadRoomImage(roomId, isCover, file, (progress) => {
            setPendingUploads((prev) =>
              prev.map((item) =>
                item.id === pendingId ? { ...item, progress } : item
              )
            );
          });
          savedBytes += Math.max(0, result.originalSize - result.uploadedSize);

          // Create RoomImage object
          const imageObj: RoomImage = {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
            imageUrl: result.url,
            imagePath: result.path,
            roomId,
            sortOrder: orderedRoomImages.length + newlyUploaded.length,
            isCover,
            altText: `${roomTitle} at Green Riverside Cosy Home`,
            title: roomTitle,
            description: `${roomTitle} accommodation preview`,
            uploadedAt: new Date().toISOString(),
          };

          newlyUploaded.push(imageObj);
        }

        // Add uploaded to current images list
        const updatedImages = normalizeCoverFirst([...orderedRoomImages, ...newlyUploaded]);
        
        // Finalize state
        onChange(updatedImages);
        const savedText = savedBytes > 0 ? ` Saved about ${formatBytes(savedBytes)}.` : "";
        toast.success(`Successfully optimized and uploaded ${newlyUploaded.length} images.${savedText}`);
      } catch (error) {
        console.error("Failed to upload room images", error);
        toast.error(getImageUploadErrorMessage(error));
      } finally {
        initialPendings.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        setUploading(false);
        setPendingUploads([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [roomId, roomTitle, orderedRoomImages, maxImages, onChange, uploading]
  );

  // Drag & drop reordering handler
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = orderedRoomImages.findIndex((img) => img.id === active.id);
    const newIndex = orderedRoomImages.findIndex((img) => img.id === over.id);

    const reordered = [...orderedRoomImages];
    const [removed] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, removed);

    // Update sortOrder values matching their position
    const updated = normalizeCoverFirst(reordered.map((img, idx) => ({
      ...img,
      sortOrder: idx,
    })));

    onChange(updated);
  };

  // Set cover action
  const handleSetCover = (id: string) => {
    const updated = orderedRoomImages.map((img) => ({
      ...img,
      isCover: img.id === id,
    }));
    
    // Bring the cover image to the front of the list
    const coverIdx = updated.findIndex((img) => img.id === id);
    if (coverIdx > -1) {
      const [coverImage] = updated.splice(coverIdx, 1);
      updated.unshift(coverImage);
    }

    // Reset sortOrder
    const finalized = normalizeCoverFirst(updated.map((img, idx) => ({
      ...img,
      sortOrder: idx,
    })));

    onChange(finalized);
    toast.success("Cover image updated successfully");
  };

  // Remove image action
  const handleRemoveImage = async (image: RoomImage) => {
    if (!confirm("Are you sure you want to delete this image? This action will remove the file permanently from storage.")) return;
    
    try {
      // 1. Delete from storage
      if (image.imagePath) {
        await deleteImage(image.imagePath);
      }

      // 2. Filter from array
      const remaining = orderedRoomImages.filter((img) => img.id !== image.id);

      // Re-assign sortOrder
      const updated = normalizeCoverFirst(remaining.map((img, idx) => ({
        ...img,
        sortOrder: idx,
        isCover: image.isCover ? idx === 0 : img.isCover,
      })));

      onChange(updated);
      toast.success("Image deleted successfully");
    } catch (error) {
      console.error("Failed to delete image", error);
      toast.error("Could not delete image. Please check your network connection.");
    }
  };

  // Initiate replace image action
  const handleReplaceInitiated = (id: string) => {
    setReplacingImageId(id);
    replaceInputRef.current?.click();
  };

  // Handle replace file upload
  const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const imageId = replacingImageId;
    if (!file || !imageId) return;

    if (!isUploadableImage(file)) {
      toast.error(getUploadableImageHint());
      e.target.value = "";
      return;
    }

    const imgToReplace = orderedRoomImages.find((img) => img.id === imageId);
    if (!imgToReplace) return;

    setUploading(true);
    const previewUrl = URL.createObjectURL(file);
    setReplacePending({ imageId, name: file.name, progress: 0, previewUrl });

    try {
      // Upload new image before deleting the old file so a failed upload does not break the current gallery.
      const result = await uploadRoomImage(roomId, imgToReplace.isCover, file, (progress) => {
        setReplacePending((current) =>
          current?.imageId === imageId ? { ...current, progress } : current
        );
      });

      const updated = normalizeCoverFirst(orderedRoomImages.map((img) => {
        if (img.id === imageId) {
          return {
            ...img,
            imageUrl: result.url,
            imagePath: result.path,
            uploadedAt: new Date().toISOString(),
          };
        }
        return img;
      }));

      onChange(updated);
      try {
        if (imgToReplace.imagePath) {
          await deleteImage(imgToReplace.imagePath);
        }
      } catch (err) {
        console.warn("Could not delete old image after replacement", err);
      }
      toast.success("Image replaced successfully");
    } catch (error) {
      console.error("Replacement failed", error);
      toast.error(getImageUploadErrorMessage(error));
    } finally {
      setUploading(false);
      setReplacingImageId(null);
      URL.revokeObjectURL(previewUrl);
      setReplacePending(null);
      if (replaceInputRef.current) replaceInputRef.current.value = "";
    }
  };

  // Save SEO meta details
  const saveSeoMeta = () => {
    if (!seoEditImage) return;

    const updated = orderedRoomImages.map((img) => {
      if (img.id === seoEditImage.id) {
        return seoEditImage;
      }
      return img;
    });

    onChange(updated);
    toast.success("SEO image metadata saved");
    setSeoEditImage(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Hidden Replace Input */}
      <input
        type="file"
        ref={replaceInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleReplaceFile}
        disabled={uploading}
      />

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 transition-all duration-350 cursor-pointer bg-gray-50/50 dark:bg-gray-950/5",
          dragOver
            ? "border-primary bg-primary/10 dark:border-primary-dark scale-[1.01]"
            : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-100/50 dark:hover:bg-gray-900/10",
          uploading && "pointer-events-none opacity-60"
        )}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-soft text-primary mb-3.5 transition-transform duration-300 group-hover:scale-110">
          <Upload className="h-5.5 w-5.5 text-primary" />
        </div>
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 text-center">
          Drag and drop room gallery images here
        </h3>
        <p className="text-xs text-gray-450 dark:text-gray-400 text-center mt-1.5 max-w-sm leading-relaxed">
          JPG, PNG, WebP, or AVIF. Photos are resized to 1800px max and converted to lightweight WebP before upload.
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          disabled={uploading || orderedRoomImages.length >= maxImages}
          className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/95 transition-all active:scale-[0.98]"
        >
          Select Files from Device
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && handleFiles(e.target.files)}
            disabled={uploading || orderedRoomImages.length >= maxImages}
          />
        </button>
      </div>

      {/* Uploading Progress Feedbacks */}
      {pendingUploads.length > 0 && (
        <div className="rounded-xl border border-gray-150 bg-white p-4 shadow-sm space-y-3 dark:border-gray-800 dark:bg-gray-900 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            Uploading & Optimizing ({pendingUploads.length} files remaining)...
          </div>
          <div className="grid gap-2">
            {pendingUploads.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 text-xs bg-gray-50 p-2 rounded-lg dark:bg-gray-950/20 border border-gray-100 dark:border-gray-850"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.previewUrl}
                  alt="preview"
                  className="h-8 w-8 rounded object-cover shadow-sm"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-gray-700 dark:text-gray-300">
                    {item.name}
                  </p>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-150"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <span className="font-bold text-gray-500 dark:text-gray-400 min-w-8 text-right">
                  {Math.round(item.progress)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid of Room Images */}
      {orderedRoomImages.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h3 className="text-xs font-bold text-gray-700 dark:text-gray-350 uppercase tracking-wider">
                Uploaded Images ({orderedRoomImages.length} / {maxImages})
              </h3>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Drag cards to reorder. The first image is the cover displayed on room cards.
              </p>
            </div>
            {orderedRoomImages.length > 1 && (
              <span className="text-[11px] font-semibold text-primary dark:text-primary-dark flex items-center gap-1">
                <Info className="h-3.5 w-3.5" /> Reordering updates display order automatically
              </span>
            )}
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={orderedRoomImages.map((img) => img.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {orderedRoomImages.map((image) => (
                  <SortableImageItem
                    key={image.id}
                    image={image}
                    onRemove={() => handleRemoveImage(image)}
                    onSetCover={() => handleSetCover(image.id)}
                    onEditSeo={() => setSeoEditImage({ ...image })}
                    onReplace={() => handleReplaceInitiated(image.id)}
                    replacementProgress={replacePending?.imageId === image.id ? replacePending.progress : undefined}
                    replacementPreviewUrl={replacePending?.imageId === image.id ? replacePending.previewUrl : undefined}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-450 dark:border-gray-800">
          No images uploaded yet. Fill in basics tab first, then upload room photos here.
        </div>
      )}

      {/* SEO Metadata Editing Modal Overlay */}
      {seoEditImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-150 pb-3.5 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-amber-500" /> Image SEO Optimization
              </h3>
              <button
                type="button"
                onClick={() => setSeoEditImage(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex gap-4 bg-gray-50 dark:bg-gray-950/30 p-3 rounded-xl border border-gray-100 dark:border-gray-850">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={seoEditImage.imageUrl}
                alt="SEO preview"
                className="h-28 w-28 rounded-xl object-cover border border-gray-200 dark:border-gray-800 shrink-0 shadow-sm"
              />
              <div className="space-y-1.5 text-xs text-gray-500 leading-normal">
                <span className="font-semibold text-gray-600 dark:text-gray-300">File Storage Path:</span>
                <p className="font-mono break-all bg-white dark:bg-gray-900 p-1.5 rounded-lg border border-gray-100 dark:border-gray-800">{seoEditImage.imagePath}</p>
                <span className="font-semibold text-gray-600 dark:text-gray-300 block mt-1">Status:</span>
                <p className="font-medium text-primary">{seoEditImage.isCover ? "Primary Cover Image" : "Gallery Image"}</p>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor="seo-alt" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Image Alt Text (Crucial for SEO & Screen Readers)</Label>
                <Input
                  id="seo-alt"
                  placeholder="e.g. Deluxe Room with River View at Green Riverside Cosy Home"
                  value={seoEditImage.altText || ""}
                  onChange={(e) => setSeoEditImage({ ...seoEditImage, altText: e.target.value })}
                  className="mt-1.5 text-sm rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="seo-title" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Image Title (Appears on Hover)</Label>
                <Input
                  id="seo-title"
                  placeholder="e.g. Deluxe Room Accommodation view"
                  value={seoEditImage.title || ""}
                  onChange={(e) => setSeoEditImage({ ...seoEditImage, title: e.target.value })}
                  className="mt-1.5 text-sm rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="seo-desc" className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Image Description (Contextual Details)</Label>
                <Textarea
                  id="seo-desc"
                  placeholder="e.g. A spacious modern room showing the double bed, balcony door overlooking the river at sunset."
                  value={seoEditImage.description || ""}
                  onChange={(e) => setSeoEditImage({ ...seoEditImage, description: e.target.value })}
                  className="mt-1.5 text-sm rounded-xl"
                  rows={2}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-gray-150 pt-4 dark:border-gray-800">
              <Button variant="ghost" onClick={() => setSeoEditImage(null)} className="rounded-xl">
                Cancel
              </Button>
              <Button onClick={saveSeoMeta} className="px-5 font-bold rounded-xl bg-primary hover:bg-primary/95 text-white shadow-sm">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
