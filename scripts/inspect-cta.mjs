import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
const html = fs.readFileSync(stablePath, 'utf8');
const formatted = html.replace(/>\s*</g, '>\n<').split('\n');

// Find the section that has bg-primary py-16 md:py-20
const idx = formatted.findIndex(l => l.includes('bg-primary py-16 md:py-20'));
if (idx !== -1) {
  console.log("Found final CTA section at line:", idx);
  console.log(formatted.slice(idx, idx + 40).join('\n'));
} else {
  // Let's search for py-16 md:py-20
  const idx2 = formatted.findIndex(l => l.includes('py-16 md:py-20') || l.includes('py-16'));
  console.log("Alt match:", idx2);
  if (idx2 !== -1) {
    console.log(formatted.slice(idx2 - 1, idx2 + 40).join('\n'));
  }
}
