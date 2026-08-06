export interface SyncEventRecord {
  id: string;
  connectorId: string;
  connectorName: string;
  tenantId: string;
  tenantName: string;
  startTime: string;
  completionTime: string;
  durationMs: number;
  recordsProcessed: number;
  status: "SUCCESS" | "FAILED" | "RETRYING";
  retryCount: number;
  errorMessage?: string;
}

export class SyncMonitoringService {
  static getSyncTimeline(): SyncEventRecord[] {
    return [
      { id: "evt-901", connectorId: "pay-paystack", connectorName: "Paystack Gateway Hub", tenantId: "tenant_dta_001", tenantName: "Digital Technology Academy", startTime: "14:32:00", completionTime: "14:32:01", durationMs: 420, recordsProcessed: 142, status: "SUCCESS", retryCount: 0 },
      { id: "evt-902", connectorId: "ent-google-workspace", connectorName: "Google Workspace for Education", tenantId: "tenant_dta_001", tenantName: "Digital Technology Academy", startTime: "14:30:00", completionTime: "14:30:04", durationMs: 4200, recordsProcessed: 850, status: "SUCCESS", retryCount: 0 },
      { id: "evt-903", connectorId: "lms-moodle", connectorName: "Moodle Enterprise Bridge", tenantId: "tenant_wabs_002", tenantName: "West Africa Business School", startTime: "14:15:00", completionTime: "14:15:20", durationMs: 20000, recordsProcessed: 0, status: "FAILED", retryCount: 2, errorMessage: "WebService Endpoint Timeout (HTTP 504)" },
      { id: "evt-904", connectorId: "gov-student-registry", connectorName: "National Student Registry", tenantId: "tenant_dta_001", tenantName: "Digital Technology Academy", startTime: "14:00:00", completionTime: "14:00:12", durationMs: 12000, recordsProcessed: 12450, status: "SUCCESS", retryCount: 0 },
    ];
  }
}
