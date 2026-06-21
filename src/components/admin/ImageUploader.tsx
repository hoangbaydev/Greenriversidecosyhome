"use client";

import { useCallback, useState } from "react";
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
import { Upload, X, GripVertical, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  uploadImage,
  buildStoragePath,
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
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: url });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" className="h-full w-full object-cover" />
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="absolute left-1 top-1 rounded bg-black/50 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Drag to reorder"
      >
        <GripVertical className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Remove image"
      >
        <X className="h-3 w-3" />
      </button>
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

export function ImageUploader({
  folder,
  images,
  onChange,
  maxImages = 10,
  className,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (!fileArray.length) return;

      const remaining = maxImages - images.length;
      const toUpload = fileArray.slice(0, remaining);

      if (toUpload.length < fileArray.length) {
        toast.warning(`Maximum ${maxImages} images allowed`);
      }

      setUploading(true);
      setProgress(0);

      try {
        const newUrls: string[] = [];
        for (let i = 0; i < toUpload.length; i++) {
          const file = toUpload[i];
          const path = buildStoragePath(
            folder,
            `${Date.now()}-${i}-${file.name}`
          );
          const url = await uploadImage(path, file, (p) => {
            setProgress(((i + p / 100) / toUpload.length) * 100);
          });
          newUrls.push(url);
        }
        onChange([...images, ...newUrls]);
        toast.success(`${newUrls.length} image(s) uploaded`);
      } catch (error) {
        console.error("Image upload failed", error);
        toast.error(getUploadErrorMessage(error));
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [folder, images, maxImages, onChange]
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
    <div className={cn("space-y-4", className)}>
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
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-gray-300 dark:border-gray-600",
          uploading && "pointer-events-none opacity-70"
        )}
      >
        {uploading ? (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Uploading... {Math.round(progress)}%
            </p>
            <div className="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Drag & drop images here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Images are compressed before upload
            </p>
            <label className="mt-4 cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
              Choose Files
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFiles(e.target.files)
                }
                disabled={images.length >= maxImages}
              />
            </label>
          </>
        )}
      </div>

      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={images} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {images.map((url) => (
                <SortableImage
                  key={url}
                  url={url}
                  onRemove={() =>
                    onChange(images.filter((img) => img !== url))
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
