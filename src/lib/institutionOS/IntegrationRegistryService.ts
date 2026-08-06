export interface IntegrationDefinition {
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
  status: "connected" | "disconnected" | "available" | "error";
  syncFrequency: string;
  lastSync?: string;
  healthScore: number;
}

export interface TenantIntegrationBinding {
  tenantId: string;
  integrationId: string;
  enabled: boolean;
  apiKeyConfigured: boolean;
  webhookConfigured: boolean;
  lastSyncAt?: string;
  status: "active" | "paused" | "error";
}

export class IntegrationRegistryService {
  private static integrations: IntegrationDefinition[] = [
    {
      id: "gov-student-registry",
      name: "National Student Registry (NIN / NUC)",
      category: "government",
      version: "v2.1",
      publisher: "Federal Ministry of Education",
      description: "Direct verification of national identity numbers (NIN) and central matriculation registry sync.",
      icon: "ShieldCheck",
      requiredPermissions: ["identity.verify", "student.registry.read", "student.registry.write"],
      supportedTier: "enterprise",
      dependencies: [],
      status: "connected",
      syncFrequency: "Real-time",
      lastSync: "5 mins ago",
      healthScore: 98,
    },
    {
      id: "gov-accreditation",
      name: "National Accreditation & Quality Assurance",
      category: "government",
      version: "v1.4",
      publisher: "National Universities Commission",
      description: "Automated curriculum compliance reporting and degree program accreditation status verification.",
      icon: "FileCheck",
      requiredPermissions: ["accreditation.read", "reports.export"],
      supportedTier: "enterprise",
      dependencies: ["gov-student-registry"],
      status: "connected",
      syncFrequency: "Daily at 00:00",
      lastSync: "3 hours ago",
      healthScore: 95,
    },
    {
      id: "ent-m365",
      name: "Microsoft 365 & Azure AD",
      category: "enterprise",
      version: "v3.0",
      publisher: "Microsoft",
      description: "Single Sign-On, Outlook Calendar sync, and institutional email provisioning.",
      icon: "Mail",
      requiredPermissions: ["user.read", "calendar.sync", "mail.send"],
      supportedTier: "all",
      dependencies: [],
      status: "connected",
      syncFrequency: "Every 15 mins",
      lastSync: "2 mins ago",
      healthScore: 100,
    },
    {
      id: "ent-google-workspace",
      name: "Google Workspace for Education",
      category: "enterprise",
      version: "v3.2",
      publisher: "Google Cloud",
      description: "Google Classroom sync, Google Drive document vault, and OAuth 2.0 authentication.",
      icon: "Globe",
      requiredPermissions: ["drive.readonly", "classroom.courses", "userinfo.email"],
      supportedTier: "all",
      dependencies: [],
      status: "connected",
      syncFrequency: "Every 10 mins",
      lastSync: "4 mins ago",
      healthScore: 99,
    },
    {
      id: "lms-moodle",
      name: "Moodle Enterprise Bridge",
      category: "learning",
      version: "v4.1",
      publisher: "Moodle HQ / DWSA",
      description: "Bi-directional gradebook sync, SCORM 1.2/2004 package import, and xAPI statement streaming.",
      icon: "BookOpen",
      requiredPermissions: ["moodle.gradebook", "scorm.import", "xapi.stream"],
      supportedTier: "growth",
      dependencies: [],
      status: "connected",
      syncFrequency: "Every 30 mins",
      lastSync: "12 mins ago",
      healthScore: 92,
    },
    {
      id: "lms-canvas",
      name: "Canvas LMS Connector",
      category: "learning",
      version: "v2.0",
      publisher: "Instructure",
      description: "LTI 1.3 Advantage deep linking, assignments sync, and automated enrollment roster mapping.",
      icon: "Layers",
      requiredPermissions: ["canvas.lti", "canvas.roster"],
      supportedTier: "enterprise",
      dependencies: [],
      status: "available",
      syncFrequency: "On Demand",
      healthScore: 90,
    },
    {
      id: "comm-zoom",
      name: "Zoom Video Communications",
      category: "communication",
      version: "v2.5",
      publisher: "Zoom Video Communications",
      description: "Automated virtual classroom scheduling, attendance recording, and cloud recording archiving.",
      icon: "Video",
      requiredPermissions: ["meeting.create", "recording.read", "report.read"],
      supportedTier: "all",
      dependencies: [],
      status: "connected",
      syncFrequency: "Real-time",
      lastSync: "1 min ago",
      healthScore: 97,
    },
    {
      id: "comm-teams",
      name: "Microsoft Teams Education",
      category: "communication",
      version: "v2.1",
      publisher: "Microsoft",
      description: "Cohort channel auto-creation, live class broadcasting, and instant faculty messaging.",
      icon: "Users",
      requiredPermissions: ["team.create", "chat.send"],
      supportedTier: "growth",
      dependencies: ["ent-m365"],
      status: "connected",
      syncFrequency: "Every 15 mins",
      lastSync: "8 mins ago",
      healthScore: 96,
    },
    {
      id: "pay-paystack",
      name: "Paystack Gateway Hub",
      category: "payments",
      version: "v4.0",
      publisher: "Paystack / Stripe",
      description: "Card payments, Bank Transfer, USSD, Apple Pay, and automated tuition installment reconciliation.",
      icon: "CreditCard",
      requiredPermissions: ["transaction.initialize", "webhook.receive", "payout.verify"],
      supportedTier: "all",
      dependencies: [],
      status: "connected",
      syncFrequency: "Webhook Instant",
      lastSync: "Just now",
      healthScore: 100,
    },
    {
      id: "pay-flutterwave",
      name: "Flutterwave Pan-African Payments",
      category: "payments",
      version: "v3.1",
      publisher: "Flutterwave",
      description: "Multi-currency tuition collection across 34 African nations, Mobile Money, and FX settlement.",
      icon: "DollarSign",
      requiredPermissions: ["charge.create", "transfer.verify"],
      supportedTier: "growth",
      dependencies: [],
      status: "connected",
      syncFrequency: "Webhook Instant",
      lastSync: "15 mins ago",
      healthScore: 94,
    },
    {
      id: "pay-stripe",
      name: "Stripe International Billing",
      category: "payments",
      version: "v3.0",
      publisher: "Stripe",
      description: "Global student tuition billing, recurring SEPA/ACH debits, and international credit cards.",
      icon: "CreditCard",
      requiredPermissions: ["stripe.customers", "stripe.invoices"],
      supportedTier: "enterprise",
      dependencies: [],
      status: "available",
      syncFrequency: "Webhook Instant",
      healthScore: 99,
    },
  ];

  static getAllIntegrations(): IntegrationDefinition[] {
    return this.integrations;
  }

  static getIntegrationsByCategory(category: IntegrationDefinition["category"]): IntegrationDefinition[] {
    return this.integrations.filter((i) => i.category === category);
  }

  static getIntegrationById(id: string): IntegrationDefinition | undefined {
    return this.integrations.find((i) => i.id === id);
  }

  static getTenantBindings(tenantId: string): TenantIntegrationBinding[] {
    return this.integrations.map((i) => ({
      tenantId,
      integrationId: i.id,
      enabled: i.status === "connected",
      apiKeyConfigured: true,
      webhookConfigured: i.category === "payments" || i.category === "communication",
      lastSyncAt: i.lastSync,
      status: i.status === "error" ? "error" : i.status === "connected" ? "active" : "paused",
    }));
  }
}
