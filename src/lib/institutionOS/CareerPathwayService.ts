export interface CareerPathway {
  id: string;
  roleName: "Software Engineer" | "AI Engineer" | "Cloud Engineer" | "Cybersecurity Specialist" | "Product Manager" | "UI/UX Designer" | "Data Scientist" | "DevOps Engineer";
  description: string;
  requiredSkillIds: string[];
  recommendedModules: string[];
  recommendedCertifications: string[];
  averageSalaryUSD: number;
  marketDemandLevel: "HIGH" | "VERY_HIGH" | "CRITICAL";
  estimatedCompletionWeeks: number;
}

export class CareerPathwayService {
  private static pathways: CareerPathway[] = [
    { id: "pw-01", roleName: "Software Engineer", description: "Full-stack software architecture, TypeScript, cloud microservices, and system design.", requiredSkillIds: ["sk-001", "sk-003", "sk-004"], recommendedModules: ["ADV-CS-401", "SYS-ARCH-402"], recommendedCertifications: ["AWS Certified Solutions Architect", "DWSA Master Developer"], averageSalaryUSD: 45000, marketDemandLevel: "VERY_HIGH", estimatedCompletionWeeks: 24 },
    { id: "pw-02", roleName: "AI Engineer", description: "Autonomous multi-agent systems, LLM fine-tuning, RAG architecture, and ethical AI governance.", requiredSkillIds: ["sk-002", "sk-001"], recommendedModules: ["AI-AGT-501", "LLM-OPS-502"], recommendedCertifications: ["InstitutionOS AI Agent Specialist", "Google Cloud AI Engineer"], averageSalaryUSD: 60000, marketDemandLevel: "CRITICAL", estimatedCompletionWeeks: 20 },
    { id: "pw-03", roleName: "Cloud Engineer", description: "Multi-tenant cloud infrastructure, Kubernetes, Terraform, zero-trust security.", requiredSkillIds: ["sk-003", "sk-005"], recommendedModules: ["CLOUD-ENT-403", "SEC-NET-404"], recommendedCertifications: ["CKA Kubernetes Administrator", "AWS SysOps"], averageSalaryUSD: 50000, marketDemandLevel: "HIGH", estimatedCompletionWeeks: 16 },
  ];

  static getPathways(): CareerPathway[] {
    return this.pathways;
  }
}
