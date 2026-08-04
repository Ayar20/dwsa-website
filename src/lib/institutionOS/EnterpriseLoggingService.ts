/**
 * EnterpriseLoggingService.ts
 * InstitutionOS Platform Operations — Standardized Structured Enterprise Logging
 */

export type LogCategory =
  | "UserActivity" | "AdminAction" | "FacultyAction" | "AIActivity"
  | "Payment" | "Certificate" | "Authentication" | "APIAccess" | "AuditEvent";

export type LogLevel = "Info" | "Warning" | "Error" | "Critical";

export interface StructuredLogEntry {
  id: string;
  category: LogCategory;
  level: LogLevel;
  message: string;
  actorRole?: string;
  actorId?: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

const mockLogs: StructuredLogEntry[] = [
  { id: "LOG-1001", category: "Authentication", level: "Info", message: "User session authenticated via NextAuth", actorRole: "Student", timestamp: "Aug 04, 2026 23:10:02" },
  { id: "LOG-1002", category: "Payment", level: "Info", message: "Paystack webhook processed successfully (Ref: PAY-9482)", actorRole: "System", timestamp: "Aug 04, 2026 22:45:18" },
  { id: "LOG-1003", category: "AIActivity", level: "Info", message: "AIOrchestrator synthesized learning response (Tokens: 340, Latency: 140ms)", actorRole: "Student", timestamp: "Aug 04, 2026 22:30:00" },
  { id: "LOG-1004", category: "Certificate", level: "Info", message: "QR Credential Hash generated for Kofi Asante (Transcript ID: TR-8842)", actorRole: "Admin", timestamp: "Aug 04, 2026 21:15:42" },
  { id: "LOG-1005", category: "AdminAction", level: "Warning", message: "Supplementary budget request APR-202 flagged for executive approval", actorRole: "Finance Office", timestamp: "Aug 04, 2026 20:00:11" },
];

export class EnterpriseLoggingService {
  private static logs: StructuredLogEntry[] = [...mockLogs];

  public static log(entry: Omit<StructuredLogEntry, "id" | "timestamp">): StructuredLogEntry {
    const newLog: StructuredLogEntry = {
      ...entry,
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
    };
    this.logs.unshift(newLog);
    return newLog;
  }

  public static getLogs(category?: LogCategory): StructuredLogEntry[] {
    if (category) return this.logs.filter((l) => l.category === category);
    return [...this.logs];
  }
}
