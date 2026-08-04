/**
 * InboxService.ts
 * InstitutionOS Automation — Unified Institutional Digital Inbox Engine
 */

export type InboxMessageCategory =
  | "ActionRequired" | "Academic" | "Finance" | "Community"
  | "Career" | "Research" | "Information";

export type InboxRole = "Student" | "Faculty" | "Admin" | "Employer" | "Mentor" | "Alumni" | "Partner";

export interface InboxMessage {
  id: string;
  from: string;
  subject: string;
  preview: string;
  category: InboxMessageCategory;
  isRead: boolean;
  isStarred: boolean;
  receivedAt: string;
  attachments: number;
}

const mockMessages: Record<InboxRole, InboxMessage[]> = {
  Student: [
    { id: "MSG-S01", from: "Academic Office", subject: "✅ Your Module 5 Assignment — APPROVED", preview: "Congratulations! Your Next.js App Router submission has been approved with grade A.", category: "Academic", isRead: false, isStarred: false, receivedAt: "Today, 10:30", attachments: 0 },
    { id: "MSG-S02", from: "Career Placement Centre", subject: "🎯 New Job Match — Full-Stack Engineer at First Bank", preview: "A new 94% skill-matched opportunity has been added to your career portal.", category: "Career", isRead: false, isStarred: true, receivedAt: "Today, 09:15", attachments: 1 },
    { id: "MSG-S03", from: "Finance Office", subject: "⚠️ Installment Payment Reminder — Due Aug 15", preview: "Your next tuition instalment of ₦150,000 is due on August 15, 2026.", category: "Finance", isRead: true, isStarred: false, receivedAt: "Yesterday", attachments: 1 },
    { id: "MSG-S04", from: "Dr. Olumide Adeleke", subject: "Well done on Module 4 PR Review!", preview: "Your code review comments were exceptionally professional. Keep it up.", category: "Academic", isRead: true, isStarred: true, receivedAt: "Aug 02, 2026", attachments: 0 },
  ],
  Faculty: [
    { id: "MSG-F01", from: "Academic Registrar", subject: "⚡ URGENT — Grading SLA Deadline Reminder", preview: "5 student PR submissions are pending your review. Deadline: Aug 10, 2026.", category: "ActionRequired", isRead: false, isStarred: true, receivedAt: "Today, 08:00", attachments: 0 },
    { id: "MSG-F02", from: "Research Office", subject: "Ethics Review Form — AI Curriculum Study", preview: "Please complete the ethics declaration for the AI adaptive learning research pilot.", category: "Research", isRead: false, isStarred: false, receivedAt: "Aug 03, 2026", attachments: 2 },
    { id: "MSG-F03", from: "Innovation Lab", subject: "Hackathon Mentor Sign-Up — Aug 18–20", preview: "We'd love your technical expertise as a hackathon mentor. Sign up by Aug 10.", category: "Community", isRead: true, isStarred: false, receivedAt: "Aug 01, 2026", attachments: 0 },
  ],
  Admin: [
    { id: "MSG-A01", from: "WorkflowEngine", subject: "🔔 Approval Required — Professional Diploma, Kofi Asante", preview: "Certificate approval workflow WF-1001 has reached Executive Registrar stage.", category: "ActionRequired", isRead: false, isStarred: true, receivedAt: "Today, 11:00", attachments: 1 },
    { id: "MSG-A02", from: "Finance Office", subject: "Q3 Budget Supplementary Request — ₦4.2M Approval Needed", preview: "Please review the supplementary budget request APR-202 at your earliest convenience.", category: "Finance", isRead: false, isStarred: false, receivedAt: "Today, 09:30", attachments: 3 },
    { id: "MSG-A03", from: "Business Development", subject: "Flutterwave MOU — Legal Clearance Received", preview: "Legal counsel has signed off. Workflow is at executive signature stage.", category: "ActionRequired", isRead: false, isStarred: true, receivedAt: "Aug 03, 2026", attachments: 2 },
  ],
  Employer: [
    { id: "MSG-E01", from: "Career Placement Centre", subject: "23 New Verified Graduates Available for Recruitment", preview: "New batch of DTA verified graduates with competency scores are ready for your review.", category: "Career", isRead: false, isStarred: false, receivedAt: "Today, 09:00", attachments: 1 },
  ],
  Mentor: [
    { id: "MSG-M01", from: "Kofi Asante", subject: "Session Confirmation — Portfolio Review Tomorrow 14:00", preview: "Hi, just confirming our portfolio architecture review session for tomorrow.", category: "ActionRequired", isRead: false, isStarred: false, receivedAt: "Today, 08:45", attachments: 0 },
  ],
  Alumni: [
    { id: "MSG-AL01", from: "Alumni Relations", subject: "DTA Career Fair Sept 2026 — VIP Alumni Invitation", preview: "As a DTA graduate, you are invited to speak at this year's career fair.", category: "Career", isRead: false, isStarred: true, receivedAt: "Aug 01, 2026", attachments: 1 },
  ],
  Partner: [
    { id: "MSG-P01", from: "Partnership Office", subject: "Partnership Renewal Reminder — MTN Group Agreement", preview: "Your partnership agreement is up for renewal on March 30, 2027. Early renewal available.", category: "Information", isRead: false, isStarred: false, receivedAt: "Aug 02, 2026", attachments: 1 },
  ],
};

export class InboxService {
  private static messages = { ...mockMessages };

  public static getMessages(role: InboxRole): InboxMessage[] {
    return [...(this.messages[role] ?? [])];
  }

  public static markRead(role: InboxRole, id: string): void {
    const msg = this.messages[role]?.find((m) => m.id === id);
    if (msg) msg.isRead = true;
  }

  public static toggleStar(role: InboxRole, id: string): void {
    const msg = this.messages[role]?.find((m) => m.id === id);
    if (msg) msg.isStarred = !msg.isStarred;
  }

  public static getUnreadCount(role: InboxRole): number {
    return (this.messages[role] ?? []).filter((m) => !m.isRead).length;
  }
}
