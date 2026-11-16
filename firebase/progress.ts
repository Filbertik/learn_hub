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

function calculateProgress(
  completedLessons: string[],
  totalLessons: number,
): number {
  if (totalLessons <= 0) {
    return 0;
  }

  return Math.round((completedLessons.length / totalLessons) * 100);
}

export async function getCourseProgress(
  userId: string,
  courseId: string,
): Promise<CourseProgress> {
  const progressRef = doc(db, "users", userId, "enrollments", courseId);

  const progressSnapshot = await getDoc(progressRef);

 