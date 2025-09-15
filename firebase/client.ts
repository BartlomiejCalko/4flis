// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMXhqUcEtgpt3ZFJVMRKeCXq9erfI--ZA",
  authDomain: "flis-3e60f.firebaseapp.com",
  projectId: "flis-3e60f",
  storageBucket: "flis-3e60f.appspot.com",
  messagingSenderId: "838844136010",
  appId: "1:838844136010:web:df336ca3b8ee5ddef044b3",
  measurementId: "G-W0J9X37GZQ"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);