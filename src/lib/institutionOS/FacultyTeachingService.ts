/**
 * FacultyTeachingService.ts
 * InstitutionOS Academic Delivery Engine — Faculty Studio & Classroom Engagement Manager
 */

export interface FacultyLessonStudioItem {
  id: string;
  title: string;
  module: string;
  cohort: string;
  status: "Published" | "Draft" | "Archived";
  version: string;
  completionRate: number;
  avgCompletionTimeMinutes: number;
  dropOffPoint: string;
  downloadsCount: number;
  questionsAsked: number;
  lastUpdated: string;
}

const mockStudioLessons: FacultyLessonStudioItem[] = [
  { id: "STUDIO-101", title: "Next.js 18 App Router & Architecture", module: "MOD-05", cohort: "Cohort Alpha", status: "Published", version: "2.1", completionRate: 94, avgCompletionTimeMinutes: 42, dropOffPoint: "18:40 (Client Boundaries)", downloadsCount: 142, questionsAsked: 18, lastUpdated: "Aug 02, 2026" },
  { id: "STUDIO-102", title: "TypeScript Generics & Utility Types", module: "MOD-04", cohort: "Cohort Alpha", status: "Published", version: "1.4", completionRate: 91, avgCompletionTimeMinutes: 55, dropOffPoint: "28:15 (Conditional Types)", downloadsCount: 189, questionsAsked: 24, lastUpdated: "Jul 28, 2026" },
  { id: "STUDIO-103", title: "Docker & Container Orchestration", module: "MOD-06", cohort: "Cohort Delta", status: "Draft", version: "1.0", completionRate: 0, avgCompletionTimeMinutes: 0, dropOffPoint: "N/A", downloadsCount: 0, questionsAsked: 0, lastUpdated: "Aug 04, 2026" },
];

export class FacultyTeachingService {
  public static getStudioLessons(): FacultyLessonStudioItem[] {
    return [...mockStudioLessons];
  }
}
