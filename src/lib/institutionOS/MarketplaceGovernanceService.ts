export interface GovernanceApprovalQueueItem {
  id: string;
  itemType: "EXTENSION" | "AI_AGENT";
  name: string;
  publisher: string;
  submissionDate: string;
  status: "PENDING_SECURITY_REVIEW" | "PENDING_ACCESSIBILITY_REVIEW" | "APPROVED" | "REJECTED";
  securityScanResult: "PASSED" | "FLAGGED" | "PENDING";
}

export class MarketplaceGovernanceService {
  static getApprovalQueue(): GovernanceApprovalQueueItem[] {
    return [
      { id: "app-01", itemType: "EXTENSION", name: "Campus Hostel Biometric Gate Bridge", publisher: "CampuSoft Africa", submissionDate: "2026-08-01", status: "PENDING_SECURITY_REVIEW", securityScanResult: "PASSED" },
      { id: "app-02", itemType: "AI_AGENT", name: "Research Grant Writing AI Agent", publisher: "University Research Labs", submissionDate: "2026-08-03", status: "PENDING_ACCESSIBILITY_REVIEW", securityScanResult: "PASSED" },
    ];
  }
}
