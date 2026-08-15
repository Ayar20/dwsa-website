import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const cohortSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Cohort title is required"),
  cohortCode: z.string().min(3, "Cohort code is required"), // e.g. GENAI-WP-001
  programmeId: z.string().min(1, "Programme ID is required"),
  startDate: z.string(),
  endDate: z.string(),
  capacity: z.number().int().positive().default(30),
  instructorId: z.string().optional(),
  organizationId: z.string().optional(),
  status: z.enum(["UPCOMING", "ACTIVE", "COMPLETED"]).default("UPCOMING"),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR" || role === "DTA_MANAGEMENT";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const cohorts = await prisma.cohort.findMany({
      include: {
        programme: {
          select: { id: true, title: true, school: true, price: true },
        },
        instructor: {
          select: { id: true, name: true, email: true, phone: true },
        },
        organization: {
          select: { id: true, name: true },
        },
        _count: {
          select: { enrollments: true, liveClasses: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Also fetch available instructors for dropdown assignment
    const instructors = await prisma.user.findMany({
      where: { role: { in: ["INSTRUCTOR", "DTA_ADMINISTRATOR", "SUPER_ADMINISTRATOR"] } },
      select: { id: true, name: true, email: true, role: true },
    });

    return NextResponse.json({ cohorts, instructors });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch cohorts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin privileges required" }, { status: 403 });
    }

    const body = await req.json();
    const validated = cohortSchema.parse(body);

    let cohort;
    if (validated.id) {
      cohort = await prisma.cohort.update({
        where: { id: validated.id },
        data: {
          title: validated.title,
          cohortCode: validated.cohortCode,
          programmeId: validated.programmeId,
          startDate: new Date(validated.startDate),
          endDate: new Date(validated.endDate),
          capacity: validated.capacity,
          instructorId: validated.instructorId || null,
          organizationId: validated.organizationId || null,
          status: validated.status,
        },
      });
    } else {
      cohort = await prisma.cohort.create({
        data: {
          title: validated.title,
          cohortCode: validated.cohortCode,
          programmeId: validated.programmeId,
          startDate: new Date(validated.startDate),
          endDate: new Date(validated.endDate),
          capacity: validated.capacity,
          instructorId: validated.instructorId || null,
          organizationId: validated.organizationId || null,
          status: validated.status,
        },
      });
    }

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: validated.id ? "COHORT_UPDATED" : "COHORT_CREATED",
        targetId: cohort.id,
        details: `Cohort '${cohort.cohortCode}' (${cohort.title}) saved by ${session.user.email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Cohort '${cohort.cohortCode}' saved successfully.`,
      cohort,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || "Failed to save cohort" }, { status: 500 });
  }
}
