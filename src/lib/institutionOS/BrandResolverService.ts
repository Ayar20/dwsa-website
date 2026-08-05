/**
 * BrandResolverService.ts
 * InstitutionOS v4.0 — Institution Brand Resolution Engine
 */

import { TenantService } from "./TenantService";
import type { TenantBrand } from "@/types/tenant";

export interface ResolvedBrand extends TenantBrand {
  cssVariables: Record<string, string>;
  metaTags: { name: string; content: string }[];
}

export class BrandResolverService {
  public static resolve(tenantId: string): ResolvedBrand {
    const brand = TenantService.getBrand(tenantId);

    const cssVariables: Record<string, string> = {
      "--color-primary": brand.primaryColor,
      "--color-secondary": brand.secondaryColor,
      "--color-accent": brand.accentColor,
      "--color-neutral": brand.neutralColor,
      "--font-family-base": brand.fontFamily,
    };

    const metaTags = [
      { name: "og:site_name", content: brand.institutionName },
      { name: "og:image", content: brand.socialMetaImageUrl },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: brand.socialMetaImageUrl },
      { name: "description", content: brand.tagline },
    ];

    return { ...brand, cssVariables, metaTags };
  }

  public static getInstitutionName(tenantId: string): string {
    return TenantService.getBrand(tenantId).institutionName;
  }

  public static getLogoUrl(tenantId: string): string {
    return TenantService.getBrand(tenantId).logoUrl;
  }

  public static getPrimaryColor(tenantId: string): string {
    return TenantService.getBrand(tenantId).primaryColor;
  }

  public static getCertificateSealUrl(tenantId: string): string {
    return TenantService.getBrand(tenantId).certificateSealUrl;
  }

  public static getEmailBrandingConfig(tenantId: string) {
    const brand = TenantService.getBrand(tenantId);
    return {
      fromName: brand.emailFromName,
      fromAddress: brand.emailFromAddress,
      bannerUrl: brand.emailBannerUrl,
      primaryColor: brand.primaryColor,
    };
  }
}
