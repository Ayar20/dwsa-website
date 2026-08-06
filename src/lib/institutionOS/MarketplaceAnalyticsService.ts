export interface MarketplaceGlobalStats {
  totalExtensionsCount: number;
  totalAIAgentsCount: number;
  totalActiveInstallations: number;
  totalDevelopersCount: number;
  overallCSAT: number;
}

export class MarketplaceAnalyticsService {
  static getGlobalStats(): MarketplaceGlobalStats {
    return {
      totalExtensionsCount: 48,
      totalAIAgentsCount: 12,
      totalActiveInstallations: 8420,
      totalDevelopersCount: 34,
      overallCSAT: 4.88,
    };
  }
}
