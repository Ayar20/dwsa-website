export interface AIAgentMarketplaceItem {
  id: string;
  name: string;
  provider: string;
  category: "Admissions" | "Registrar" | "Finance" | "Faculty" | "Student Coach" | "Research" | "Grants" | "Compliance" | "Executive Strategy";
  capabilities: string[];
  supportedRoles: string[];
  knowledgeSourcesRequired: string[];
  estimatedTokensPerQuery: number;
  providerCompatibility: string[];
  installStatus: "INSTALLED" | "AVAILABLE";
  safetyClassification: "TIER_1_STANDARD" | "TIER_2_SENSITIVE_DATA" | "TIER_3_FINANCIAL";
}

export class AIGovernanceMarketplaceService {
  static getAIAgents(): AIAgentMarketplaceItem[] {
    return [
      { id: "ai-admissions", name: "Admissions Pipeline AI Agent", provider: "DWSA AI Workforce", category: "Admissions", capabilities: ["Applicant scoring", "Document OCR validation", "Interview scheduling"], supportedRoles: ["Admissions Officer", "Registrar"], knowledgeSourcesRequired: ["Admissions DB", "NIMC Identity Service"], estimatedTokensPerQuery: 850, providerCompatibility: ["Gemini 1.5 Pro", "Claude 3.5 Sonnet"], installStatus: "INSTALLED", safetyClassification: "TIER_2_SENSITIVE_DATA" },
      { id: "ai-finance", name: "Tuition & Reconciliation AI Agent", provider: "FinTech AI Labs", category: "Finance", capabilities: ["Bank transfer auto-matching", "Installment plan calculation", "WHT audit"], supportedRoles: ["Finance Director", "Bursar"], knowledgeSourcesRequired: ["Paystack Ledger", "ERP Financial Database"], estimatedTokensPerQuery: 1200, providerCompatibility: ["Gemini 1.5 Pro"], installStatus: "INSTALLED", safetyClassification: "TIER_3_FINANCIAL" },
      { id: "ai-grants", name: "Research Grant Writer & Opportunity AI", provider: "Academic AI Collective", category: "Grants", capabilities: ["Grant opportunity matching", "Proposal drafting", "Budget compliance review"], supportedRoles: ["Research Fellow", "Dean of Research"], knowledgeSourcesRequired: ["Research Repositories", "Global Grant DB"], estimatedTokensPerQuery: 2400, providerCompatibility: ["Claude 3.5 Sonnet", "GPT-4o"], installStatus: "AVAILABLE", safetyClassification: "TIER_1_STANDARD" },
    ];
  }
}
