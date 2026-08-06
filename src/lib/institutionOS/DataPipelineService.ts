export interface PipelineDefinition {
  id: string;
  name: string;
  sourceType: "CSV" | "JSON" | "SQL_DUMP" | "REST_API";
  targetModule: "Students" | "Courses" | "Grades" | "Staff" | "Payments";
  totalMappedFields: number;
  status: "READY" | "RUNNING" | "COMPLETED" | "ERROR";
  lastRunDate: string;
}

export class DataPipelineService {
  static getPipelines(tenantId: string): PipelineDefinition[] {
    return [
      { id: "pipe-01", name: "2026 Batch Student Admission Import", sourceType: "CSV", targetModule: "Students", totalMappedFields: 24, status: "COMPLETED", lastRunDate: "2026-07-28" },
      { id: "pipe-02", name: "Legacy Portal Historical Grades Migration", sourceType: "SQL_DUMP", targetModule: "Grades", totalMappedFields: 18, status: "COMPLETED", lastRunDate: "2026-06-12" },
      { id: "pipe-03", name: "External Payment Ledger Bulk Sync", sourceType: "JSON", targetModule: "Payments", totalMappedFields: 12, status: "READY", lastRunDate: "2026-08-01" },
    ];
  }
}
