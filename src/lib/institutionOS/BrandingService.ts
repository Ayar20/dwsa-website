/**
 * BrandingService.ts
 * InstitutionOS v4.0 — Enterprise White-Label Branding Engine
 * Reusable wrapper providing full white-label brand resolution per tenant.
 */

import { BrandResolverService } from "./BrandResolverService";
import { TenantService } from "./TenantService";
import type { TenantBrand } from "@/types/tenant";

export interface WhiteLabelConfig {
  institutionName: string;
  shortName: string;
  logoUrl: string;
  logomarkUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  neutralColor: string;
  fontFamily: string;
  cssVariables: Record<string, string>;
  footerText: string;
  supportEmail: string;
  privacyPolicyUrl: string;
  termsUrl: string;
}

export class BrandingService {
  public static resolveWhiteLabel(tenantId: string): WhiteLabelConfig {
    const brand = TenantService.getBrand(tenantId);
    const settings = TenantService.getSettings(tenantId);
    const resolved = BrandResolverService.resolve(tenantId);

    return {
      institutionName: brand.institutionName,
      shortName: brand.shortName,
      logoUrl: brand.logoUrl,
      logomarkUrl: brand.logomarkUrl,
      faviconUrl: brand.faviconUrl,
      primaryColor: brand.primaryColor,
      secondaryColor: brand.secondaryColor,
      accentColor: brand.accentColor,
      neutralColor: brand.neutralColor,
      fontFamily: brand.fontFamily,
      cssVariables: resolved.cssVariables,
      footerText: `© ${new Date().getFullYear()} ${brand.institutionName}. Powered by InstitutionOS.`,
      supportEmail: settings.general.contactEmail,
      privacyPolicyUrl: settings.general.privacyPolicyUrl,
      termsUrl: settings.general.termsUrl,
    };
  }

  public static getBrand(tenantId: string): TenantBrand {
    return TenantService.getBrand(tenantId);
  }
}
