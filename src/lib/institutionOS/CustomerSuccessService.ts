/**
 * CustomerSuccessService.ts
 * InstitutionOS v4.1 — Enterprise Customer Success & Relationship Management
 */

export interface CustomerAccount {
  id: string;
  tenantId: string;
  institutionName: string;
  accountOwner: string;
  accountOwnerEmail: string;
  tier: "starter" | "professional" | "enterprise" | "government";
  implementationProgressPercent: number; // 0 - 100
  supportStatus: "green" | "yellow" | "red"; // health indicator
  openTickets: number;
  usageScore: number; // 0 - 100
  growthOpportunity: string;
  contractRenewalDate: string;
  monthlyValueUSD: number;
}

const CUSTOMER_ACCOUNTS: CustomerAccount[] = [
  {
    id: "cust_001",
    tenantId: "tenant_dta_001",
    institutionName: "Digital Technology Academy",
    accountOwner: "Kofi Annan Jr.",
    accountOwnerEmail: "kofi.success@dwsa.africa",
    tier: "enterprise",
    implementationProgressPercent: 100,
    supportStatus: "green",
    openTickets: 0,
    usageScore: 98,
    growthOpportunity: "Expansion to 5,000 corporate seats for West Africa tech hubs",
    contractRenewalDate: "2027-02-01",
    monthlyValueUSD: 2499,
  },
  {
    id: "cust_002",
    tenantId: "tenant_unilag_002",
    institutionName: "UNILAG Tech Academy",
    accountOwner: "Amina Bello",
    accountOwnerEmail: "amina.success@dwsa.africa",
    tier: "professional",
    implementationProgressPercent: 85,
    supportStatus: "green",
    openTickets: 1,
    usageScore: 84,
    growthOpportunity: "Upgrade to Enterprise tier for Faculty AI Studio add-on",
    contractRenewalDate: "2026-09-01",
    monthlyValueUSD: 799,
  },
  {
    id: "cust_003",
    tenantId: "tenant_zenith_003",
    institutionName: "Zenith Corporate Academy",
    accountOwner: "Tunde Ednut",
    accountOwnerEmail: "tunde.success@dwsa.africa",
    tier: "starter",
    implementationProgressPercent: 45,
    supportStatus: "yellow",
    openTickets: 3,
    usageScore: 68,
    growthOpportunity: "Full onboarding completion & custom domain verification",
    contractRenewalDate: "2026-11-01",
    monthlyValueUSD: 299,
  },
];

export class CustomerSuccessService {
  public static getAllAccounts(): CustomerAccount[] {
    return [...CUSTOMER_ACCOUNTS];
  }

  public static getAccountByTenantId(tenantId: string): CustomerAccount | undefined {
    return CUSTOMER_ACCOUNTS.find((a) => a.tenantId === tenantId);
  }

  public static getSummary() {
    const accounts = CUSTOMER_ACCOUNTS;
    const avgUsage = Math.round(
      accounts.reduce((sum, a) => sum + a.usageScore, 0) / accounts.length
    );
    const avgImpl = Math.round(
      accounts.reduce((sum, a) => sum + a.implementationProgressPercent, 0) / accounts.length
    );

    return {
      totalAccounts: accounts.length,
      greenHealthAccounts: accounts.filter((a) => a.supportStatus === "green").length,
      yellowHealthAccounts: accounts.filter((a) => a.supportStatus === "yellow").length,
      redHealthAccounts: accounts.filter((a) => a.supportStatus === "red").length,
      averageUsageScore: avgUsage,
      averageImplementationPercent: avgImpl,
      totalTicketsOpen: accounts.reduce((sum, a) => sum + a.openTickets, 0),
    };
  }
}
