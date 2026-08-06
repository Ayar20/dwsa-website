export interface FinancialPayoutLedger {
  id: string;
  developerOrgName: string;
  grossAmountUSD: number;
  developerPayoutUSD: number;
  platformFeeUSD: number;
  payoutDate: string;
  status: "PAID" | "PENDING" | "PROCESSING";
}

export class MarketplaceFinanceService {
  static getPayoutLedger(): FinancialPayoutLedger[] {
    return [
      { id: "pay-101", developerOrgName: "CampuSoft Africa Ltd", grossAmountUSD: 14200, developerPayoutUSD: 11360, platformFeeUSD: 2840, payoutDate: "2026-07-31", status: "PAID" },
      { id: "pay-102", developerOrgName: "HealthTech Solutions Labs", grossAmountUSD: 8900, developerPayoutUSD: 7120, platformFeeUSD: 1780, payoutDate: "2026-07-31", status: "PAID" },
      { id: "pay-103", developerOrgName: "OpenLib Systems", grossAmountUSD: 5400, developerPayoutUSD: 4320, platformFeeUSD: 1080, payoutDate: "2026-08-31", status: "PENDING" },
    ];
  }
}
