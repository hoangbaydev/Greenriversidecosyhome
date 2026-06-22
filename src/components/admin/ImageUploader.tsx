"use client";

import { useCallback, useState, useRef } from "react";
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
import { Upload, X, GripVertical, Loader2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  uploadImageDetailed,
  buildUniqueStoragePath,
  getUploadableImageHint,
  isUploadableImage,
  type StorageFolder,
} from "@/lib/firebase/storage";
import { toast } from "sonner";

interface ImageUploaderProps {
  folder: StorageFolder;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
  className?: string;
}

function SortableImage({
  url,
  index,
  onRemove,
}: {
  url: string;
  index: number;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: url });

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
        "group relative aspect-square overflow-hidden rounded-xl border bg-gray-50 transition-all duration-300 dark:bg-gray-900",
        index === 0
          ? "border-amber-400 ring-2 ring-amber-400/30 dark:border-amber-500 shadow-md"
          : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700",
        isDragging && "opacity-50 scale-95"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt=""
        className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
      />

      {/* Cover Label Badge */}
      {index === 0 && (
        <span className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
          <Star className="h-3 w-3 fill-current" /> Cover
        </span>
      )}

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3 z-10">
        {/* Drag Handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 backdrop-blur-md text-white hover:bg-white/40 hover:scale-105 active:scale-95 transition-all cursor-grab active:cursor-grabbing shadow-sm"
          title="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-650 hover:scale-110 active:scale-95 transition-all shadow-md"
          title="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function getUploadErrorMessage(error: unknown): string {
  const firebaseError = error as { code?: string; message?: string };

  if (firebaseError.code === "storage/unauthorized") {
    return "Upload denied. Check that you are logged in as admin/editor and Storage rules are published.";
  }

  if (
    firebaseError.code === "storage/quota-exceeded" ||
    firebaseError.message?.includes("402") ||
    firebaseError.message?.includes("billing")
  ) {
    return "Firebase Storage billing/quota issue. Check Blaze billing and bucket status.";
  }

  if (firebaseError.code === "storage/bucket-not-found") {
    return "Firebase Storage bucket not found. Check NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET.";
  }

  if (firebaseError.code) {
    return `Upload failed: ${firebaseError.code}`;
  }

  return "Upload failed. Check Firebase Storage configuration.";
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ImageUploader({
  folder,
  images,
  onChange,
  maxImages = 10,
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<
    { id: string; name: string; progress: number; previewUrl: string }[]
  >([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      if (uploading) return;

      const selectedFiles = Array.from(files);
      const fileArray = selectedFiles.filter(isUploadableImage);

      if (fileArray.length < selectedFiles.length) {
        toast.warning(`Some files were skipped. ${getUploadableImageHint()}`);
      }

      if (!fileArray.length) return;

      const remaining = maxImages - images.length;
      const toUpload = fileArray.slice(0, remaining);

      if (toUpload.length < fileArray.length) {
        toast.warning(`Maximum ${maxImages} images allowed`);
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

      try {
        const newUrls: string[] = [];
        let savedBytes = 0;

        for (let i = 0; i < toUpload.length; i++) {
          const file = toUpload[i];
          const pendingId = initialPendings[i].id;
          const path = buildUniqueStoragePath(folder, file.name);
          const result = await uploadImageDetailed(path, file, (p) => {
            setPendingUploads((prev) =>
              prev.map((item) =>
                item.id === pendingId ? { ...item, progress: p } : item
              )
            );
          });
          newUrls.push(result.url);
          savedBytes += Math.max(0, result.originalSize - result.uploadedSize);
        }
        onChange([...images, ...newUrls]);
        const savedText = savedBytes > 0 ? ` Saved about ${formatBytes(savedBytes)}.` : "";
        toast.success(`${newUrls.length} image(s) optimized and uploaded.${savedText}`);
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error(getUploadErrorMessage(error));
      } finally {
        initialPendings.forEach((item) => URL.revokeObjectURL(item.previewUrl));
        setUploading(false);
        setPendingUploads([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [folder, images, maxImages, onChange, uploading]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = images.indexOf(active.id as string);
    const newIndex = images.indexOf(over.id as string);
    const reordered = [...images];
    reordered.splice(newIndex, 0, reordered.splice(oldIndex, 1)[0]);
    onChange(reordered);
  };

  return (
    <div className={cn("space-y-6", className)}>
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
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          disabled={uploading || images.length >= maxImages}
        />
        
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-soft text-primary mb-3.5 transition-transform duration-300 group-hover:scale-110">
          <Upload className="h-5.5 w-5.5 text-primary" />
        </div>
        
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 text-center">
          Drag and drop images here, or click to browse
        </h3>
        
        <p className="mt-1.5 text-xs text-gray-450 dark:text-gray-400 text-center">
          Images are converted to lightweight WebP before upload. {getUploadableImageHint()}
        </p>

        <button 
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          disabled={uploading || images.length >= maxImages}
          className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-primary/95 transition-all active:scale-[0.98]"
        >
          Choose Files
        </button>
      </div>

      {/* Pending Upload Progress items */}
      {pendingUploads.length > 0 && (
        <div className="rounded-xl border border-gray-150 bg-white p-4 shadow-sm space-y-3 dark:border-gray-800 dark:bg-gray-900 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            Uploading & Optimizing ({pendingUploads.length} files)...
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

      {images.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-350 uppercase tracking-wider">
              Gallery Images ({images.length} / {maxImages})
            </h4>
            <p className="text-[10px] text-gray-400">
              Drag images to reorder. The first photo is the cover.
            </p>
          </div>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {images.map((url, index) => (
                  <SortableImage
                    key={url}
                    url={url}
                    index={index}
                    onRemove={() =>
                      onChange(images.filter((img) => img !== url))
                    }
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
