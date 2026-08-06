export interface LMSBridgeConfig {
  lmsType: "moodle" | "canvas" | "blackboard";
  endpointUrl: string;
  autoSyncGradebook: boolean;
  xApiEnabled: boolean;
  scormVersion: "1.2" | "2004" | "cmi5";
  lastGradebookSync: string;
}

export interface SCORMPackage {
  id: string;
  title: string;
  scormVersion: string;
  sizeMB: number;
  uploadedAt: string;
  activeEnrolments: number;
}

export class LMSConnectorService {
  static getLMSBridgeConfig(tenantId: string): LMSBridgeConfig {
    return {
      lmsType: "moodle",
      endpointUrl: "https://moodle.dta.edu.ng/webservice/rest/server.php",
      autoSyncGradebook: true,
      xApiEnabled: true,
      scormVersion: "2004",
      lastGradebookSync: "12 minutes ago",
    };
  }

  static getSCORMPackages(): SCORMPackage[] {
    return [
      { id: "scorm-001", title: "Full-Stack Software Architecture Fundamentals", scormVersion: "2004 4th Ed", sizeMB: 142.5, uploadedAt: "2026-06-15", activeEnrolments: 840 },
      { id: "scorm-002", title: "Cloud Native & Kubernetes Operations", scormVersion: "2004 4th Ed", sizeMB: 210.0, uploadedAt: "2026-07-01", activeEnrolments: 620 },
      { id: "scorm-003", title: "Financial Engineering & Fintech Regulations", scormVersion: "1.2", sizeMB: 98.4, uploadedAt: "2026-07-20", activeEnrolments: 410 },
    ];
  }
}
