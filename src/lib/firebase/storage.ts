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

const DEFAULT_IMAGE_PRESET: ImageOptimizationPreset = {
  maxWidth: 1600,
  targetBytes: 280 * 1024,
  minQuality: 0.62,
  startQuality: 0.86,
};

const IMAGE_PRESETS: Partial<Record<StorageFolder, ImageOptimizationPreset>> = {
  hero: { maxWidth: 2200, targetBytes: 420 * 1024, minQuality: 0.68, startQuality: 0.88 },
  site: { maxWidth: 2200, targetBytes: 420 * 1024, minQuality: 0.68, startQuality: 0.88 },
  rooms: { maxWidth: 1800, targetBytes: 320 * 1024, minQuality: 0.64, startQuality: 0.86 },
  tours: { maxWidth: 1800, targetBytes: 320 * 1024, minQuality: 0.64, startQuality: 0.86 },
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

function shouldSkipOptimization(file: File): boolean {
  return (
    !file.type.startsWith("image/") ||
    file.type === "image/svg+xml" ||
    file.type === "image/gif"
  );
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

export async function optimizeImage(
  file: File,
  preset = DEFAULT_IMAGE_PRESET
): Promise<File> {
  if (shouldSkipOptimization(file)) return file;

  const img = await loadImageElement(file);
  const scale = Math.min(1, preset.maxWidth / Math.max(img.width, img.height));
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return file;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, width, height);

  let bestBlob: Blob | null = null;
  for (let quality = preset.startQuality; quality >= preset.minQuality; quality -= 0.06) {
    const blob = await canvasToBlob(canvas, "image/webp", Number(quality.toFixed(2)));
    if (!blob) continue;
    bestBlob = blob;
    if (blob.size <= preset.targetBytes) break;
  }

  if (!bestBlob) return file;

  const optimized = new File([bestBlob], toWebpName(file.name), {
    type: "image/webp",
    lastModified: Date.now(),
  });

  return optimized.size < file.size || file.type !== "image/webp" ? optimized : file;
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

export async function uploadImages(
  folder: StorageFolder,
  files: File[],
  onProgress?: (index: number, progress: number) => void
): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const path = buildStoragePath(folder, `${Date.now()}-${i}-${file.name}`);
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

export function extractStoragePathFromUrl(url: string): string | null {
  try {
    const decoded = decodeURIComponent(url);
    const match = decoded.match(/\/o\/(.+?)\?/);
    return match ? match[1] : null;
  } catch {
    return null;
  }
}
