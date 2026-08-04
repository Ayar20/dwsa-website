/**
 * OperationalAlertService.ts
 * InstitutionOS Operations — Reusable Operational Alerting Framework
 */

export type AlertSeverity = "Critical" | "Warning" | "Information" | "Maintenance";
export type AlertTarget = "Executive" | "Admin" | "Faculty" | "Student" | "All";

export interface OperationalAlert {
  id: string;
  severity: AlertSeverity;
  target: AlertTarget;
  title: string;
  message: string;
  createdTime: string;
  isAcknowledged: boolean;
}

const mockAlerts: OperationalAlert[] = [
  { id: "ALT-801", severity: "Information", target: "All", title: "v3.8B Enterprise Operations Released", message: "Platform reliability and monitoring architecture update deployed successfully.", createdTime: "10 mins ago", isAcknowledged: true },
  { id: "ALT-802", severity: "Warning", target: "Admin", title: "Cohort Delta Enrolment Approaching Limit", message: "Cohort Delta enrolment is at 96% capacity (482/500 seats).", createdTime: "1 hour ago", isAcknowledged: false },
  { id: "ALT-803", severity: "Maintenance", target: "Faculty", title: "Scheduled Database Index Optimization", message: "Routine maintenance scheduled for Sunday at 02:00 WAT. Zero downtime expected.", createdTime: "3 hours ago", isAcknowledged: false },
];

export class OperationalAlertService {
  private static alerts: OperationalAlert[] = [...mockAlerts];

  public static getAlertsForTarget(target: AlertTarget): OperationalAlert[] {
    return this.alerts.filter((a) => a.target === target || a.target === "All");
  }

  public static getAllAlerts(): OperationalAlert[] {
    return [...this.alerts];
  }

  public static acknowledgeAlert(id: string): void {
    const alert = this.alerts.find((a) => a.id === id);
    if (alert) alert.isAcknowledged = true;
  }
}
