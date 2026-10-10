export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

export type CourseCategory = "Frontend" | "Backend" | "Fullstack" | "Design";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  videoUrl: string;
  order: number;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  instructor: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: number;
  image: string;
  rating: number;
  studentsCount: number;
  price: number;
  oldPrice?: number;
  whatYouWillLearn: string[];
  lessons: Lesson[];
}
