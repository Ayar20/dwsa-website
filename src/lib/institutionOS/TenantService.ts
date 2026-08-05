/**
 * TenantService.ts
 * InstitutionOS v4.0 — Core Tenant Registry, Resolver, and Metadata Engine
 * Tenant-agnostic: resolves active tenant context for all platform services
 */

import type {
  Tenant, TenantBrand, TenantTheme, TenantFeatures, TenantSettings,
} from "@/types/tenant";

// ─── DTA Flagship Tenant (Tenant One) ─────────────────────────────────────────

const DTA_TENANT: Tenant = {
  id: "tenant_dta_001",
  slug: "dta",
  name: "Digital Technology Academy",
  legalName: "Digital World Systems Africa Ltd",
  type: "academy",
  status: "active",
  tier: "enterprise",
  country: "Nigeria",
  region: "West Africa",
  timezone: "Africa/Lagos",
  locale: "en-NG",
  createdAt: "2024-01-15T00:00:00Z",
  activatedAt: "2024-02-01T00:00:00Z",
  adminUserId: "usr_admin_dta_001",
  domains: [
    { id: "dom_001", tenantId: "tenant_dta_001", domain: "dwsa-academy.vercel.app", isPrimary: true, isVerified: true, sslEnabled: true, verifiedAt: "2024-02-01T00:00:00Z" },
    { id: "dom_002", tenantId: "tenant_dta_001", domain: "academy.dwsa.africa", isPrimary: false, isVerified: true, sslEnabled: true, verifiedAt: "2024-03-10T00:00:00Z" },
  ],
  brand: {
    institutionName: "Digital Technology Academy",
    shortName: "DTA",
    tagline: "Africa's Premier Digital Engineering Academy",
    logoUrl: "/logo.png",
    logomarkUrl: "/logomark.png",
    faviconUrl: "/favicon.ico",
    coverImageUrl: "/campus-hero.jpg",
    primaryColor: "#d4a017",
    secondaryColor: "#4ade80",
    accentColor: "#f0c040",
    neutralColor: "#030e1f",
    fontFamily: "Inter, Outfit, sans-serif",
    emailBannerUrl: "/email-banner.png",
    certificateSealUrl: "/certificate-seal.png",
    socialMetaImageUrl: "/og-image.png",
    emailFromName: "Digital Technology Academy",
    emailFromAddress: "noreply@dwsa.africa",
  },
  theme: {
    mode: "dark",
    tokens: {
      colorBackground: "#030e1f",
      colorSurface: "#060f21",
      colorBorder: "rgba(212,160,23,0.2)",
      colorPrimary: "#d4a017",
      colorSecondary: "#4ade80",
      colorAccent: "#f0c040",
      colorTextPrimary: "#f0f4ff",
      colorTextSecondary: "#aab4c4",
      colorTextMuted: "#6b7a94",
      radiusCard: "12px",
      radiusButton: "8px",
      shadowCard: "0 4px 24px rgba(0,0,0,0.4)",
    },
  },
  settings: {
    general: { contactEmail: "hello@dwsa.africa", contactPhone: "+234 800 000 0000", websiteUrl: "https://dwsa.africa", supportUrl: "https://dwsa.africa/support", privacyPolicyUrl: "https://dwsa.africa/privacy", termsUrl: "https://dwsa.africa/terms", defaultLanguage: "en", maxStudentsPerCohort: 30, allowSelfRegistration: false },
    admissions: { applicationFormEnabled: true, requireApplicationFee: false, applicationFeeAmount: 0, autoApproveApplications: false, minimumAgeRequirement: 18, requireDocumentUpload: true },
    payments: { provider: "paystack", currency: "NGN", publicKey: process.env.NEXT_PUBLIC_PAYSTACK_KEY ?? "", webhookEnabled: true, taxRate: 0, invoicingEnabled: true },
    academicCalendar: { academicYearStart: "01-15", academicYearEnd: "12-20", semestersPerYear: 2, cohortCycleWeeks: 24, defaultProgrammeDurationWeeks: 48 },
    certificates: { signatoryName: "Dr. Adaeze Okonkwo", signatoryTitle: "Executive Director, DWSA", includeQRCode: true, includeBlockchainHash: true, templateId: "cert_template_dta_v2", autoIssueOnCompletion: false },
    email: { provider: "sendgrid", fromName: "Digital Technology Academy", fromAddress: "noreply@dwsa.africa", replyTo: "hello@dwsa.africa", transactionalEnabled: true, marketingEnabled: true },
    sms: { provider: "termii", enabled: true, senderName: "DWSA" },
    ai: { provider: "google", modelId: "gemini-2.0-flash", enableStudentAI: true, enableFacultyAI: true, enableAdminAI: true, monthlyTokenLimit: 5000000, knowledgeBaseEnabled: true },
    notifications: { inAppEnabled: true, emailEnabled: true, smsEnabled: true, pushEnabled: true },
    security: { mfaRequired: false, sessionTimeoutMinutes: 480, allowedIpRanges: [], ssoEnabled: false, passwordMinLength: 8, enforcePasswordExpiry: false, passwordExpiryDays: 90 },
  },
  features: {
    lmsEnabled: true, credentialsEnabled: true, employerPortalEnabled: true, alumniNetworkEnabled: true,
    mentorPlatformEnabled: true, innovationMarketplaceEnabled: true, aiAssistantEnabled: true,
    githubIntegrationEnabled: true, paystackPaymentsEnabled: true, multiCurrencyEnabled: false,
    advancedAnalyticsEnabled: true, whiteLabelling: false, customDomainEnabled: true,
    ssoEnabled: false, apiAccessEnabled: true,
  },
};

