export interface DealOpportunity {
  id: string;
  institutionName: string;
  country: string;
  stage: "Lead" | "Discovery" | "Digital Assessment" | "Proposal" | "Executive Presentation" | "Commercial Negotiation" | "Contract Signed" | "Implementation Planning" | "Configuration" | "Migration" | "Training" | "Pilot" | "Go Live" | "Hypercare" | "Optimization" | "Expansion" | "Renewal";
  dealValueUSD: number;
  probabilityPercent: number;
  assignedOwner: string;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  expectedCompletionDate: string;
  aiRecommendation: string;
}

export class OpportunityManagementService {
  private static opportunities: DealOpportunity[] = [
    { id: "opp-01", institutionName: "Kwame Nkrumah University (KNUST)", country: "Ghana", stage: "Executive Presentation", dealValueUSD: 310000, probabilityPercent: 75, assignedOwner: "Kwame Asante", riskLevel: "LOW", expectedCompletionDate: "2026-09-15", aiRecommendation: "Schedule Vice Chancellor executive briefing with live AI Agent (Apex) demo." },
    { id: "opp-02", institutionName: "Federal University of Technology, Akure", country: "Nigeria", stage: "Configuration", dealValueUSD: 240000, probabilityPercent: 95, assignedOwner: "Chidi Nnamdi", riskLevel: "LOW", expectedCompletionDate: "2026-08-30", aiRecommendation: "Finalize NIMC Identity verification bridge testing before student registration opens." },
    { id: "opp-03", institutionName: "University of Johannesburg Digital Academy", country: "South Africa", stage: "Commercial Negotiation", dealValueUSD: 420000, probabilityPercent: 85, assignedOwner: "Thabo Mbeki", riskLevel: "MEDIUM", expectedCompletionDate: "2026-10-01", aiRecommendation: "Offer multi-year enterprise license discount of 12% for 3-year commitment." },
    { id: "opp-04", institutionName: "Makerere University Business School", country: "Uganda", stage: "Digital Assessment", dealValueUSD: 190000, probabilityPercent: 60, assignedOwner: "Faith Mutua", riskLevel: "LOW", expectedCompletionDate: "2026-11-15", aiRecommendation: "Run 12-dimension Digital Transformation Maturity Assessment with ICT Director." },
  ];

  static getOpportunities(): DealOpportunity[] {
    return this.opportunities;
  }
}
