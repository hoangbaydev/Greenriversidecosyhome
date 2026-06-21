/**
 * Prepare a local tour image sorting workspace.
 *
 * It creates:
 *   tour-images/
 *     _inbox/
 *     _review/
 *       index.html
 *     tour-slug/
 *       main/
 *       gallery/
 *
 * Usage:
 *   node --env-file=.env.local scripts/prepare-tour-image-workspace.mjs
 *   node --env-file=.env.local scripts/prepare-tour-image-workspace.mjs ./tour-images
 */

import fs from "node:fs/promises";
import path from "node:path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const rootDir = path.resolve(process.argv[2] || "tour-images");
const imageExts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const envKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

function assertEnv() {
  const missing = envKeys.filter((key) => !process.env[key]);

  if (missing.length) {
    console.error(`Missing Firebase env values: ${missing.join(", ")}`);
    process.exit(1);
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function pathExists(target) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function listImages(dir) {
  if (!(await pathExists(dir))) return [];

  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => imageExts.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));
}

async function getTours() {
  assertEnv();
  const app = initializeApp(config);
  const db = getFirestore(app);
  const snap = await getDocs(collection(db, "tours"));

  return snap.docs
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug || doc.id,
        title: data.title || data.name || doc.id,
        order: data.order ?? 9999,
      };
    })
    .sort((a, b) => (a.order - b.order) || a.title.localeCompare(b.title));
}

function renderReviewHtml(tours, inboxImages) {
  const tourCards = tours
    .map((tour) => {
      const rel = `../${tour.slug}`;
      return `
        <article class="tour">
          <h2>${escapeHtml(tour.title)}</h2>
          <p><code>${escapeHtml(tour.slug)}</code></p>
          <div class="links">
            <a href="${rel}/main/">main</a>
            <a href="${rel}/gallery/">gallery</a>
          </div>
        </article>`;
    })
    .join("");

  const inboxItems =
    inboxImages.length > 0
      ? inboxImages
          .map(
            (name) => `
              <figure>
                <img src="../_inbox/${encodeURIComponent(name)}" alt="">
                <figcaption>${escapeHtml(name)}</figcaption>
              </figure>`
          )
          .join("")
      : `<p class="muted">Put downloaded Drive images into <code>tour-images/_inbox</code>, refresh this page, then sort them into each tour folder.</p>`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tour Image Workspace</title>
  <style>
    :root { color-scheme: light; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { margin: 0; background: #f6f4ef; color: #1f2933; }
    main { max-width: 1180px; margin: 0 auto; padding: 32px 20px 56px; }
    h1 { margin: 0; font-size: clamp(28px, 4vw, 44px); letter-spacing: 0; }
    .lead { max-width: 780px; color: #59636f; line-height: 1.65; }
    .panel { margin-top: 24px; padding: 20px; border: 1px solid #ddd6c8; border-radius: 8px; background: #fff; }
    .steps { display: grid; gap: 10px; padding-left: 20px; color: #3f4852; line-height: 1.55; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 14px; margin-top: 18px; }
    .tour { border: 1px solid #e2ded3; border-radius: 8px; background: #fff; padding: 16px; }
    .tour h2 { margin: 0 0 8px; font-size: 16px; line-height: 1.35; }
    code { font-size: 12px; color: #667085; overflow-wrap: anywhere; }
    .links { display: flex; gap: 8px; margin-top: 14px; }
    a { display: inline-flex; align-items: center; min-height: 34px; border-radius: 6px; padding: 0 12px; background: #1f7a5c; color: #fff; text-decoration: none; font-size: 13px; font-weight: 700; }
    .inbox { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-top: 18px; }
    figure { margin: 0; border: 1px solid #e2ded3; border-radius: 8px; background: #fff; overflow: hidden; }
    img { display: block; width: 100%; aspect-ratio: 4 / 3; object-fit: cover; background: #eee; }
    figcaption { padding: 8px; font-size: 12px; color: #59636f; overflow-wrap: anywhere; }
    .muted { color: #667085; }
  </style>
</head>
<body>
  <main>
    <h1>Tour Image Workspace</h1>
    <p class="lead">Use this page to keep cave and tour photos organized before uploading. The rule is simple: one best image goes into <strong>main</strong>, supporting photos go into <strong>gallery</strong>.</p>
    <section class="panel">
      <h2>Workflow</h2>
      <ol class="steps">
        <li>Download the client's Google Drive folder and put all unsorted images into <code>tour-images/_inbox</code>.</li>
        <li>Pick 1 strong, bright cover image per tour and move it into that tour's <code>main</code> folder.</li>
        <li>Move 5-12 good supporting images into that tour's <code>gallery</code> folder.</li>
        <li>Skip blurry, duplicate, too-dark, or irrelevant photos.</li>
        <li>Run <code>npm run images:tours -- ./tour-images --dry-run</code>, then upload for real.</li>
      </ol>
    </section>
    <section class="panel">
      <h2>Inbox Preview</h2>
      <div class="inbox">${inboxItems}</div>
    </section>
    <section class="panel">
      <h2>Tour Folders</h2>
      <div class="grid">${tourCards}</div>
    </section>
  </main>
</body>
</html>`;
}

async function main() {
  const tours = await getTours();
  const reviewDir = path.join(rootDir, "_review");
  const inboxDir = path.join(rootDir, "_inbox");

  await fs.mkdir(inboxDir, { recursive: true });
  await fs.mkdir(reviewDir, { recursive: true });

  for (const tour of tours) {
    await fs.mkdir(path.join(rootDir, tour.slug, "main"), { recursive: true });
    await fs.mkdir(path.join(rootDir, tour.slug, "gallery"), { recursive: true });
  }

  const inboxImages = await listImages(inboxDir);
  const html = renderReviewHtml(tours, inboxImages);
  const indexPath = path.join(reviewDir, "index.html");
  await fs.writeFile(indexPath, html, "utf8");

  console.log(`Created workspace: ${rootDir}`);
  console.log(`Tours: ${tours.length}`);
  console.log(`Inbox images: ${inboxImages.length}`);
  console.log(`Open: ${indexPath}`);
}

main().catch((err) => {
  console.error("\nPrepare workspace failed:", err.message || err);
  process.exit(1);
});
