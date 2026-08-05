/**
 * TenantSettingsService.ts
 * InstitutionOS v4.0 — Multi-Tenant Settings Resolver
 */

import { TenantService } from "./TenantService";
import type { TenantSettings, AISettings, PaymentSettings, SecuritySettings } from "@/types/tenant";

export class TenantSettingsService {
  public static getAll(tenantId: string): TenantSettings {
    return TenantService.getSettings(tenantId);
  }

  public static getAISettings(tenantId: string): AISettings {
    return this.getAll(tenantId).ai;
  }

  public static getPaymentSettings(tenantId: string): PaymentSettings {
    return this.getAll(tenantId).payments;
  }

  public static getSecuritySettings(tenantId: string): SecuritySettings {
    return this.getAll(tenantId).security;
  }

  public static getAcademicCalendar(tenantId: string) {
    return this.getAll(tenantId).academicCalendar;
  }

  public static getCertificateSettings(tenantId: string) {
    return this.getAll(tenantId).certificates;
  }

  public static isPaymentsEnabled(tenantId: string): boolean {
    return this.getPaymentSettings(tenantId).provider !== "none";
  }

  public static isSmsEnabled(tenantId: string): boolean {
    return this.getAll(tenantId).sms.enabled;
  }

  public static isMfaRequired(tenantId: string): boolean {
    return this.getSecuritySettings(tenantId).mfaRequired;
  }
}
