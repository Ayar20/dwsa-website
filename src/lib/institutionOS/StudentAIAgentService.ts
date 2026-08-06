/**
 * StudentAIAgentService.ts
 * InstitutionOS v4.2 — Student AI Learning Agent
 * Autonomous AI agent that personalises the student's learning journey.
 */

export interface StudentAIMessage {
  id: string;
  role: "agent" | "student";
  content: string;
  timestamp: string;
  agentCapability?: "tutor" | "career" | "planner" | "wellbeing" | "assessment";
  actionable?: boolean;
  action?: { label: string; href: string };
}

export interface StudentAICapability {
  id: string;
  name: string;
  description: string;
  icon: string;
  examplePrompts: string[];
  active: boolean;
}

export interface StudentLearningPulse {
  studyStreakDays: number;
  weeklyMinutes: number;
  completionRate: number;
  atRiskFlag: boolean;
  nextMilestone: string;
  recommendedNextAction: string;
  aiConfidenceScore: number;
}

export class StudentAIAgentService {
  static getCapabilities(): StudentAICapability[] {
    return [
      {
        id: "tutor",
        name: "AI Tutor",
        description: "Deep-dive explanations, concept clarifications, and guided learning on any topic in your curriculum.",
        icon: "🎓",
        examplePrompts: [
          "Explain async/await in JavaScript with examples",
          "Why is my code throwing a TypeError?",
          "Quiz me on React hooks",
        ],
        active: true,
      },
      {
        id: "planner",
        name: "Study Planner",
        description: "Optimises your weekly study schedule, tracks goals, and adjusts your learning pace.",
        icon: "📅",
        examplePrompts: [
          "Build me a study plan for this week",
          "I have 2 hours today — what should I focus on?",
          "I'm behind on Module 3 — help me catch up",
        ],
        active: true,
      },
      {
        id: "career",
        name: "Career Coach",
        description: "CV review, job application support, interview preparation, and portfolio feedback.",
        icon: "💼",
        examplePrompts: [
          "Review my GitHub portfolio",
          "What jobs match my current skill level?",
          "Help me write a cover letter for a junior dev role",
        ],
        active: true,
      },
      {
        id: "assessment",
        name: "Assessment Assistant",
        description: "Submission guidance, code review, rubric interpretation, and improvement coaching.",
        icon: "📝",
        examplePrompts: [
          "Review my project submission before I submit",
          "What does this rubric criteria mean?",
          "How can I improve my grade on Module 2?",
        ],
        active: true,
      },
      {
        id: "wellbeing",
        name: "Wellbeing Support",
        description: "Motivation coaching, burnout detection, and academic resilience support.",
        icon: "💛",
        examplePrompts: [
          "I'm feeling overwhelmed with the workload",
          "Give me some motivation to keep going",
          "I haven't studied in 3 days — help me restart",
        ],
        active: true,
      },
    ];
  }

  static getLearningPulse(studentId: string): StudentLearningPulse {
    return {
      studyStreakDays: 7,
      weeklyMinutes: 340,
      completionRate: 72,
      atRiskFlag: false,
      nextMilestone: "Complete Module 4 — APIs & Backend Integration",
      recommendedNextAction: "Watch Lesson 4.3: REST API Design Principles (28 min)",
      aiConfidenceScore: 87,
    };
  }

  static getConversationHistory(studentId: string): StudentAIMessage[] {
    return [
      {
        id: "msg-001",
        role: "agent",
        content: "Good morning! I've reviewed your progress. You're 72% through your programme — excellent momentum! You have a pending submission for Module 3 due in 2 days. Shall I help you prepare?",
        timestamp: "09:00",
        agentCapability: "tutor",
        actionable: true,
        action: { label: "Go to Module 3", href: "/dashboard/student/programme" },
      },
      {
        id: "msg-002",
        role: "student",
        content: "Yes, help me understand what's expected in the Module 3 project.",
        timestamp: "09:03",
      },
      {
        id: "msg-003",
        role: "agent",
        content: "Module 3 requires you to build a full-stack CRUD application using Node.js, Express, and a PostgreSQL database. The rubric emphasises clean API design (30%), database schema quality (25%), error handling (20%), and code documentation (25%). Your biggest opportunity is the documentation section — based on your past submissions, adding JSDoc comments could lift your score significantly.",
        timestamp: "09:03",
        agentCapability: "assessment",
        actionable: true,
        action: { label: "View Full Rubric", href: "/dashboard/student/programme" },
      },
    ];
  }

  static getAgentStats() {
    return {
      questionsAnswered: 147,
      studySessionsPlanned: 23,
      assessmentReviews: 8,
      careerInteractions: 12,
      avgResponseTime: "1.2s",
      satisfactionScore: 96,
    };
  }
}
