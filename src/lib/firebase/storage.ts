import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  type UploadTask,
  type UploadMetadata,
} from "firebase/storage";
import { getFirebaseStorage, STORAGE_PATHS, type StorageFolder } from "./config";

export { STORAGE_PATHS, type StorageFolder };

export type UploadProgressCallback = (progress: number) => void;

type ImageOptimizationPreset = {
  maxWidth: number;
  targetBytes: number;
  minQuality: number;
  startQuality: number;
};

export type UploadableImageFile = File & {
  originalFile?: File;
  originalSize?: number;
};

export type UploadedImageResult = {
  url: string;
  path: string;
  originalSize: number;
  uploadedSize: number;
  width?: number;
  height?: number;
};

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

const MAX_SOURCE_IMAGE_BYTES = 18 * 1024 * 1024;

const DEFAULT_IMAGE_PRESET: ImageOptimizationPreset = {
  maxWidth: 1600,
  targetBytes: 360 * 1024,
  minQuality: 0.68,
  startQuality: 0.88,
};

const IMAGE_PRESETS: Partial<Record<StorageFolder, ImageOptimizationPreset>> = {
  hero: { maxWidth: 2200, targetBytes: 420 * 1024, minQuality: 0.68, startQuality: 0.88 },
  site: { maxWidth: 2200, targetBytes: 420 * 1024, minQuality: 0.68, startQuality: 0.88 },
  rooms: { maxWidth: 1920, targetBytes: 520 * 1024, minQuality: 0.72, startQuality: 0.9 },
  tours: { maxWidth: 1800, targetBytes: 420 * 1024, minQuality: 0.68, startQuality: 0.88 },
  activities: { maxWidth: 1600, targetBytes: 280 * 1024, minQuality: 0.62, startQuality: 0.86 },
  gallery: { maxWidth: 1800, targetBytes: 320 * 1024, minQuality: 0.64, startQuality: 0.86 },
  cafe: { maxWidth: 1600, targetBytes: 260 * 1024, minQuality: 0.62, startQuality: 0.86 },
  blog: { maxWidth: 1400, targetBytes: 220 * 1024, minQuality: 0.6, startQuality: 0.84 },
  reviews: { maxWidth: 900, targetBytes: 120 * 1024, minQuality: 0.58, startQuality: 0.82 },
};

function getPresetForPath(path: string): ImageOptimizationPreset {
  const folder = (Object.keys(STORAGE_PATHS) as StorageFolder[]).find((key) =>
    path.startsWith(STORAGE_PATHS[key])
  );

  return folder ? IMAGE_PRESETS[folder] ?? DEFAULT_IMAGE_PRESET : DEFAULT_IMAGE_PRESET;
}

function assertUploadableImage(file: File): void {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Only JPG, PNG, WebP, or AVIF images can be uploaded.");
  }

  if (file.size > MAX_SOURCE_IMAGE_BYTES) {
    throw new Error("Image is too large. Please upload an image smaller than 18MB.");
  }
}

export function isUploadableImage(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.has(file.type) && file.size <= MAX_SOURCE_IMAGE_BYTES;
}

export function getUploadableImageHint(): string {
  return "JPG, PNG, WebP, or AVIF only. Max source file size: 18MB.";
}

function toWebpName(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "") || "image";
  return `${base}.webp`;
}

function getExtensionForMime(type: string): string {
  if (type === "image/webp") return ".webp";
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/png") return ".png";
  if (type === "image/avif") return ".avif";
  if (type === "image/gif") return ".gif";
  return "";
}

function withFileExtension(path: string, file: File): string {
  const ext = getExtensionForMime(file.type);
  if (!ext) return path;
  return path.includes(".")
    ? path.replace(/\.[^/.?]+$/, ext)
    : `${path}${ext}`;
}

function createUploadId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID().slice(0, 12);
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function appendUniqueSuffix(filename: string): string {
  const clean = filename || "image";
  const dotIndex = clean.lastIndexOf(".");
  const suffix = createUploadId();

  if (dotIndex > 0) {
    return `${clean.slice(0, dotIndex)}-${suffix}${clean.slice(dotIndex)}`;
  }

  return `${clean}-${suffix}`;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
}

async function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to process image"));
    };
    img.src = url;
  });
}

async function loadImageSource(file: File): Promise<{
  source: CanvasImageSource;
  width: number;
  height: number;
  cleanup: () => void;
}> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: "from-image",
      } as ImageBitmapOptions);

      return {
        source: bitmap,
        width: bitmap.width,
        height: bitmap.height,
        cleanup: () => bitmap.close(),
      };
    } catch {
      // Fall back below when the browser cannot decode the selected format.
    }
  }

  const img = await loadImageElement(file);
  return {
    source: img,
    width: img.naturalWidth || img.width,
    height: img.naturalHeight || img.height,
    cleanup: () => undefined,
  };
}

