/**
 * AIGovernanceService.ts
 * InstitutionOS AI Operating Layer — Policy Enforcement, Moderation & Human-in-the-Loop Controls
 */

export interface AIGovernanceConfig {
  activeProvider: "Gemini" | "OpenAI" | "AzureOpenAI" | "Anthropic" | "LocalLLM";
  contentModerationEnabled: boolean;
  humanApprovalRequiredForPublicAnnouncements: boolean;
  maxTokensPerRequest: number;
  temperatureDefault: number;
  auditLoggingEnabled: boolean;
  rateLimitPerUserPerMinute: number;
}

export interface ModerationAuditLog {
  id: string;
  timestamp: string;
  role: string;
  querySnippet: string;
  actionTaken: "Passed" | "Flagged" | "Blocked";
  reason?: string;
}

const mockConfig: AIGovernanceConfig = {
  activeProvider: "Gemini",
  contentModerationEnabled: true,
  humanApprovalRequiredForPublicAnnouncements: true,
  maxTokensPerRequest: 2048,
  temperatureDefault: 0.7,
  auditLoggingEnabled: true,
  rateLimitPerUserPerMinute: 20,
};

const mockAuditLogs: ModerationAuditLog[] = [
  { id: "LOG-901", timestamp: "Aug 04, 2026 14:20", role: "Student", querySnippet: "How to fix a TypeScript generic type error...", actionTaken: "Passed" },
  { id: "LOG-902", timestamp: "Aug 04, 2026 13:05", role: "Faculty", querySnippet: "Generate final exam grading rubric for Module 4...", actionTaken: "Passed" },
  { id: "LOG-903", timestamp: "Aug 04, 2026 11:42", role: "Admin", querySnippet: "Executive revenue projection report for Q3...", actionTaken: "Passed" },
  { id: "LOG-904", timestamp: "Aug 03, 2026 18:15", role: "Student", querySnippet: "Share solution to final assignment question 3...", actionTaken: "Flagged", reason: "Potential Academic Integrity Violation (Direct Solution Sharing)" },
];

export class AIGovernanceService {
  private static config: AIGovernanceConfig = { ...mockConfig };

  public static getConfig(): AIGovernanceConfig {
    return { ...this.config };
  }

  public static updateConfig(newConfig: Partial<AIGovernanceConfig>): AIGovernanceConfig {
    this.config = { ...this.config, ...newConfig };
    return { ...this.config };
  }

  public static getAuditLogs(): ModerationAuditLog[] {
    return [...mockAuditLogs];
  }
}
