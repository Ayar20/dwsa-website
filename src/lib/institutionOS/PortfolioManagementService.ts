export interface PortfolioInstitution {
  id: string;
  institutionName: string;
  country: string;
  deployedVersion: string;
  totalStudents: number;
  totalFaculty: number;
  monthlyActiveUsers: number;
  arrUSD: number;
  healthScore: number;
  npsScore: number;
  lastCheckIn: string;
}

export class PortfolioManagementService {
  static getPortfolio(): PortfolioInstitution[] {
    return [
      { id: "pf-01", institutionName: "Digital Technology Academy (DTA)", country: "Nigeria", deployedVersion: "v4.4A", totalStudents: 2400, totalFaculty: 185, monthlyActiveUsers: 2100, arrUSD: 180000, healthScore: 98, npsScore: 92, lastCheckIn: "2026-08-04" },
      { id: "pf-02", institutionName: "Kenyatta University Digital Campus", country: "Kenya", deployedVersion: "v4.3A", totalStudents: 48000, totalFaculty: 2200, monthlyActiveUsers: 38000, arrUSD: 185000, healthScore: 94, npsScore: 88, lastCheckIn: "2026-08-03" },
      { id: "pf-03", institutionName: "Pan-African Tech Institute", country: "Rwanda", deployedVersion: "v4.2", totalStudents: 6500, totalFaculty: 420, monthlyActiveUsers: 5200, arrUSD: 120000, healthScore: 91, npsScore: 85, lastCheckIn: "2026-08-01" },
    ];
  }

  static getPortfolioSummary() {
    const portfolio = this.getPortfolio();
    return {
      totalInstitutions: portfolio.length,
      totalStudents: portfolio.reduce((s, p) => s + p.totalStudents, 0),
      totalFaculty: portfolio.reduce((s, p) => s + p.totalFaculty, 0),
      totalARRUSD: portfolio.reduce((s, p) => s + p.arrUSD, 0),
      averageHealthScore: Math.round(portfolio.reduce((s, p) => s + p.healthScore, 0) / portfolio.length),
      averageNPS: Math.round(portfolio.reduce((s, p) => s + p.npsScore, 0) / portfolio.length),
    };
  }
}
