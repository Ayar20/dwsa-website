export interface APIKeyDefinition {
  id: string;
  name: string;
  keyPrefix: string;
  created: string;
  lastUsed: string;
  rateLimitPerMin: number;
  scopes: string[];
  status: "active" | "revoked";
}

export interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  status: "active" | "failing" | "disabled";
  successRate: number;
  lastDelivery: string;
}

export interface OAuthClient {
  clientId: string;
  name: string;
  redirectUris: string[];
  grantTypes: string[];
  created: string;
}

export class APIManagementService {
  static getAPIKeys(tenantId: string): APIKeyDefinition[] {
    return [
      { id: "key-001", name: "Production ERP Integration", keyPrefix: "dwsa_live_9f83", created: "2026-01-15", lastUsed: "Just now", rateLimitPerMin: 1200, scopes: ["read", "write", "webhooks"], status: "active" },
      { id: "key-002", name: "Student Mobile App Connector", keyPrefix: "dwsa_live_3k11", created: "2026-03-02", lastUsed: "4 mins ago", rateLimitPerMin: 600, scopes: ["read:student", "read:courses"], status: "active" },
      { id: "key-003", name: "Legacy Portal Sync Key", keyPrefix: "dwsa_live_0a44", created: "2025-11-10", lastUsed: "22 days ago", rateLimitPerMin: 300, scopes: ["read:legacy"], status: "revoked" },
    ];
  }

  static getWebhooks(tenantId: string): WebhookEndpoint[] {
    return [
      { id: "wh-001", url: "https://api.dta.edu.ng/webhooks/enrolments", events: ["student.enrolled", "student.graduated"], status: "active", successRate: 99.7, lastDelivery: "2 mins ago" },
      { id: "wh-002", url: "https://finance.dta.edu.ng/paystack/listener", events: ["payment.success", "payment.failed"], status: "active", successRate: 100.0, lastDelivery: "Just now" },
      { id: "wh-003", url: "https://legacy.dta.edu.ng/sync", events: ["course.created"], status: "failing", successRate: 74.2, lastDelivery: "1 hour ago" },
    ];
  }

  static getOAuthClients(tenantId: string): OAuthClient[] {
    return [
      { clientId: "client_dta_mobile_v2", name: "DTA Campus Mobile App", redirectUris: ["dtacampus://oauth/callback"], grantTypes: ["authorization_code", "refresh_token"], created: "2026-02-01" },
      { clientId: "client_partner_portal", name: "Employer Portal OAuth", redirectUris: ["https://employer.dwsa.africa/auth/callback"], grantTypes: ["authorization_code"], created: "2026-04-12" },
    ];
  }
}
