/**
 * FeatureFlagService.ts
 * InstitutionOS v4.0 — Multi-Tenant Feature Flag & Module Entitlement Engine
 * Controls module access (Admissions, LMS, Credentials, AI, Research, Innovation, Marketplace, etc.) per tenant.
 */

import { TenantService } from "./TenantService";
import type { TenantFeatures } from "@/types/tenant";

export class FeatureFlagService {
  public static getFeaturesForTenant(tenantId: string): TenantFeatures {
    return TenantService.getFeatures(tenantId);
  }

  public static isEnabled(tenantId: string, feature: keyof TenantFeatures): boolean {
    return TenantService.isFeatureEnabled(tenantId, feature);
  }

  public static getEnabledModuleList(tenantId: string): string[] {
    const features = this.getFeaturesForTenant(tenantId);
    return (Object.keys(features) as (keyof TenantFeatures)[])
      .filter((k) => features[k])
      .map((k) => k.replace(/([A-Z])/g, " $1").trim());
  }

  public static getComparisonMatrix() {
    const tenants = TenantService.getAllTenants();
    const sampleFeatures = tenants[0]?.features ?? {};
    const featureKeys = Object.keys(sampleFeatures) as (keyof TenantFeatures)[];

    return featureKeys.map((key) => {
      const row: Record<string, boolean | string> = { featureKey: key, featureName: key.replace(/([A-Z])/g, " $1").trim() };
      tenants.forEach((t) => {
        row[t.id] = t.features[key] ?? false;
      });
      return row;
    });
  }
}
