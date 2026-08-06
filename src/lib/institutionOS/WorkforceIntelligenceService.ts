export interface LabourMarketTrend {
  skillOrRole: string;
  category: string;
  demandGrowthPercent: number;
  averageSalaryUSD: number;
  openPostingsCount: number;
  topHiringRegions: string[];
  demandStatus: "CRITICAL_SHORTAGE" | "HIGH_GROWTH" | "STABLE";
}

export class WorkforceIntelligenceService {
  private static trends: LabourMarketTrend[] = [
    { skillOrRole: "AI Agent Engineers", category: "Artificial Intelligence", demandGrowthPercent: 142, averageSalaryUSD: 65000, openPostingsCount: 1840, topHiringRegions: ["Lagos", "Nairobi", "Johannesburg", "Accra", "Kigali"], demandStatus: "CRITICAL_SHORTAGE" },
    { skillOrRole: "Full-Stack TypeScript / Next.js Architect", category: "Software Engineering", demandGrowthPercent: 88, averageSalaryUSD: 48000, openPostingsCount: 3200, topHiringRegions: ["Lagos", "Nairobi", "Cape Town", "Cairo"], demandStatus: "HIGH_GROWTH" },
    { skillOrRole: "Fintech Compliance & Payment Specialist", category: "Financial Technology", demandGrowthPercent: 95, averageSalaryUSD: 52000, openPostingsCount: 1150, topHiringRegions: ["Lagos", "Accra", "Nairobi"], demandStatus: "HIGH_GROWTH" },
    { skillOrRole: "Cloud Security & Zero Trust Architect", category: "Cybersecurity", demandGrowthPercent: 110, averageSalaryUSD: 58000, openPostingsCount: 980, topHiringRegions: ["Johannesburg", "Lagos", "Nairobi"], demandStatus: "CRITICAL_SHORTAGE" },
  ];

  static getTrends(): LabourMarketTrend[] {
    return this.trends;
  }
}
