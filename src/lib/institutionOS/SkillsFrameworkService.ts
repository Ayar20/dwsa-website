export interface SkillTaxonomyCategory {
  id: string;
  name: "Technical Skills" | "Professional Skills" | "Leadership Skills" | "AI Skills" | "Digital Skills" | "Industry Skills" | "Future Skills";
  description: string;
  skillsCount: number;
}

export interface SkillDefinition {
  id: string;
  name: string;
  category: SkillTaxonomyCategory["name"];
  description: string;
  maturityLevels: string[]; // e.g. Novice, Competent, Proficient, Expert, Master
  relatedSkillIds: string[];
}

export class SkillsFrameworkService {
  private static categories: SkillTaxonomyCategory[] = [
    { id: "cat-1", name: "Technical Skills", description: "Software development, architecture, cloud, data engineering, systems", skillsCount: 42 },
    { id: "cat-2", name: "Professional Skills", description: "Communication, critical thinking, problem solving, collaboration", skillsCount: 18 },
    { id: "cat-3", name: "Leadership Skills", description: "Strategic planning, team leadership, decision making, ethics", skillsCount: 14 },
    { id: "cat-4", name: "AI Skills", description: "Prompt engineering, agent orchestration, ML model tuning, AI ethics", skillsCount: 25 },
    { id: "cat-5", name: "Digital Skills", description: "Digital literacy, cyber hygiene, remote collaboration, cloud tools", skillsCount: 16 },
    { id: "cat-6", name: "Industry Skills", description: "Fintech, Edtech, Agritech, Healthtech, Governance compliance", skillsCount: 30 },
    { id: "cat-7", name: "Future Skills", description: "Quantum concepts, autonomous systems design, bio-computing principles", skillsCount: 12 },
  ];

  private static skills: SkillDefinition[] = [
    { id: "sk-001", name: "TypeScript & React Architecture", category: "Technical Skills", description: "Full-stack web application development with modern React ecosystems", maturityLevels: ["Novice", "Competent", "Proficient", "Expert", "Master"], relatedSkillIds: ["sk-002", "sk-004"] },
    { id: "sk-002", name: "AI Agent Orchestration & LLM Prompting", category: "AI Skills", description: "Designing autonomous multi-agent systems and multi-modal workflows", maturityLevels: ["Novice", "Competent", "Proficient", "Expert", "Master"], relatedSkillIds: ["sk-001", "sk-005"] },
    { id: "sk-003", name: "Enterprise System Architecture", category: "Technical Skills", description: "Multi-tenant cloud infrastructure, microservices, database design", maturityLevels: ["Novice", "Competent", "Proficient", "Expert", "Master"], relatedSkillIds: ["sk-001"] },
    { id: "sk-004", name: "Agile Leadership & PR Review", category: "Leadership Skills", description: "Peer code review, technical team guidance, CI/CD pipeline management", maturityLevels: ["Novice", "Competent", "Proficient", "Expert", "Master"], relatedSkillIds: ["sk-001"] },
    { id: "sk-005", name: "Fintech & Payment Integration", category: "Industry Skills", description: "Paystack, Flutterwave, multi-currency processing & PCI compliance", maturityLevels: ["Novice", "Competent", "Proficient", "Expert", "Master"], relatedSkillIds: ["sk-003"] },
  ];

  static getCategories(): SkillTaxonomyCategory[] {
    return this.categories;
  }

  static getSkills(): SkillDefinition[] {
    return this.skills;
  }
}
