import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import type { User } from "firebase/auth";

import { db } from "@/firebase/firestore";
