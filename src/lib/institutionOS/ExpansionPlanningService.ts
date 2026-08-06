export interface ExpansionOpportunity {
  id: string;
  institutionName: string;
  targetModule: string;
  estimatedAdditionalARRUSD: number;
  pitchStage: "IDENTIFIED" | "PROPOSAL_SENT" | "EXECUTIVE_REVIEW";
}

export class ExpansionPlanningService {
  static getExpansionOpportunities(): ExpansionOpportunity[] {
    return [
      { id: "exp-01", institutionName: "Kenyatta University Digital Campus", targetModule: "Smart Hostel & Campus Housing Extension", estimatedAdditionalARRUSD: 45000, pitchStage: "PROPOSAL_SENT" },
      { id: "exp-02", institutionName: "Federal University of Tech, Akure", targetModule: "AI Agent Exchange (Grant Writer & Research)", estimatedAdditionalARRUSD: 60000, pitchStage: "IDENTIFIED" },
    ];
  }
}
