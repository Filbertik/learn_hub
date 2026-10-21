"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { Course, Lesson } from "@/types/course";

interface LearningPageProps {
  course: Course;
  currentLesson: Lesson;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} хв`;
  }

  if (remainingMinutes === 0) {
    return `${hours} год`;
  }

  return `${hours} год ${remainingMinutes} хв`;
}

function getProgressStorageKey(courseId: string): string {
  return `learnhub-progress-${courseId}`;
}

export default function LearningPage({
  course,
  currentLesson,
}: LearningPageProps) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isProgressLoaded, setIsProgressLoaded] = useState(false);

  const currentLessonIndex = course.lessons.findIndex(
    (lesson) => lesson.id === currentLesson.id,
  );

  const previousLesson = course.lessons[currentLessonIndex - 1];
  const nextLesson = course.lessons[currentLessonIndex + 1];

  const isCurrentLessonCompleted = completedLessons.includes(currentLesson.id);

  const progressPercentage =
    course.lessons.length > 0
      ? Math.round((completedLessons.length / course.lessons.length) * 100)
      : 0;

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(
        getProgressStorageKey(course.id),
      );

      if (savedProgress) {
        const parsedProgress: unknown = JSON.parse(savedProgress);

        if (Array.isArray(parsedProgress)) {
          const validLessonIds = parsedProgress.filter(
            (id): id is string =>
              typeof id === "string" &&
              course.lessons.some((lesson) => lesson.id === id),
          );

          setCompletedLessons([...new Set(validLessonIds)]);
        }
      }
    } catch {
      // Якщо дані пошкоджені, продовжуємо без збереженого прогресу.
    } finally {
      setIsProgressLoaded(true);
    }
  }, [course.id, course.lessons]);

  useEffect(() => {
    if (!isProgressLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        getProgressStorageKey(course.id),
        JSON.stringify(completedLessons),
      );
    } catch {
      // Навчання залишається доступним, навіть якщо сховище недоступне.
    }
  }, [course.id, completedLessons, isProgressLoaded]);

  function toggleLessonCompletion() {
    setCompletedLessons((previous) => {
      if (previous.includes(currentLesson.id)) {
        return previous.filter((id) => id !== currentLesson.id);
      }

      return [...previous, currentLesson.id];
    });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Top navigation */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <Link
              href={`/courses/${course.slug}`}
              className="text-sm font-medium text-blue-700 transition hover:text-blue-900"
            >
              ← Повернутися до курсу
            </Link>

            <h1 className="mt-1 truncate text-lg font-bold text-slate-900 sm:text-xl">
              {course.title}
            </h1>
          </div>

          <div className="min-w-36">
            <div className="mb-2 flex items-center justify-between gap-3 text-xs text-slate-500">
              <span>Твій прогрес</span>
              <span className="font-semibold text-slate-900">
                {progressPercentage}%
              </span>
            </div>

            <div
              className="h-2 overflow-hidden rounded-full bg-slate-200"
              role="progressbar"
              aria-label="Прогрес проходження курсу"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercentage}
            >
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Learning layout */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
        <section className="min-w-0">
          {/* Video player */}
          <div className="overflow-hidden rounded-2xl bg-black shadow-sm">
            {currentLesson.videoUrl ? (
              <div className="aspect-video">
                <iframe
                  key={currentLesson.id}
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center px-6 text-center text-white">
                Відео для цього уроку ще не додано.
              </div>
            )}
          </div>

          {/* Lesson information */}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                Урок {currentLessonIndex + 1} із {course.lessons.length}
              </span>

              <span className="text-sm text-slate-500">
                {formatDuration(currentLesson.duration)}
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
              {currentLesson.title}
            </h2>

            <p className="mt-4 whitespace-pre-line leading-7 text-slate-600">
              {currentLesson.description}
            </p>

            <div className="mt-8 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={toggleLessonCompletion}
                disabled={!isProgressLoaded}
                aria-pressed={isCurrentLessonCompleted}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition disabled:cursor-wait disabled:opacity-60 ${
                  isCurrentLessonCompleted
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <span aria-hidden="true">
                  {isCurrentLessonCompleted ? "✓" : "○"}
                </span>

                {isCurrentLessonCompleted
                  ? "Позначити незавершеним"
                  : "Позначити як завершений"}
              </button>
            </div>
          </div>

          {/* Previous / next lesson */}
          <nav
            aria-label="Навігація між уроками"
            className="mt-6 flex flex-col justify-between gap-3 sm:flex-row"
          >
            {previousLesson ? (
              <Link
                href={`/learn/${course.slug}/${previousLesson.id}`}
                className="flex min-h-14 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-xl text-slate-400" aria-hidden="true">
                  ←
                </span>

                <span>
                  <span className="block text-xs text-slate-500">
                    Попередній урок
                  </span>
                  <span className="mt-1 block font-semibold text-slate-900">
                    {previousLesson.title}
                  </span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <Link
                href={`/learn/${course.slug}/${nextLesson.id}`}
                className="flex min-h-14 flex-1 items-center justify-end gap-3 rounded-xl border border-slate-200 bg-white p-4 text-right transition hover:border-blue-300 hover:bg-blue-50"
              >
                <span>
                  <span className="block text-xs text-slate-500">
                    Наступний урок
                  </span>
                  <span className="mt-1 block font-semibold text-slate-900">
                    {nextLesson.title}
                  </span>
                </span>

                <span className="text-xl text-slate-400" aria-hidden="true">
                  →
                </span>
              </Link>
            ) : (
              <Link
                href={`/courses/${course.slug}`}
                className="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 p-4 font-semibold text-white transition hover:bg-emerald-700"
              >
                Курс завершено
                <span aria-hidden="true">✓</span>
              </Link>
            )}
          </nav>
        </section>

        {/* Lesson sidebar */}
        <aside className="h-fit overflow-hidden rounded-2xl border border-slate-200 bg-white lg:sticky lg:top-6">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-bold text-slate-900">Програма курсу</h2>

            <p className="mt-1 text-sm text-slate-500">
              {completedLessons.length} із {course.lessons.length} уроків
              завершено
            </p>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto p-3">
            {course.lessons.map((lesson, index) => {
              const isActive = lesson.id === currentLesson.id;
              const isCompleted = completedLessons.includes(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  href={`/learn/${course.slug}/${lesson.id}`}
                  aria-current={isActive ? "step" : undefined}
                  className={`mb-1 flex items-start gap-3 rounded-xl p-3 transition ${
                    isActive
                      ? "bg-blue-50 ring-1 ring-blue-200"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                      isCompleted
                        ? "bg-emerald-100 text-emerald-700"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-semibold leading-5 ${
                        isActive ? "text-blue-800" : "text-slate-800"
                      }`}
                    >
                      {lesson.title}
                    </span>

                    <span className="mt-1 block text-xs text-slate-500">
                      {formatDuration(lesson.duration)}
                    </span>
                  </span>

                  {isActive && (
                    <span
                      className="mt-1 text-xs font-semibold text-blue-700"
                      aria-label="Поточний урок"
                    >
                      ▶
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </aside>
      </div>
    </main>
  );
}
