/**
 * StudyPlannerService.ts
 * InstitutionOS Academic Delivery Engine — Automated Study Goal & Target Scheduler
 */

export interface StudyGoal {
  id: string;
  day: string;
  targetMinutes: number;
  completedMinutes: number;
  taskTitle: string;
  status: "Completed" | "In Progress" | "Upcoming";
}

const mockGoals: StudyGoal[] = [
  { id: "GOAL-1", day: "Monday", targetMinutes: 60, completedMinutes: 60, taskTitle: "Complete Lesson 1: Next.js App Router Architecture", status: "Completed" },
  { id: "GOAL-2", day: "Tuesday", targetMinutes: 90, completedMinutes: 75, taskTitle: "PR Submission: Server Action Form Mutation Lab", status: "Completed" },
  { id: "GOAL-3", day: "Wednesday (Today)", targetMinutes: 90, completedMinutes: 45, taskTitle: "Lesson 2: Server Actions & Optimistic Updates", status: "In Progress" },
  { id: "GOAL-4", day: "Thursday", targetMinutes: 60, completedMinutes: 0, taskTitle: "Capston Project Sprint: Schema & Prisma Setup", status: "Upcoming" },
  { id: "GOAL-5", day: "Friday", targetMinutes: 120, completedMinutes: 0, taskTitle: "Peer PR Review Sprint & Mentor Q&A", status: "Upcoming" },
];

export class StudyPlannerService {
  public static getWeeklyGoals(): StudyGoal[] {
    return [...mockGoals];
  }

  public static getStreakDays(): number {
    return 14; // 14-day study streak
  }
}
