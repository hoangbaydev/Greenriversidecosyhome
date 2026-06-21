import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", process.argv[2] || "out");
const port = Number(process.env.PORT || process.argv[3] || 3000);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0] || "/");
  const clean = decoded.replace(/^\/+/, "");
  const candidates = [
    path.join(root, clean),
    path.join(root, clean, "index.html"),
    path.join(root, `${clean}.html`),
  ];

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate);
    if (!resolved.startsWith(root)) continue;
    if (existsSync(resolved) && statSync(resolved).isFile()) return resolved;
  }

  return path.join(root, "404.html");
}

createServer((req, res) => {
  const file = resolveFile(req.url || "/");
  const ext = path.extname(file);
  const cacheStatic = /\.(?:js|css|png|jpg|jpeg|webp|svg|ico|woff2?)$/i.test(file);

  res.setHeader("Content-Type", types[ext] || "application/octet-stream");
  res.setHeader(
    "Cache-Control",
    cacheStatic ? "public,max-age=31536000,immutable" : "public,max-age=0,must-revalidate"
  );

  createReadStream(file)
    .on("error", () => {
      res.statusCode = 404;
      res.end("Not found");
    })
    .pipe(res);
}).listen(port, () => {
  console.log(`Serving ${root} at http://localhost:${port}`);
});
