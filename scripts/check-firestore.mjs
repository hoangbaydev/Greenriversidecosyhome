/**
 * Quick Firestore read check (public rules).
 * Usage: node --env-file=.env.local scripts/check-firestore.mjs
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const collections = [
  "homepage_content",
  "site_settings",
  "contact_information",
  "story_content",
  "rooms",
  "tours",
  "activities",
  "gallery",
  "reviews",
  "blog_posts",
  "faq_content",
  "page_content",
];

const app = initializeApp(config);
const db = getFirestore(app);

console.log(`Project: ${config.projectId}\n`);

for (const name of collections) {
  try {
    const snap = await getDocs(collection(db, name));
    console.log(`${name}: ${snap.size} document(s)`);
    if (name === "homepage_content" && snap.size) {
      const main = await getDoc(doc(db, name, "main"));
      const data = main.data();
      console.log(`  → homepage heroTitle: ${data?.heroTitle ? `"${data.heroTitle}"` : "(empty)"}`);
    }
  } catch (err) {
    console.log(`${name}: ERROR — ${err.code || err.message}`);
  }
}
