import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";

import { db } from "@/firebase/firestore";

export async function syncUserProfile(user: User): Promise<void> {
  const userRef = doc(db, "users", user.uid);

  const userSnapshot = await getDoc(userRef);

  const profileData = {
    name: user.displayName ?? "",
    email: user.email ?? "",
    updatedAt: serverTimestamp(),
  };

  if (userSnapshot.exists()) {
    await updateDoc(userRef, profileData);
    return;
  }
}
