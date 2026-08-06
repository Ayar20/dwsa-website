export interface ProposalDocumentTemplate {
  id: string;
  title: string;
  type: "Executive Proposal" | "Statement of Work" | "Implementation Roadmap" | "Training Plan" | "Commercial Quotation" | "Executive Briefing" | "Board Presentation" | "ROI Assessment" | "Digital Transformation Report" | "Customer Success Plan";
  targetInstitution: string;
  generatedDate: string;
  estimatedPages: number;
  status: "DRAFT" | "READY_FOR_REVIEW" | "FINALIZED";
}

export class ProposalGenerationService {
  static getGeneratedProposals(): ProposalDocumentTemplate[] {
    return [
      { id: "prop-01", title: "InstitutionOS Digital Transformation Proposal — KNUST Ghana", type: "Executive Proposal", targetInstitution: "Kwame Nkrumah University", generatedDate: "2026-08-02", estimatedPages: 42, status: "READY_FOR_REVIEW" },
      { id: "prop-02", title: "Statement of Work (SOW) — FUTA Deployment Phase 1", type: "Statement of Work", targetInstitution: "Federal University of Tech, Akure", generatedDate: "2026-07-28", estimatedPages: 28, status: "FINALIZED" },
      { id: "prop-03", title: "5-Year ROI & Digital Transformation Report — NOUN Nigeria", type: "ROI Assessment", targetInstitution: "National Open University of Nigeria", generatedDate: "2026-08-04", estimatedPages: 36, status: "DRAFT" },
    ];
  }

  static generateProposal(type: ProposalDocumentTemplate["type"], institutionName: string): ProposalDocumentTemplate {
    return {
      id: `prop-${Math.floor(Math.random() * 900) + 100}`,
      title: `${type} — ${institutionName}`,
      type,
      targetInstitution: institutionName,
      generatedDate: new Date().toISOString().split("T")[0],
      estimatedPages: 32,
      status: "DRAFT",
    };
  }
}
