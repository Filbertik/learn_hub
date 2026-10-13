import Link from "next/link";
import { courses } from "@/data/courses";
import CourseCard from "@/components/courses/CourseCard";
import FeaturesSection from "@/components/home/FeaturesSection";

const HomePage = () => {
  const featuredCourses = courses.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Your next skill starts here
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Learn new skills.
              <span className="block text-indigo-600">Build your future.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore practical courses, learn from structured lessons, and
              build the skills you need for your next big opportunity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700"
              >
                Explore courses
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                Get started
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 text-sm text-slate-600">
              <span>✓ Learn at your own pace</span>
              <span>✓ Structured lessons</span>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 top-12 h-24 w-24 rounded-3xl bg-amber-200/70 blur-2xl" />

            <div className="relative rounded-3xl border border-white bg-white p-4 shadow-2xl shadow-slate-300/50 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm text-slate-500">Your learning space</p>
                  <h2 className="mt-1 text-lg font-bold text-slate-900">
                    Keep growing
                  </h2>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-xl">
                  ✦
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {featuredCourses.map((course, index) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-3 transition hover:border-indigo-200 hover:bg-indigo-50/40"
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        index === 0
                          ? "bg-blue-100 text-blue-700"
                          : index === 1
                            ? "bg-violet-100 text-violet-700"
                            : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {index === 0 ? "Re" : index === 1 ? "TS" : "Nx"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">
                        {course.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {course.lessons.length} lessons · {course.level}
                      </p>
                    </div>

                    <span className="text-lg text-slate-400" aria-hidden="true">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-2xl bg-indigo-600 p-5 text-white">
                <p className="text-sm text-indigo-100">
                  Small steps. Big progress.
                </p>
                <p className="mt-1 text-lg font-bold">
                  Your learning journey starts today.
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-3 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-xl sm:-right-6">
              <p className="text-sm text-slate-500">Ready to begin?</p>
              <p className="mt-1 font-bold text-slate-900">
                Choose your course ✨
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
                Start learning
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Explore our courses
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Discover courses designed to help you develop practical skills
                and move forward with confidence.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              View all courses
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Call to action */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-indigo-600 px-6 py-14 text-center sm:px-12 sm:py-20">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-200">
            Start today
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Invest in yourself. Start learning.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-indigo-100">
            Find a course that matches your goals and take the next step in your
            learning journey.
          </p>

          <Link
            href="/courses"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            Find your course
            <span className="ml-2" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomePage;

// import { courses } from "@/data/courses";

// const HomePage = () => {
//   return (
//     <section className="mx-auto flex min-h-[calc(100vh-145px)] max-w-7xl items-center px-6 py-16">
//       <div>
//         <p>Available courses: {courses.length}</p>

//         <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-600">
//           LearnHub
//         </p>

//         <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
//           Learn new skills.
//           <br />
//           <span className="text-indigo-600">Build your future.</span>
//         </h1>

//         <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
//           Learn practical skills from high-quality courses created by
//           experienced professionals.
//         </p>

//         <div className="mt-8 flex flex-wrap gap-4">
//           <a
//             href="/courses"
//             className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
//           >
//             Explore courses
//           </a>

//           <a
//             href="/register"
//             className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
//           >
//             Get started
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HomePage;

// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert h-5 w-[100px]"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the{" "}
// //             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
// //               page.tsx
// //             </code>{" "}
// //             file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert h-[14px] w-4"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={14}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
