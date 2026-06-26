/**
 * Merge Jungle Boss tour details into existing adventure tours.
 *
 * Usage:
 *   node --env-file=.env.local scripts/import-jungle-boss-tour-details.mjs --dry-run
 *   node --env-file=.env.local scripts/import-jungle-boss-tour-details.mjs
 *
 * This script updates only the Jungle Boss adventure tour documents and uses
 * Firestore merge writes, so unrelated fields and other tours remain.
 */

import { initializeApp, cert, applicationDefault, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { ADVENTURE_TOURS } from "./content/brochure-tours.mjs";

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

  for (const tour of ADVENTURE_TOURS) {
    const docRef = db.collection("tours").doc(tour.id);
    const payload = {
      ...tour,
      updatedAt: FieldValue.serverTimestamp(),
    };

    if (dryRun) {
      console.log(`WOULD MERGE tours/${tour.id}`);
      console.log(`  Title: ${tour.title}`);
      console.log(`  Price: ${tour.priceFrom?.toLocaleString?.() ?? tour.priceFrom} ${tour.currency}`);
      console.log(`  Highlights: ${tour.highlights?.length ?? 0}`);
      console.log(`  Timeline items: ${tour.timeline?.length ?? 0}`);
      console.log(`  FAQ: ${tour.faq?.length ?? 0}`);
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
