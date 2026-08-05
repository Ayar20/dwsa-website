/**
 * TenantAnalyticsService.ts
 * InstitutionOS v4.0 — Tenant & Platform-Wide Analytics Engine
 * Provides cross-tenant adoption, health averages, API traffic, and placement analytics.
 */

import { UsageAnalyticsService } from "./UsageAnalyticsService";
import { PlatformMetricsService } from "./PlatformMetricsService";

export interface TenantHealthScore {
  tenantId: string;
  tenantName: string;
  overallScore: number;               // 0 - 100
  adoptionPercent: number;
  activeLearnerRatio: number;
  facultyEngagementScore: number;
  apiHealthScore: number;
  status: "healthy" | "at_risk" | "needs_onboarding";
}

export class TenantAnalyticsService {
  public static getTenantHealthScores(): TenantHealthScore[] {
    return [
      {
        tenantId: "tenant_dta_001",
        tenantName: "Digital Technology Academy",
        overallScore: 98,
        adoptionPercent: 94,
        activeLearnerRatio: 0.92,
        facultyEngagementScore: 96,
        apiHealthScore: 99,
        status: "healthy",
      },
      {
        tenantId: "tenant_unilag_002",
        tenantName: "UNILAG Tech Academy",
        overallScore: 84,
        adoptionPercent: 78,
        activeLearnerRatio: 0.81,
        facultyEngagementScore: 85,
        apiHealthScore: 97,
        status: "healthy",
      },
      {
        tenantId: "tenant_zenith_003",
        tenantName: "Zenith Corporate Academy",
        overallScore: 68,
        adoptionPercent: 52,
        activeLearnerRatio: 0.60,
        facultyEngagementScore: 70,
        apiHealthScore: 98,
        status: "needs_onboarding",
      },
    ];
  }

  public static getPlatformAdoptionSummary() {
    const snapshot = PlatformMetricsService.getSnapshot();
    const healthScores = this.getTenantHealthScores();

    const avgHealth = Math.round(
      healthScores.reduce((sum, h) => sum + h.overallScore, 0) / healthScores.length
    );

    return {
      totalTenants: snapshot.totalInstitutions,
      totalLearners: snapshot.totalLearners,
      totalFaculty: snapshot.totalFaculty,
      certificatesIssued: snapshot.certificatesIssued,
      employmentPlacementRatePercent: 91.4,
      platformAverageHealthScore: avgHealth,
      monthlyAiRequests: snapshot.aiRequestsThisMonth,
      dailyApiCalls: snapshot.apiCallsToday,
    };
  }

  public static getUsageSeries() {
    return UsageAnalyticsService.getDailyUsageSeries();
  }
}
