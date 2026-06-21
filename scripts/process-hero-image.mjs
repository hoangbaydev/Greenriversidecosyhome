/**
 * Optimize the homepage hero and social preview images.
 * Usage: node scripts/process-hero-image.mjs <input-path>
 */

import sharp from "sharp";
import { mkdirSync } from "fs";
import path from "path";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/process-hero-image.mjs <input-path>");
  process.exit(1);
}

const outDir = path.resolve("public/images");
mkdirSync(outDir, { recursive: true });

const inputPath = path.resolve(input);
const metaIn = await sharp(inputPath).metadata();
console.log(`Input: ${metaIn.width}x${metaIn.height}`);

const base = sharp(inputPath).rotate();

await base
  .clone()
  .resize(1920, 1120, { fit: "cover", position: "center" })
  .sharpen({ sigma: 1.4, m1: 1.2, m2: 0.6 })
  .modulate({ saturation: 1.06, brightness: 1.02 })
  .webp({ quality: 78, effort: 6 })
  .toFile(path.join(outDir, "home-hero.webp"));

await base
  .clone()
  .resize(1280, 747, { fit: "cover", position: "center" })
  .sharpen({ sigma: 1.4, m1: 1.2, m2: 0.6 })
  .modulate({ saturation: 1.06, brightness: 1.02 })
  .webp({ quality: 76, effort: 6 })
  .toFile(path.join(outDir, "home-hero-1280.webp"));

await base
  .clone()
  .resize(768, 960, { fit: "cover", position: "center" })
  .sharpen({ sigma: 1.2, m1: 1.1, m2: 0.5 })
  .modulate({ saturation: 1.06, brightness: 1.02 })
  .webp({ quality: 74, effort: 6 })
  .toFile(path.join(outDir, "home-hero-mobile.webp"));

await base
  .clone()
  .resize(1200, 630, { fit: "cover", position: "center" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(outDir, "og-default.jpg"));

for (const file of [
  "home-hero.webp",
  "home-hero-1280.webp",
  "home-hero-mobile.webp",
  "og-default.jpg",
]) {
  const meta = await sharp(path.join(outDir, file)).metadata();
  console.log(`Created public/images/${file} (${meta.width}x${meta.height})`);
}
