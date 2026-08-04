/**
 * PromptLibraryService.ts
 * InstitutionOS AI Operating Layer — Pre-Approved Institutional Prompt Templates
 */

export interface PromptTemplate {
  id: string;
  title: string;
  category: "Academic" | "Administrative" | "Research" | "Career" | "Executive" | "Innovation";
  targetRole: "Student" | "Faculty" | "Admin" | "All";
  description: string;
  promptText: string;
  version: string;
  usageCount: number;
}

const mockPrompts: PromptTemplate[] = [
  { id: "PRM-101", title: "Code Review & Refactoring Breakdown", category: "Academic", targetRole: "Student", description: "Analyzes code for performance bottlenecks, TypeScript safety, and readability.", promptText: "Please review the following code snippet for TypeScript best practices, performance, and clean code principles.", version: "1.2", usageCount: 342 },
  { id: "PRM-102", title: "Assessment & Grading Rubric Generator", category: "Academic", targetRole: "Faculty", description: "Generates a 4-tier grading rubric with clear competency criteria for any module.", promptText: "Generate a comprehensive 4-tier rubric evaluating code architecture, functionality, styling, and git commits for the topic:", version: "2.0", usageCount: 189 },
  { id: "PRM-103", title: "Executive Strategic Risk & Revenue Summary", category: "Executive", targetRole: "Admin", description: "Synthesizes institutional KPIs into an executive briefing suitable for board presentation.", promptText: "Provide a 3-paragraph executive briefing analyzing current enrollment capacity, revenue streams, and operational risks.", version: "1.1", usageCount: 94 },
  { id: "PRM-104", title: "Career Placement Resume & Portfolio Advisor", category: "Career", targetRole: "Student", description: "Tailors student project highlights for employer partner job descriptions.", promptText: "Review my completed DTA projects and generate 3 high-impact bullet points for my software engineering resume.", version: "1.0", usageCount: 276 },
  { id: "PRM-105", title: "Student Intervention & Study Plan Generator", category: "Academic", targetRole: "Faculty", description: "Creates a 2-week remedial action plan for students flagged with low PR completion rates.", promptText: "Create a personalized 2-week study plan with daily milestones for a student struggling with async programming.", version: "1.3", usageCount: 112 },
];

export class PromptLibraryService {
  private static prompts: PromptTemplate[] = [...mockPrompts];

  public static getPromptsForRole(role: string): PromptTemplate[] {
    return this.prompts.filter((p) => p.targetRole === role || p.targetRole === "All");
  }

  public static getAllPrompts(): PromptTemplate[] {
    return [...this.prompts];
  }

  public static incrementUsage(id: string): void {
    const prompt = this.prompts.find((p) => p.id === id);
    if (prompt) prompt.usageCount++;
  }
}
