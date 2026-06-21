import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
if (!fs.existsSync(htmlPath)) {
  console.error("HTML file not found at " + htmlPath);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// A very simple regex-based extractor to get classes and structure of key elements
// like headers, nav, main, sections, cards, buttons, images
console.log("Analyzing HTML structure and classes...");

// Let's pretty print the HTML by putting newlines after/before block elements to make it readable
let formatted = html
  .replace(/>\s*</g, '>\n<') // newline between tags
  .split('\n')
  .filter(line => line.trim().length > 0)
  .join('\n');

// Write out formatted file for viewing
const outputPath = path.resolve('formatted_en.html');
fs.writeFileSync(outputPath, formatted);
console.log("Formatted HTML written to " + outputPath);

// Let's extract key tags of interest to console
const regex = /<(header|nav|section|button|a|img)\s+[^>]*class=["']([^"']*)["'][^>]*>/gi;
let match;
const tags = [];
while ((match = regex.exec(html)) !== null) {
  tags.push({ tag: match[1], classList: match[2] });
}

console.log(`Total key tags found: ${tags.length}`);
// Print unique key elements or a summary of classes grouped by tag
const summary = {};
tags.forEach(t => {
  if (!summary[t.tag]) summary[t.tag] = new Set();
  summary[t.tag].add(t.classList);
});

for (const [tag, classes] of Object.entries(summary)) {
  console.log(`\n--- Tag: ${tag} (${classes.size} unique class list combinations) ---`);
  Array.from(classes).slice(0, 15).forEach(c => console.log(`  class="${c}"`));
}
