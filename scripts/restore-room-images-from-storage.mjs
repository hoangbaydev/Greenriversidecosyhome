/**
 * Restore room image arrays by listing Firebase Storage folders.
 * Usage: node --env-file=.env.local scripts/restore-room-images-from-storage.mjs
 */

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";
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
const storage = getStorage(app);

async function listFolderItems(path) {
  try {
    const result = await listAll(ref(storage, path));
    return result.items;
  } catch (error) {
    console.warn(`Could not list storage folder ${path}`, error);
    return [];
  }
}

async function getRoomStorageImages(room) {
  const folders = [
    { path: `rooms/${room.id}/cover`, cover: true },
    { path: `rooms/${room.id}/gallery`, cover: false },
  ];
  const images = [];

  for (const folder of folders) {
    const items = await listFolderItems(folder.path);
    for (const item of items) {
      const imageUrl = await getDownloadURL(item);
      images.push({
        id: item.name.replace(/\.[^.]+$/, ""),
        imageUrl,
        imagePath: item.fullPath,
        roomId: room.id,
        sortOrder: images.length,
        isCover: folder.cover && images.length === 0,
        altText: `${room.title} at Green Riverside Cosy Home`,
        title: room.title,
        description: `${room.title} accommodation preview`,
        uploadedAt: new Date().toISOString(),
      });
    }
  }

  return images.map((image, index) => ({
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
    const roomImages = await getRoomStorageImages(room);

    if (!roomImages.length) {
      console.log(`No storage images found for rooms/${room.id}`);
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
    console.log(`Restored ${roomImages.length} storage image(s) for rooms/${room.id}`);
  }

  console.log(`Storage restore complete. Rooms: ${restoredRooms}. Images: ${restoredImages}.`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Storage image restore failed:", error);
    process.exit(1);
  });
