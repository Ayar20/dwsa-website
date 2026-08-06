export interface RevenueSplitSummary {
  developerEarningsUSD: number;
  platformCommissionUSD: number;
  grossMarketplaceVolumeUSD: number;
  activePaidSubscriptions: number;
  pendingPayoutsUSD: number;
}

export class MarketplaceRevenueService {
  static getRevenueSummary(): RevenueSplitSummary {
    return {
      developerEarningsUSD: 384200,
      platformCommissionUSD: 96050,
      grossMarketplaceVolumeUSD: 480250,
      activePaidSubscriptions: 420,
      pendingPayoutsUSD: 34200,
    };
  }
}
