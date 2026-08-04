/**
 * CourseDeliveryService.ts
 * InstitutionOS Academic Delivery Engine — Tenant-Agnostic Course & Lesson Manager
 */

export interface ResourceAttachment {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface LessonItem {
  id: string;
  moduleId: string;
  moduleTitle: string;
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  prerequisite?: string;
  videoUrl: string;
  transcript: string;
  resources: ResourceAttachment[];
  starterTemplateUrl?: string;
  expectedOutput?: string;
  checklist: string[];
}

const mockLessons: LessonItem[] = [
  {
    id: "mod-501",
    moduleId: "MOD-05",
    moduleTitle: "Next.js 18 App Router & Architecture",
    title: "Lesson 1: Server & Client Components Architecture",
    description: "Deep dive into React Server Components (RSC), data fetching strategies, and boundary isolation.",
    durationMinutes: 45,
    difficulty: "Intermediate",
    prerequisite: "React 18 Fundamentals (MOD-04)",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    transcript: "Welcome to Lesson 1 on Next.js App Router architecture. In this session, we analyze Server Components by default, client component boundaries, and streaming SSR.",
    resources: [
      { id: "RES-1", name: "Next.js App Router Architecture Diagram.pdf", url: "#", size: "2.4 MB", type: "PDF" },
      { id: "RES-2", name: "RSC Data Fetching Starter Repo.zip", url: "#", size: "1.8 MB", type: "ZIP" },
    ],
    starterTemplateUrl: "https://github.com/dta-academy/nextjs-rsc-starter",
    expectedOutput: "Server component fetching Prisma data rendered with zero client-side bundle impact.",
    checklist: [
      "Define Server Component async data fetcher",
      "Mark interactive state container with 'use client'",
      "Implement Suspense boundary with skeleton loader",
      "Submit PR for automated code review",
    ],
  },
  {
    id: "mod-502",
    moduleId: "MOD-05",
    moduleTitle: "Next.js 18 App Router & Architecture",
    title: "Lesson 2: Server Actions & Form Mutations",
    description: "Learn how to perform mutations without API routes using Server Actions, useActionState, and optimistic updates.",
    durationMinutes: 50,
    difficulty: "Intermediate",
    prerequisite: "Lesson 1 (mod-501)",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    transcript: "Server Actions allow direct database mutations from forms. We will explore revalidatePath, revalidateTag, and optimistic UI transitions.",
    resources: [
      { id: "RES-3", name: "Server Actions Security & Validation SOP.pdf", url: "#", size: "1.2 MB", type: "PDF" },
    ],
    starterTemplateUrl: "https://github.com/dta-academy/server-actions-lab",
    expectedOutput: "Form submission handling database mutation with optimistic UI update in < 100ms.",
    checklist: [
      "Create Server Action in actions.ts file",
      "Validate schema using Zod validator",
      "Bind action to HTML form onSubmit",
      "Add useOptimistic hook for instant feedback",
    ],
  },
];

export class CourseDeliveryService {
  public static getAllLessons(): LessonItem[] {
    return [...mockLessons];
  }

  public static getLessonById(id: string): LessonItem | undefined {
    return mockLessons.find((l) => l.id === id) || mockLessons[0];
  }
}
