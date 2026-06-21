import fs from 'fs';
import path from 'path';

if (!fs.existsSync('diff.txt')) {
  console.error("diff.txt not found");
  process.exit(1);
}

const diffs = fs.readFileSync('diff.txt', 'utf8').split('\n');

// Filter lines starting with row numbers between 130 and 220
const rangeDiffs = diffs.filter(d => {
  const match = d.match(/^\[[+D-]\] Row (\d+):/);
  if (match) {
    const row = parseInt(match[1]);
    return row >= 130 && row <= 220;
  }
  return false;
});

// Since each diff might span multiple lines, let's find the original lines in diffs array
const output = [];
diffs.forEach((d, idx) => {
  const match = d.match(/^\[[+D-]\] Row (\d+):/);
  if (match) {
    const row = parseInt(match[1]);
    if (row >= 130 && row <= 220) {
      // grab this line and next 2 lines
      output.push(diffs.slice(idx, idx + 4).join('\n'));
    }
  }
});

console.log("\n--- DIFFERENCES FOR ROWS 130 - 220 ---");
console.log(output.join('\n\n'));
