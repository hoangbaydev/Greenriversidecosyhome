import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

const collections = [
  "rooms",
  "tours",
  "activities",
  "transportation",
  "gallery",
  "reviews",
  "blog_posts",
  "homepage_content",
  "site_settings",
  "contact_information",
  "story_content",
  "cafe_content",
  "faq_content",
  "faqs",
  "page_content",
  "users",
];

function serialize(value) {
  if (value instanceof Timestamp) return value.toDate().toISOString();
  if (Array.isArray(value)) return value.map(serialize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, serialize(nested)])
    );
  }
  return value;
}

if (!projectId || !clientEmail || !privateKey) {
  console.error(
    "Missing Firebase Admin env. Add FIREBASE_ADMIN_CLIENT_EMAIL and FIREBASE_ADMIN_PRIVATE_KEY to .env.local."
  );
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

const db = getFirestore();
const backup = {
  projectId,
  exportedAt: new Date().toISOString(),
  collections: {},
};

for (const collectionName of collections) {
  const snap = await db.collection(collectionName).get();
  backup.collections[collectionName] = snap.docs.map((doc) => ({
    id: doc.id,
    data: serialize(doc.data()),
  }));
  console.log(`${collectionName}: ${snap.size} document(s)`);
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const dir = path.join(process.cwd(), "backups");
const file = path.join(dir, `firestore-${stamp}.json`);
await mkdir(dir, { recursive: true });
await writeFile(file, `${JSON.stringify(backup, null, 2)}\n`, "utf8");

console.log(`Backup written to ${file}`);
