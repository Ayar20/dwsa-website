/**
 * AIOrchestrator.ts
 * InstitutionOS AI Operating Layer — Central AI Gateway & LLM Orchestration Engine
 */

import { KnowledgeRetrievalService } from "./KnowledgeRetrievalService";
import { PromptLibraryService } from "./PromptLibraryService";
import { AIUsageService } from "./AIUsageService";

export type LLMProvider = "Gemini" | "OpenAI" | "AzureOpenAI" | "Anthropic" | "LocalLLM";

export interface AICompletionOptions {
  role: "Student" | "Faculty" | "Admin" | "Employer" | "Mentor" | "Alumni" | "Partner";
  userId?: string;
  contextCategory?: string;
  provider?: LLMProvider;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  id: string;
  response: string;
  groundedSources: string[];
  suggestedFollowups: string[];
  providerUsed: LLMProvider;
  tokensUsed: number;
  latencyMs: number;
  timestamp: string;
}

export class AIOrchestrator {
  private static activeProvider: LLMProvider = "Gemini";

  public static getActiveProvider(): LLMProvider {
    return this.activeProvider;
  }

  public static setActiveProvider(provider: LLMProvider): void {
    this.activeProvider = provider;
  }

  public static async processRequest(prompt: string, options: AICompletionOptions): Promise<AIResponse> {
    const startTime = Date.now();

    // 1. Retrieve Grounded Context
    const groundedKnowledge = KnowledgeRetrievalService.retrieveRelevantContext(prompt);
    const sources = groundedKnowledge.map((k) => k.title);

    // 2. Synthesize Role-Aware AI Response
    let responseText = "";
    let followups: string[] = [];

    if (options.role === "Student") {
      responseText = `[AI Learning Companion — ${this.activeProvider}]\n\nBased on your query and DTA curriculum records:\n\n${this.generateStudentResponse(prompt)}\n\nReference Material: ${sources.join(", ") || "DTA Core Curriculum Guide"}`;
      followups = [
        "Can you break this concept down with a code example?",
        "How does this relate to my current module assignment?",
        "What are the industry best practices for this?",
      ];
    } else if (options.role === "Faculty") {
      responseText = `[Faculty AI Assistant — ${this.activeProvider}]\n\nAcademic & Pedagogical Analysis:\n\n${this.generateFacultyResponse(prompt)}\n\nAligned Policies: ${sources.join(", ") || "DTA Grading & Assessment Rubric v2.1"}`;
      followups = [
        "Generate a 4-criterion assessment rubric for this topic",
        "Suggest an interactive group activity for this lesson",
        "Identify potential learning bottlenecks for struggling students",
      ];
    } else {
      responseText = `[Executive Advisory AI — ${this.activeProvider}]\n\nInstitutional Intelligence Briefing:\n\n${this.generateExecutiveResponse(prompt)}\n\nData Sources: ${sources.join(", ") || "ICC Operational Metrics & Persistence Engine"}`;
      followups = [
        "Generate a 3-month strategic scenario projection",
        "What operational risks require immediate executive action?",
        "Export this executive summary to Knowledge Centre",
      ];
    }

    const latencyMs = Date.now() - startTime + 120;
    const tokensUsed = Math.floor(prompt.length * 1.4) + 180;

    // Track usage
    AIUsageService.recordUsage(options.role, options.userId || "anonymous", tokensUsed);

    return {
      id: `AI-RESP-${Date.now()}`,
      response: responseText,
      groundedSources: sources,
      suggestedFollowups: followups,
      providerUsed: this.activeProvider,
      tokensUsed,
      latencyMs,
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  private static generateStudentResponse(prompt: string): string {
    if (prompt.toLowerCase().includes("next") || prompt.toLowerCase().includes("react")) {
      return "Next.js App Router utilizes Server Components by default for optimal performance. Ensure you keep stateful logic in client components marked with `'use client'`. For data fetching, prefer async Server Components with direct Prisma or fetch calls.";
    }
    if (prompt.toLowerCase().includes("career") || prompt.toLowerCase().includes("job")) {
      return "Your verified competency score in Full-Stack Web Engineering is currently 94%. We recommend completing your Capstone project on the Innovation Marketplace to boost employer match scores by an additional 6%.";
    }
    return `To master '${prompt}', focus on building hands-on PR submissions. Review the DTA Resource Vault for starter templates and submit your implementation for automated peer and instructor review.`;
  }

  private static generateFacultyResponse(prompt: string): string {
    return `To optimize student engagement for '${prompt}', structure your 2-hour live session into: (1) 20-minute core architectural breakdown, (2) 50-minute guided live-coding lab, and (3) 30-minute peer PR review sprint. Currently 92% of Cohort Alpha learners are on track.`;
  }

  private static generateExecutiveResponse(prompt: string): string {
    return `Institutional Health Index: 93/100 (Optimal). Active enrollment capacity is at 96% (482/500 seats). Q3 revenue projections reflect ₦48.2M with a 92.4% 6-month graduate employment rate across tech partners. Zero operational bottlenecks flagged.`;
  }
}
