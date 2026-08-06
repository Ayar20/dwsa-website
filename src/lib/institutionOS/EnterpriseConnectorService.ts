export interface SSOConfig {
  provider: "m365" | "google" | "saml" | "oidc";
  clientId: string;
  tenantDomain: string;
  status: "ACTIVE" | "INACTIVE";
  lastSyncAt: string;
}

export interface WorkspaceSyncStats {
  activeUsersSynced: number;
  groupsCreated: number;
  calendarsSynced: number;
  storageUsedGB: number;
}

export class EnterpriseConnectorService {
  static getSSOConfig(tenantId: string): SSOConfig {
    return {
      provider: "google",
      clientId: "dta-academy-88210.apps.googleusercontent.com",
      tenantDomain: "dta.edu.ng",
      status: "ACTIVE",
      lastSyncAt: "5 minutes ago",
    };
  }

  static getWorkspaceStats(tenantId: string): WorkspaceSyncStats {
    return {
      activeUsersSynced: 4850,
      groupsCreated: 42,
      calendarsSynced: 128,
      storageUsedGB: 1840,
    };
  }

  static createZoomMeeting(topic: string, startTime: string, durationMins: number): { joinUrl: string; meetingId: string } {
    return {
      joinUrl: `https://zoom.us/j/84920194829?pwd=${Math.random().toString(36).substring(7)}`,
      meetingId: "849 2019 4829",
    };
  }
}
