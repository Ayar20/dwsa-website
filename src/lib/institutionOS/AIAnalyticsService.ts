/**
 * AIAnalyticsService.ts
 * InstitutionOS AI Operating Layer — Institution-Wide AI Utilization & Intelligence Trends
 */

export interface AIAnalyticsSummary {
  totalQueriesThisMonth: number;
  avgResponseTimeMs: number;
  satisfactionRate: number;
  topRequestedTopics: { topic: string; count: number; percentage: number }[];
  usageByRole: { role: string; queryCount: number }[];
  knowledgeGapsFlagged: { topic: string; queryCount: number; status: string }[];
}

const mockAnalytics: AIAnalyticsSummary = {
  totalQueriesThisMonth: 4820,
  avgResponseTimeMs: 340,
  satisfactionRate: 98.4,
  topRequestedTopics: [
    { topic: "Next.js App Router & Server Actions", count: 1420, percentage: 29.5 },
    { topic: "TypeScript Generics & Interfaces", count: 1150, percentage: 23.8 },
    { topic: "Employer Career Matching & Resumes", count: 890, percentage: 18.5 },
    { topic: "Assessment Rubric Generation", count: 720, percentage: 14.9 },
    { topic: "Executive Revenue & Capacity Planning", count: 640, percentage: 13.3 },
  ],
  usageByRole: [
    { role: "Student", queryCount: 3120 },
    { role: "Faculty", queryCount: 1100 },
    { role: "Admin", queryCount: 600 },
  ],
  knowledgeGapsFlagged: [
    { topic: "Docker Container Orchestration", queryCount: 145, status: "Curriculum Module Under Development" },
    { topic: "GraphQL Integration with Prisma", queryCount: 98, status: "Added to Resource Library" },
    { topic: "Automated Paystack Webhook Debugging", queryCount: 64, status: "SOP Article Published" },
  ],
};

export class AIAnalyticsService {
  public static getAnalyticsSummary(): AIAnalyticsSummary {
    return { ...mockAnalytics };
  }
}
