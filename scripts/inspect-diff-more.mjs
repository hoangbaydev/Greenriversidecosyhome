import fs from 'fs';
import path from 'path';

if (!fs.existsSync('diff.txt')) {
  console.error("diff.txt not found");
  process.exit(1);
}

const diffs = fs.readFileSync('diff.txt', 'utf8').split('\n');
console.log(`Total diff lines: ${diffs.length}`);

// Let's filter out row differences that are just tiny nextjs attributes/IDs or minor class changes, 
// and print actual significant diffs (like sections, structural mismatches, cards, buttons)
const cleanDiffs = diffs.filter(d => {
  // Ignore minor layout or text differences if they don't affect visual design significantly
  return !d.includes('cursor-pointer') && !d.includes('aria-') && !d.includes('svg') && !d.includes('path') && !d.includes('decoding') && !d.includes('loading');
});

console.log("\n--- CLEANED SIGNIFICANT DIFFERENCES (First 35) ---");
console.log(cleanDiffs.slice(0, 35).join('\n'));
