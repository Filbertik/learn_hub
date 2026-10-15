import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CoursesCatalog from "@/components/courses/CoursesCatalog";

export const metadata: Metadata = {
  title: "Courses | LearnHub",
  description:
    "Explore online courses in React, TypeScript, Next.js, and more. Find a course that matches your goals.",
};

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            Learn something new
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Explore courses
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            Discover practical courses, develop new skills, and take the next
            step in your learning journey.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-xl bg-indigo-50 px-4 py-3">
              <p className="text-sm font-medium text-indigo-700">
                Learn at your pace
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">
                Structured lessons
              </p>
            </div>

            <div className="rounded-xl bg-slate-100 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">
                Track your progress
              </p>
            </div>
          </div>
        </div>
      </section>

      <CoursesCatalog courses={courses} />
    </div>
  );
};

export default CoursesPage;