export async function optimizeImage(
  file: File,
  preset = DEFAULT_IMAGE_PRESET
): Promise<UploadableImageFile> {
  assertUploadableImage(file);

  const image = await loadImageSource(file);
  const scale = Math.min(1, preset.maxWidth / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) {
    image.cleanup();
    return file;
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(image.source, 0, 0, width, height);
  image.cleanup();

  let bestBlob: Blob | null = null;
  const qualitySteps = [preset.startQuality, 0.84, 0.8, 0.76, 0.72, preset.minQuality]
    .filter((quality, index, array) => quality >= preset.minQuality && array.indexOf(quality) === index)
    .sort((a, b) => b - a);

  for (const quality of qualitySteps) {
    const blob = await canvasToBlob(canvas, "image/webp", Number(quality.toFixed(2)));
    if (!blob) continue;
    bestBlob = blob;
    if (blob.size <= preset.targetBytes) break;
  }

  if (!bestBlob) return file;

  const optimized: UploadableImageFile = new File([bestBlob], toWebpName(file.name), {
    type: "image/webp",
    lastModified: Date.now(),
  });
  optimized.originalFile = file;
  optimized.originalSize = file.size;

  if (optimized.size < file.size || file.type !== "image/webp") {
    return optimized;
  }

  const original = file as UploadableImageFile;
  original.originalFile = file;
  original.originalSize = file.size;
  return original;
}

export function uploadImageWithProgress(
  path: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage is not configured");

  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const metadata: UploadMetadata = {
      contentType: file.type || undefined,
      cacheControl: "public,max-age=31536000,immutable",
    };
    const task: UploadTask = uploadBytesResumable(storageRef, file, metadata);

    task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

export async function uploadImage(
  path: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const optimized = await optimizeImage(file, getPresetForPath(path));
  return uploadImageWithProgress(withFileExtension(path, optimized), optimized, onProgress);
}

export async function uploadImageDetailed(
  path: string,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<UploadedImageResult> {
  const optimized = await optimizeImage(file, getPresetForPath(path));
  const finalPath = withFileExtension(path, optimized);
  const url = await uploadImageWithProgress(finalPath, optimized, onProgress);

  return {
    url,
    path: finalPath,
    originalSize: optimized.originalSize ?? file.size,
    uploadedSize: optimized.size,
  };
}

export async function uploadImages(
  folder: StorageFolder,
  files: File[],
  onProgress?: (index: number, progress: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const path = buildStoragePath(folder, appendUniqueSuffix(file.name));
    const url = await uploadImage(path, file, (p) => onProgress?.(i, p));
    urls.push(url);
  }
  return urls;
}

export async function deleteImage(path: string): Promise<void> {
  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage is not configured");
  await deleteObject(ref(storage, path));
}

export function buildStoragePath(
  folder: StorageFolder,
  filename: string
): string {
  const safeFilename = filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${STORAGE_PATHS[folder]}${safeFilename || "image"}`;
}

export function buildUniqueStoragePath(
  folder: StorageFolder,
  filename: string
): string {
  return buildStoragePath(folder, appendUniqueSuffix(filename));
}

export function buildRoomStoragePath(
  roomId: string,
  isCover: boolean,
  filename: string
): string {
  const subfolder = isCover ? "cover" : "gallery";
  const cleanFilename = filename
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  
  // Strip existing extension since optimizeImage converts it to webp
  const nameWithoutExt = cleanFilename.replace(/\.[^.]+$/, "");
  return `rooms/${roomId}/${subfolder}/${nameWithoutExt || "image"}-${createUploadId()}.webp`;
}

export async function uploadRoomImage(
  roomId: string,
  isCover: boolean,
  file: File,
  onProgress?: UploadProgressCallback
): Promise<UploadedImageResult> {
  const path = buildRoomStoragePath(roomId, isCover, file.name);
  const preset: ImageOptimizationPreset = {
    maxWidth: 1920,
    targetBytes: 520 * 1024,
    minQuality: 0.72,
    startQuality: 0.9,
  };
  const optimized = await optimizeImage(file, preset);
  const url = await uploadImageWithProgress(path, optimized, onProgress);
  return {
    url,
    path,
    originalSize: optimized.originalSize ?? file.size,
    uploadedSize: optimized.size,
  };
}

export function extractStoragePathFromUrl(url: string): string | null {
  try {
    const decoded = decodeURIComponent(url);
    const match = decoded.match(/\/o\/(.+?)\?/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
