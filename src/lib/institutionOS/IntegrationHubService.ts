import { IntegrationConnector } from "@/types/institutionOS";

const connectors: IntegrationConnector[] = [
  { id: "INT-1", name: "GitHub Enterprise", category: "DevOps", status: "Connected", iconName: "GitBranch", description: "Automated PR submission tracking, commit history & code grading." },
  { id: "INT-2", name: "Paystack ERP Engine", category: "Payment", status: "Connected", iconName: "CreditCard", description: "Instant tuition settlement, webhook reconciliation & installment tracking." },
  { id: "INT-[#3]", name: "Google Workspace & Meet", category: "Communication", status: "Configured", iconName: "Video", description: "Calendar synchronization, live class video links & Google Docs handbook sync." },
  { id: "INT-4", name: "Microsoft 365 & Teams", category: "Productivity", status: "Available", iconName: "Users", description: "Single Sign-On (SSO), Outlook calendar integration & Teams live sessions." },
  { id: "INT-5", name: "WhatsApp Business API", category: "Communication", status: "Configured", iconName: "Phone", description: "Instant admissions updates, timetable alerts & payment reminders." },
  { id: "INT-6", name: "Cloud Storage (AWS S3 / GCS)", category: "Storage", status: "Connected", iconName: "Database", description: "Encrypted storage for certificates, video lectures & research papers." },
];

export class IntegrationHubService {
  public static getConnectors(): IntegrationConnector[] {
    return [...connectors];
  }
}
