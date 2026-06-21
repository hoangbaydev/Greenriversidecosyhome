import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
const html = fs.readFileSync(stablePath, 'utf8');
const formatted = html.replace(/>\s*</g, '>\n<').split('\n');

const idx = formatted.findIndex(l => l.includes('class="bg-primary py-16 md:py-20"'));
if (idx !== -1) {
  console.log("Found CTA at:", idx);
  console.log(formatted.slice(idx, idx + 20).join('\n'));
} else {
  // Let's find any occurrences of "bg-primary py-" or similar
  formatted.forEach((line, i) => {
    if (line.includes('bg-primary py-16') || line.includes('bg-primary py-20') || (line.includes('bg-primary') && (line.includes('py-16') || line.includes('py-20')))) {
      console.log(`Line ${i}: ${line}`);
      console.log(formatted.slice(i, i + 15).join('\n'));
    }
  });
}
