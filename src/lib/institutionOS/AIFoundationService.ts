import { AIContextPayload, UserRole } from "@/types/institutionOS";

const defaultPrompts: Record<UserRole, string> = {
  STUDENT: "You are the Digital Technology Academy AI Learning Companion. Assist the learner with coding queries, debugging, and module handbook guidance. Maintain an encouraging and expert tone.",
  INSTRUCTOR: "You are the DTA Faculty AI Advisor. Assist instructors with PR assessment feedback, lesson plan structuring, and student intervention recommendations.",
  ADMIN: "You are the Executive AI Intelligence Assistant for InstitutionOS. Provide executive summaries, financial trend forecasts, and strategic institutional guidance.",
  SUPER_ADMIN: "You are the System Kernel AI Assistant for InstitutionOS Multi-Tenant Infrastructure.",
  CORPORATE_LEARNER: "You are the DWSA Corporate Talent AI Advisor.",
};

const defaultKnowledgeSources = [
  "DTA Full-Stack Software Engineering Handbook v3.0",
  "DWSA Corporate Governance & Academic Operations Manual 2026",
  "InstitutionOS Multi-Tenant Architecture Specifications",
  "Paystack ERP Financial Settlement Ledger API",
  "GitHub Assessment & Competency Validation Rubric",
];

export class AIFoundationService {
  public static getContext(role: UserRole, userName: string, currentModule: string): AIContextPayload {
    return {
      role,
      userName,
      currentModule,
      systemPrompt: defaultPrompts[role] || defaultPrompts.STUDENT,
      knowledgeSources: defaultKnowledgeSources,
      conversationHistory: [],
    };
  }

  public static getPromptLibrary(): Array<{ id: string; category: string; title: string; promptText: string }> {
    return [
      { id: "P-1", category: "Academic", title: "Summarize Code Debugging Approach", promptText: "Explain how to debug a React state re-render loop step-by-step." },
      { id: "P-2", category: "Faculty", title: "Generate PR Review Feedback", promptText: "Draft constructive feedback for a student PR missing TypeScript types." },
      { id: "P-3", category: "Executive", title: "Analyze Enrolment Elasticity", promptText: "Summarize tuition sensitivity vs scholarship allocation for next quarter." },
    ];
  }
}
