import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  programmeInterest: z.string().default("Generative AI for Work & Productivity"),
  source: z.string().optional().default("Direct Website"),
  campaign: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = leadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: {
        name: validated.name,
        email: validated.email,
        phone: validated.phone || null,
        programmeInterest: validated.programmeInterest,
        source: validated.source,
        campaign: validated.campaign || null,
        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Priority enrolment notification saved successfully.",
        lead: { id: lead.id, email: lead.email },
      },
      { status: 201 }
    );
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation Error", details: err.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: err.message || "Failed to capture lead interest." },
      { status: 500 }
    );
  }
}
