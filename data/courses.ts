import type { Course } from "@/types/course";

export const courses: Course[] = [
  {
    id: "course-1",
    slug: "react-fundamentals",
    title: "React Fundamentals",
    subtitle: "Build your first modern React applications",
    description:
      "Learn React from the ground up. Understand components, props, state, events, hooks, and the fundamentals of building interactive user interfaces.",
    instructor: "Alex Morgan",
    category: "Frontend",
    level: "Beginner",
    duration: 380,
    image: "https://placehold.co/640x400/DBEAFE/1E40AF?text=React",
    rating: 4.9,
    studentsCount: 2450,
    price: 0,
    whatYouWillLearn: [
      "Understand React components and JSX",
      "Work with props and state",
      "Handle user events and forms",
      "Use React hooks",
      "Build interactive user interfaces",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to React",
        description:
          "Discover what React is, why developers use it, and how it helps build modern web applications.",
        duration: 12,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 1,
      },
      {
        id: "lesson-2",
        title: "Understanding JSX",
        description:
          "Learn how JSX combines JavaScript and markup to describe your user interface.",
        duration: 18,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 2,
      },
      {
        id: "lesson-3",
        title: "Components and Props",
        description:
          "Create reusable components and pass data between them using props.",
        duration: 25,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 3,
      },
      {
        id: "lesson-4",
        title: "State and Events",
        description:
          "Make your components interactive using state and event handlers.",
        duration: 30,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 4,
      },
      {
        id: "lesson-5",
        title: "Introduction to React Hooks",
        description:
          "Explore useState and useEffect and understand when to use them.",
        duration: 35,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 5,
      },
    ],
  },
  {
    id: "course-2",
    slug: "typescript-for-developers",
    title: "TypeScript for Developers",
    subtitle: "Write safer and more maintainable JavaScript",
    description:
      "Master the TypeScript fundamentals needed for real-world frontend applications, from basic types to interfaces, unions, generics, and type narrowing.",
    instructor: "Sarah Wilson",
    category: "Frontend",
    level: "Intermediate",
    duration: 320,
    image: "https://placehold.co/640x400/EDE9FE/5B21B6?text=TypeScript",
    rating: 4.8,
    studentsCount: 1820,
    price: 29,
    oldPrice: 49,
    whatYouWillLearn: [
      "Use basic and advanced TypeScript types",
      "Create interfaces and type aliases",
      "Work with union and intersection types",
      "Understand generics",
      "Type React components and props",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Why TypeScript?",
        description:
          "Understand the benefits of static typing and how TypeScript improves JavaScript development.",
        duration: 15,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 1,
      },
      {
        id: "lesson-2",
        title: "Basic Types",
        description:
          "Explore strings, numbers, booleans, arrays, and object types.",
        duration: 22,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 2,
      },
      {
        id: "lesson-3",
        title: "Interfaces and Type Aliases",
        description: "Model application data with interfaces and type aliases.",
        duration: 28,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 3,
      },
      {
        id: "lesson-4",
        title: "Generics in Practice",
        description:
          "Create reusable, type-safe functions and structures with generics.",
        duration: 32,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 4,
      },
    ],
  },
  {
    id: "course-3",
    slug: "nextjs-fullstack",
    title: "Next.js Fullstack Development",
    subtitle: "Build fullstack applications with Next.js",
    description:
      "Explore the Next.js App Router, server and client components, dynamic routes, data fetching, and the foundations of fullstack development.",
    instructor: "Daniel Carter",
    category: "Fullstack",
    level: "Advanced",
    duration: 540,
    image: "https://placehold.co/640x400/D1FAE5/065F46?text=Next.js",
    rating: 4.9,
    studentsCount: 1260,
    price: 49,
    oldPrice: 79,
    whatYouWillLearn: [
      "Understand the Next.js App Router",
      "Work with server and client components",
      "Create dynamic routes",
      "Fetch and display application data",
      "Build fullstack application features",
    ],
    lessons: [
      {
        id: "lesson-1",
        title: "Introduction to Next.js",
        description:
          "Discover how Next.js extends React with routing, rendering, and fullstack capabilities.",
        duration: 18,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 1,
      },
      {
        id: "lesson-2",
        title: "App Router and Layouts",
        description:
          "Organize application routes with pages, nested layouts, and route segments.",
        duration: 30,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 2,
      },
      {
        id: "lesson-3",
        title: "Server and Client Components",
        description:
          "Understand component rendering boundaries and when client-side interactivity is needed.",
        duration: 35,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 3,
      },
      {
        id: "lesson-4",
        title: "Dynamic Routes and Data",
        description:
          "Create dynamic pages and learn the basics of fetching data in Next.js.",
        duration: 40,
        videoUrl: "https://www.youtube.com/embed/SqcY0GlETPk",
        order: 4,
      },
    ],
  },
];
