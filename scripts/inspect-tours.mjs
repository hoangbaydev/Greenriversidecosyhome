import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(config);
const db = getFirestore(app);

async function main() {
  console.log("Checking all tours in database...");
  const qAll = collection(db, "tours");
  try {
    const snapAll = await getDocs(qAll);
    console.log(`Total tours (unfiltered query): ${snapAll.size}`);
    snapAll.forEach(d => {
      console.log(`- ID: ${d.id}, Title: ${d.data().title || d.data().name}, Published: ${d.data().published}`);
    });
  } catch (err) {
    console.log(`Unfiltered query error: ${err.message}`);
  }

  console.log("\nChecking published tours...");
  const qPub = query(collection(db, "tours"), where("published", "==", true));
  try {
    const snapPub = await getDocs(qPub);
    console.log(`Published tours: ${snapPub.size}`);
    snapPub.forEach(d => {
      console.log(`- ID: ${d.id}, Title: ${d.data().title || d.data().name}`);
    });
  } catch (err) {
    console.log(`Published query error: ${err.message}`);
  }
}

main().catch(console.error);
