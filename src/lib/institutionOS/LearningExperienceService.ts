/**
 * LearningExperienceService.ts
 * InstitutionOS Academic Delivery Engine — Learning Velocity, Attention & Productivity Analytics
 */

export interface LearningMetrics {
  learningVelocityScore: number;   // 0-100
  attentionScore: number;          // 0-100
  practiceConsistency: number;     // 0-100
  completionHabitScore: number;    // 0-100
  revisionFrequency: number;       // sessions per week
  currentStreakDays: number;
  weeklyStudyMinutes: number;
  dailyStudyMinutesToday: number;
  completionForecastDays: number;
  consistencyScore: number;        // 0-100
}

export interface StudyRecommendation {
  id: string;
  type: "Lesson" | "Practice" | "Revision" | "Project" | "Rest";
  title: string;
  rationale: string;
  estimatedMinutes: number;
  priority: "High" | "Medium" | "Low";
}

export class LearningExperienceService {
  public static getMetrics(): LearningMetrics {
    return {
      learningVelocityScore: 88,
      attentionScore: 91,
      practiceConsistency: 85,
      completionHabitScore: 92,
      revisionFrequency: 3,
      currentStreakDays: 14,
      weeklyStudyMinutes: 390,
      dailyStudyMinutesToday: 75,
      completionForecastDays: 12,
      consistencyScore: 89,
    };
  }

  public static getStudyRecommendations(): StudyRecommendation[] {
    return [
      { id: "REC-1", type: "Lesson", title: "Resume: Server Actions & Optimistic Updates", rationale: "You paused mid-lesson yesterday. 25 minutes remaining.", estimatedMinutes: 25, priority: "High" },
      { id: "REC-2", type: "Practice", title: "CodingLab: Prisma + Zod Validation Sprint", rationale: "Schema validation is due in your Project Milestone tracker.", estimatedMinutes: 45, priority: "High" },
      { id: "REC-3", type: "Revision", title: "Revise: TypeScript Generics (Lesson 4)", rationale: "Low quiz score detected — targeted revision recommended.", estimatedMinutes: 20, priority: "Medium" },
      { id: "REC-4", type: "Project", title: "Capstone Milestone 3: Build API Routes", rationale: "Milestone deadline in 3 days. Start now to avoid crunch.", estimatedMinutes: 90, priority: "High" },
    ];
  }

  public static getProductivityPattern(): { label: string; minutes: number }[] {
    return [
      { label: "Mon", minutes: 75 },
      { label: "Tue", minutes: 90 },
      { label: "Wed", minutes: 60 },
      { label: "Thu", minutes: 45 },
      { label: "Fri", minutes: 120 },
      { label: "Sat", minutes: 30 },
      { label: "Sun", minutes: 0 },
    ];
  }
}
