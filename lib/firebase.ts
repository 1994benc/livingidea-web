// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import getConfig from "next/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function initBackend() {
  console.log("Initializing Firebase");
  let app: FirebaseApp = !getApps().length
    ? initializeApp(firebaseConfig)
    : getApps()[0];

  const { publicRuntimeConfig } = getConfig();
  const { NODE_ENV } = publicRuntimeConfig;

  if ((typeof window !== "undefined" && window.location.hostname === "localhost") || NODE_ENV === "test") {
    connectAuthEmulator(getAuth(), "http://localhost:9099");
    connectFirestoreEmulator(getFirestore(), 'localhost', 8080);
    connectStorageEmulator(getStorage(), "localhost", 9199);
    connectFunctionsEmulator(getFunctions(), "localhost", 5001);
  }
}