// ─── Demo Tenant Registry ──────────────────────────────────────────────────────

const TENANT_REGISTRY: Tenant[] = [
  DTA_TENANT,
  {
    id: "tenant_unilag_002",
    slug: "unilag-tech",
    name: "University of Lagos Tech Academy",
    legalName: "University of Lagos",
    type: "university",
    status: "trial",
    tier: "professional",
    country: "Nigeria",
    region: "West Africa",
    timezone: "Africa/Lagos",
    locale: "en-NG",
    createdAt: "2026-07-01T00:00:00Z",
    trialEndsAt: "2026-09-01T00:00:00Z",
    adminUserId: "usr_admin_unilag_001",
    domains: [
      { id: "dom_010", tenantId: "tenant_unilag_002", domain: "tech.unilag.edu.ng", isPrimary: true, isVerified: false, sslEnabled: false },
    ],
    brand: {
      institutionName: "UNILAG Tech Academy",
      shortName: "UTA",
      tagline: "Excellence in Technology Education",
      logoUrl: "/tenants/unilag/logo.png",
      logomarkUrl: "/tenants/unilag/logomark.png",
      faviconUrl: "/tenants/unilag/favicon.ico",
      coverImageUrl: "/tenants/unilag/cover.jpg",
      primaryColor: "#1a56db",
      secondaryColor: "#16a34a",
      accentColor: "#3b82f6",
      neutralColor: "#0f172a",
      fontFamily: "Inter, sans-serif",
      emailBannerUrl: "/tenants/unilag/email-banner.png",
      certificateSealUrl: "/tenants/unilag/seal.png",
      socialMetaImageUrl: "/tenants/unilag/og.png",
      emailFromName: "UNILAG Tech Academy",
      emailFromAddress: "noreply@unilag.edu.ng",
    },
    theme: {
      mode: "dark",
      tokens: {
        colorBackground: "#0f172a", colorSurface: "#1e293b", colorBorder: "rgba(59,130,246,0.2)",
        colorPrimary: "#3b82f6", colorSecondary: "#16a34a", colorAccent: "#60a5fa",
        colorTextPrimary: "#f8fafc", colorTextSecondary: "#94a3b8", colorTextMuted: "#64748b",
        radiusCard: "12px", radiusButton: "8px", shadowCard: "0 4px 24px rgba(0,0,0,0.4)",
      },
    },
    settings: {
      general: { contactEmail: "admin@unilag.edu.ng", contactPhone: "+234 700 000 0001", websiteUrl: "https://unilag.edu.ng", supportUrl: "https://unilag.edu.ng/support", privacyPolicyUrl: "https://unilag.edu.ng/privacy", termsUrl: "https://unilag.edu.ng/terms", defaultLanguage: "en", maxStudentsPerCohort: 60, allowSelfRegistration: true },
      admissions: { applicationFormEnabled: true, requireApplicationFee: true, applicationFeeAmount: 5000, autoApproveApplications: false, minimumAgeRequirement: 16, requireDocumentUpload: true },
      payments: { provider: "paystack", currency: "NGN", publicKey: "", webhookEnabled: false, taxRate: 0, invoicingEnabled: false },
      academicCalendar: { academicYearStart: "09-01", academicYearEnd: "06-30", semestersPerYear: 2, cohortCycleWeeks: 36, defaultProgrammeDurationWeeks: 72 },
      certificates: { signatoryName: "Prof. Tokunbo Ayinde", signatoryTitle: "Vice Chancellor, UNILAG", includeQRCode: true, includeBlockchainHash: false, templateId: "cert_template_unilag_v1", autoIssueOnCompletion: false },
      email: { provider: "sendgrid", fromName: "UNILAG Tech Academy", fromAddress: "noreply@unilag.edu.ng", replyTo: "admin@unilag.edu.ng", transactionalEnabled: true, marketingEnabled: false },
      sms: { provider: "none", enabled: false, senderName: "UNILAG" },
      ai: { provider: "openai", modelId: "gpt-4o", enableStudentAI: true, enableFacultyAI: true, enableAdminAI: false, monthlyTokenLimit: 1000000, knowledgeBaseEnabled: false },
      notifications: { inAppEnabled: true, emailEnabled: true, smsEnabled: false, pushEnabled: false },
      security: { mfaRequired: true, sessionTimeoutMinutes: 240, allowedIpRanges: [], ssoEnabled: false, passwordMinLength: 10, enforcePasswordExpiry: true, passwordExpiryDays: 60 },
    },
    features: {
      lmsEnabled: true, credentialsEnabled: true, employerPortalEnabled: false, alumniNetworkEnabled: false,
      mentorPlatformEnabled: false, innovationMarketplaceEnabled: false, aiAssistantEnabled: true,
      githubIntegrationEnabled: false, paystackPaymentsEnabled: true, multiCurrencyEnabled: false,
      advancedAnalyticsEnabled: false, whiteLabelling: false, customDomainEnabled: false,
      ssoEnabled: false, apiAccessEnabled: false,
    },
  },
  {
    id: "tenant_zenith_003",
    slug: "zenith-academy",
    name: "Zenith Corporate Academy",
    legalName: "Zenith Bank Plc",
    type: "corporate",
    status: "provisioning",
    tier: "starter",
    country: "Nigeria",
    region: "West Africa",
    timezone: "Africa/Lagos",
    locale: "en-NG",
    createdAt: "2026-08-01T00:00:00Z",
    adminUserId: "usr_admin_zenith_001",
    domains: [],
    brand: {
      institutionName: "Zenith Corporate Academy",
      shortName: "ZCA",
      tagline: "Building Tomorrow's Banking Leaders",
      logoUrl: "/tenants/zenith/logo.png",
      logomarkUrl: "/tenants/zenith/logomark.png",
      faviconUrl: "/tenants/zenith/favicon.ico",
      coverImageUrl: "/tenants/zenith/cover.jpg",
      primaryColor: "#dc2626",
      secondaryColor: "#f59e0b",
      accentColor: "#ef4444",
      neutralColor: "#1c1917",
      fontFamily: "Outfit, sans-serif",
      emailBannerUrl: "/tenants/zenith/email-banner.png",
      certificateSealUrl: "/tenants/zenith/seal.png",
      socialMetaImageUrl: "/tenants/zenith/og.png",
      emailFromName: "Zenith Corporate Academy",
      emailFromAddress: "noreply@zenithbank.com",
    },
    theme: {
      mode: "dark",
      tokens: {
        colorBackground: "#1c1917", colorSurface: "#292524", colorBorder: "rgba(220,38,38,0.2)",
        colorPrimary: "#dc2626", colorSecondary: "#f59e0b", colorAccent: "#ef4444",
        colorTextPrimary: "#fafaf9", colorTextSecondary: "#a8a29e", colorTextMuted: "#78716c",
        radiusCard: "10px", radiusButton: "6px", shadowCard: "0 4px 24px rgba(0,0,0,0.5)",
      },
    },
    settings: {
      general: { contactEmail: "academy@zenithbank.com", contactPhone: "+234 700 000 0002", websiteUrl: "https://zenithbank.com", supportUrl: "https://zenithbank.com/support", privacyPolicyUrl: "https://zenithbank.com/privacy", termsUrl: "https://zenithbank.com/terms", defaultLanguage: "en", maxStudentsPerCohort: 20, allowSelfRegistration: false },
      admissions: { applicationFormEnabled: false, requireApplicationFee: false, applicationFeeAmount: 0, autoApproveApplications: true, minimumAgeRequirement: 21, requireDocumentUpload: false },
      payments: { provider: "none", currency: "NGN", publicKey: "", webhookEnabled: false, taxRate: 0, invoicingEnabled: true },
      academicCalendar: { academicYearStart: "01-01", academicYearEnd: "12-31", semestersPerYear: 4, cohortCycleWeeks: 12, defaultProgrammeDurationWeeks: 24 },
      certificates: { signatoryName: "Dr. Ebenezer Onyeagwu", signatoryTitle: "Group MD/CEO, Zenith Bank", includeQRCode: true, includeBlockchainHash: true, templateId: "cert_template_zenith_v1", autoIssueOnCompletion: true },
      email: { provider: "sendgrid", fromName: "Zenith Academy", fromAddress: "noreply@zenithbank.com", replyTo: "academy@zenithbank.com", transactionalEnabled: true, marketingEnabled: false },
      sms: { provider: "twilio", enabled: true, senderName: "ZenithAcad" },
      ai: { provider: "azure", modelId: "gpt-4o", enableStudentAI: true, enableFacultyAI: true, enableAdminAI: true, monthlyTokenLimit: 2000000, knowledgeBaseEnabled: true },
      notifications: { inAppEnabled: true, emailEnabled: true, smsEnabled: true, pushEnabled: false },
      security: { mfaRequired: true, sessionTimeoutMinutes: 120, allowedIpRanges: ["197.210.0.0/16"], ssoEnabled: true, ssoProvider: "azure-ad", passwordMinLength: 12, enforcePasswordExpiry: true, passwordExpiryDays: 30 },
    },
    features: {
      lmsEnabled: true, credentialsEnabled: true, employerPortalEnabled: false, alumniNetworkEnabled: false,
      mentorPlatformEnabled: true, innovationMarketplaceEnabled: false, aiAssistantEnabled: true,
      githubIntegrationEnabled: false, paystackPaymentsEnabled: false, multiCurrencyEnabled: false,
      advancedAnalyticsEnabled: true, whiteLabelling: true, customDomainEnabled: true,
      ssoEnabled: true, apiAccessEnabled: true,
    },
  },
];

