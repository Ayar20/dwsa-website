/**
 * BrandAssetService.ts
 * InstitutionOS v4.0 — Brand Asset Repository & Management
 */

export interface BrandAsset {
  id: string;
  tenantId: string;
  name: string;
  type: "logo" | "logomark" | "favicon" | "cover" | "email_banner" | "certificate_seal" | "social_meta";
  url: string;
  sizeKB: number;
  format: string;
  uploadedAt: string;
}

const MOCK_ASSETS: BrandAsset[] = [
  { id: "BA-001", tenantId: "tenant_dta_001", name: "DTA Primary Logo", type: "logo", url: "/logo.png", sizeKB: 48, format: "PNG", uploadedAt: "2024-02-01" },
  { id: "BA-002", tenantId: "tenant_dta_001", name: "DTA Logomark", type: "logomark", url: "/logomark.png", sizeKB: 22, format: "PNG", uploadedAt: "2024-02-01" },
  { id: "BA-003", tenantId: "tenant_dta_001", name: "DTA Favicon", type: "favicon", url: "/favicon.ico", sizeKB: 4, format: "ICO", uploadedAt: "2024-02-01" },
  { id: "BA-004", tenantId: "tenant_dta_001", name: "DTA Campus Hero", type: "cover", url: "/campus-hero.jpg", sizeKB: 420, format: "JPEG", uploadedAt: "2024-03-15" },
  { id: "BA-005", tenantId: "tenant_dta_001", name: "DTA Certificate Seal", type: "certificate_seal", url: "/certificate-seal.png", sizeKB: 110, format: "PNG", uploadedAt: "2024-02-10" },
];

export class BrandAssetService {
  public static getAssetsForTenant(tenantId: string): BrandAsset[] {
    return MOCK_ASSETS.filter((a) => a.tenantId === tenantId);
  }

  public static getAssetByType(tenantId: string, type: BrandAsset["type"]): BrandAsset | undefined {
    return MOCK_ASSETS.find((a) => a.tenantId === tenantId && a.type === type);
  }

  public static getTotalStorageKB(tenantId: string): number {
    return this.getAssetsForTenant(tenantId).reduce((sum, a) => sum + a.sizeKB, 0);
  }
}
