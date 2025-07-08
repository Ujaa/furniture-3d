// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_CONFIG } from "@/shared/config/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_CONFIG.API_KEY,
  authDomain: FIREBASE_CONFIG.AUTH_DOMAIN,
  projectId: FIREBASE_CONFIG.PROJECT_ID,
  storageBucket: FIREBASE_CONFIG.STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONFIG.MESSAGING_SENDER_ID,
  appId: FIREBASE_CONFIG.APP_ID,
  measurementId: FIREBASE_CONFIG.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
