/**
 * InstitutionOS Analytics Engine
 * Version: 3.4 Academic Intelligence Layer
 * Shared across Student Campus, Faculty Workspace, and Institution Control Centre (ICC).
 */

export interface StudentAnalyticsData {
  progressPercentage: number;
  assignmentsCompleted: number;
  totalAssignments: number;
  attendanceRate: number;
  engagementScore: number; // 0-100
  prsSubmitted: number;
  prsApproved: number;
}

export interface FacultyAnalyticsData {
  modulesTaught: number;
  totalStudents: number;
  avgStudentRating: number; // 0-5
  onTimeGradingPercentage: number;
  publishedLessonsCount: number;
  researchCount: number;
}

export interface InstitutionAnalyticsData {
  activeStudents: number;
  facultyCount: number;
  retentionRatePercentage: number;
  completionRatePercentage: number;
  admissionsConversionPercentage: number;
  graduateEmployabilityPercentage: number;
  tuitionRevenueCollectedNaira: number;
}

export class AnalyticsEngine {
  public static calculateProgress(completed: number, total: number): number {
    if (total <= 0) return 0;
    return Math.min(100, Math.round((completed / total) * 100));
  }

  public static calculateCompletionRate(data: StudentAnalyticsData): number {
    const assignmentProgress = this.calculateProgress(data.assignmentsCompleted, data.totalAssignments);
    const prProgress = this.calculateProgress(data.prsApproved, Math.max(1, data.prsSubmitted));
    return Math.round((assignmentProgress * 0.6) + (prProgress * 0.4));
  }

  public static calculateRetention(enrolledCount: number, dropoutsCount: number): number {
    if (enrolledCount <= 0) return 100;
    const active = Math.max(0, enrolledCount - dropoutsCount);
    return Math.round((active / enrolledCount) * 100);
  }

  public static calculateRisk(attendanceRate: number, completionRate: number, engagementScore: number): "Excellent" | "Healthy" | "Monitor" | "At Risk" | "Critical" {
    const compositeScore = (attendanceRate * 0.4) + (completionRate * 0.4) + (engagementScore * 0.2);
    if (compositeScore >= 90) return "Excellent";
    if (compositeScore >= 80) return "Healthy";
    if (compositeScore >= 70) return "Monitor";
    if (compositeScore >= 55) return "At Risk";
    return "Critical";
  }

  public static calculateFacultyPerformance(data: FacultyAnalyticsData): number {
    const ratingComponent = (data.avgStudentRating / 5.0) * 40;
    const gradingComponent = (data.onTimeGradingPercentage / 100) * 40;
    const activityComponent = Math.min(20, (data.publishedLessonsCount * 2) + (data.researchCount * 5));
    return Math.min(100, Math.round(ratingComponent + gradingComponent + activityComponent));
  }

  public static calculateInstitutionHealth(data: InstitutionAnalyticsData): number {
    const retentionWeight = data.retentionRatePercentage * 0.25;
    const completionWeight = data.completionRatePercentage * 0.25;
    const employabilityWeight = data.graduateEmployabilityPercentage * 0.25;
    const conversionWeight = data.admissionsConversionPercentage * 0.25;
    return Math.min(100, Math.round(retentionWeight + completionWeight + employabilityWeight + conversionWeight));
  }
}
