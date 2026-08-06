export interface ServiceStatusCheck {
  serviceName: string;
  category: "Government" | "Cloud Provider" | "Payment" | "Communication" | "LMS";
  endpoint: string;
  status: "ONLINE" | "DEGRADED" | "OFFLINE";
  uptime30d: number;
  lastCheckedAt: string;
}

export class PlatformConnectivityService {
  static getGlobalServiceStatuses(): ServiceStatusCheck[] {
    return [
      { serviceName: "NIMC Identity Registry", category: "Government", endpoint: "https://api.nimc.gov.ng/v2", status: "ONLINE", uptime30d: 99.94, lastCheckedAt: "1 min ago" },
      { serviceName: "Google Workspace APIs", category: "Cloud Provider", endpoint: "https://www.googleapis.com", status: "ONLINE", uptime30d: 100.0, lastCheckedAt: "Just now" },
      { serviceName: "Microsoft Graph API", category: "Cloud Provider", endpoint: "https://graph.microsoft.com", status: "ONLINE", uptime30d: 99.98, lastCheckedAt: "Just now" },
      { serviceName: "Paystack Payment Gateway", category: "Payment", endpoint: "https://api.paystack.co", status: "ONLINE", uptime30d: 99.99, lastCheckedAt: "Just now" },
      { serviceName: "Zoom Video API", category: "Communication", endpoint: "https://api.zoom.us/v2", status: "ONLINE", uptime30d: 99.91, lastCheckedAt: "3 mins ago" },
      { serviceName: "Moodle WebService Gateway", category: "LMS", endpoint: "https://moodle.dta.edu.ng/webservice", status: "DEGRADED", uptime30d: 97.4, lastCheckedAt: "2 mins ago" },
    ];
  }
}
