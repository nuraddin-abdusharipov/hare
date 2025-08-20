import { doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

export async function addUser(userId, data) {
  await setDoc(
    doc(db, "users", userId),
    {
      referrals: 0, 
      ...data
    },
    { merge: true } 
  );
}

// 🔹 User olish
export async function getUser(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  if (snap.exists()) {
    return snap.data();
  } else {
    return null;
  }
}

// 🔹 User yangilash
export async function updateUser(userId, newData) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, newData);
}

// 🔹 Task yangilash
export async function updateUserTask(userId, taskIndex, newData) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    [`task.${taskIndex}`]: newData
  });
}

// 🔹 Referral reward qo‘shish
export async function addReferralReward(userId, reward = 5000) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    balance: increment(reward), 
    referrals: increment(1)      
  });
}
