import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
const newPath = path.resolve('out/en.html');

if (!fs.existsSync(stablePath) || !fs.existsSync(newPath)) {
  console.error("Missing files");
  process.exit(1);
}

const stableHtml = fs.readFileSync(stablePath, 'utf8');
const newHtml = fs.readFileSync(newPath, 'utf8');

// Let's pretty print the HTML by putting newlines after/before block elements to make it readable
let formattedStable = stableHtml.replace(/>\s*</g, '>\n<');
let formattedNew = newHtml.replace(/>\s*</g, '>\n<');

// Find lines containing the final CTA section (bg-primary py-16) in stable
function getMatchingRange(lines, query) {
  const matchingIdx = lines.findIndex(l => l.includes(query));
  if (matchingIdx === -1) return [];
  // Grab 25 lines before and after
  return lines.slice(Math.max(0, matchingIdx - 2), Math.min(lines.length, matchingIdx + 30));
}

const stableLines = formattedStable.split('\n');
const newLines = formattedNew.split('\n');

console.log("\n--- STABLE FINAL CTA ---");
console.log(getMatchingRange(stableLines, 'py-16 md:py-20').join('\n'));

console.log("\n--- NEW FINAL CTA ---");
console.log(getMatchingRange(newLines, 'py-24 md:py-36').join('\n'));

console.log("\n--- STABLE EXPLORE SECTION ---");
console.log(getMatchingRange(stableLines, 'id="explore"').join('\n'));

console.log("\n--- NEW EXPLORE SECTION ---");
console.log(getMatchingRange(newLines, 'id="explore"').join('\n'));

console.log("\n--- STABLE STAY SECTION ---");
console.log(getMatchingRange(stableLines, 'id="stay"').join('\n'));

console.log("\n--- NEW STAY SECTION ---");
console.log(getMatchingRange(newLines, 'id="stay"').join('\n'));
