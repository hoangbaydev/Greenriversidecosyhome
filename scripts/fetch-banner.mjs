/**
 * Create homepage hero once at public/images/home-hero.webp (1920×1080).
 * Skips if file already exists — not replaced on re-run.
 * Usage: node scripts/fetch-banner.mjs
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const HERO_PATH = path.resolve("public/images/home-hero.webp");

async function main() {
  if (fs.existsSync(HERO_PATH)) {
    console.log("Hero already exists — skipped (delete public/images/home-hero.webp to regenerate).");
    return;
  }

  fs.mkdirSync(path.dirname(HERO_PATH), { recursive: true });

  const url = "https://picsum.photos/seed/grc-home-banner/1920/1080";
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Hero download failed: HTTP ${res.status}`);

  const input = Buffer.from(await res.arrayBuffer());
  await sharp(input)
    .resize(1920, 1080, { fit: "cover" })
    .webp({ quality: 85, effort: 4 })
    .toFile(HERO_PATH);

  const kb = Math.round(fs.statSync(HERO_PATH).size / 1024);
  console.log(`✓ public/images/home-hero.webp (${kb} KB)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
