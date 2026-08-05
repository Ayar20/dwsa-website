/**
 * tenant.ts
 * InstitutionOS v4.0 — Multi-Tenant Type Definitions
 * Tenant-agnostic interfaces for the Enterprise Platform Foundation
 */

export type TenantType = "university" | "polytechnic" | "college" | "academy" | "corporate" | "government";
export type TenantStatus = "active" | "suspended" | "provisioning" | "trial" | "expired";
export type SubscriptionTier = "starter" | "professional" | "enterprise" | "unlimited";
export type ThemeMode = "dark" | "light" | "institution";

// ─── Core Tenant ──────────────────────────────────────────────────────────────

export interface Tenant {
  id: string;
  slug: string;                        // URL-safe identifier e.g. "dta", "unilag"
  name: string;                        // Display name e.g. "Digital Technology Academy"
  legalName: string;                   // Legal entity name
  type: TenantType;
  status: TenantStatus;
  tier: SubscriptionTier;
  country: string;
  region: string;
  timezone: string;
  locale: string;
  createdAt: string;
  activatedAt?: string;
  trialEndsAt?: string;
  domains: TenantDomain[];
  brand: TenantBrand;
  theme: TenantTheme;
  settings: TenantSettings;
  features: TenantFeatures;
  adminUserId: string;
}

// ─── Brand ────────────────────────────────────────────────────────────────────

export interface TenantBrand {
  institutionName: string;
  shortName: string;                   // Abbreviated name e.g. "DTA"
  tagline: string;
  logoUrl: string;
  logomarkUrl: string;                 // Icon/square version of logo
  faviconUrl: string;
  coverImageUrl: string;
  primaryColor: string;               // Hex e.g. "#d4a017"
  secondaryColor: string;
  accentColor: string;
  neutralColor: string;
  fontFamily: string;                  // e.g. "Inter, Outfit, sans-serif"
  emailBannerUrl: string;
  certificateSealUrl: string;
  socialMetaImageUrl: string;
  emailFromName: string;
  emailFromAddress: string;
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export interface TenantTheme {
  mode: ThemeMode;
  tokens: ThemeTokens;
}

export interface ThemeTokens {
  colorBackground: string;
  colorSurface: string;
  colorBorder: string;
  colorPrimary: string;
  colorSecondary: string;
  colorAccent: string;
  colorTextPrimary: string;
  colorTextSecondary: string;
  colorTextMuted: string;
  radiusCard: string;
  radiusButton: string;
  shadowCard: string;
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export interface TenantSettings {
  general: GeneralSettings;
  admissions: AdmissionsSettings;
  payments: PaymentSettings;
  academicCalendar: AcademicCalendarSettings;
  certificates: CertificateSettings;
  email: EmailSettings;
  sms: SmsSettings;
  ai: AISettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
}

export interface GeneralSettings {
  contactEmail: string;
  contactPhone: string;
  websiteUrl: string;
  supportUrl: string;
  privacyPolicyUrl: string;
  termsUrl: string;
  defaultLanguage: string;
  maxStudentsPerCohort: number;
  allowSelfRegistration: boolean;
}

export interface AdmissionsSettings {
  applicationFormEnabled: boolean;
  requireApplicationFee: boolean;
  applicationFeeAmount: number;
  autoApproveApplications: boolean;
  minimumAgeRequirement: number;
  requireDocumentUpload: boolean;
}

export interface PaymentSettings {
  provider: "paystack" | "stripe" | "flutterwave" | "none";
  currency: string;
  publicKey: string;
  webhookEnabled: boolean;
  taxRate: number;
  invoicingEnabled: boolean;
}

export interface AcademicCalendarSettings {
  academicYearStart: string;           // MM-DD
  academicYearEnd: string;
  semestersPerYear: number;
  cohortCycleWeeks: number;
  defaultProgrammeDurationWeeks: number;
}

export interface CertificateSettings {
  signatoryName: string;
  signatoryTitle: string;
  includeQRCode: boolean;
  includeBlockchainHash: boolean;
  templateId: string;
  autoIssueOnCompletion: boolean;
}

export interface EmailSettings {
  provider: "sendgrid" | "mailgun" | "ses" | "smtp" | "resend";
  fromName: string;
  fromAddress: string;
  replyTo: string;
  transactionalEnabled: boolean;
  marketingEnabled: boolean;
}

export interface SmsSettings {
  provider: "twilio" | "termii" | "africastalking" | "none";
  enabled: boolean;
  senderName: string;
}

export interface AISettings {
  provider: "google" | "openai" | "anthropic" | "azure" | "custom";
  modelId: string;
  enableStudentAI: boolean;
  enableFacultyAI: boolean;
  enableAdminAI: boolean;
  monthlyTokenLimit: number;
  knowledgeBaseEnabled: boolean;
  customSystemPrompt?: string;
}

export interface NotificationSettings {
  inAppEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  slackWebhookUrl?: string;
}

export interface SecuritySettings {
  mfaRequired: boolean;
  sessionTimeoutMinutes: number;
  allowedIpRanges: string[];
  ssoEnabled: boolean;
  ssoProvider?: string;
  passwordMinLength: number;
  enforcePasswordExpiry: boolean;
  passwordExpiryDays: number;
}

// ─── Features ─────────────────────────────────────────────────────────────────

export interface TenantFeatures {
  lmsEnabled: boolean;
  credentialsEnabled: boolean;
  employerPortalEnabled: boolean;
  alumniNetworkEnabled: boolean;
  mentorPlatformEnabled: boolean;
  innovationMarketplaceEnabled: boolean;
  aiAssistantEnabled: boolean;
  githubIntegrationEnabled: boolean;
  paystackPaymentsEnabled: boolean;
  multiCurrencyEnabled: boolean;
  advancedAnalyticsEnabled: boolean;
  whiteLabelling: boolean;
  customDomainEnabled: boolean;
  ssoEnabled: boolean;
  apiAccessEnabled: boolean;
}

// ─── Domains ──────────────────────────────────────────────────────────────────

export interface TenantDomain {
  id: string;
  tenantId: string;
  domain: string;                      // e.g. "academy.university.edu.ng"
  isPrimary: boolean;
  isVerified: boolean;
  sslEnabled: boolean;
  verifiedAt?: string;
}
