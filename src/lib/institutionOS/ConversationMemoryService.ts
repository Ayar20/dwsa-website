/**
 * ConversationMemoryService.ts
 * InstitutionOS AI Operating Layer — Short-Term & Long-Term Context Memory Engine
 */

export interface MemoryItem {
  key: string;
  value: string;
  role: string;
  lastUpdated: string;
}

const mockMemory: MemoryItem[] = [
  { key: "student_preferred_language", value: "TypeScript / Node.js", role: "Student", lastUpdated: "Aug 02, 2026" },
  { key: "student_enrolled_programme", value: "Full-Stack Web Engineering", role: "Student", lastUpdated: "Jul 15, 2026" },
  { key: "faculty_assigned_cohort", value: "Cohort Alpha & Cohort Delta", role: "Faculty", lastUpdated: "Aug 01, 2026" },
  { key: "executive_target_employment_rate", value: "95%", role: "Admin", lastUpdated: "Aug 04, 2026" },
];

export class ConversationMemoryService {
  public static getMemoryForRole(role: string): MemoryItem[] {
    return mockMemory.filter((m) => m.role === role);
  }
}
