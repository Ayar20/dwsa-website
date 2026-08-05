/**
 * UsageAnalyticsService.ts
 * InstitutionOS v4.0 — Platform Usage & Consumption Analytics
 */

export interface DailyUsageRecord {
  date: string;
  activeSessions: number;
  aiRequests: number;
  apiCalls: number;
  certificatesIssued: number;
  newEnrolments: number;
}

export interface TenantActivityRecord {
  tenantId: string;
  tenantName: string;
  lastActivityAt: string;
  dau: number;         // Daily Active Users
  mau: number;         // Monthly Active Users
  aiTokensUsed: number;
  storageGB: number;
  apiCallsToday: number;
}

export class UsageAnalyticsService {
  public static getDailyUsageSeries(): DailyUsageRecord[] {
    return [
      { date: "Jul 30", activeSessions: 38, aiRequests: 14200, apiCalls: 18900, certificatesIssued: 4, newEnrolments: 2 },
      { date: "Jul 31", activeSessions: 44, aiRequests: 16800, apiCalls: 21400, certificatesIssued: 6, newEnrolments: 3 },
      { date: "Aug 01", activeSessions: 51, aiRequests: 19100, apiCalls: 24200, certificatesIssued: 8, newEnrolments: 5 },
      { date: "Aug 02", activeSessions: 47, aiRequests: 17500, apiCalls: 22100, certificatesIssued: 5, newEnrolments: 1 },
      { date: "Aug 03", activeSessions: 55, aiRequests: 21300, apiCalls: 26800, certificatesIssued: 9, newEnrolments: 7 },
      { date: "Aug 04", activeSessions: 49, aiRequests: 18900, apiCalls: 23500, certificatesIssued: 7, newEnrolments: 4 },
      { date: "Aug 05", activeSessions: 47, aiRequests: 17640, apiCalls: 24891, certificatesIssued: 3, newEnrolments: 2 },
    ];
  }

  public static getTenantActivity(): TenantActivityRecord[] {
    return [
      { tenantId: "tenant_dta_001", tenantName: "Digital Technology Academy", lastActivityAt: "2026-08-05T00:02:18Z", dau: 44, mau: 1180, aiTokensUsed: 4210000, storageGB: 118, apiCallsToday: 23450 },
      { tenantId: "tenant_unilag_002", tenantName: "UNILAG Tech Academy", lastActivityAt: "2026-08-04T18:30:00Z", dau: 3, mau: 52, aiTokensUsed: 180000, storageGB: 18, apiCallsToday: 1241 },
      { tenantId: "tenant_zenith_003", tenantName: "Zenith Corporate Academy", lastActivityAt: "2026-08-04T09:15:00Z", dau: 0, mau: 15, aiTokensUsed: 92140, storageGB: 6, apiCallsToday: 200 },
    ];
  }

  public static getPlatformDAU(): number {
    return this.getTenantActivity().reduce((sum, t) => sum + t.dau, 0);
  }

  public static getPlatformMAU(): number {
    return this.getTenantActivity().reduce((sum, t) => sum + t.mau, 0);
  }
}
