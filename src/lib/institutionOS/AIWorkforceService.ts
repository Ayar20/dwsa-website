/**
 * AIWorkforceService.ts
 * InstitutionOS v4.2 — AI Digital Workforce Registry & Orchestration
 * Central registry for all role-specific AI agents. Provides unified agent health,
 * capability discovery, and cross-agent coordination.
 */

export type AIAgentRole = "student" | "faculty" | "admin" | "executive" | "platform";

export interface AIAgent {
  id: string;
  name: string;
  role: AIAgentRole;
  description: string;
  capabilities: string[];
  status: "online" | "degraded" | "offline";
  version: string;
  totalInteractionsToday: number;
  avgResponseMs: number;
  satisfactionScore: number;
  modelProvider: "gemini" | "gpt-4o" | "claude" | "custom";
  dataAccess: string[];
}

export interface AIWorkforceHealth {
  overallStatus: "operational" | "degraded" | "incident";
  onlineAgents: number;
  totalAgents: number;
  totalInteractionsToday: number;
  totalTokensToday: string;
  avgSatisfaction: number;
}

export class AIWorkforceService {
  static getAllAgents(): AIAgent[] {
    return [
      {
        id: "agent-student",
        name: "Aida — Student Learning Agent",
        role: "student",
        description: "Personalised AI learning companion for every student. Adapts to individual pace, style, and goals.",
        capabilities: ["Curriculum tutoring", "Study planning", "Career coaching", "Assessment feedback", "Wellbeing support"],
        status: "online",
        version: "v2.4.1",
        totalInteractionsToday: 3420,
        avgResponseMs: 820,
        satisfactionScore: 96,
        modelProvider: "gemini",
        dataAccess: ["Student progress", "Lesson content", "Rubrics", "Career data"],
      },
      {
        id: "agent-faculty",
        name: "Sage — Faculty Teaching Agent",
        role: "faculty",
        description: "AI teaching assistant that flags at-risk learners, assists with grading, and coaches content quality.",
        capabilities: ["At-risk detection", "Grading assist", "Content advisory", "Engagement analytics", "Comms drafting"],
        status: "online",
        version: "v1.9.0",
        totalInteractionsToday: 840,
        avgResponseMs: 640,
        satisfactionScore: 94,
        modelProvider: "gemini",
        dataAccess: ["Cohort data", "Lesson analytics", "Submission data", "Student engagement"],
      },
      {
        id: "agent-admin",
        name: "Pulse — Admin Operations Agent",
        role: "admin",
        description: "Institutional admin AI that manages operational alerts, compliance tracking, and prioritised task management.",
        capabilities: ["Compliance monitoring", "Task prioritisation", "Report generation", "Financial alerts", "HR support"],
        status: "online",
        version: "v1.5.2",
        totalInteractionsToday: 280,
        avgResponseMs: 710,
        satisfactionScore: 92,
        modelProvider: "gemini",
        dataAccess: ["Student records", "Financial data", "Staff records", "Compliance logs"],
      },
      {
        id: "agent-executive",
        name: "Apex — Executive Intelligence Agent",
        role: "executive",
        description: "C-suite AI advisor delivering strategic insights, market intelligence, and executive briefings.",
        capabilities: ["KPI synthesis", "Strategic recommendations", "Daily briefings", "Risk intelligence", "Market analysis"],
        status: "online",
        version: "v1.2.0",
        totalInteractionsToday: 89,
        avgResponseMs: 1100,
        satisfactionScore: 98,
        modelProvider: "gemini",
        dataAccess: ["All institutional data", "Market data", "Employer data", "Financial aggregates"],
      },
      {
        id: "agent-platform",
        name: "Atlas — Platform Operator Agent",
        role: "platform",
        description: "Global super-admin AI monitoring all tenants, detecting churn, and orchestrating platform automations.",
        capabilities: ["Tenant monitoring", "Churn prediction", "Growth signals", "Incident response", "Automation orchestration"],
        status: "online",
        version: "v1.0.8",
        totalInteractionsToday: 67,
        avgResponseMs: 950,
        satisfactionScore: 97,
        modelProvider: "gemini",
        dataAccess: ["All tenant data", "Platform metrics", "Global telemetry", "Billing data"],
      },
    ];
  }

  static getWorkforceHealth(): AIWorkforceHealth {
    return {
      overallStatus: "operational",
      onlineAgents: 5,
      totalAgents: 5,
      totalInteractionsToday: 4696,
      totalTokensToday: "892K",
      avgSatisfaction: 95,
    };
  }

  static getAgentByRole(role: AIAgentRole): AIAgent | undefined {
    return this.getAllAgents().find((a) => a.role === role);
  }

  static getAgentRouteByRole(role: AIAgentRole): string {
    const routes: Record<AIAgentRole, string> = {
      student: "/dashboard/student/ai-agent",
      faculty: "/dashboard/instructor/ai-agent",
      admin: "/dashboard/admin/ai-agent",
      executive: "/dashboard/admin/ai-executive",
      platform: "/dashboard/platform/ai-agent",
    };
    return routes[role];
  }
}
