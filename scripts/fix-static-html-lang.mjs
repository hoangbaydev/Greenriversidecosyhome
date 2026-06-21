import { readdirSync, readFileSync, statSync, writeFileSync } from "fs";
import path from "path";

const outDir = path.resolve("out");
const targets = [path.join(outDir, "vi.html"), path.join(outDir, "vi")];

function walkHtmlFiles(target) {
  if (!statSync(target, { throwIfNoEntry: false })) return [];
  const stats = statSync(target);
  if (stats.isFile()) return target.endsWith(".html") ? [target] : [];
  return readdirSync(target).flatMap((entry) => walkHtmlFiles(path.join(target, entry)));
}

let updated = 0;
for (const file of targets.flatMap(walkHtmlFiles)) {
  const html = readFileSync(file, "utf8");
  const next = html.replace("<html lang=\"en\"", "<html lang=\"vi\"");
  if (next !== html) {
    writeFileSync(file, next);
    updated += 1;
  }
}

console.log(`Updated ${updated} Vietnamese HTML file(s) to lang=\"vi\".`);
