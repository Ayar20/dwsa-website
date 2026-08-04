import { PlatformNotification, UserRole, NotificationCategory } from "@/types/institutionOS";

const initialNotifications: PlatformNotification[] = [
  {
    id: "NOTIF-101",
    recipientRole: "STUDENT",
    title: "Week 4 React To-Do App Feedback Ready",
    message: "Your submission has been reviewed and graded 92/100 by Dr. Adeleke.",
    category: "Academic",
    priority: "High",
    timestamp: "15 mins ago",
    isRead: false,
    isArchived: false,
    relatedModule: "Assessments",
    actionUrl: "/dashboard/student/programme",
    actionText: "View Review",
  },
  {
    id: "NOTIF-102",
    recipientRole: "INSTRUCTOR",
    title: "8 New GitHub PR Submissions Pending",
    message: "Cohort Alpha learners have submitted Week 3 React PRs awaiting grading.",
    category: "Assignments",
    priority: "Medium",
    timestamp: "1 hour ago",
    isRead: false,
    isArchived: false,
    relatedModule: "GitHub Reviews",
    actionUrl: "/dashboard/instructor/github-reviews",
    actionText: "Grade Submissions",
  },
  {
    id: "NOTIF-103",
    recipientRole: "ADMIN",
    title: "12 Professional Certificates Awaiting Sign-off",
    message: "Cohort Alpha graduates have completed all 9 module competencies.",
    category: "Executive",
    priority: "High",
    timestamp: "2 hours ago",
    isRead: false,
    isArchived: false,
    relatedModule: "Certificate Authority",
    actionUrl: "/dashboard/admin/certificates",
    actionText: "Approve Certificates",
  },
  {
    id: "NOTIF-104",
    recipientRole: "ALL",
    title: "DWSA African Tech Summit 2026 Registration Open",
    message: "All DTA learners and faculty are invited to join the upcoming tech summit.",
    category: "Community",
    priority: "Low",
    timestamp: "Yesterday",
    isRead: true,
    isArchived: false,
    relatedModule: "Events",
    actionUrl: "/knowledge-hub",
    actionText: "Read Notice",
  },
  {
    id: "NOTIF-105",
    recipientRole: "ADMIN",
    title: "Paystack ERP Tuition Settlement Verified",
    message: "₦4.8M tuition payment batch automatically reconciled.",
    category: "Finance",
    priority: "Medium",
    timestamp: " Yesterday",
    isRead: false,
    isArchived: false,
    relatedModule: "Financial ERP",
    actionUrl: "/dashboard/admin/finance",
    actionText: "View Ledger",
  },
];

class UniversalNotificationService {
  private notifications: PlatformNotification[] = [...initialNotifications];

  public getNotificationsForRole(role: UserRole): PlatformNotification[] {
    return this.notifications.filter(
      (n) => !n.isArchived && (n.recipientRole === role || n.recipientRole === "ALL")
    );
  }

  public getUnreadCount(role: UserRole): number {
    return this.getNotificationsForRole(role).filter((n) => !n.isRead).length;
  }

  public markAsRead(id: string): void {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.isRead = true;
    }
  }

  public markAllAsRead(role: UserRole): void {
    this.notifications.forEach((n) => {
      if (n.recipientRole === role || n.recipientRole === "ALL") {
        n.isRead = true;
      }
    });
  }

  public archiveNotification(id: string): void {
    const notif = this.notifications.find((n) => n.id === id);
    if (notif) {
      notif.isArchived = true;
    }
  }

  public addNotification(notification: Omit<PlatformNotification, "id" | "timestamp" | "isRead" | "isArchived">): PlatformNotification {
    const newNotif: PlatformNotification = {
      ...notification,
      id: `NOTIF-${Date.now()}`,
      timestamp: "Just now",
      isRead: false,
      isArchived: false,
    };
    this.notifications.unshift(newNotif);
    return newNotif;
  }
}

export const notificationService = new UniversalNotificationService();
