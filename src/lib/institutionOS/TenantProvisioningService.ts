/**
 * TenantProvisioningService.ts
 * InstitutionOS v4.0 — Institution Onboarding & Provisioning Engine
 */

import type { Tenant, TenantType, SubscriptionTier } from "@/types/tenant";

export type ProvisioningStep =
  | "institution_details"
  | "brand_identity"
  | "academic_structure"
  | "administrator"
  | "domain"
  | "subscription"
  | "review"
  | "finish";

export interface ProvisioningWizardState {
  currentStep: ProvisioningStep;
  completedSteps: ProvisioningStep[];
  institutionDetails?: { name: string; legalName: string; type: TenantType; country: string; region: string; timezone: string };
  brandIdentity?: { primaryColor: string; logoUrl: string; tagline: string; shortName: string };
  academicStructure?: { cohortCycleWeeks: number; defaultProgrammeDurationWeeks: number; semestersPerYear: number };
  administrator?: { name: string; email: string; title: string };
  domain?: { subdomain: string; customDomain?: string };
  subscription?: { tier: SubscriptionTier };
}

export interface ProvisioningResult {
  success: boolean;
  tenantId?: string;
  slug?: string;
  message: string;
}

export class TenantProvisioningService {
  public static getWizardSteps(): { step: ProvisioningStep; label: string; icon: string; description: string }[] {
    return [
      { step: "institution_details", label: "Institution Details", icon: "🏛", description: "Name, type, country, and region" },
      { step: "brand_identity", label: "Brand Identity", icon: "🎨", description: "Logo, colours, and tagline" },
      { step: "academic_structure", label: "Academic Structure", icon: "📚", description: "Programme length and cohort cycle" },
      { step: "administrator", label: "Administrator", icon: "👤", description: "Primary admin account" },
      { step: "domain", label: "Domain", icon: "🌐", description: "Platform subdomain and custom domain" },
      { step: "subscription", label: "Subscription", icon: "💳", description: "Choose licensing tier" },
      { step: "review", label: "Review", icon: "✅", description: "Confirm all settings" },
      { step: "finish", label: "Launch", icon: "🚀", description: "Provision the institution" },
    ];
  }

  public static getSubscriptionTiers(): { tier: SubscriptionTier; name: string; priceUSD: number; features: string[] }[] {
    return [
      { tier: "starter", name: "Starter", priceUSD: 299, features: ["Up to 50 learners", "LMS & Credentials", "Email support", "Shared infrastructure"] },
      { tier: "professional", name: "Professional", priceUSD: 799, features: ["Up to 500 learners", "AI Assistant", "Employer Portal", "Priority support", "Custom domain"] },
      { tier: "enterprise", name: "Enterprise", priceUSD: 2499, features: ["Unlimited learners", "Full platform access", "White labelling", "SSO integration", "Dedicated SLA", "API access"] },
      { tier: "unlimited", name: "Unlimited", priceUSD: 0, features: ["Bespoke pricing", "Multi-region deployment", "Custom AI models", "Full source access", "Dedicated infrastructure"] },
    ];
  }

  public static simulateProvision(state: ProvisioningWizardState): ProvisioningResult {
    if (!state.institutionDetails?.name) {
      return { success: false, message: "Institution name is required." };
    }
    const slug = state.institutionDetails.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const tenantId = `tenant_${slug}_${Date.now()}`;
    return { success: true, tenantId, slug, message: `Institution "${state.institutionDetails.name}" provisioned successfully.` };
  }
}
