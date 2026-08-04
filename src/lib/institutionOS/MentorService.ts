/**
 * MentorService.ts
 * InstitutionOS Core Service — Student Mentorship & Career Coaching Hub Engine
 */

export interface MentoringSession {
  id: string;
  studentName: string;
  programme: string;
  sessionTopic: string;
  scheduledTime: string;
  status: "Upcoming" | "Completed" | "Rescheduled";
  notes?: string;
}

const mockSessions: MentoringSession[] = [
  { id: "SESS-101", studentName: "Kofi Asante", programme: "Full-Stack Software Engineering (DLX)", sessionTopic: "React App Architecture & Portfolio Review", scheduledTime: "Tomorrow at 14:00 WAT", status: "Upcoming", notes: "Focus on Next.js App Router state management." },
  { id: "SESS-102", studentName: "Aisha Ibrahim", programme: "Full-Stack Software Engineering (DLX)", sessionTopic: "GitHub PR Best Practices & Code Formatting", scheduledTime: "Aug 10, 2026 at 11:00 WAT", status: "Upcoming" },
  { id: "SESS-103", studentName: "Emeka Nwosu", programme: "Blockchain Architecture", sessionTopic: "Smart Contract Gas Optimization Review", scheduledTime: "Jul 28, 2026", status: "Completed", notes: "Reviewed EVM storage optimization strategies." },
];

export class MentorService {
  public static getMentoringSessions(): MentoringSession[] {
    return [...mockSessions];
  }
}
