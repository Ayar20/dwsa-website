export interface EnterpriseContract {
  id: string;
  contractNumber: string;
  institutionName: string;
  startDate: string;
  endDate: string;
  annualValueUSD: number;
  slaTier: "99.9% Platinum SLA" | "99.5% Gold SLA" | "Standard SLA";
  status: "ACTIVE" | "RENEWAL_DUE" | "PENDING_SIGNATURE";
}

export class ContractLifecycleService {
  static getContracts(): EnterpriseContract[] {
    return [
      { id: "cnt-01", contractNumber: "DWSA-CTR-2025-014", institutionName: "Kenyatta University Digital Campus", startDate: "2025-04-01", endDate: "2027-03-31", annualValueUSD: 185000, slaTier: "99.9% Platinum SLA", status: "ACTIVE" },
      { id: "cnt-02", contractNumber: "DWSA-CTR-2026-002", institutionName: "Federal University of Technology, Akure", startDate: "2026-08-15", endDate: "2027-08-15", annualValueUSD: 240000, slaTier: "99.9% Platinum SLA", status: "ACTIVE" },
    ];
  }
}
