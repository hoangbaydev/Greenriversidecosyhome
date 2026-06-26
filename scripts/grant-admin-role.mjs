/**
 * Grant Firestore admin role to an existing Firebase Auth user without changing password.
 * Usage: node --env-file=.env.local scripts/grant-admin-role.mjs email@example.com
 */

import { applicationDefault, cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const email = process.argv[2];
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!email) {
  console.error("Usage: node --env-file=.env.local scripts/grant-admin-role.mjs email@example.com");
  process.exit(1);
}

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_FIREBASE_PROJECT_ID in .env.local");
  process.exit(1);
}

function initAdmin() {
  if (getApps().length) return;

  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
    return;
  }

  initializeApp({
    credential: applicationDefault(),
    projectId,
  });
}

async function main() {
  initAdmin();

  const user = await getAuth().getUserByEmail(email);
  await getFirestore().collection("users").doc(user.uid).set(
    {
      email,
      role: "admin",
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  console.log(`Granted admin role to ${email}`);
  console.log(`Firestore document: users/${user.uid}`);
}

main().catch((error) => {
  console.error("Failed to grant admin role:", error.message || error);
  process.exit(1);
});
