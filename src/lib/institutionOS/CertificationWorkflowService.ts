export interface CertificationWorkflowStage {
  stageName: "Submitted" | "Automated Review" | "Security Review" | "Performance Review" | "Accessibility Review" | "Architecture Review" | "Final Approval";
  status: "PASSED" | "IN_PROGRESS" | "PENDING";
  completedAt?: string;
  auditorName?: string;
}

export class CertificationWorkflowService {
  static getWorkflowStages(extensionId: string): CertificationWorkflowStage[] {
    return [
      { stageName: "Submitted", status: "PASSED", completedAt: "2026-07-01", auditorName: "Automated Pipeline" },
      { stageName: "Automated Review", status: "PASSED", completedAt: "2026-07-01", auditorName: "AST Static Code Analyzer" },
      { stageName: "Security Review", status: "PASSED", completedAt: "2026-07-05", auditorName: "DWSA Security Audit Team" },
      { stageName: "Performance Review", status: "PASSED", completedAt: "2026-07-08", auditorName: "LoadTest Engine v4" },
      { stageName: "Accessibility Review", status: "PASSED", completedAt: "2026-07-10", auditorName: "WCAG 2.1 AA Auditor" },
      { stageName: "Architecture Review", status: "PASSED", completedAt: "2026-07-12", auditorName: "Chief Platform Architect" },
      { stageName: "Final Approval", status: "PASSED", completedAt: "2026-07-15", auditorName: "Platform Governance Board" },
    ];
  }
}
