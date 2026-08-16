import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { AIOrchestrator } from "@/lib/institutionOS/AIOrchestrator";

const requestSchema = z.object({ prompt: z.string().trim().min(1).max(12_000), role: z.enum(["Student", "Faculty", "Admin"]) });
const allowedRoles = {
  Student: ["LEARNER", "STUDENT", "CORPORATE_LEARNER"],
  Faculty: ["INSTRUCTOR", "FACULTY"],
  Admin: ["DTA_ADMINISTRATOR", "ADMIN", "SUPER_ADMINISTRATOR", "SUPER_ADMIN", "DTA_MANAGEMENT"],
};

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { prompt, role } = requestSchema.parse(await request.json());
    if (!allowedRoles[role].includes(session.user.role)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    return NextResponse.json(await AIOrchestrator.processRequest(prompt, { role, userId: session.user.id }));
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Provide a prompt of up to 12,000 characters." }, { status: 400 });
    console.error("AI chat request failed:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to generate an AI response." }, { status: 502 });
  }
}
