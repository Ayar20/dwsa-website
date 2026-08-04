import { AuditEvent, UserRole } from "@/types/institutionOS";

const mockAuditLogs: AuditEvent[] = [
  {
    id: "AUD-1001",
    actorId: "usr_admin_01",
    actorName: "Executive Administrator",
    role: "ADMIN",
    action: "Payment Override Approved",
    target: "Kofi Asante (Cohort Alpha)",
    timestamp: "10 mins ago",
    ipAddress: "197.210.64.12",
  },
  {
    id: "AUD-1002",
    actorId: "usr_inst_02",
    actorName: "Dr. Olumide Adeleke",
    role: "INSTRUCTOR",
    action: "PR Submission Graded",
    target: "week-3-react-todo-app (Aisha Ibrahim)",
    timestamp: "45 mins ago",
    ipAddress: "197.210.64.12",
  },
  {
    id: "AUD-1003",
    actorId: "usr_admin_01",
    actorName: "Executive Administrator",
    role: "ADMIN",
    action: "Certificate Batch Signed",
    target: "3 Professional Diplomas",
    timestamp: "2 hours ago",
    ipAddress: "197.210.64.12",
  },
];

class InstitutionalAuditService {
  private logs: AuditEvent[] = [...mockAuditLogs];

  public logEvent(
    actorId: string,
    actorName: string,
    role: UserRole,
    action: string,
    target: string,
    ipAddress: string = "127.0.0.1",
    metadata?: Record<string, any>
  ): AuditEvent {
    const event: AuditEvent = {
      id: `AUD-${Date.now()}`,
      actorId,
      actorName,
      role,
      action,
      target,
      timestamp: "Just now",
      ipAddress,
      metadata,
    };
    this.logs.unshift(event);
    return event;
  }

  public getLogs(): AuditEvent[] {
    return [...this.logs];
  }
}

export const auditService = new InstitutionalAuditService();
