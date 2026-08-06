export interface RenewalOpportunity {
  id: string;
  institutionName: string;
  contractEndDate: string;
  currentARRUSD: number;
  renewalProbabilityPercent: number;
  expansionTargetARRUSD: number;
  status: "UPCOMING" | "IN_TALKS" | "RENEWED";
}

export class RenewalManagementService {
  static getUpcomingRenewals(): RenewalOpportunity[] {
    return [
      { id: "ren-01", institutionName: "Kenyatta University Digital Campus", contractEndDate: "2027-03-31", currentARRUSD: 185000, renewalProbabilityPercent: 98, expansionTargetARRUSD: 240000, status: "UPCOMING" },
      { id: "ren-02", institutionName: "Pan-African Tech Institute", contractEndDate: "2026-12-15", currentARRUSD: 120000, renewalProbabilityPercent: 92, expansionTargetARRUSD: 160000, status: "IN_TALKS" },
    ];
  }
}
