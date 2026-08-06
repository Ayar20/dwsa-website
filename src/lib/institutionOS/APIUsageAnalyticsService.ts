export interface APIUsageSummary {
  requestsToday: number;
  requestsThisMonth: number;
  rateLimitExceededCount: number;
  topCallingApp: string;
  p99LatencyMs: number;
}

export class APIUsageAnalyticsService {
  static getUsageSummary(tenantId: string): APIUsageSummary {
    return {
      requestsToday: 48920,
      requestsThisMonth: 1420500,
      rateLimitExceededCount: 4,
      topCallingApp: "DTA Campus Mobile App",
      p99LatencyMs: 82.4,
    };
  }
}
