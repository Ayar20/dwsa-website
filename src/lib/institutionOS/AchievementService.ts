/**
 * AchievementService.ts
 * InstitutionOS Core Service — Achievement Badges & Milestone Verification Engine
 */

export interface BadgeRecord {
  id: string;
  studentId: string;
  badge: string;
  category: "Academic" | "DevOps" | "Engagement" | "Leadership" | "AI";
  description: string;
  earnedAt: string;
  verifiedBy: string;
}

const mockBadges: BadgeRecord[] = [
  { id: "ACH-101", studentId: "std_01", badge: "First Assignment Completed", category: "Academic", description: "Successfully passed first coursework submission.", earnedAt: "2026-05-15", verifiedBy: "Dr. Olumide Adeleke" },
  { id: "ACH-102", studentId: "std_01", badge: "Git & GitHub Master", category: "DevOps", description: "Achieved 20+ verified PR submissions with zero merge conflicts.", earnedAt: "2026-06-10", verifiedBy: "Automated GitHub Assessor" },
  { id: "ACH-103", studentId: "std_01", badge: "Consistency Champion (14 Days)", category: "Engagement", description: "Maintained 14 consecutive days of campus activity.", earnedAt: "2026-07-01", verifiedBy: "InstitutionOS EventBus" },
  { id: "ACH-104", studentId: "std_01", badge: "100% Attendance Excellence", category: "Engagement", description: "Attended all live interactive coding labs.", earnedAt: "2026-07-20", verifiedBy: "Academic Registrar" },
  { id: "ACH-105", studentId: "std_01", badge: "AI Prompt Engineering Explorer", category: "AI", description: "Mastered AI-assisted development workflows.", earnedAt: "2026-08-01", verifiedBy: "DWSA AI Labs" },
];

export class AchievementService {
  private static badges: BadgeRecord[] = [...mockBadges];

  public static getStudentBadges(studentId: string): BadgeRecord[] {
    return this.badges.filter((b) => b.studentId === studentId || studentId === "std_01");
  }

  public static issueBadge(badgeData: Omit<BadgeRecord, "id" | "earnedAt">): BadgeRecord {
    const newBadge: BadgeRecord = {
      ...badgeData,
      id: `ACH-${Date.now()}`,
      earnedAt: new Date().toISOString().split("T")[0],
    };
    this.badges.unshift(newBadge);
    return newBadge;
  }
}
