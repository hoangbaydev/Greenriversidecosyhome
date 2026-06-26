/**
 * Merge cleaned Classic Phong Nha + Duck Tang Farm tour content.
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-classic-duck-farm-tours.mjs --dry-run
 *   node --env-file=.env.local scripts/import-classic-duck-farm-tours.mjs
 *
 * This script only updates the classic tour documents listed in
 * scripts/content/duck-farm-classic-tours.mjs and uses Firestore merge writes.
 */

import { initializeApp, cert, applicationDefault, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { DUCK_FARM_CLASSIC_TOURS } from "./content/duck-farm-classic-tours.mjs";

const dryRun = process.argv.includes("--dry-run");

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing ${name} in .env.local`);
    process.exit(1);
  }
  return value;
}

function initAdmin() {
  if (getApps().length) return;

  const projectId = requireEnv("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  initializeApp({
    credential:
      clientEmail && privateKey
        ? cert({ projectId, clientEmail, privateKey })
        : applicationDefault(),
    projectId,
  });
}

async function main() {
  initAdmin();
  const db = getFirestore();

  console.log(`Mode: ${dryRun ? "dry run" : "write"}\n`);

  for (const tour of DUCK_FARM_CLASSIC_TOURS) {
    const docRef = db.collection("tours").doc(tour.id);
    const payload = {
      ...tour,
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (dryRun) {
      console.log(`WOULD MERGE tours/${tour.id}`);
      console.log(`  Title: ${tour.title}`);
      console.log(`  Price: ${tour.priceFrom.toLocaleString()} ${tour.currency}`);
      console.log(`  Highlights: ${tour.highlights.length}`);
      console.log(`  Timeline items: ${tour.timeline.length}`);
      continue;
    }

    const snapshot = await docRef.get();
    if (!snapshot.exists) {
      payload.createdAt = FieldValue.serverTimestamp();
    }

    await docRef.set(payload, { merge: true });
    console.log(`Merged tours/${tour.id}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("\nImport failed:", err.message || err);
  process.exit(1);
});
