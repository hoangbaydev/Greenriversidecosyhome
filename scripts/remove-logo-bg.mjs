/**
 * Make near-black pixels fully transparent (keeps green/orange logo art).
 * Usage: node scripts/remove-logo-bg.mjs [path...]
 */

import sharp from "sharp";
import { writeFileSync } from "fs";
import path from "path";

const THRESHOLD = 52;

function isBackground(r, g, b) {
  return r <= THRESHOLD && g <= THRESHOLD && b <= THRESHOLD;
}

async function processFile(filePath) {
  const absolute = path.resolve(filePath);
  const { data, info } = await sharp(absolute)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data);
  for (let i = 0; i < pixels.length; i += 4) {
    if (isBackground(pixels[i], pixels[i + 1], pixels[i + 2])) {
      pixels[i + 3] = 0;
    }
  }

  const output = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(absolute, output);
  console.log(`✓ ${filePath}`);
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error("Usage: node scripts/remove-logo-bg.mjs <file.png>...");
  process.exit(1);
}

for (const file of files) {
  await processFile(file);
}
