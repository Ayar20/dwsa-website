/**
 * AnalyticsPersistenceService.ts
 * InstitutionOS Core Service — Persistent Analytics Snapshots & Institutional Metrics History
 */

export interface MetricSnapshotItem {
  id: string;
  metric: string;
  value: number;
  capturedAt: string;
}

const mockMetricSnapshots: MetricSnapshotItem[] = [
  { id: "SNAP-1", metric: "OverallInstitutionHealth", value: 94, capturedAt: "2026-08-01" },
  { id: "SNAP-2", metric: "StudentRetentionPercentage", value: 96, capturedAt: "2026-08-01" },
  { id: "SNAP-3", metric: "AdmissionsConversionRate", value: 74, capturedAt: "2026-08-01" },
  { id: "SNAP-4", metric: "GraduateEmployabilityRate", value: 92, capturedAt: "2026-08-01" },
  { id: "SNAP-5", metric: "FacultyGradingSLAPercentage", value: 98, capturedAt: "2026-08-01" },
];

export class AnalyticsPersistenceService {
  private static snapshots: MetricSnapshotItem[] = [...mockMetricSnapshots];

  public static getSnapshots(): MetricSnapshotItem[] {
    return [...this.snapshots];
  }

  public static recordSnapshot(metric: string, value: number): MetricSnapshotItem {
    const newSnapshot: MetricSnapshotItem = {
      id: `SNAP-${Date.now()}`,
      metric,
      value,
      capturedAt: new Date().toISOString().split("T")[0],
    };
    this.snapshots.unshift(newSnapshot);
    return newSnapshot;
  }
}
