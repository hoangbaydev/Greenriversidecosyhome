"use client";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { getFirebaseAuth, getFirebaseDb } from "./config";
import type { User } from "@/types";

export async function loginAdmin(
  email: string,
  password: string
): Promise<FirebaseUser> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase is not configured");
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

export async function logoutAdmin(): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase is not configured");
  await signOut(auth);
}

export function subscribeToAuth(
  callback: (user: FirebaseUser | null) => void
): () => void {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as User;
}

export async function isAdminUser(uid: string): Promise<boolean> {
  const profile = await getUserProfile(uid);
  return profile?.role === "admin" || profile?.role === "editor";
}
