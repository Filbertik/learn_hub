import Link from "next/link";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60">
      <Link
        href={`/courses/${course.slug}`}
        className="block overflow-hidden"
        aria-label={`View course: ${course.title}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.image}
          alt={course.title}
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {course.category}
          </span>

          <span className="text-sm text-slate-500">{course.level}</span>
        </div>

        <Link href={`/courses/${course.slug}`}>
          <h3 className="mt-4 text-xl font-bold text-slate-900 transition group-hover:text-indigo-600">
            {course.title}
          </h3>
        </Link>

        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">
          {course.subtitle}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
          <span>★ {course.rating.toFixed(1)}</span>
          <span>{course.lessons.length} lessons</span>
          <span>{formatDuration(course.duration)}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </span>

            {course.oldPrice !== undefined && (
              <span className="text-sm text-slate-400 line-through">
                ${course.oldPrice}
              </span>
            )}
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
          >
            View course →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
