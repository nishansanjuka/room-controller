import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
