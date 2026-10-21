import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { courses } from "@/data/courses";
import LearningPage from "@/components/learning/LearningPage";

interface LessonPageProps {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { slug, lessonId } = await params;

  const course = courses.find((item) => item.slug === slug);
  const lesson = course?.lessons.find((item) => item.id === lessonId);

  if (!course || !lesson) {
    return {
      title: "Урок не знайдено! | LearnHub",
    };
  }

  return {
    title: `${lesson.title} | ${course.title} | LearnHub`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonId } = await params;

  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  const currentLesson = course.lessons.find((lesson) => lesson.id === lessonId);

  if (!currentLesson) {
    notFound();
  }

  return <LearningPage course={course} currentLesson={currentLesson} />;
}
