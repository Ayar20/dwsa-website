export interface CompetencyEvidence {
  id: string;
  competencyName: string;
  evidenceType: "Project" | "PR Review" | "Certificate" | "Research" | "Assignment" | "Hackathon" | "Innovation Challenge";
  title: string;
  description: string;
  verifiedBy: string;
  dateAdded: string;
  verificationBadge: string;
  externalLink?: string;
}

export class CompetencyEvidenceService {
  static getEvidenceList(learnerId: string): CompetencyEvidence[] {
    return [
      { id: "ev-01", competencyName: "TypeScript & React Architecture", evidenceType: "Project", title: "InstitutionOS v4.5 Enterprise CRM Dashboard", description: "Built 8 enterprise UI dashboards using glassmorphism and DWSA design system.", verifiedBy: "Dr. Olayinka Cole (Faculty Lead)", dateAdded: "2026-08-04", verificationBadge: "VERIFIED_PLATFORM", externalLink: "https://github.com/dta/institutionos" },
      { id: "ev-02", competencyName: "AI Agent Orchestration", evidenceType: "Hackathon", title: "Pan-African AI Innovation Challenge 2026", description: "Won 1st place building autonomous Grant Writer AI agent using InstitutionOS SDK.", verifiedBy: "Digital World Systems Africa", dateAdded: "2026-07-20", verificationBadge: "GOLD_MEDALIST" },
      { id: "ev-03", competencyName: "Fintech & Payment Integration", evidenceType: "PR Review", title: "Paystack Multi-Currency Tuition Gateway", description: "Submitted and merged production PR with 100% test coverage for multi-gateway failover.", verifiedBy: "Tunde Ednut (Lead Engineer)", dateAdded: "2026-07-15", verificationBadge: "MERGED_PR" },
    ];
  }
}
