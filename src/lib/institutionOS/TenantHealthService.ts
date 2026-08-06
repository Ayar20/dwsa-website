/**
 * TenantHealthService.ts
 * InstitutionOS v4.1 — Enterprise Tenant Health & Adoption Monitoring Service
 */

export interface DetailedTenantHealth {
  tenantId: string;
  tenantName: string;
  adoptionRatePercent: number;
  activeUsersDAU: number;
  learningActivityScore: number; // 0 - 100
  facultyActivityScore: number; // 0 - 100
  systemUsagePercent: number;
  aiTokensConsumedThisMonth: number;
  supportIndicator: "green" | "amber" | "red";
  lastPingTimestamp: string;
}

const HEALTH_MONITORS: DetailedTenantHealth[] = [
  {
    tenantId: "tenant_dta_001",
    tenantName: "Digital Technology Academy",
    adoptionRatePercent: 94,
    activeUsersDAU: 44,
    learningActivityScore: 98,
    facultyActivityScore: 96,
    systemUsagePercent: 82,
    aiTokensConsumedThisMonth: 4210000,
    supportIndicator: "green",
    lastPingTimestamp: "2026-08-05T12:40:00Z",
  },
  {
    tenantId: "tenant_unilag_002",
    tenantName: "UNILAG Tech Academy",
    adoptionRatePercent: 78,
    activeUsersDAU: 3,
    learningActivityScore: 82,
    facultyActivityScore: 85,
    systemUsagePercent: 35,
    aiTokensConsumedThisMonth: 180000,
    supportIndicator: "green",
    lastPingTimestamp: "2026-08-04T18:30:00Z",
  },
  {
    tenantId: "tenant_zenith_003",
    tenantName: "Zenith Corporate Academy",
    adoptionRatePercent: 52,
    activeUsersDAU: 0,
    learningActivityScore: 60,
    facultyActivityScore: 70,
    systemUsagePercent: 18,
    aiTokensConsumedThisMonth: 92140,
    supportIndicator: "amber",
    lastPingTimestamp: "2026-08-04T09:15:00Z",
  },
];

export class TenantHealthService {
  public static getAllHealthMonitors(): DetailedTenantHealth[] {
    return [...HEALTH_MONITORS];
  }

  public static getHealthForTenant(tenantId: string): DetailedTenantHealth | undefined {
    return HEALTH_MONITORS.find((h) => h.tenantId === tenantId);
  }

  public static getSystemAverageHealth(): number {
    const monitors = HEALTH_MONITORS;
    return Math.round(
      monitors.reduce((sum, h) => sum + (h.learningActivityScore + h.facultyActivityScore) / 2, 0) /
        monitors.length
    );
  }
}
