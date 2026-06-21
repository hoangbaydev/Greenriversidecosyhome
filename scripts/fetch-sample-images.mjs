/**
 * Download sample photos into public/images/samples/ as WebP.
 * Homepage hero (public/images/home-hero.webp) is separate — never overwritten here.
 * Usage: node scripts/fetch-sample-images.mjs
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const SAMPLES_DIR = path.resolve("public/images/samples");

/** Seeded Picsum — stable unique image per key. No hero/banner here. */
const SAMPLES = [
  { file: "homestay", seed: "grc-homestay", w: 1600, h: 1000 },
  { file: "river", seed: "grc-river", w: 1600, h: 900 },
  { file: "rooftop", seed: "grc-rooftop", w: 1600, h: 900 },
  { file: "room", seed: "grc-room", w: 1600, h: 1000 },
  { file: "room-alt", seed: "grc-room-alt", w: 1600, h: 1000 },
  { file: "cave", seed: "grc-cave", w: 1600, h: 900 },
  { file: "cave-alt", seed: "grc-cave-alt", w: 1600, h: 900 },
  { file: "jungle", seed: "grc-jungle", w: 1600, h: 900 },
  { file: "garden", seed: "grc-garden", w: 1600, h: 900 },
  { file: "boat", seed: "grc-boat", w: 1600, h: 900 },
  { file: "mountains", seed: "grc-mountains", w: 1600, h: 900 },
  { file: "lunch", seed: "grc-lunch", w: 1600, h: 900 },
  { file: "sunset", seed: "grc-sunset", w: 1600, h: 900 },
  { file: "pool", seed: "grc-pool", w: 1600, h: 900 },
  { file: "community", seed: "grc-community", w: 1600, h: 900 },
];

async function downloadOne({ file, seed, w, h }) {
  const dest = path.join(SAMPLES_DIR, `${file}.webp`);
  const url = `https://picsum.photos/seed/${seed}/${w}/${h}`;

  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`${file}: HTTP ${res.status}`);

  const input = Buffer.from(await res.arrayBuffer());
  await sharp(input)
    .resize(w, h, { fit: "cover", withoutEnlargement: false })
    .webp({ quality: 82, effort: 4 })
    .toFile(dest);

  const kb = Math.round(fs.statSync(dest).size / 1024);
  console.log(`✓ samples/${file}.webp (${kb} KB)`);
}

async function main() {
  fs.mkdirSync(SAMPLES_DIR, { recursive: true });

  console.log(`Saving samples to ${SAMPLES_DIR}`);
  console.log("(Hero at public/images/home-hero.webp is not touched — run images:banner to create it once)\n");

  for (const sample of SAMPLES) {
    await downloadOne(sample);
  }

  console.log(`\nDone — ${SAMPLES.length} sample files updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
