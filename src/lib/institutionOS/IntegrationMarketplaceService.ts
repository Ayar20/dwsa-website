export interface MarketplaceConnectorPackage {
  id: string;
  name: string;
  category: "government" | "enterprise" | "learning" | "communication" | "payments" | "storage" | "analytics";
  version: string;
  publisher: string;
  description: string;
  icon: string;
  requiredPermissions: string[];
  supportedTier: "starter" | "growth" | "enterprise" | "all";
  dependencies: string[];
  installStatus: "installed" | "available" | "update_available" | "coming_soon";
  rating: number;
  installCount: number;
}

export class IntegrationMarketplaceService {
  static getPackages(): MarketplaceConnectorPackage[] {
    return [
      { id: "gov-student-registry", name: "National Student Registry (NIN / NUC)", category: "government", version: "v2.1", publisher: "Federal Ministry of Education", description: "Direct verification of national identity numbers (NIN) and central matriculation registry sync.", icon: "ShieldCheck", requiredPermissions: ["identity.verify", "student.registry.read"], supportedTier: "enterprise", dependencies: [], installStatus: "installed", rating: 4.9, installCount: 12 },
      { id: "gov-accreditation", name: "National Accreditation & Quality Assurance", category: "government", version: "v1.4", publisher: "National Universities Commission", description: "Automated curriculum compliance reporting and degree program accreditation status verification.", icon: "FileCheck", requiredPermissions: ["accreditation.read"], supportedTier: "enterprise", dependencies: ["gov-student-registry"], installStatus: "installed", rating: 4.8, installCount: 8 },
      { id: "ent-m365", name: "Microsoft 365 & Azure AD", category: "enterprise", version: "v3.0", publisher: "Microsoft", description: "Single Sign-On, Outlook Calendar sync, and institutional email provisioning.", icon: "Mail", requiredPermissions: ["user.read", "calendar.sync"], supportedTier: "all", dependencies: [], installStatus: "installed", rating: 4.9, installCount: 42 },
      { id: "ent-google-workspace", name: "Google Workspace for Education", category: "enterprise", version: "v3.2", publisher: "Google Cloud", description: "Google Classroom sync, Google Drive document vault, and OAuth 2.0 authentication.", icon: "Globe", requiredPermissions: ["drive.readonly", "classroom.courses"], supportedTier: "all", dependencies: [], installStatus: "installed", rating: 5.0, installCount: 58 },
      { id: "lms-moodle", name: "Moodle Enterprise Bridge", category: "learning", version: "v4.1", publisher: "Moodle HQ / DWSA", description: "Bi-directional gradebook sync, SCORM 1.2/2004 package import, and xAPI statement streaming.", icon: "BookOpen", requiredPermissions: ["moodle.gradebook"], supportedTier: "growth", dependencies: [], installStatus: "installed", rating: 4.7, installCount: 24 },
      { id: "lms-canvas", name: "Canvas LMS Connector", category: "learning", version: "v2.0", publisher: "Instructure", description: "LTI 1.3 Advantage deep linking, assignments sync, and automated enrollment roster mapping.", icon: "Layers", requiredPermissions: ["canvas.lti"], supportedTier: "enterprise", dependencies: [], installStatus: "available", rating: 4.8, installCount: 15 },
      { id: "comm-zoom", name: "Zoom Video Communications", category: "communication", version: "v2.5", publisher: "Zoom Video Communications", description: "Automated virtual classroom scheduling, attendance recording, and cloud recording archiving.", icon: "Video", requiredPermissions: ["meeting.create"], supportedTier: "all", dependencies: [], installStatus: "installed", rating: 4.9, installCount: 65 },
      { id: "pay-paystack", name: "Paystack Gateway Hub", category: "payments", version: "v4.0", publisher: "Paystack / Stripe", description: "Card payments, Bank Transfer, USSD, Apple Pay, and automated tuition installment reconciliation.", icon: "CreditCard", requiredPermissions: ["transaction.initialize"], supportedTier: "all", dependencies: [], installStatus: "installed", rating: 5.0, installCount: 72 },
      { id: "pay-flutterwave", name: "Flutterwave Pan-African Payments", category: "payments", version: "v3.1", publisher: "Flutterwave", description: "Multi-currency tuition collection across 34 African nations, Mobile Money, and FX settlement.", icon: "DollarSign", requiredPermissions: ["charge.create"], supportedTier: "growth", dependencies: [], installStatus: "installed", rating: 4.8, installCount: 38 },
      { id: "stor-s3", name: "AWS S3 / Cloudflare R2 Document Archive", category: "storage", version: "v1.0", publisher: "Amazon Web Services", description: "High-durability document archive for student transcripts, SCORM assets, and video recordings.", icon: "Database", requiredPermissions: ["s3.read", "s3.write"], supportedTier: "growth", dependencies: [], installStatus: "available", rating: 4.9, installCount: 18 },
      { id: "anal-mixpanel", name: "Mixpanel Learner Telemetry", category: "analytics", version: "v1.2", publisher: "Mixpanel", description: "Granular funnel analytics, lesson drop-off tracking, and student engagement cohorts.", icon: "Activity", requiredPermissions: ["events.track"], supportedTier: "enterprise", dependencies: [], installStatus: "available", rating: 4.6, installCount: 9 },
    ];
  }
}