// ─── TenantService ─────────────────────────────────────────────────────────────

export class TenantService {
  /** Return all registered tenants */
  public static getAllTenants(): Tenant[] {
    return [...TENANT_REGISTRY];
  }

  /** Resolve a tenant by its slug identifier */
  public static getTenantBySlug(slug: string): Tenant | undefined {
    return TENANT_REGISTRY.find((t) => t.slug === slug);
  }

  /** Resolve a tenant by its internal ID */
  public static getTenantById(id: string): Tenant | undefined {
    return TENANT_REGISTRY.find((t) => t.id === id);
  }

  /** Resolve a tenant by custom domain */
  public static getTenantByDomain(domain: string): Tenant | undefined {
    return TENANT_REGISTRY.find((t) =>
      t.domains.some((d) => d.domain === domain)
    );
  }

  /** Return the active/flagship tenant (DTA — Tenant One) */
  public static getActiveTenant(): Tenant {
    return DTA_TENANT;
  }

  /** Resolve branding for a given tenant */
  public static getBrand(tenantId: string): TenantBrand {
    const tenant = this.getTenantById(tenantId);
    return tenant?.brand ?? DTA_TENANT.brand;
  }

  /** Resolve theme tokens for a given tenant */
  public static getTheme(tenantId: string): TenantTheme {
    const tenant = this.getTenantById(tenantId);
    return tenant?.theme ?? DTA_TENANT.theme;
  }

