/**
 * MarketplaceService.ts
 * InstitutionOS v4.1 — Enterprise Commercial Module Marketplace Service
 */

export interface CommercialModule {
  id: string;
  category: "core" | "intelligence" | "enterprise";
  name: string;
  tagline: string;
  description: string;
  icon: string;
  status: "active" | "beta" | "coming_soon";
  includedInTier: ("starter" | "professional" | "enterprise" | "government")[];
  standaloneMonthlyUSD: number;
  activationCount: number;
}

const MARKETPLACE_MODULES: CommercialModule[] = [
  // Core Platform Modules
  {
    id: "mod_student_campus",
    category: "core",
    name: "Student Digital Campus",
    tagline: "Interactive learning workspace, video player & coding labs",
    description: "Complete student portal with programme handbook, lesson studio, timestamped notes, and interactive practical labs.",
    icon: "🎓",
    status: "active",
    includedInTier: ["starter", "professional", "enterprise", "government"],
    standaloneMonthlyUSD: 199,
    activationCount: 3,
  },
  {
    id: "mod_faculty_workspace",
    category: "core",
    name: "Faculty Teaching Studio",
    tagline: "Lesson creation, cohort tracking, and drop-off analytics",
    description: "Instructor hub for publishing lessons, tracking student engagement, analyzing fall-off points, and conducting live sessions.",
    icon: "👨‍🏫",
    status: "active",
    includedInTier: ["starter", "professional", "enterprise", "government"],
    standaloneMonthlyUSD: 199,
    activationCount: 3,
  },
  {
    id: "mod_icc_dashboard",
    category: "core",
    name: "Executive Control Centre (ICC)",
    tagline: "Institutional ERP, financial ledger, and operations command",
    description: "Administrative suite for financial ERP, student success, admissions pipeline, certificates, and compliance governance.",
    icon: "🏛",
    status: "active",
    includedInTier: ["starter", "professional", "enterprise", "government"],
    standaloneMonthlyUSD: 299,
    activationCount: 3,
  },

  // Intelligence Modules
  {
    id: "mod_ai_assistant",
    category: "intelligence",
    name: "Global AI Assistant & Orchestrator",
    tagline: "Role-specific AI tutoring, lesson drafting, & auto-grading",
    description: "Gemini-powered AI assistant with multi-provider abstraction, prompt libraries, institutional RAG, and governance controls.",
    icon: "🤖",
    status: "active",
    includedInTier: ["professional", "enterprise", "government"],
    standaloneMonthlyUSD: 399,
    activationCount: 2,
  },
  {
    id: "mod_predictive_analytics",
    category: "intelligence",
    name: "Predictive Academic Intelligence",
    tagline: "At-risk learner detection and learning velocity scoring",
    description: "AI-driven learner analytics predicting completion probabilities, drop-off points, and automated intervention triggers.",
    icon: "📊",
    status: "active",
    includedInTier: ["professional", "enterprise", "government"],
    standaloneMonthlyUSD: 299,
    activationCount: 2,
  },
  {
    id: "mod_recommendation_engine",
    category: "intelligence",
    name: "AI Recommendation Engine",
    tagline: "Personalised study plans and adaptive revision recommendations",
    description: "Dynamic recommendation engine suggesting daily study goals, practice exercises, and project revisions.",
    icon: "💡",
    status: "active",
    includedInTier: ["professional", "enterprise", "government"],
    standaloneMonthlyUSD: 199,
    activationCount: 2,
  },

  // Enterprise Modules
  {
    id: "mod_credential_verification",
    category: "enterprise",
    name: "Digital Credential & Verification Platform",
    tagline: "Cryptographic certificates, digital wallet, & transcript engine",
    description: "SHA-256 tamper-proof certificate generation with QR seal verification, student credential wallet, and academic transcript authority.",
    icon: "📜",
    status: "active",
    includedInTier: ["starter", "professional", "enterprise", "government"],
    standaloneMonthlyUSD: 249,
    activationCount: 3,
  },
  {
    id: "mod_career_placement",
    category: "enterprise",
    name: "Graduate Career & Employer Portal",
    tagline: "Industry partner matching, employer portal, & placement analytics",
    description: "Enterprise employer workspace connecting corporate recruiters directly with certified graduates.",
    icon: "💼",
    status: "active",
    includedInTier: ["enterprise", "government"],
    standaloneMonthlyUSD: 499,
    activationCount: 1,
  },
  {
    id: "mod_research_management",
    category: "enterprise",
    name: "Research & Innovation Management",
    tagline: "Grant tracking, paper repositories, & IP commercialization",
    description: "Institutional research portal for managing grants, peer reviews, intellectual property, and research outputs.",
    icon: "🔬",
    status: "active",
    includedInTier: ["enterprise", "government"],
    standaloneMonthlyUSD: 399,
    activationCount: 1,
  },
];

export class MarketplaceService {
  public static getAllModules(): CommercialModule[] {
    return [...MARKETPLACE_MODULES];
  }

  public static getModulesByCategory(category: CommercialModule["category"]): CommercialModule[] {
    return MARKETPLACE_MODULES.filter((m) => m.category === category);
  }

  public static getModuleById(id: string): CommercialModule | undefined {
    return MARKETPLACE_MODULES.find((m) => m.id === id);
  }
}
