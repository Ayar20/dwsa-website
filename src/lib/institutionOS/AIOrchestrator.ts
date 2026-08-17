// InstitutionOS Multi-Provider AI Orchestrator Core — Gemini 3.6 Flash
// Deployed: 2026-08-17 | Model: gemini-3.6-flash

import { KnowledgeRetrievalService } from "./KnowledgeRetrievalService";
import { AIUsageService } from "./AIUsageService";

export type LLMProvider = "Gemini";

export interface AICompletionOptions {
  role: "Student" | "Faculty" | "Admin";
  userId?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  id: string;
  response: string;
  groundedSources: string[];
  suggestedFollowups: string[];
  providerUsed: LLMProvider;
  tokensUsed: number;
  latencyMs: number;
  timestamp: string;
}

interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  usageMetadata?: { totalTokenCount?: number };
  promptFeedback?: { blockReason?: string };
  error?: { message?: string };
}

const roleInstructions: Record<AICompletionOptions["role"], string> = {
  Student: "You are the DWSA Academy AI Learning Companion. Give clear, encouraging, original guidance. Do not provide direct answers to graded assessments; explain the approach instead.",
  Faculty: "You are the DWSA Academy Faculty AI Co-Pilot. Produce practical, constructive teaching, assessment, and feedback materials.",
  Admin: "You are the DWSA Academy Executive AI Advisor. Produce concise, decision-ready institutional briefings. Clearly label assumptions and never invent internal metrics.",
};

export class AIOrchestrator {
  public static getActiveProvider(): LLMProvider {
    return "Gemini";
  }

  public static async processRequest(prompt: string, options: AICompletionOptions): Promise<AIResponse> {
    const apiKey =
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
      process.env.GOOGLE_AI_KEY;

    if (!apiKey) throw new Error("AI service is not configured. Add GEMINI_API_KEY (or GOOGLE_API_KEY) to the server environment.");

    const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";
    const startTime = Date.now();
    const knowledge = KnowledgeRetrievalService.retrieveRelevantContext(prompt);
    const sources = knowledge.map((item) => item.title);
    const grounding = knowledge.length
      ? `\n\nUse the following internal reference material when relevant. If it does not answer the question, say so.\n${knowledge.map((item) => `- ${item.title}: ${item.content}`).join("\n")}`
      : "";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30_000);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: { parts: [{ text: roleInstructions[options.role] }] },
          contents: [{ role: "user", parts: [{ text: `${prompt}${grounding}` }] }],
          generationConfig: { temperature: options.temperature ?? 0.7, maxOutputTokens: options.maxTokens ?? 2048 },
        }),
      });
      const payload = (await response.json()) as GeminiResponse;
      if (!response.ok) throw new Error(payload.error?.message || `Gemini request failed (${response.status}).`);

      const responseText = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();
      if (!responseText) throw new Error(payload.promptFeedback?.blockReason ? "The AI provider blocked this request." : "The AI provider returned no text.");

      const tokensUsed = payload.usageMetadata?.totalTokenCount ?? 0;
      AIUsageService.recordUsage(options.role, options.userId || "anonymous", tokensUsed);
      return { id: `AI-RESP-${Date.now()}`, response: responseText, groundedSources: sources, suggestedFollowups: [], providerUsed: "Gemini", tokensUsed, latencyMs: Date.now() - startTime, timestamp: new Date().toLocaleTimeString() };
    } finally {
      clearTimeout(timeout);
    }
  }
}
