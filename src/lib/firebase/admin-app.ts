import "server-only";

import { cert, getApps, initializeApp, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let adminDb: Firestore | null | undefined;

export function isAdminFirestoreConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY &&
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  );
}

export function getAdminFirestore(): Firestore | null {
  if (adminDb !== undefined) return adminDb;

  if (!isAdminFirestoreConfigured()) {
    adminDb = null;
    return null;
  }

  if (!getApps().length) {
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY!.replace(/\\n/g, "\n");
    initializeApp({
      credential: cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      } as ServiceAccount),
    });
  }

  adminDb = getFirestore();
  return adminDb;
}
