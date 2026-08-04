/**
 * ApprovalService.ts
 * InstitutionOS Automation — Executive Approval Centre & Digital Signature Engine
 */

export type ApprovalCategory =
  | "Certificate" | "Research" | "Faculty" | "Admissions"
  | "Finance" | "Partnership" | "Scholarship" | "Policy";

export interface ApprovalItem {
  id: string;
  category: ApprovalCategory;
  title: string;
  submittedBy: string;
  submittedAt: string;
  priority: "Urgent" | "High" | "Medium" | "Low";
  status: "Pending" | "Approved" | "Rejected" | "Deferred";
  comments: string[];
  hasAttachments: boolean;
  signaturePlaceholder: boolean;
}

const mockApprovals: ApprovalItem[] = [
  { id: "APR-201", category: "Certificate", title: "Professional Diploma — Kofi Asante", submittedBy: "Academic Registrar", submittedAt: "Aug 02, 2026", priority: "High", status: "Pending", comments: ["Faculty assessment completed. GPA 3.92/4.0. All requirements met."], hasAttachments: true, signaturePlaceholder: true },
  { id: "APR-202", category: "Finance", title: "Q3 Operational Budget Supplementary Request — ₦4.2M", submittedBy: "Finance Office", submittedAt: "Aug 01, 2026", priority: "Urgent", status: "Pending", comments: ["Covering hackathon logistics, guest faculty honoraria, and cloud infrastructure expansion."], hasAttachments: true, signaturePlaceholder: true },
  { id: "APR-203", category: "Partnership", title: "Flutterwave Technology MOU — 3-Year Agreement", submittedBy: "Business Development", submittedAt: "Aug 03, 2026", priority: "High", status: "Pending", comments: ["Draft MOU reviewed by legal. Pending executive director signature."], hasAttachments: true, signaturePlaceholder: true },
  { id: "APR-204", category: "Scholarship", title: "Innovation Excellence Scholarship — Zainab Al-Mansoor", submittedBy: "Student Affairs", submittedAt: "Jul 25, 2026", priority: "Medium", status: "Approved", comments: ["Approved. Award letter issued Aug 01, 2026."], hasAttachments: false, signaturePlaceholder: false },
  { id: "APR-205", category: "Research", title: "AI-Powered Curriculum Adaptation Study — Ethics Review", submittedBy: "Research Office", submittedAt: "Jul 30, 2026", priority: "Medium", status: "Pending", comments: ["Requires ethics board sign-off before pilot commencement."], hasAttachments: true, signaturePlaceholder: true },
];

export class ApprovalService {
  private static approvals: ApprovalItem[] = [...mockApprovals];

  public static getAll(): ApprovalItem[] {
    return [...this.approvals];
  }

  public static getPending(): ApprovalItem[] {
    return this.approvals.filter((a) => a.status === "Pending");
  }

  public static approve(id: string, comment?: string): void {
    const item = this.approvals.find((a) => a.id === id);
    if (item) {
      item.status = "Approved";
      if (comment) item.comments.push(comment);
    }
  }

  public static reject(id: string, comment?: string): void {
    const item = this.approvals.find((a) => a.id === id);
    if (item) {
      item.status = "Rejected";
      if (comment) item.comments.push(comment);
    }
  }
}
