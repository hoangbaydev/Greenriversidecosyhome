import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');
const newPath = path.resolve('out/en.html');

if (!fs.existsSync(stablePath) || !fs.existsSync(newPath)) {
  console.error("Missing html files");
  process.exit(1);
}

const stableHtml = fs.readFileSync(stablePath, 'utf8');
const newHtml = fs.readFileSync(newPath, 'utf8');

function getSections(html) {
  const regex = /<section\s+([^>]*id=["']([^"']*)["'])?\s*[^>]*class=["']([^"']*)["'][^>]*>/gi;
  let match;
  const sections = [];
  while ((match = regex.exec(html)) !== null) {
    sections.push({
      id: match[2] || '(no-id)',
      classes: match[3],
      raw: match[0].substring(0, 120)
    });
  }
  return sections;
}

const stableSecs = getSections(stableHtml);
const newSecs = getSections(newHtml);

console.log("\n--- STABLE SECTIONS ---");
stableSecs.forEach((s, idx) => console.log(`${idx + 1}. ID: ${s.id} | Class: ${s.classes}`));

console.log("\n--- NEW SECTIONS ---");
newSecs.forEach((s, idx) => console.log(`${idx + 1}. ID: ${s.id} | Class: ${s.classes}`));
