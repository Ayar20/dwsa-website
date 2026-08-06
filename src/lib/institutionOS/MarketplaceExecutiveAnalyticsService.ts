export interface MarketplaceExecutiveMetrics {
  grossMarketplaceVolumeUSD: number;
  activeDeveloperOrganizations: number;
  certifiedExtensionsRatePercent: number;
  topGrowingCategory: string;
  regionalAdoptionLeader: string;
  extensionCrashRatePercent: number;
}

export class MarketplaceExecutiveAnalyticsService {
  static getExecutiveMetrics(): MarketplaceExecutiveMetrics {
    return {
      grossMarketplaceVolumeUSD: 480250,
      activeDeveloperOrganizations: 34,
      certifiedExtensionsRatePercent: 96.2,
      topGrowingCategory: "Academic & SCORM",
      regionalAdoptionLeader: "West Africa (Nigeria, Ghana, Kenya)",
      extensionCrashRatePercent: 0.02,
    };
  }
}
