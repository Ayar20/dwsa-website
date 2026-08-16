export interface AIResponse { response: string; groundedSources: string[]; timestamp: string; }

export async function requestAI(prompt: string, role: "Student" | "Faculty" | "Admin"): Promise<AIResponse> {
  const response = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, role }) });
  const body = await response.json() as AIResponse & { error?: string };
  if (!response.ok) throw new Error(body.error || "Unable to generate an AI response.");
  return body;
}
