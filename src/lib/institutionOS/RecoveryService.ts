export interface FailedSyncRecoveryRecord {
  id: string;
  connectorId: string;
  connectorName: string;
  tenantName: string;
  failureReason: string;
  retrySchedule: string;
  retryCount: number;
  maxRetries: number;
  escalationStatus: "PENDING_RETRY" | "ESCALATED_TO_ADMIN" | "RESOLVED";
  recommendedAction: string;
}

export interface RecoveryStats {
  pendingRetries: number;
  completedRetries: number;
  escalatedFailures: number;
  recoverySuccessRate: number;
}

export class RecoveryService {
  static getFailedSyncRecords(): FailedSyncRecoveryRecord[] {
    return [
      {
        id: "rec-001",
        connectorId: "lms-moodle",
        connectorName: "Moodle Enterprise Bridge",
        tenantName: "West Africa Business School",
        failureReason: "Moodle WebService Gateway API key expired / connection timed out (HTTP 504).",
        retrySchedule: "Automatic retry in 15 minutes (Attempt 3 of 5)",
        retryCount: 2,
        maxRetries: 5,
        escalationStatus: "PENDING_RETRY",
        recommendedAction: "Rotate Moodle WebService REST token in Settings -> Integrations -> Moodle.",
      },
      {
        id: "rec-002",
        connectorId: "wh-003",
        connectorName: "Legacy Portal Sync Webhook",
        tenantName: "Pan-African Tech Institute",
        failureReason: "Target server connection refused (ECONNREFUSED 192.168.1.44:8443).",
        retrySchedule: "Escalated to Administrator notification queue",
        retryCount: 5,
        maxRetries: 5,
        escalationStatus: "ESCALATED_TO_ADMIN",
        recommendedAction: "Verify target server firewall policy or update webhook target URL.",
      },
    ];
  }

  static getRecoveryStats(): RecoveryStats {
    return {
      pendingRetries: 3,
      completedRetries: 48,
      escalatedFailures: 1,
      recoverySuccessRate: 98.0,
    };
  }
}
