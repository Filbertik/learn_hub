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

  if (!progressSnapshot.exists()) {
    return {
      courseId,
      completedLessons: [],
      progress: 0,
    };
  }

  const data = progressSnapshot.data();

  const completedLessons = Array.isArray(data.completedLessons)
    ? data.completedLessons.filter(
        (lessonId): lessonId is string => typeof lessonId === "string",
      )
    : [];

  return {
    courseId,
    completedLessons,
    progress: calculateProgress(
      completedLessons,
      totalLessonsFromData(data, completedLessons),
    ),
  };
}

function totalLessonsFromData(
  data: Record<string, unknown>,
  completedLessons: string[],
): number {
  const savedProgress = data.progress;

  if (
    typeof savedProgress === "number" &&
    savedProgress >= 0 &&
    savedProgress <= 100 &&
    completedLessons.length > 0
  ) {
    // The actual percentage is recalculated by the caller
    // when the course lesson count is available.
    return completedLessons.length / (savedProgress / 100);
  }
