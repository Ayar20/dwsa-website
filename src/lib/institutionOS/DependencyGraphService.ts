export interface WorkflowNode {
  id: string;
  label: string;
  stepNumber: number;
  connectorId: string;
  connectorName: string;
  status: "OPERATIONAL" | "IMPACTED" | "CRITICAL_FAILURE";
  downstreamImpacts: string[];
}

export class DependencyGraphService {
  static getInstitutionalWorkflowGraph(): WorkflowNode[] {
    return [
      { id: "step-1", label: "Admissions Pipeline", stepNumber: 1, connectorId: "gov-student-registry", connectorName: "National Student Registry", status: "OPERATIONAL", downstreamImpacts: ["Student Registry", "Payment Reconciliation", "Course Enrollment"] },
      { id: "step-2", label: "Student Identity & Registry", stepNumber: 2, connectorId: "gov-student-registry", connectorName: "NIMC Identity Verification", status: "OPERATIONAL", downstreamImpacts: ["Tuition Billing", "Course Enrollment"] },
      { id: "step-3", label: "Tuition & Fee Payment", stepNumber: 3, connectorId: "pay-paystack", connectorName: "Paystack Gateway Hub", status: "OPERATIONAL", downstreamImpacts: ["Course Enrollment", "LMS Access"] },
      { id: "step-4", label: "Course Registration & LMS", stepNumber: 4, connectorId: "lms-moodle", connectorName: "Moodle Enterprise Bridge", status: "IMPACTED", downstreamImpacts: ["Learning Workspace", "Assessment & PR Grading"] },
      { id: "step-5", label: "Learning & Live Classes", stepNumber: 5, connectorId: "comm-zoom", connectorName: "Zoom & Google Meet", status: "OPERATIONAL", downstreamImpacts: ["Assessment & PR Grading"] },
      { id: "step-6", label: "Assessment & PR Grading", stepNumber: 6, connectorId: "ent-github", connectorName: "GitHub Assessment Engine", status: "OPERATIONAL", downstreamImpacts: ["Certificates & Badges"] },
      { id: "step-7", label: "Certificates & Credentials", stepNumber: 7, connectorId: "gov-accreditation", connectorName: "NUC Accreditation Engine", status: "OPERATIONAL", downstreamImpacts: ["Graduate Records & Alumni Network"] },
      { id: "step-8", label: "Graduate & Alumni Records", stepNumber: 8, connectorId: "ent-m365", connectorName: "Microsoft Azure AD", status: "OPERATIONAL", downstreamImpacts: [] },
    ];
  }

  static evaluateFailureImpact(failedConnectorId: string): { affectedWorkflowsCount: number; affectedStudentsCount: number; downstreamNodes: string[] } {
    if (failedConnectorId === "lms-moodle") {
      return {
        affectedWorkflowsCount: 2,
        affectedStudentsCount: 840,
        downstreamNodes: ["Learning & Live Classes", "Assessment & PR Grading"],
      };
    }
    return {
      affectedWorkflowsCount: 0,
      affectedStudentsCount: 0,
      downstreamNodes: [],
    };
  }
}
