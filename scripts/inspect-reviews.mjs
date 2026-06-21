import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
if (!fs.existsSync(stablePath)) {
  console.error("Missing stable html file");
  process.exit(1);
}

const html = fs.readFileSync(stablePath, 'utf8');
const formatted = html.replace(/>\s*</g, '>\n<').split('\n');

// Find reviews section or something containing "Guest Reviews" or similar
const lineIdx = formatted.findIndex(l => l.includes('Guest Reviews'));
if (lineIdx !== -1) {
  console.log("Found reviews heading at line:", lineIdx);
  // print next 100 lines
  console.log(formatted.slice(lineIdx, lineIdx + 100).join('\n'));
} else {
  console.log("Could not find reviews heading in stable HTML.");
}
