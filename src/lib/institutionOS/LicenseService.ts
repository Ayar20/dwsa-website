/**
 * LicenseService.ts
 * InstitutionOS v4.0 — Platform Licensing & Entitlement Management
 */

import { TenantService } from "./TenantService";
import type { SubscriptionTier } from "@/types/tenant";

export interface LicenseRecord {
  tenantId: string;
  tenantName: string;
  tier: SubscriptionTier;
  maxLearners: number;
  currentLearners: number;
  expiresAt: string | null;
  isExpired: boolean;
  isTrial: boolean;
  trialDaysRemaining?: number;
  monthlyValueUSD: number;
  features: string[];
}

const TIER_CONFIG: Record<SubscriptionTier, { maxLearners: number; monthlyValueUSD: number; features: string[] }> = {
  starter:      { maxLearners: 50,        monthlyValueUSD: 299,  features: ["LMS", "Credentials", "Email Support"] },
  professional: { maxLearners: 500,       monthlyValueUSD: 799,  features: ["LMS", "Credentials", "AI Assistant", "Employer Portal", "Custom Domain"] },
  enterprise:   { maxLearners: 999999,    monthlyValueUSD: 2499, features: ["Full Platform", "White Label", "SSO", "API Access", "Dedicated SLA"] },
  unlimited:    { maxLearners: 999999999, monthlyValueUSD: 0,    features: ["Bespoke", "Multi-Region", "Custom AI", "Full Source Access"] },
};

export class LicenseService {
  public static getAllLicenses(): LicenseRecord[] {
    return TenantService.getAllTenants().map((tenant) => {
      const config = TIER_CONFIG[tenant.tier];
      const now = new Date();
      const trialEnd = tenant.trialEndsAt ? new Date(tenant.trialEndsAt) : null;
      const trialDaysRemaining = trialEnd ? Math.max(0, Math.ceil((trialEnd.getTime() - now.getTime()) / 86400000)) : undefined;

      return {
        tenantId: tenant.id,
        tenantName: tenant.name,
        tier: tenant.tier,
        maxLearners: config.maxLearners,
        currentLearners: tenant.id === "tenant_dta_001" ? 1180 : tenant.id === "tenant_unilag_002" ? 52 : 15,
        expiresAt: tenant.trialEndsAt ?? null,
        isExpired: trialEnd ? trialEnd < now : false,
        isTrial: tenant.status === "trial",
        trialDaysRemaining,
        monthlyValueUSD: config.monthlyValueUSD,
        features: config.features,
      };
    });
  }

  public static getLicenseForTenant(tenantId: string): LicenseRecord | undefined {
    return this.getAllLicenses().find((l) => l.tenantId === tenantId);
  }

  public static getTotalMonthlyRecurringRevenueUSD(): number {
    return this.getAllLicenses()
      .filter((l) => !l.isTrial && !l.isExpired)
      .reduce((sum, l) => sum + l.monthlyValueUSD, 0);
  }

  public static isLearnerLimitReached(tenantId: string): boolean {
    const license = this.getLicenseForTenant(tenantId);
    if (!license) return true;
    return license.currentLearners >= license.maxLearners;
  }
}
