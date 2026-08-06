export interface IntegrationHealthSummary {
  connectorId: string;
  connectorName: string;
  healthScore: number;
  category: "excellent" | "healthy" | "warning" | "critical" | "offline";
  responseTimeMs: number;
  lastSuccessfulSync: string;
  lastFailure?: string;
  availabilityPercent: number;
  syncFrequency: string;
  authStatus: "VALID" | "EXPIRING_SOON" | "EXPIRED" | "INVALID";
}

export class IntegrationHealthService {
  static getOverallHealthScore(): number {
    return 96.4;
  }

  static getConnectorHealthSummaries(): IntegrationHealthSummary[] {
    return [
      { connectorId: "pay-paystack", connectorName: "Paystack Gateway Hub", healthScore: 100, category: "excellent", responseTimeMs: 38, lastSuccessfulSync: "Just now", availabilityPercent: 100.0, syncFrequency: "Webhook Instant", authStatus: "VALID" },
      { connectorId: "ent-google-workspace", connectorName: "Google Workspace for Education", healthScore: 99, category: "excellent", responseTimeMs: 45, lastSuccessfulSync: "4 mins ago", availabilityPercent: 99.98, syncFrequency: "Every 10 mins", authStatus: "VALID" },
      { connectorId: "gov-student-registry", connectorName: "National Student Registry (NIN / NUC)", healthScore: 98, category: "excellent", responseTimeMs: 110, lastSuccessfulSync: "5 mins ago", availabilityPercent: 99.94, syncFrequency: "Real-time", authStatus: "VALID" },
      { connectorId: "comm-zoom", connectorName: "Zoom Video Communications", healthScore: 97, category: "healthy", responseTimeMs: 62, lastSuccessfulSync: "1 min ago", availabilityPercent: 99.91, syncFrequency: "Real-time", authStatus: "VALID" },
      { connectorId: "ent-m365", connectorName: "Microsoft 365 & Azure AD", healthScore: 96, category: "healthy", responseTimeMs: 54, lastSuccessfulSync: "2 mins ago", availabilityPercent: 99.95, syncFrequency: "Every 15 mins", authStatus: "VALID" },
      { connectorId: "lms-moodle", connectorName: "Moodle Enterprise Bridge", healthScore: 84, category: "warning", responseTimeMs: 240, lastSuccessfulSync: "12 mins ago", lastFailure: "1 hour ago (HTTP 504 Timeout)", availabilityPercent: 97.4, syncFrequency: "Every 30 mins", authStatus: "EXPIRING_SOON" },
    ];
  }
}
