export interface IntegrationMetrics {
  totalRequests24h: number;
  avgLatencyMs: number;
  errorRatePercentage: number;
  dataThroughputMB24h: number;
  activeConnectorsCount: number;
}

export class IntegrationAnalyticsService {
  static getGlobalMetrics(): IntegrationMetrics {
    return {
      totalRequests24h: 1845200,
      avgLatencyMs: 42.5,
      errorRatePercentage: 0.12,
      dataThroughputMB24h: 8420,
      activeConnectorsCount: 11,
    };
  }
}
