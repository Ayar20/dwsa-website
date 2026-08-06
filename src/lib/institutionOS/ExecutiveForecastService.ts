export interface ExecutiveForecast {
  quarter: string;
  totalPipelineValueUSD: number;
  weightedForecastUSD: number;
  bestCaseUSD: number;
  committedUSD: number;
  closedWonUSD: number;
  quarterlyTargetUSD: number;
  attainmentPercent: number;
  newLogosTarget: number;
  newLogosAchieved: number;
  expansionRevenueUSD: number;
  renewalRevenueUSD: number;
}

export class ExecutiveForecastService {
  static getCurrentForecast(): ExecutiveForecast {
    return {
      quarter: "Q3 2026",
      totalPipelineValueUSD: 8500000,
      weightedForecastUSD: 4250000,
      bestCaseUSD: 5800000,
      committedUSD: 2890000,
      closedWonUSD: 1870000,
      quarterlyTargetUSD: 3200000,
      attainmentPercent: 58,
      newLogosTarget: 8,
      newLogosAchieved: 3,
      expansionRevenueUSD: 420000,
      renewalRevenueUSD: 305000,
    };
  }

  static getQuarterlyTrend(): { quarter: string; revenueUSD: number; dealsWon: number }[] {
    return [
      { quarter: "Q1 2025", revenueUSD: 680000, dealsWon: 3 },
      { quarter: "Q2 2025", revenueUSD: 920000, dealsWon: 4 },
      { quarter: "Q3 2025", revenueUSD: 1250000, dealsWon: 5 },
      { quarter: "Q4 2025", revenueUSD: 1800000, dealsWon: 7 },
      { quarter: "Q1 2026", revenueUSD: 2100000, dealsWon: 6 },
      { quarter: "Q2 2026", revenueUSD: 2650000, dealsWon: 8 },
      { quarter: "Q3 2026 (Projected)", revenueUSD: 3200000, dealsWon: 8 },
    ];
  }
}
