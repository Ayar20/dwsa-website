/**
 * InstitutionOS AI Recommendation Engine
 * Version: 3.4 Academic Intelligence Layer
 * Shared across Student, Faculty, and Executive workspaces.
 */

import { UserRole } from "@/types/institutionOS";

export interface Recommendation {
  id: string;
  role: UserRole;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  actionText: string;
  actionUrl: string;
  category: "Academic" | "Faculty" | "Executive" | "Career";
}

export class RecommendationEngine {
  public static getRecommendationsForRole(role: UserRole): Recommendation[] {
    switch (role) {
      case "STUDENT":
        return [
          {
            id: "REC-S1",
            role: "STUDENT",
            title: "Complete Module 4: TypeScript Generics Handbook",
            description: "Based on your recent PR submission, reviewing generics will increase code quality scores.",
            priority: "High",
            actionText: "Open Module Handbook",
            actionUrl: "/dashboard/student/programme",
            category: "Academic",
          },
          {
            id: "REC-S2",
            role: "STUDENT",
            title: "Submit React To-Do App Revision",
            description: "Dr. Adeleke requested minor state refactoring on your PR #14.",
            priority: "Medium",
            actionText: "View GitHub PR",
            actionUrl: "/dashboard/student",
            category: "Academic",
          },
          {
            id: "REC-S3",
            role: "STUDENT",
            title: "Claim Consistency Champion Badge",
            description: "You have maintained 14 consecutive days of campus activity!",
            priority: "Low",
            actionText: "View Achievements",
            actionUrl: "/dashboard/student/identity",
            category: "Career",
          },
        ];

      case "INSTRUCTOR":
        return [
          {
            id: "REC-F1",
            role: "INSTRUCTOR",
            title: "Review PR #248 — Chukwuemeka Adeyemi",
            description: "PR pending for 18 hours. Grading will keep Cohort Alpha on 100% SLA target.",
            priority: "High",
            actionText: "Grade PR Now",
            actionUrl: "/dashboard/instructor/github-reviews",
            category: "Faculty",
          },
          {
            id: "REC-F2",
            role: "INSTRUCTOR",
            title: "Check Intervention Alert: Fatima Al-Hassan",
            description: "Fatima has missed 2 consecutive sessions. Send a private mentor note.",
            priority: "High",
            actionText: "Open Learner Analytics",
            actionUrl: "/dashboard/instructor/learners",
            category: "Faculty",
          },
          {
            id: "REC-F3",
            role: "INSTRUCTOR",
            title: "Publish Week 4 Next.js App Router Lesson Plan",
            description: "Draft ready in Vault. Publishing will notify Cohort Beta learners.",
            priority: "Medium",
            actionText: "Publish Lesson",
            actionUrl: "/dashboard/instructor/lessons",
            category: "Faculty",
          },
        ];

      case "ADMIN":
      case "SUPER_ADMIN":
        return [
          {
            id: "REC-E1",
            role: "ADMIN",
            title: "Review Cohort Delta Enrolment Elasticity",
            description: "Admissions conversion has increased +14.2%. Allocate 1 additional faculty member.",
            priority: "High",
            actionText: "Open Admissions Command",
            actionUrl: "/dashboard/admin/admissions",
            category: "Executive",
          },
          {
            id: "REC-E2",
            role: "ADMIN",
            title: "Sign-Off 12 Professional Diplomas",
            description: "Cohort Alpha graduates passed all 8 competency validations.",
            priority: "High",
            actionText: "Sign Certificates",
            actionUrl: "/dashboard/admin/certificates",
            category: "Executive",
          },
          {
            id: "REC-E3",
            role: "ADMIN",
            title: "Approve First Bank Corporate Training Proposal",
            description: "₦14.2M enterprise training grant proposal awaiting executive approval.",
            priority: "Medium",
            actionText: "Review Proposal",
            actionUrl: "/dashboard/admin/finance",
            category: "Executive",
          },
        ];

      default:
        return [];
    }
  }
}
