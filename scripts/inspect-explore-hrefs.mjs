import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
const html = fs.readFileSync(stablePath, 'utf8');
const formatted = html.replace(/>\s*</g, '>\n<').split('\n');

// Find lines containing explore-phong-nha or tours inside the explore section
const startIdx = formatted.findIndex(l => l.includes('id="explore"'));
if (startIdx !== -1) {
  console.log("Explore section starts at:", startIdx);
  const snippet = formatted.slice(startIdx, startIdx + 85);
  snippet.forEach((line, index) => {
    if (line.includes('href="') || line.includes('href=\'')) {
      console.log(`Line ${startIdx + index}: ${line}`);
    }
  });
} else {
  console.log("Explore section not found");
}
