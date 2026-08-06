/**
 * FacultyAIAgentService.ts
 * InstitutionOS v4.2 — Faculty AI Teaching Agent
 * Autonomous AI agent that assists faculty with teaching, grading, and learner management.
 */

export interface FacultyAIInsight {
  id: string;
  type: "at-risk" | "engagement" | "grading" | "content" | "schedule";
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  suggestedAction: string;
  actionLabel?: string;
  actionHref?: string;
  timestamp: string;
}

export interface FacultyAICapability {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "teaching" | "grading" | "analytics" | "content" | "admin";
}

export interface FacultyAgentStats {
  lessonsAnalysed: number;
  atRiskFlagsRaised: number;
  gradingAssistReviews: number;
  contentSuggestions: number;
  avgTimeSavedPerWeekHrs: number;
  interventionsTriggered: number;
}

export class FacultyAIAgentService {
  static getCapabilities(): FacultyAICapability[] {
    return [
      {
        id: "at-risk-detector",
        name: "At-Risk Learner Detector",
        description: "Continuously monitors engagement patterns and flags learners showing signs of dropout risk before it's too late.",
        icon: "🚨",
        category: "analytics",
      },
      {
        id: "grading-assist",
        name: "Grading Assist",
        description: "AI-assisted rubric scoring, code quality review, and submission feedback generation.",
        icon: "✅",
        category: "grading",
      },
      {
        id: "content-advisor",
        name: "Content Advisor",
        description: "Reviews lesson effectiveness data and recommends content improvements, restructuring, or additional resources.",
        icon: "📚",
        category: "content",
      },
      {
        id: "engagement-coach",
        name: "Engagement Coach",
        description: "Analyses drop-off points in video lessons and live sessions and suggests techniques to improve attention.",
        icon: "📊",
        category: "teaching",
      },
      {
        id: "comms-drafter",
        name: "Communication Drafter",
        description: "Drafts cohort-wide announcements, individual student messages, and institutional reports.",
        icon: "✉️",
        category: "admin",
      },
    ];
  }

  static getProactiveInsights(facultyId: string): FacultyAIInsight[] {
    return [
      {
        id: "ins-001",
        type: "at-risk",
        title: "3 Learners at High Dropout Risk",
        description: "Amara O., Kofi M., and David T. have not logged in for 5+ days. Historical data shows 78% of learners with this pattern do not complete the module without intervention.",
        priority: "critical",
        suggestedAction: "Send a personalised check-in message to each learner today. Sage has pre-drafted 3 messages — review and send from the Learner Analytics page.",
        actionLabel: "Send Intervention",
        actionHref: "/dashboard/instructor/learners",
        timestamp: "2 hours ago",
      },
      {
        id: "ins-002",
        type: "engagement",
        title: "Lesson 4.2 Drop-off Spike",
        description: "67% of students stop watching at the 14-minute mark in Lesson 4.2. Consider breaking this section into two shorter clips or adding a checkpoint quiz.",
        priority: "high",
        suggestedAction: "Split Lesson 4.2 at the 14-minute mark into two segments, or insert a 2-question checkpoint quiz at that timestamp to re-engage attention.",
        actionLabel: "Review Lesson Analytics",
        actionHref: "/dashboard/instructor/lessons",
        timestamp: "5 hours ago",
      },
      {
        id: "ins-003",
        type: "grading",
        title: "12 Pending Submissions Ready for Review",
        description: "Module 3 submissions are queued. AI has pre-scored 12 submissions against the rubric — review and approve to finalise grades.",
        priority: "high",
        suggestedAction: "Open the GitHub Review Centre to review Sage's pre-scored feedback drafts. Approve or edit each draft — estimated 8 minutes per submission.",
        actionLabel: "Open GitHub Reviews",
        actionHref: "/dashboard/instructor/github-reviews",
        timestamp: "1 day ago",
      },
      {
        id: "ins-004",
        type: "content",
        title: "Module 5 Content Gap Detected",
        description: "Students are asking repeated questions about 'JWT authentication flows' — a topic not covered in current lesson content. Adding a short lesson could reduce support volume by ~40%.",
        priority: "medium",
        suggestedAction: "Create a 15-minute supplementary lesson on JWT authentication. Sage has drafted a lesson outline and suggested resource links for your review.",
        actionLabel: "Create Lesson",
        actionHref: "/dashboard/instructor/lessons",
        timestamp: "2 days ago",
      },
    ];
  }

  static getAgentStats(facultyId: string): FacultyAgentStats {
    return {
      lessonsAnalysed: 34,
      atRiskFlagsRaised: 18,
      gradingAssistReviews: 67,
      contentSuggestions: 12,
      avgTimeSavedPerWeekHrs: 4.5,
      interventionsTriggered: 14,
    };
  }

  static generateFeedbackDraft(submissionId: string): string {
    return `Great work on the database schema design — the normalization is clean and the indexes are well-placed. 

Your API routes follow RESTful conventions correctly. 

Areas for improvement:
• Add input validation middleware to all POST routes (currently missing error handling for malformed requests)
• The README could be expanded with setup instructions and API documentation
• Consider adding environment variable validation on startup

Overall: Strong submission. A few polish items will get you to the top band.`;
  }
}
