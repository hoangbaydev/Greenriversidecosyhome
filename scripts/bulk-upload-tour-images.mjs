/**
 * Bulk upload tour images to Firebase Storage and attach URLs to Firestore tours.
 *
 * Folder format:
 *   tour-images/
 *     phong-nha-cave-half-day/
 *       main/
 *         cover.jpg
 *       gallery/
 *         cave-1.jpg
 *         cave-2.jpg
 *
 * Usage:
 *   node --env-file=.env.local scripts/bulk-upload-tour-images.mjs ./tour-images
 *   node --env-file=.env.local scripts/bulk-upload-tour-images.mjs ./tour-images --dry-run
 *   node --env-file=.env.local scripts/bulk-upload-tour-images.mjs ./tour-images --append
 *
 * Requires one of:
 * - FIREBASE_ADMIN_CLIENT_EMAIL + FIREBASE_ADMIN_PRIVATE_KEY in .env.local
 * - OR Application Default Credentials.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { initializeApp, cert, applicationDefault, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const rootDir = path.resolve(process.argv[2] || "tour-images");
const dryRun = process.argv.includes("--dry-run");
const append = process.argv.includes("--append");

const imageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const contentTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
};

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return value;
}

function initAdmin() {
  if (getApps().length) return;

  const projectId = requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const storageBucket = requireEnv("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  initializeApp({
    credential:
      clientEmail && privateKey
        ? cert({ projectId, clientEmail, privateKey })
        : applicationDefault(),
    projectId,
    storageBucket,
  });
}

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function listImageFiles(dir) {
  if (!(await pathExists(dir))) return [];

  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(dir, entry.name))
    .filter((file) => imageExts.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
}

function safeName(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path
    .basename(filename, ext)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base || "image"}${ext}`;
}

async function findTourBySlug(db, slug) {
  const direct = await db.collection("tours").doc(slug).get();
  if (direct.exists) return direct.ref;

  const bySlug = await db.collection("tours").where("slug", "==", slug).limit(1).get();
  if (!bySlug.empty) return bySlug.docs[0].ref;

  return null;
}

async function uploadFile(bucket, slug, kind, file) {
  const ext = path.extname(file).toLowerCase();
  const token = randomUUID();
  const destination = `tours/${slug}/${kind}/${Date.now()}-${safeName(file)}`;

  if (!dryRun) {
    await bucket.upload(file, {
      destination,
      metadata: {
        contentType: contentTypes[ext] || "application/octet-stream",
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });
  }

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media&token=${token}`;
}

async function main() {
  initAdmin();

  if (!(await pathExists(rootDir))) {
    console.error(`Folder not found: ${rootDir}`);
    process.exit(1);
  }

  const db = getFirestore();
  const bucket = getStorage().bucket();
  const tourFolders = (await fs.readdir(rootDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  console.log(`Tour image root: ${rootDir}`);
  console.log(`Bucket: ${bucket.name}`);
  console.log(`Mode: ${dryRun ? "dry run" : append ? "append" : "replace"}\n`);

  for (const slug of tourFolders) {
    const tourRef = await findTourBySlug(db, slug);
    if (!tourRef) {
      console.log(`SKIP ${slug}: no matching tour document`);
      continue;
    }

    const mainFiles = await listImageFiles(path.join(rootDir, slug, "main"));
    const galleryFiles = await listImageFiles(path.join(rootDir, slug, "gallery"));

    if (!mainFiles.length && !galleryFiles.length) {
      console.log(`SKIP ${slug}: no images in main/ or gallery/`);
      continue;
    }

    const mainUrls = [];
    const galleryUrls = [];

    for (const file of mainFiles) {
      mainUrls.push(await uploadFile(bucket, slug, "main", file));
    }

    for (const file of galleryFiles) {
      galleryUrls.push(await uploadFile(bucket, slug, "gallery", file));
    }

    if (!dryRun) {
      const update = { updatedAt: FieldValue.serverTimestamp() };

      if (append) {
        if (mainUrls.length) update.images = FieldValue.arrayUnion(...mainUrls);
        if (galleryUrls.length) update.galleryImages = FieldValue.arrayUnion(...galleryUrls);
      } else {
        if (mainFiles.length) update.images = mainUrls;
        if (galleryFiles.length) update.galleryImages = galleryUrls;
      }

      await tourRef.set(update, { merge: true });
    }

    console.log(
      `${dryRun ? "WOULD UPDATE" : "UPDATED"} ${slug}: ${mainUrls.length} main, ${galleryUrls.length} gallery`
    );
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nBulk upload failed:", err.message || err);
  process.exit(1);
});
