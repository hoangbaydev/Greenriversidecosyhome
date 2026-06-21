import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
if (!fs.existsSync(stablePath)) {
  console.error("Missing stable html file");
  process.exit(1);
}

const html = fs.readFileSync(stablePath, 'utf8');
const formatted = html.replace(/>\s*</g, '>\n<').split('\n');

const lineIdx = formatted.findIndex(l => l.includes('id="eat-drink"'));
if (lineIdx !== -1) {
  console.log("Found eat-drink section at line:", lineIdx);
  console.log(formatted.slice(lineIdx - 1, lineIdx + 70).join('\n'));
} else {
  console.log("Could not find eat-drink section in stable HTML.");
}
