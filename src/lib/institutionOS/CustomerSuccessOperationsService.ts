export interface InstitutionHealthCheck {
  institutionId: string;
  institutionName: string;
  overallHealthScore: number;
  facultyAdoptionPercent: number;
  studentAdoptionPercent: number;
  aiUtilizationCount: number;
  openSupportTickets: number;
  trainingCompletionPercent: number;
  renewalProbabilityPercent: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  recommendedActions: string[];
}

export class CustomerSuccessOperationsService {
  static getHealthChecks(): InstitutionHealthCheck[] {
    return [
      {
        institutionId: "tenant_dta_001",
        institutionName: "Digital Technology Academy (DTA)",
        overallHealthScore: 98,
        facultyAdoptionPercent: 96,
        studentAdoptionPercent: 98,
        aiUtilizationCount: 14200,
        openSupportTickets: 0,
        trainingCompletionPercent: 100,
        renewalProbabilityPercent: 99,
        riskLevel: "LOW",
        recommendedActions: ["Enable v4.4 AI Agent Exchange for automated Grant Writer AI."],
      },
      {
        institutionId: "tenant_ku_002",
        institutionName: "Kenyatta University Digital Campus",
        overallHealthScore: 94,
        facultyAdoptionPercent: 88,
        studentAdoptionPercent: 92,
        aiUtilizationCount: 8900,
        openSupportTickets: 1,
        trainingCompletionPercent: 95,
        renewalProbabilityPercent: 95,
        riskLevel: "LOW",
        recommendedActions: ["Conduct refresher workshop for new faculty members in School of Business."],
      },
    ];
  }
}
