export interface LicenseModel {
  type: "Free" | "Paid" | "Subscription" | "Institution" | "Enterprise";
  monthlyPriceUSD: number;
  annualPriceUSD: number;
  includedSeats: number;
}

export class MarketplaceBillingService {
  static getLicenseModel(extensionId: string): LicenseModel {
    return {
      type: "Subscription",
      monthlyPriceUSD: 49,
      annualPriceUSD: 490,
      includedSeats: 5000,
    };
  }
}
