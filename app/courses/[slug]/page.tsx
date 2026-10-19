import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { courses } from "@/data/courses";

interface CoursePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return {
      title: "Курс не знайдено | LearnHub",
    };
  }

  return {
    title: `${course.title} | LearnHub`,
    description: course.subtitle,
  };
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

export default async function CourseDetailPage({ params }: CoursePageProps) {
  const { slug } = await params;

  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  const firstLesson = course.lessons[0];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero section */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
          <div>
            <Link
              href="/courses"
              className="mb-8 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
            >
              <span aria-hidden="true">←</span>
              Усі курси
            </Link>

            <div className="mb-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-200">
                {course.category}
              </span>

              <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-200">
                {course.level}
              </span>
            </div>

            <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              {course.subtitle}
            </p>

            <p className="mt-5 text-sm text-slate-300">
              Викладач:{" "}
              <span className="font-semibold text-white">
                {course.instructor}
              </span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-300">
              <span className="flex items-center gap-2">
                <span className="text-amber-400">★</span>
                <strong className="text-white">{course.rating}</strong>
                рейтинг
              </span>

              <span>
                {course.studentsCount.toLocaleString("uk-UA")} студентів
              </span>

              <span>{course.lessons.length} уроків</span>

              <span>{formatDuration(course.duration)}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {firstLesson ? (
                <Link
                  href={`/learn/${course.slug}/${firstLesson.id}`}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Почати навчання
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              ) : (
                <span className="rounded-xl bg-slate-700 px-6 py-3 text-slate-300">
                  Уроки скоро з’являться
                </span>
              )}

              <a
                href="#curriculum"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Переглянути програму
              </a>
            </div>
          </div>

          {/* Course image */}
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-slate-800 shadow-2xl">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div className="space-y-12">
          {/* About course */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">Про курс</h2>

            <p className="mt-4 whitespace-pre-line leading-8 text-slate-600">
              {course.description}
            </p>
          </section>

          {/* Learning outcomes */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900">
              Чого ти навчишся
            </h2>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {course.whatYouWillLearn.map((item, index) => (
                <li
                  key={`${course.id}-outcome-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    ✓
                  </span>

                  <span className="leading-6 text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Course curriculum */}
          <section id="curriculum" className="scroll-mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Програма курсу
                </h2>

                <p className="mt-2 text-slate-500">
                  Послідовність уроків від першого кроку до практики.
                </p>
              </div>

              <span className="text-sm text-slate-500">
                {course.lessons.length} уроків ·{" "}
                {formatDuration(course.duration)}
              </span>
            </div>

            <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-start gap-4 p-5 transition hover:bg-slate-50"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-semibold text-blue-700">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {lesson.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {lesson.description}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      {formatDuration(lesson.duration)}
                    </p>
                  </div>

                  {firstLesson && (
                    <Link
                      href={`/learn/${course.slug}/${lesson.id}`}
                      aria-label={`Перейти до уроку: ${lesson.title}`}
                      className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      <span aria-hidden="true">▶</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Course summary card */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-8">
          <p className="text-sm font-medium text-slate-500">Вартість курсу</p>

          <div className="mt-2 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900">
              {course.price === 0 ? "Безкоштовно" : `$${course.price}`}
            </span>

            {course.oldPrice !== undefined &&
              course.oldPrice > course.price && (
                <span className="text-lg text-slate-400 line-through">
                  ${course.oldPrice}
                </span>
              )}
          </div>

          <div className="mt-6 space-y-4 border-y border-slate-100 py-5 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Рівень</span>
              <span className="font-medium text-slate-900">{course.level}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Тривалість</span>
              <span className="font-medium text-slate-900">
                {formatDuration(course.duration)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Кількість уроків</span>
              <span className="font-medium text-slate-900">
                {course.lessons.length}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">Студенти</span>
              <span className="font-medium text-slate-900">
                {course.studentsCount.toLocaleString("uk-UA")}
              </span>
            </div>
          </div>

          {firstLesson ? (
            <Link
              href={`/learn/${course.slug}/${firstLesson.id}`}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Почати навчання
            </Link>
          ) : (
            <p className="mt-6 text-sm text-slate-500">
              Уроки скоро з’являться.
            </p>
          )}

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Навчайся у власному темпі та повертайся до матеріалів у зручний час.
          </p>
        </aside>
      </div>
    </main>
  );
}
