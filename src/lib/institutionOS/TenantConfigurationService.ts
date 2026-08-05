/**
 * TenantConfigurationService.ts
 * InstitutionOS v4.0 — Tenant Configuration & Preset Engine
 * Manages institutional overrides, configuration cloning, and academic calendar presets.
 */

import { TenantService } from "./TenantService";
import type { TenantSettings, AcademicCalendarSettings, CertificateSettings } from "@/types/tenant";

export interface TenantConfigBundle {
  tenantId: string;
  tenantName: string;
  version: string;
  updatedAt: string;
  settings: TenantSettings;
}

export class TenantConfigurationService {
  public static getConfigBundle(tenantId: string): TenantConfigBundle | null {
    const tenant = TenantService.getTenantById(tenantId);
    if (!tenant) return null;
    return {
      tenantId,
      tenantName: tenant.name,
      version: "4.0.0",
      updatedAt: new Date().toISOString(),
      settings: tenant.settings,
    };
  }

  public static getAcademicCalendar(tenantId: string): AcademicCalendarSettings {
    return TenantService.getSettings(tenantId).academicCalendar;
  }

  public static getCertificateSettings(tenantId: string): CertificateSettings {
    return TenantService.getSettings(tenantId).certificates;
  }

  public static cloneConfiguration(sourceTenantId: string, targetTenantName: string): { success: boolean; message: string; clonedBundle?: TenantConfigBundle } {
    const bundle = this.getConfigBundle(sourceTenantId);
    if (!bundle) {
      return { success: false, message: `Source tenant ${sourceTenantId} not found.` };
    }

    const clonedBundle: TenantConfigBundle = {
      tenantId: `tenant_cloned_${Date.now()}`,
      tenantName: targetTenantName,
      version: "4.0.0",
      updatedAt: new Date().toISOString(),
      settings: JSON.parse(JSON.stringify(bundle.settings)),
    };

    return {
      success: true,
      message: `Configuration cloned successfully from ${bundle.tenantName} for ${targetTenantName}.`,
      clonedBundle,
    };
  }
}
