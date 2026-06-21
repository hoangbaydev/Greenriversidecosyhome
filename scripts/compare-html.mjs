import fs from 'fs';
import path from 'path';

const stablePath = path.resolve('.firebase/green-riverside-cosy-home/functions/.next/server/app/en.html');

function findHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const outHtmls = findHtmlFiles(path.resolve('out'));
const newPath = outHtmls.find(f => f.includes('en.html') || f.includes('en/index.html') || f.includes('en\\index.html'));

if (!fs.existsSync(stablePath) || !newPath || !fs.existsSync(newPath)) {
  console.error("Missing files");
  process.exit(1);
}

const stableHtml = fs.readFileSync(stablePath, 'utf8');
const newHtml = fs.readFileSync(newPath, 'utf8');

function extractStructure(htmlText) {
  const regex = /<(header|nav|section|main|footer|article|div|h1|h2|h3|button|a)\s+[^>]*class=["']([^"']*)["'][^>]*>/gi;
  let match;
  const list = [];
  while ((match = regex.exec(htmlText)) !== null) {
    const tag = match[1].toLowerCase();
    const classVal = match[2];
    if (tag === 'div' && (!classVal || classVal.includes('__') || (classVal.includes('flex-1') && classVal.split(' ').length < 2))) {
      continue;
    }
    list.push({ tag, classes: classVal, raw: match[0] });
  }
  return list;
}

const stableStruct = extractStructure(stableHtml);
const newStruct = extractStructure(newHtml);

let diffs = [];
const maxLength = Math.max(stableStruct.length, newStruct.length);

for (let i = 0; i < maxLength; i++) {
  const s = stableStruct[i];
  const n = newStruct[i];
  
  if (!s && n) {
    diffs.push(`[+] Row ${i}: Extra tag in New: ${n.raw}`);
  } else if (s && !n) {
    diffs.push(`[-] Row ${i}: Missing tag in New: ${s.raw}`);
  } else {
    const sClasses = s.classes.split(/\s+/).filter(Boolean).sort().join(' ');
    const nClasses = n.classes.split(/\s+/).filter(Boolean).sort().join(' ');
    if (s.tag !== n.tag || sClasses !== nClasses) {
      diffs.push(`[D] Row ${i}: Diff!\n    Stable: ${s.raw}\n    New:    ${n.raw}`);
    }
  }
}

fs.writeFileSync('diff.txt', diffs.join('\n'));
console.log(`Saved ${diffs.length} differences to diff.txt`);
console.log("\n--- FIRST 20 DIFFERENCES ---");
console.log(diffs.slice(0, 20).join('\n'));
