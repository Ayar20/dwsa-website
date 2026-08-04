/**
 * WorkflowEngine.ts
 * InstitutionOS Automation — Configurable Institutional Workflow Engine
 */

export type WorkflowType =
  | "StudentAdmissions"
  | "FacultyApproval"
  | "CertificateApproval"
  | "CorporatePartnership"
  | "ProcurementRequest"
  | "ResearchApproval"
  | "ScholarshipApproval"
  | "GraduationClearance";

export interface WorkflowStage {
  stage: number;
  title: string;
  approver: string;
  status: "Pending" | "Approved" | "Rejected" | "Skipped";
  completedAt?: string;
  comments?: string;
}

export interface WorkflowInstance {
  id: string;
  type: WorkflowType;
  title: string;
  initiatedBy: string;
  currentStage: number;
  totalStages: number;
  status: "Running" | "Completed" | "Rejected" | "On Hold";
  priority: "High" | "Medium" | "Low";
  stages: WorkflowStage[];
  auditTrail: Array<{ action: string; actor: string; timestamp: string }>;
  createdAt: string;
  updatedAt: string;
}

const mockWorkflows: WorkflowInstance[] = [
  {
    id: "WF-1001",
    type: "CertificateApproval",
    title: "Professional Diploma Certificate — Kofi Asante (Cohort Alpha)",
    initiatedBy: "Academic Registrar",
    currentStage: 2,
    totalStages: 3,
    status: "Running",
    priority: "High",
    stages: [
      { stage: 1, title: "Faculty Dean Review", approver: "Dr. Olumide Adeleke", status: "Approved", completedAt: "2026-08-02", comments: "All academic requirements met. Approved." },
      { stage: 2, title: "Executive Registrar Approval", approver: "Chief Academic Officer", status: "Pending" },
      { stage: 3, title: "Digital Credential Issuance", approver: "InstitutionOS CredentialService", status: "Pending" },
    ],
    auditTrail: [
      { action: "Workflow Initiated", actor: "Academic Registrar", timestamp: "2026-08-01 09:00" },
      { action: "Stage 1 Approved", actor: "Dr. Olumide Adeleke", timestamp: "2026-08-02 14:30" },
    ],
    createdAt: "2026-08-01",
    updatedAt: "2026-08-02",
  },
  {
    id: "WF-1002",
    type: "CorporatePartnership",
    title: "New Corporate Agreement — Flutterwave Technology Partnership",
    initiatedBy: "Business Development Office",
    currentStage: 1,
    totalStages: 4,
    status: "Running",
    priority: "High",
    stages: [
      { stage: 1, title: "Legal & Compliance Review", approver: "Legal Counsel", status: "Pending" },
      { stage: 2, title: "Finance Office Review", approver: "Chief Finance Officer", status: "Pending" },
      { stage: 3, title: "Executive Director Approval", approver: "Executive Director", status: "Pending" },
      { stage: 4, title: "Agreement Execution", approver: "Partnership Services", status: "Pending" },
    ],
    auditTrail: [{ action: "Workflow Initiated", actor: "Business Development Office", timestamp: "2026-08-03 10:15" }],
    createdAt: "2026-08-03",
    updatedAt: "2026-08-03",
  },
  {
    id: "WF-1003",
    type: "ScholarshipApproval",
    title: "Innovation Excellence Scholarship — Zainab Al-Mansoor",
    initiatedBy: "Student Affairs Office",
    currentStage: 3,
    totalStages: 3,
    status: "Completed",
    priority: "Medium",
    stages: [
      { stage: 1, title: "Academic Merit Review", approver: "Faculty Dean", status: "Approved", completedAt: "2026-07-28" },
      { stage: 2, title: "Finance Allocation", approver: "Finance Office", status: "Approved", completedAt: "2026-07-30" },
      { stage: 3, title: "Scholarship Award Letter", approver: "Executive Director", status: "Approved", completedAt: "2026-08-01" },
    ],
    auditTrail: [
      { action: "Workflow Initiated", actor: "Student Affairs Office", timestamp: "2026-07-25 09:00" },
      { action: "Stage 1 Approved", actor: "Faculty Dean", timestamp: "2026-07-28 11:00" },
      { action: "Stage 2 Approved", actor: "Finance Office", timestamp: "2026-07-30 15:00" },
      { action: "Stage 3 Approved — Completed", actor: "Executive Director", timestamp: "2026-08-01 12:00" },
    ],
    createdAt: "2026-07-25",
    updatedAt: "2026-08-01",
  },
];

export class WorkflowEngine {
  private static workflows: WorkflowInstance[] = [...mockWorkflows];

  public static getActiveWorkflows(): WorkflowInstance[] {
    return this.workflows.filter((w) => w.status === "Running");
  }

  public static getAllWorkflows(): WorkflowInstance[] {
    return [...this.workflows];
  }

  public static approveStage(workflowId: string, stageIndex: number, actor: string, comments?: string): void {
    const wf = this.workflows.find((w) => w.id === workflowId);
    if (!wf) return;
    wf.stages[stageIndex].status = "Approved";
    wf.stages[stageIndex].completedAt = new Date().toISOString().split("T")[0];
    wf.stages[stageIndex].comments = comments;
    wf.auditTrail.push({ action: `Stage ${stageIndex + 1} Approved`, actor, timestamp: new Date().toLocaleString() });
    const nextStage = wf.stages[stageIndex + 1];
    if (nextStage) {
      wf.currentStage = nextStage.stage;
    } else {
      wf.status = "Completed";
    }
    wf.updatedAt = new Date().toISOString().split("T")[0];
  }
}
