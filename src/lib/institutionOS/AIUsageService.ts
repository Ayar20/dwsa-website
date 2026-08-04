/**
 * AIUsageService.ts
 * InstitutionOS AI Operating Layer — Rate Limiting, Token Tracking & Usage Quota Management
 */

export interface RoleUsageQuota {
  role: string;
  monthlyTokenLimit: number;
  tokensUsed: number;
  monthlyQueryLimit: number;
  queriesUsed: number;
}

const mockQuotas: Record<string, RoleUsageQuota> = {
  Student: { role: "Student", monthlyTokenLimit: 500000, tokensUsed: 142000, monthlyQueryLimit: 500, queriesUsed: 184 },
  Faculty: { role: "Faculty", monthlyTokenLimit: 1500000, tokensUsed: 420000, monthlyQueryLimit: 1500, queriesUsed: 412 },
  Admin: { role: "Admin", monthlyTokenLimit: 5000000, tokensUsed: 980000, monthlyQueryLimit: 5000, queriesUsed: 780 },
};

export class AIUsageService {
  public static getQuotaForRole(role: string): RoleUsageQuota {
    return mockQuotas[role] || { role, monthlyTokenLimit: 500000, tokensUsed: 50000, monthlyQueryLimit: 500, queriesUsed: 50 };
  }

  public static recordUsage(role: string, userId: string, tokens: number): void {
    const quota = mockQuotas[role];
    if (quota) {
      quota.tokensUsed += tokens;
      quota.queriesUsed += 1;
    }
  }
}
