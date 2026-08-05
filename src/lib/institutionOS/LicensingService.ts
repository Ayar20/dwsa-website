/**
 * LicensingService.ts
 * InstitutionOS v4.0 — Multi-Tenant Licensing Service
 * Provides named export aligned with Phase 1 specification.
 */

import { LicenseService, type LicenseRecord } from "./LicenseService";

export class LicensingService {
  public static getAllLicenses(): LicenseRecord[] {
    return LicenseService.getAllLicenses();
  }

  public static getLicenseForTenant(tenantId: string): LicenseRecord | undefined {
    return LicenseService.getLicenseForTenant(tenantId);
  }

  public static getTotalMRR(): number {
    return LicenseService.getTotalMonthlyRecurringRevenueUSD();
  }

  public static isCapacityReached(tenantId: string): boolean {
    return LicenseService.isLearnerLimitReached(tenantId);
  }
}