  /** Resolve feature flags for a given tenant */
  public static getFeatures(tenantId: string): TenantFeatures {
    const tenant = this.getTenantById(tenantId);
    return tenant?.features ?? DTA_TENANT.features;
  }

  /** Resolve settings for a given tenant */
  public static getSettings(tenantId: string): TenantSettings {
    const tenant = this.getTenantById(tenantId);
    return tenant?.settings ?? DTA_TENANT.settings;
  }

  /** Check if a specific feature flag is enabled for a tenant */
  public static isFeatureEnabled(tenantId: string, feature: keyof TenantFeatures): boolean {
    const features = this.getFeatures(tenantId);
    return !!features[feature];
  }

  /** Return tenants by status */
  public static getTenantsByStatus(status: Tenant["status"]): Tenant[] {
    return TENANT_REGISTRY.filter((t) => t.status === status);
  }

  /** Return tenants by subscription tier */
  public static getTenantsByTier(tier: Tenant["tier"]): Tenant[] {
    return TENANT_REGISTRY.filter((t) => t.tier === tier);
  }

  /** Registry summary for platform metrics */
  public static getRegistrySummary() {
    const all = TENANT_REGISTRY;
    return {
      total: all.length,
      active: all.filter((t) => t.status === "active").length,
      trial: all.filter((t) => t.status === "trial").length,
      provisioning: all.filter((t) => t.status === "provisioning").length,
      suspended: all.filter((t) => t.status === "suspended").length,
      enterprise: all.filter((t) => t.tier === "enterprise").length,
      professional: all.filter((t) => t.tier === "professional").length,
      starter: all.filter((t) => t.tier === "starter").length,
    };
  }
}
