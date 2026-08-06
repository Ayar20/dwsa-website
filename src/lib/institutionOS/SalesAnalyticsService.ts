export interface SalesKPI {
  metricName: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  trend: "UP" | "DOWN" | "STABLE";
  changePercent: number;
}

export class SalesAnalyticsService {
  static getKPIs(): SalesKPI[] {
    return [
      { metricName: "Annual Recurring Revenue (ARR)", currentValue: 4850000, targetValue: 6000000, unit: "USD", trend: "UP", changePercent: 32 },
      { metricName: "Average Deal Size", currentValue: 265000, targetValue: 300000, unit: "USD", trend: "UP", changePercent: 18 },
      { metricName: "Sales Cycle Length", currentValue: 94, targetValue: 75, unit: "days", trend: "DOWN", changePercent: -12 },
      { metricName: "Win Rate", currentValue: 68, targetValue: 75, unit: "%", trend: "UP", changePercent: 8 },
      { metricName: "Customer Acquisition Cost (CAC)", currentValue: 18500, targetValue: 15000, unit: "USD", trend: "DOWN", changePercent: -15 },
      { metricName: "Net Revenue Retention", currentValue: 118, targetValue: 120, unit: "%", trend: "UP", changePercent: 6 },
      { metricName: "Pipeline Coverage Ratio", currentValue: 3.2, targetValue: 3.5, unit: "x", trend: "STABLE", changePercent: 2 },
      { metricName: "Customer Lifetime Value (LTV)", currentValue: 890000, targetValue: 1000000, unit: "USD", trend: "UP", changePercent: 22 },
    ];
  }
}
