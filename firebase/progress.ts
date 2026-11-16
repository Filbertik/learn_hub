import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firestore";

export interface CourseProgress {
  courseId: string;
  completedLessons: string[];
  progress: number;
}

interface ToggleLessonCompletionParams {
  userId: string;
  courseId: string;
  lessonId: string;
  totalLessons: number;
}
