/**
 * Restore room image arrays from rooms/{roomId}/images metadata.
 * Usage: node --env-file=.env.local scripts/restore-room-images-from-metadata.mjs
 */

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { ROOMS } from "./content/from-docx.mjs";

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || "admin@greenriversidecosyhome.com";
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || "admin123@";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function normalizeImages(roomId, docs) {
  return docs
    .map((docSnap, index) => {
      const data = docSnap.data();
      return {
        id: data.id || docSnap.id,
        imageUrl: data.imageUrl || "",
        imagePath: data.imagePath || "",
        roomId,
        sortOrder: Number.isFinite(data.sortOrder) ? data.sortOrder : index,
        isCover: Boolean(data.isCover),
        altText: data.altText || "",
        title: data.title || "",
        description: data.description || "",
        uploadedAt: data.uploadedAt || new Date().toISOString(),
      };
    })
    .filter((image) => image.imageUrl)
    .sort((a, b) => {
      if (a.isCover && !b.isCover) return -1;
      if (!a.isCover && b.isCover) return 1;
      return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
    })
    .map((image, index) => ({
      ...image,
      sortOrder: index,
      isCover: index === 0,
    }));
}

async function main() {
  console.log("Signing in as admin...");
  await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);

  let restoredRooms = 0;
  let restoredImages = 0;

  for (const room of ROOMS) {
    const snapshot = await getDocs(collection(db, "rooms", room.id, "images"));
    const roomImages = normalizeImages(room.id, snapshot.docs);

    if (!roomImages.length) {
      console.log(`No image metadata found for rooms/${room.id}`);
      continue;
    }

    await setDoc(
      doc(db, "rooms", room.id),
      {
        images: roomImages.map((image) => image.imageUrl),
        roomImages,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    restoredRooms += 1;
    restoredImages += roomImages.length;
    console.log(`Restored ${roomImages.length} image(s) for rooms/${room.id}`);
  }

  console.log(`Image restore complete. Rooms: ${restoredRooms}. Images: ${restoredImages}.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Image restore failed:", error);
    process.exit(1);
  });
