/**
 * Create Firebase Auth admin user + Firestore users/{uid} profile.
 * Usage: node --env-file=.env.local scripts/create-admin.mjs [email] [password]
 *
 * Requires one of:
 * - FIREBASE_ADMIN_CLIENT_EMAIL + FIREBASE_ADMIN_PRIVATE_KEY in .env.local
 * - OR gcloud/firebase CLI login (Application Default Credentials)
 */

import { initializeApp, cert, applicationDefault, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const email = process.argv[2] || "admin@greenriversidecosyhome.com";
const password = process.argv[3] || "admin123@";
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

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
    console.log("Using service account from .env.local\n");
    return;
  }

  initializeApp({
    credential: applicationDefault(),
    projectId,
  });
  console.log("Using Application Default Credentials (firebase login)\n");
}

async function main() {
  initAdmin();
  const auth = getAuth();
  const db = getFirestore();

  let user;
  try {
    user = await auth.getUserByEmail(email);
    console.log(`Auth user already exists: ${email} (uid: ${user.uid})`);
    await auth.updateUser(user.uid, { password });
    console.log("Password updated.");
  } catch (err) {
    if (err.code !== "auth/user-not-found") throw err;
    user = await auth.createUser({ email, password, emailVerified: true });
    console.log(`Created auth user: ${email} (uid: ${user.uid})`);
  }

  await db.collection("users").doc(user.uid).set(
    {
      email,
      role: "admin",
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
  console.log(`Firestore users/${user.uid} → role: admin`);
  console.log("\nLogin at http://localhost:3000/admin/login");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
}

main().catch((err) => {
  console.error("\nFailed:", err.message || err);
  if (err.code === "app/invalid-credential" || err.message?.includes("credentials")) {
    console.error(`
Add service account to .env.local:
  FIREBASE_ADMIN_CLIENT_EMAIL=...
  FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"

Or run: firebase login
`);
  }
  process.exit(1);
});
