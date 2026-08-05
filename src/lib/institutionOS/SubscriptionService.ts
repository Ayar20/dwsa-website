/**
 * SubscriptionService.ts
 * InstitutionOS v4.0 — SaaS Subscription & Billing Plan Engine
 */

import { TenantService } from "./TenantService";
import type { SubscriptionTier } from "@/types/tenant";

export interface SubscriptionPlanDetails {
  tier: SubscriptionTier;
  name: string;
  monthlyUSD: number;
  annualUSD: number;
  maxLearners: number;
  maxFaculty: number;
  aiCreditsMonthly: number;
  storageLimitGB: number;
  customDomainIncluded: boolean;
  whiteLabelIncluded: boolean;
  ssoIncluded: boolean;
  dedicatedSLA: boolean;
  features: string[];
}

const PLAN_CATALOG: Record<SubscriptionTier, SubscriptionPlanDetails> = {
  starter: {
    tier: "starter",
    name: "Starter Academy",
    monthlyUSD: 299,
    annualUSD: 2990,
    maxLearners: 50,
    maxFaculty: 5,
    aiCreditsMonthly: 100000,
    storageLimitGB: 20,
    customDomainIncluded: false,
    whiteLabelIncluded: false,
    ssoIncluded: false,
    dedicatedSLA: false,
    features: ["LMS Core", "Digital Credentials", "Standard Support", "Shared Infrastructure"],
  },
  professional: {
    tier: "professional",
    name: "Professional Institution",
    monthlyUSD: 799,
    annualUSD: 7990,
    maxLearners: 500,
    maxFaculty: 25,
    aiCreditsMonthly: 1000000,
    storageLimitGB: 100,
    customDomainIncluded: true,
    whiteLabelIncluded: false,
    ssoIncluded: false,
    dedicatedSLA: false,
    features: ["LMS Core", "Credentials Platform", "AI Assistant", "Employer Portal", "Custom Domain", "Priority Support"],
  },
  enterprise: {
    tier: "enterprise",
    name: "Enterprise University",
    monthlyUSD: 2499,
    annualUSD: 24990,
    maxLearners: 10000,
    maxFaculty: 500,
    aiCreditsMonthly: 5000000,
    storageLimitGB: 1000,
    customDomainIncluded: true,
    whiteLabelIncluded: true,
    ssoIncluded: true,
    dedicatedSLA: true,
    features: ["Full Platform Access", "White-Labeling", "SSO Integration", "Dedicated SLA", "Custom AI Models", "API Access"],
  },
  unlimited: {
    tier: "unlimited",
    name: "Government & Sovereign Platform",
    monthlyUSD: 0,
    annualUSD: 0,
    maxLearners: 999999,
    maxFaculty: 5000,
    aiCreditsMonthly: 50000000,
    storageLimitGB: 10000,
    customDomainIncluded: true,
    whiteLabelIncluded: true,
    ssoIncluded: true,
    dedicatedSLA: true,
    features: ["Bespoke Sovereign Deployment", "Multi-Region Cloud", "Dedicated Infrastructure", "Unlimited Scale", "Custom Engineering"],
  },
};

export class SubscriptionService {
  public static getCatalog(): SubscriptionPlanDetails[] {
    return Object.values(PLAN_CATALOG);
  }

  public static getPlanDetails(tier: SubscriptionTier): SubscriptionPlanDetails {
    return PLAN_CATALOG[tier] ?? PLAN_CATALOG.starter;
  }

  public static getSubscriptionForTenant(tenantId: string) {
    const tenant = TenantService.getTenantById(tenantId);
    if (!tenant) return null;
    const plan = this.getPlanDetails(tenant.tier);
    return {
      tenantId,
      tenantName: tenant.name,
      plan,
      status: tenant.status,
      createdAt: tenant.createdAt,
      trialEndsAt: tenant.trialEndsAt,
    };
  }
}
