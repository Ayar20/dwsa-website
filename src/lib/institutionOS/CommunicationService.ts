/**
 * CommunicationService.ts
 * InstitutionOS Automation — Unified Multi-Channel Communication Hub
 */

export type CommunicationChannel = "Email" | "SMS" | "WhatsApp" | "PushNotification" | "InApp" | "Announcement";
export type CommunicationAudience = "Students" | "Faculty" | "Employers" | "Alumni" | "Partners" | "Institution";

export interface CommunicationRecord {
  id: string;
  subject: string;
  body: string;
  channel: CommunicationChannel;
  audience: CommunicationAudience;
  sentBy: string;
  sentAt: string;
  deliveryRate: number;
  openRate: number;
  status: "Sent" | "Scheduled" | "Draft" | "Failed";
}

const mockCommunications: CommunicationRecord[] = [
  { id: "COM-101", subject: "DTA Hackathon 2026 Registration Now Open!", body: "Join the 48-hour engineering sprint.", channel: "Email", audience: "Students", sentBy: "Communications Office", sentAt: "Aug 03, 2026 09:00", deliveryRate: 98, openRate: 74, status: "Sent" },
  { id: "COM-102", subject: "Faculty Grading SLA Reminder — Q3 Deadline", body: "All PR assessments must be completed by Aug 10.", channel: "InApp", audience: "Faculty", sentBy: "Academic Office", sentAt: "Aug 02, 2026 14:00", deliveryRate: 100, openRate: 91, status: "Sent" },
  { id: "COM-103", subject: "Employer Partnership Onboarding — New Candidate Batch Available", body: "23 new verified graduates are now in the employment pool.", channel: "Email", audience: "Employers", sentBy: "Career Placement Office", sentAt: "Scheduled: Aug 10, 2026", deliveryRate: 0, openRate: 0, status: "Scheduled" },
  { id: "COM-104", subject: "DTA Career Fair Sept 2026 — Save the Date!", body: "Over 30 employers will be attending in person.", channel: "WhatsApp", audience: "Alumni", sentBy: "Alumni Relations", sentAt: "Aug 01, 2026 10:30", deliveryRate: 96, openRate: 82, status: "Sent" },
];

export class CommunicationService {
  private static records: CommunicationRecord[] = [...mockCommunications];

  public static getAll(): CommunicationRecord[] {
    return [...this.records];
  }

  public static sendBroadcast(comm: Omit<CommunicationRecord, "id" | "deliveryRate" | "openRate" | "status">): CommunicationRecord {
    const newComm: CommunicationRecord = { ...comm, id: `COM-${Date.now()}`, deliveryRate: 0, openRate: 0, status: "Sent" };
    this.records.unshift(newComm);
    return newComm;
  }
}
