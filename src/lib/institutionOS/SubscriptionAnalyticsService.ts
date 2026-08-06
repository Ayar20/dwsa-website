/**
 * SubscriptionAnalyticsService.ts
 * InstitutionOS v4.1 — Subscription Analytics & MRR Revenue Management
 */

import { SubscriptionService } from "./SubscriptionService";
import { TenantService } from "./TenantService";

export interface SubscriptionRecord {
  tenantId: string;
  tenantName: string;
  tier: "starter" | "professional" | "enterprise" | "government";
  status: "active" | "trial" | "past_due" | "canceled";
  monthlyValueUSD: number;
  annualValueUSD: number;
  userCapacity: number;
  currentUsers: number;
  enabledModulesCount: number;
  startDate: string;
  renewalDate: string;
  autoRenew: boolean;
}

const SUBSCRIPTION_RECORDS: SubscriptionRecord[] = [
  {
    tenantId: "tenant_dta_001",
    tenantName: "Digital Technology Academy",
    tier: "enterprise",
    status: "active",
    monthlyValueUSD: 2499,
    annualValueUSD: 24990,
    userCapacity: 10000,
    currentUsers: 1180,
    enabledModulesCount: 9,
    startDate: "2024-02-01",
    renewalDate: "2027-02-01",
    autoRenew: true,
  },
  {
    tenantId: "tenant_unilag_002",
    tenantName: "UNILAG Tech Academy",
    tier: "professional",
    status: "trial",
    monthlyValueUSD: 799,
    annualValueUSD: 7990,
    userCapacity: 500,
    currentUsers: 52,
    enabledModulesCount: 6,
    startDate: "2026-07-01",
    renewalDate: "2026-09-01",
    autoRenew: true,
  },
  {
    tenantId: "tenant_zenith_003",
    tenantName: "Zenith Corporate Academy",
    tier: "starter",
    status: "active",
    monthlyValueUSD: 299,
    annualValueUSD: 2990,
    userCapacity: 50,
    currentUsers: 15,
    enabledModulesCount: 4,
    startDate: "2026-08-01",
    renewalDate: "2027-08-01",
    autoRenew: true,
  },
];

export class SubscriptionAnalyticsService {
  public static getAllSubscriptions(): SubscriptionRecord[] {
    return [...SUBSCRIPTION_RECORDS];
  }

  public static getMetrics() {
    const subs = SUBSCRIPTION_RECORDS;
    const mrr = subs.reduce((sum, s) => sum + s.monthlyValueUSD, 0);
    const arr = mrr * 12;
    const activeCount = subs.filter((s) => s.status === "active").length;
    const trialCount = subs.filter((s) => s.status === "trial").length;

    return {
      totalMRR: mrr,
      totalARR: arr,
      activeSubscriptions: activeCount,
      trialSubscriptions: trialCount,
      averageRevenuePerUser: Math.round(mrr / subs.length),
      tierBreakdown: {
        starter: subs.filter((s) => s.tier === "starter").length,
        professional: subs.filter((s) => s.tier === "professional").length,
        enterprise: subs.filter((s) => s.tier === "enterprise").length,
        government: subs.filter((s) => s.tier === "government").length,
      },
    };
  }
}
