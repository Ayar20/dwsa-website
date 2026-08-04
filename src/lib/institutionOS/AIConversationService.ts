/**
 * AIConversationService.ts
 * InstitutionOS AI Operating Layer — Universal Conversation History & Thread Management
 */

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  sources?: string[];
}

export interface ChatThread {
  id: string;
  title: string;
  role: "Student" | "Faculty" | "Admin";
  category: string;
  messages: ChatMessage[];
  isBookmarked: boolean;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockThreads: ChatThread[] = [
  {
    id: "TH-101",
    title: "TypeScript Generics & Utility Types Guidance",
    role: "Student",
    category: "Academic",
    messages: [
      { id: "M-1", sender: "user", text: "How do I create a generic type wrapper for API responses in Next.js?", timestamp: "10:15 AM" },
      { id: "M-2", sender: "ai", text: "You can define a generic interface like `interface ApiResponse<T> { data: T; error?: string; success: boolean; }`.", timestamp: "10:15 AM", sources: ["DTA Full-Stack Web Engineering Curriculum"] },
    ],
    isBookmarked: true,
    isPinned: true,
    createdAt: "Aug 02, 2026",
    updatedAt: "Aug 02, 2026",
  },
  {
    id: "TH-102",
    title: "Cohort Delta Assessment Rubric Builder",
    role: "Faculty",
    category: "Teaching",
    messages: [
      { id: "M-3", sender: "user", text: "Generate a rubric for evaluating React Server Components PR submissions.", timestamp: "02:30 PM" },
      { id: "M-4", sender: "ai", text: "Here is your 4-part evaluation rubric: 1. Server/Client Separation (25%), 2. Data Fetching (25%), 3. Error Handling (25%), 4. Code Cleanliness (25%).", timestamp: "02:31 PM" },
    ],
    isBookmarked: false,
    isPinned: false,
    createdAt: "Aug 03, 2026",
    updatedAt: "Aug 03, 2026",
  },
  {
    id: "TH-103",
    title: "Q3 Enrollment & Partner Revenue Projection",
    role: "Admin",
    category: "Executive Intelligence",
    messages: [
      { id: "M-5", sender: "user", text: "Summarize revenue trend for Q3 across Paystack and Corporate Partnerships.", timestamp: "09:00 AM" },
      { id: "M-6", sender: "ai", text: "Q3 revenue is currently ₦48.2M (+22.5% YoY), with ₦34M from Paystack tuition instalments and ₦14.2M from corporate training grants.", timestamp: "09:01 AM", sources: ["ICC Finance ERP Ledger", "Paystack Webhook Sync"] },
    ],
    isBookmarked: true,
    isPinned: true,
    createdAt: "Aug 04, 2026",
    updatedAt: "Aug 04, 2026",
  },
];

export class AIConversationService {
  private static threads: ChatThread[] = [...mockThreads];

  public static getThreadsForRole(role: string): ChatThread[] {
    return this.threads.filter((t) => t.role === role);
  }

  public static getThreadById(id: string): ChatThread | undefined {
    return this.threads.find((t) => t.id === id);
  }

  public static createThread(role: "Student" | "Faculty" | "Admin", title: string, category: string): ChatThread {
    const newThread: ChatThread = {
      id: `TH-${Date.now()}`,
      title,
      role,
      category,
      messages: [],
      isBookmarked: false,
      isPinned: false,
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      updatedAt: "Just now",
    };
    this.threads.unshift(newThread);
    return newThread;
  }

  public static addMessage(threadId: string, message: Omit<ChatMessage, "id">): ChatMessage | undefined {
    const thread = this.threads.find((t) => t.id === threadId);
    if (!thread) return undefined;
    const msg: ChatMessage = { ...message, id: `M-${Date.now()}` };
    thread.messages.push(msg);
    thread.updatedAt = "Just now";
    return msg;
  }

  public static toggleBookmark(threadId: string): void {
    const thread = this.threads.find((t) => t.id === threadId);
    if (thread) thread.isBookmarked = !thread.isBookmarked;
  }

  public static togglePin(threadId: string): void {
    const thread = this.threads.find((t) => t.id === threadId);
    if (thread) thread.isPinned = !thread.isPinned;
  }
}
