"use client";

import { useMemo, useState } from "react";
import type { Course, CourseCategory, CourseLevel } from "@/types/course";
import CourseCard from "@/components/courses/CourseCard";

interface CoursesCatalogProps {
  courses: Course[];
}

type SortOption = "popular" | "rating" | "price-asc" | "price-desc";

const categoryOptions: {
  label: string;
  value: CourseCategory | "All";
}[] = [
  { label: "All categories", value: "All" },
  { label: "Frontend", value: "Frontend" },
  { label: "Backend", value: "Backend" },
  { label: "Fullstack", value: "Fullstack" },
  { label: "Design", value: "Design" },
];

const levelOptions: {
  label: string;
  value: CourseLevel | "All";
}[] = [
  { label: "All levels", value: "All" },
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

const sortOptions: {
  label: string;
  value: SortOption;
}[] = [
  { label: "Most popular", value: "popular" },
  { label: "Highest rated", value: "rating" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
];

const CoursesCatalog = ({ courses }: CoursesCatalogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    CourseCategory | "All"
  >("All");
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "All">(
    "All",
  );
  const [sortBy, setSortBy] = useState<SortOption>("popular");

  const filteredCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const result = courses.filter((course) => {
      const matchesSearch =
        query === "" ||
        course.title.toLowerCase().includes(query) ||
        course.subtitle.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    });

    return result.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;

        case "price-asc":
          return a.price - b.price;

        case "price-desc":
          return b.price - a.price;

        case "popular":
        default:
          return b.studentsCount - a.studentsCount;
      }
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedLevel !== "All" ||
    sortBy !== "popular";

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLevel("All");
    setSortBy("popular");
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
      {/* Search and filters */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          {/* Search */}
          <div>
            <label
              htmlFor="course-search"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Search courses
            </label>

            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="m16 16 4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              <input
                id="course-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by course, topic, instructor..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Sorting */}
          <div>
            <label
              htmlFor="course-sort"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Sort by
            </label>

            <select
              id="course-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category and level filters */}
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="course-category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
            </label>

            <select
              id="course-category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(
                  event.target.value as CourseCategory | "All",
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="course-level"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Difficulty level
            </label>

            <select
              id="course-level"
              value={selectedLevel}
              onChange={(event) =>
                setSelectedLevel(event.target.value as CourseLevel | "All")
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            >
              {levelOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Results header */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900">All courses</h2>

          <p className="mt-1 text-sm text-slate-500">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"} found
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Course grid */}
      {filteredCourses.length > 0 ? (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="m16 16 4 4"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <h3 className="mt-5 text-xl font-bold text-slate-900">
            No courses found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            We couldn&apos;t find any courses matching your search. Try another
            keyword or change your filters.
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Show all courses
          </button>
        </div>
      )}
    </section>
  );
};

export default CoursesCatalog;
