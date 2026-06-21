import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics, isSupported } from "firebase/analytics";
import { getEnv, isEnvValid } from "@/lib/env";

export function isFirebaseConfigured(): boolean {
  return isEnvValid();
}

function getFirebaseConfig() {
  const env = getEnv();
  if (!env) return null;
  return {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let analytics: Analytics | undefined;

export function getFirebaseApp(): FirebaseApp | null {
  const config = getFirebaseConfig();
  if (!config) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(config);
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!auth) auth = getAuth(firebaseApp);
  return auth;
}

export function getFirebaseDb(): Firestore | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!db) db = getFirestore(firebaseApp);
  return db;
}

export function getFirebaseStorage(): FirebaseStorage | null {
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  if (!storage) storage = getStorage(firebaseApp);
  return storage;
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  const firebaseApp = getFirebaseApp();
  if (!firebaseApp) return null;
  const supported = await isSupported();
  if (!supported) return null;
  if (!analytics) analytics = getAnalytics(firebaseApp);
  return analytics;
}

export const STORAGE_PATHS = {
  hero: "hero/",
  rooms: "rooms/",
  tours: "tours/",
  activities: "activities/",
  gallery: "gallery/",
  cafe: "cafe/",
  blog: "blog/",
  site: "site/",
  reviews: "reviews/",
} as const;

export type StorageFolder = keyof typeof STORAGE_PATHS;

export const FIRESTORE_COLLECTIONS = {
  users: "users",
  rooms: "rooms",
  tours: "tours",
  activities: "activities",
  transportation: "transportation",
  gallery: "gallery",
  reviews: "reviews",
  blogPosts: "blog_posts",
  homepageContent: "homepage_content",
  siteSettings: "site_settings",
  contactInformation: "contact_information",
  storyContent: "story_content",
  cafeContent: "cafe_content",
  faqContent: "faq_content",
  faqs: "faqs",
  pageContent: "page_content",
} as const;
