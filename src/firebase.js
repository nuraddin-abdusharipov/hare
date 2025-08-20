import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3Tibobnt90aQ5LNWFvVlUydGAQqAx7XQ",
  authDomain: "hares-203e2.firebaseapp.com",
  databaseURL: "https://hares-203e2-default-rtdb.firebaseio.com",
  projectId: "hares-203e2",
  storageBucket: "hares-203e2.firebasestorage.app",
  messagingSenderId: "594471916218",
  appId: "1:594471916218:web:fab8246024957763f52883"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export async function initAuth() {
  try {
    await signInAnonymously(auth);
    console.log("✅ Firebase anonymous login:", auth.currentUser.uid);
  } catch (err) {
    console.error("❌ Auth error:", err);
  }
}
