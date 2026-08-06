export interface MicroCredential {
  id: string;
  badgeName: string;
  issuer: string;
  skillValidated: string;
  level: "FOUNDATION" | "INTERMEDIATE" | "ADVANCED" | "MASTER";
  issuedDate: string;
  badgeImageUrl: string;
  verificationHash: string;
}

export class MicroCredentialService {
  static getBadgesForLearner(learnerId: string): MicroCredential[] {
    return [
      { id: "mc-01", badgeName: "Autonomous AI Agent Specialist", issuer: "DWSA AI Academy", skillValidated: "AI Agent Orchestration", level: "ADVANCED", issuedDate: "2026-07-28", badgeImageUrl: "/badges/ai-agent.png", verificationHash: "0x89f2a4b109e23" },
      { id: "mc-02", badgeName: "TypeScript Full-Stack Architect", issuer: "Digital Technology Academy", skillValidated: "TypeScript & React Architecture", level: "ADVANCED", issuedDate: "2026-06-15", badgeImageUrl: "/badges/ts-architect.png", verificationHash: "0x77c1b3d902e11" },
      { id: "mc-03", badgeName: "Paystack Payment Gateway Integrator", issuer: "Paystack Developer Alliance", skillValidated: "Fintech & Payment Integration", level: "INTERMEDIATE", issuedDate: "2026-07-10", badgeImageUrl: "/badges/paystack.png", verificationHash: "0x44a1e9c201a99" },
    ];
  }
}
