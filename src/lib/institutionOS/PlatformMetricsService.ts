/**
 * PlatformMetricsService.ts
 * InstitutionOS v4.0 — Enterprise Platform-Wide Metrics Engine
 */

import { TenantService } from "./TenantService";

export interface PlatformMetricSnapshot {
  totalInstitutions: number;
  activeInstitutions: number;
  trialInstitutions: number;
  provisioningInstitutions: number;
  totalLearners: number;
  totalFaculty: number;
  activeCourses: number;
  certificatesIssued: number;
  platformAvailabilityPercent: number;
  aiRequestsThisMonth: number;
  revenueThisMonthUSD: number;
  revenueGrowthPercent: number;
  storageUsedGB: number;
  storageTotalGB: number;
  apiCallsToday: number;
  activeSessionsNow: number;
}

export interface TenantUsageRecord {
  tenantId: string;
  tenantName: string;
  tier: string;
  learners: number;
  faculty: number;
  aiTokensUsed: number;
  storageGB: number;
  certificatesIssued: number;
  lastActiveAt: string;
}

export class PlatformMetricsService {
  public static getSnapshot(): PlatformMetricSnapshot {
    const summary = TenantService.getRegistrySummary();
    return {
      totalInstitutions: summary.total,
      activeInstitutions: summary.active,
      trialInstitutions: summary.trial,
      provisioningInstitutions: summary.provisioning,
      totalLearners: 1_247,
      totalFaculty: 38,
      activeCourses: 14,
      certificatesIssued: 892,
      platformAvailabilityPercent: 99.97,
      aiRequestsThisMonth: 482_140,
      revenueThisMonthUSD: 28_450,
      revenueGrowthPercent: 18.4,
      storageUsedGB: 142,
      storageTotalGB: 500,
      apiCallsToday: 24_891,
      activeSessionsNow: 47,
    };
  }

  public static getTenantUsageBreakdown(): TenantUsageRecord[] {
    return [
      { tenantId: "tenant_dta_001", tenantName: "Digital Technology Academy", tier: "Enterprise", learners: 1180, faculty: 32, aiTokensUsed: 4_210_000, storageGB: 118, certificatesIssued: 847, lastActiveAt: "2026-08-05T00:00:00Z" },
      { tenantId: "tenant_unilag_002", tenantName: "UNILAG Tech Academy", tier: "Professional", learners: 52, faculty: 5, aiTokensUsed: 180_000, storageGB: 18, certificatesIssued: 40, lastActiveAt: "2026-08-04T18:30:00Z" },
      { tenantId: "tenant_zenith_003", tenantName: "Zenith Corporate Academy", tier: "Starter", learners: 15, faculty: 1, aiTokensUsed: 92_140, storageGB: 6, certificatesIssued: 5, lastActiveAt: "2026-08-04T09:15:00Z" },
    ];
  }

  public static getMonthlyRevenueSeries(): { month: string; usd: number }[] {
    return [
      { month: "Mar", usd: 18_200 },
      { month: "Apr", usd: 21_500 },
      { month: "May", usd: 22_800 },
      { month: "Jun", usd: 24_100 },
      { month: "Jul", usd: 26_300 },
      { month: "Aug", usd: 28_450 },
    ];
  }
}
