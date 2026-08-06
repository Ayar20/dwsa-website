export interface EnterpriseQuote {
  id: string;
  quoteNumber: string;
  institutionName: string;
  baseTier: "Starter" | "Growth" | "Enterprise" | "National Campus";
  annualLicenseUSD: number;
  implementationServicesUSD: number;
  customConnectorsUSD: number;
  totalContractValueUSD: number;
  validUntil: string;
}

export class QuoteManagementService {
  static getActiveQuotes(): EnterpriseQuote[] {
    return [
      { id: "q-101", quoteNumber: "DWSA-QT-2026-081", institutionName: "Kwame Nkrumah University (KNUST)", baseTier: "Enterprise", annualLicenseUSD: 180000, implementationServicesUSD: 80000, customConnectorsUSD: 50000, totalContractValueUSD: 310000, validUntil: "2026-09-30" },
      { id: "q-102", quoteNumber: "DWSA-QT-2026-064", institutionName: "University of Johannesburg", baseTier: "National Campus", annualLicenseUSD: 280000, implementationServicesUSD: 90000, customConnectorsUSD: 50000, totalContractValueUSD: 420000, validUntil: "2026-10-15" },
    ];
  }
}
