export interface SyncJob {
  id: string;
  connectorName: string;
  tenantName: string;
  startTime: string;
  completionTime: string;
  durationSeconds: number;
  recordsProcessed: number;
  status: "success" | "failed" | "running";
  retryCount: number;
  errorMessage?: string;
}

export class SyncEngine {
  static getRecentJobs(): SyncJob[] {
    return [
      { id: "sync-101", connectorName: "National Student Registry", tenantName: "Digital Technology Academy", startTime: "2026-08-05 14:00", completionTime: "2026-08-05 14:02", durationSeconds: 120, recordsProcessed: 12450, status: "success", retryCount: 0 },
      { id: "sync-102", connectorName: "Microsoft 365 Directory Sync", tenantName: "Pan-African Tech Institute", startTime: "2026-08-05 14:15", completionTime: "2026-08-05 14:16", durationSeconds: 45, recordsProcessed: 3200, status: "success", retryCount: 0 },
      { id: "sync-103", connectorName: "Moodle Gradebook Sync", tenantName: "West Africa Business School", startTime: "2026-08-05 13:30", completionTime: "2026-08-05 13:35", durationSeconds: 300, recordsProcessed: 840, status: "failed", retryCount: 2, errorMessage: "Moodle WebService Timeout (504)" },
      { id: "sync-104", connectorName: "Paystack Transaction Audit", tenantName: "Digital Technology Academy", startTime: "2026-08-05 14:20", completionTime: "2026-08-05 14:21", durationSeconds: 12, recordsProcessed: 480, status: "success", retryCount: 0 },
    ];
  }
}
