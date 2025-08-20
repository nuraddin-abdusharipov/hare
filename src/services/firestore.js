// src/services/firestore.js
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function addUser(userId, data) {
  await setDoc(doc(db, "users", userId), data);
}

export async function getUser(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  if (snap.exists()) {
    return snap.data();
  } else {
    return null;
  }
}

export async function updateUserTask(userId, taskIndex, newData) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    [`task.${taskIndex}`]: newData
  });
}
