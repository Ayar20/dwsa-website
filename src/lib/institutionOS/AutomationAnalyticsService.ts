/**
 * AutomationAnalyticsService.ts
 * InstitutionOS Automation — Operational Efficiency & Automation Performance Analytics
 */

export interface AutomationMetric {
  label: string;
  value: string | number;
  unit?: string;
  status: "Healthy" | "Warning" | "Critical";
  detail: string;
}

export interface ScheduledTask {
  id: string;
  name: string;
  schedule: string;
  lastRun: string;
  nextRun: string;
  status: "Active" | "Paused" | "Failed";
  runCount: number;
}

const mockTasks: ScheduledTask[] = [
  { id: "TASK-01", name: "Daily Institution Metric Snapshot", schedule: "Every day at 00:00 WAT", lastRun: "Aug 04, 2026 00:00", nextRun: "Aug 05, 2026 00:00", status: "Active", runCount: 94 },
  { id: "TASK-02", name: "Weekly Employer Candidate Pool Digest", schedule: "Every Monday 08:00 WAT", lastRun: "Aug 04, 2026 08:00", nextRun: "Aug 11, 2026 08:00", status: "Active", runCount: 14 },
  { id: "TASK-03", name: "Monthly Graduate Employment Report", schedule: "1st of every month", lastRun: "Aug 01, 2026 00:00", nextRun: "Sep 01, 2026 00:00", status: "Active", runCount: 7 },
  { id: "TASK-04", name: "Faculty Grading SLA Reminder", schedule: "Every 3 days if pending PRs exist", lastRun: "Aug 03, 2026 14:00", nextRun: "Aug 06, 2026 14:00", status: "Active", runCount: 22 },
  { id: "TASK-05", name: "Certificate Verification Sync", schedule: "Every 6 hours", lastRun: "Aug 04, 2026 18:00", nextRun: "Aug 05, 2026 00:00", status: "Paused", runCount: 312 },
];

const mockOperationalMetrics: AutomationMetric[] = [
  { label: "Workflows Running", value: 2, status: "Healthy", detail: "2 active, 1 completed, 0 failed" },
  { label: "Pending Approvals", value: 4, status: "Warning", detail: "4 items requiring executive sign-off" },
  { label: "Communication Delivery Rate", value: "98.1%", status: "Healthy", detail: "Avg across Email, WhatsApp & InApp channels" },
  { label: "Scheduled Tasks Active", value: 4, status: "Healthy", detail: "1 paused, 0 failed" },
  { label: "Automation Efficiency Index", value: "94%", status: "Healthy", detail: "Operations resolved without manual intervention" },
  { label: "Institution Readiness Index", value: "92/100", status: "Healthy", detail: "Composite operational health across all systems" },
];

export class AutomationAnalyticsService {
  public static getOperationalMetrics(): AutomationMetric[] {
    return [...mockOperationalMetrics];
  }

  public static getScheduledTasks(): ScheduledTask[] {
    return [...mockTasks];
  }
}
