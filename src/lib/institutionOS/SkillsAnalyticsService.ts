export interface InstitutionalSkillsAnalytics {
  topCompetencies: { name: string; learnerCount: number; avgScore: number }[];
  skillGaps: { name: string; gapSeverity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"; affectedLearnersPercent: number }[];
  graduateWorkforceReadinessPercent: number;
  facultyCapabilityIndex: number; // 0-100
  programmeAlignmentPercent: number;
}

export class SkillsAnalyticsService {
  static getInstitutionalAnalytics(): InstitutionalSkillsAnalytics {
    return {
      topCompetencies: [
        { name: "TypeScript & React Architecture", learnerCount: 420, avgScore: 88 },
        { name: "AI Agent Orchestration", learnerCount: 310, avgScore: 84 },
        { name: "Agile Leadership & PR Review", learnerCount: 280, avgScore: 92 },
        { name: "Fintech Payment Gateways", learnerCount: 195, avgScore: 86 },
      ],
      skillGaps: [
        { name: "Quantum Computing Concepts", gapSeverity: "MEDIUM", affectedLearnersPercent: 45 },
        { name: "WebAssembly Performance Tuning", gapSeverity: "LOW", affectedLearnersPercent: 32 },
        { name: "Zero-Trust Mesh Networking", gapSeverity: "HIGH", affectedLearnersPercent: 58 },
      ],
      graduateWorkforceReadinessPercent: 94,
      facultyCapabilityIndex: 92,
      programmeAlignmentPercent: 96,
    };
  }
}
