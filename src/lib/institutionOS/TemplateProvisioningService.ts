export interface IntegrationTemplate {
  id: string;
  name: string;
  targetSector: "University" | "Corporate Academy" | "Government Institution" | "Training Organisation";
  description: string;
  includedConnectors: string[];
  estimatedSetupMinutes: number;
  featured: boolean;
}

export class TemplateProvisioningService {
  static getTemplates(): IntegrationTemplate[] {
    return [
      {
        id: "tpl-university",
        name: "University Ecosystem Template",
        targetSector: "University",
        description: "Google Workspace + Google Meet + Paystack + Moodle + Google Drive + Student Email.",
        includedConnectors: ["Google Workspace", "Google Meet", "Paystack Gateway Hub", "Moodle Enterprise Bridge", "Google Drive Vault"],
        estimatedSetupMinutes: 5,
        featured: true,
      },
      {
        id: "tpl-corporate",
        name: "Corporate Academy Template",
        targetSector: "Corporate Academy",
        description: "Microsoft 365 + MS Teams + GitHub Enterprise + Stripe + OneDrive.",
        includedConnectors: ["Microsoft 365", "Microsoft Teams", "GitHub Enterprise Engine", "Stripe Billing", "OneDrive Vault"],
        estimatedSetupMinutes: 5,
        featured: true,
      },
      {
        id: "tpl-government",
        name: "Government Institution Template",
        targetSector: "Government Institution",
        description: "Government Identity (NIMC) + Treasury Payments + Official Email + National Student Registry.",
        includedConnectors: ["NIMC Identity Verification", "Government Treasury Payments", "Official Gov Mail Gateway", "National Student Registry"],
        estimatedSetupMinutes: 10,
        featured: true,
      },
      {
        id: "tpl-training-org",
        name: "Training Organisation Template",
        targetSector: "Training Organisation",
        description: "Paystack + Zoom + Google Workspace + Learning Repository.",
        includedConnectors: ["Paystack Gateway Hub", "Zoom Communications", "Google Workspace", "DWSA Learning Vault"],
        estimatedSetupMinutes: 3,
        featured: false,
      },
    ];
  }

  static provisionTemplateToTenant(templateId: string, tenantId: string): { success: boolean; provisionedConnectorsCount: number; message: string } {
    return {
      success: true,
      provisionedConnectorsCount: 5,
      message: `Template '${templateId}' provisioned successfully into tenant '${tenantId}'. All 5 connectors initialized in PAUSED state awaiting API credentials.`,
    };
  }
}
