/**
 * InstitutionOS Core Platform Types & Service Interfaces
 * Version: 3.3 Platform Intelligence Layer
 * Shared across Student Digital Campus, Faculty Workspace, and Institution Control Centre (ICC).
 */

export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN" | "CORPORATE_LEARNER";

export type Permission =
  | "CanApproveCertificates"
  | "CanManageFaculty"
  | "CanReviewAssignments"
  | "CanPublishResearch"
  | "CanManageFinance"
  | "CanCreateProgrammes"
  | "CanViewExecutiveReports"
  | "CanManageAdmissions"
  | "CanAccessDigitalTwin"
  | "CanManageSystemSettings";

export type NotificationCategory =
  | "Academic"
  | "Admissions"
  | "Assignments"
  | "Finance"
  | "Research"
  | "Corporate"
  | "Executive"
  | "Security"
  | "System"
  | "Community";

export type NotificationPriority = "Low" | "Medium" | "High" | "Urgent";

export interface PlatformNotification {
  id: string;
  recipientRole: UserRole | "ALL";
  title: string;
  message: string;
  category: NotificationCategory;
  priority: NotificationPriority;
  timestamp: string;
  isRead: boolean;
  isArchived: boolean;
  relatedModule?: string;
  actionUrl?: string;
  actionText?: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  details: string;
  timestamp: string;
  category: NotificationCategory;
  status: "Success" | "Pending" | "Warning" | "Error";
}

export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  role: UserRole;
  action: string;
  target: string;
  timestamp: string;
  ipAddress: string;
  metadata?: Record<string, any>;
}

export type SearchCategory =
  | "Students"
  | "Faculty"
  | "Programmes"
  | "Schools"
  | "Courses"
  | "Modules"
  | "Assignments"
  | "Announcements"
  | "Research"
  | "Certificates"
  | "Policies"
  | "Reports"
  | "Corporate";

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  url: string;
  badge?: string;
}

export interface AIContextPayload {
  role: UserRole;
  userName: string;
  currentModule: string;
  systemPrompt: string;
  knowledgeSources: string[];
  conversationHistory: Array<{ sender: "user" | "ai"; text: string; timestamp: string }>;
}

export type SystemEventType =
  | "StudentRegistered"
  | "AssignmentSubmitted"
  | "PaymentCompleted"
  | "CertificateIssued"
  | "FacultyCreated"
  | "ResearchPublished"
  | "AdmissionApproved"
  | "ProgrammeCreated"
  | "PRGraded";

export interface EventBusPayload {
  eventId: string;
  eventType: SystemEventType;
  timestamp: string;
  sourceModule: string;
  payload: Record<string, any>;
}

export interface GlobalSettingsConfig {
  brand: {
    institutionName: string;
    parentCorporateEntity: string;
    primaryColor: string;
    secondaryColor: string;
    logoUrl: string;
  };
  campus: {
    activeAcademicYear: string;
    timezone: string;
    defaultCurrency: string;
  };
  notifications: {
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
  };
  payments: {
    provider: string;
    publicKey: string;
  };
  security: {
    mfaRequired: boolean;
    sessionTimeoutMinutes: number;
  };
}

export interface ResourceItem {
  id: string;
  title: string;
  category: string;
  type: string;
  size: string;
  updated: string;
  url: string;
  tags: string[];
  version: string;
}

export interface IntegrationConnector {
  id: string;
  name: string;
  category: "Productivity" | "Communication" | "Payment" | "DevOps" | "Storage";
  status: "Connected" | "Configured" | "Available";
  iconName: string;
  description: string;
}
