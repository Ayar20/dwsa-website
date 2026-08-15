import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  applicationId: z.string(),
  status: z.enum(["SUBMITTED", "UNDER_REVIEW", "APPROVED", "REJECTED", "WITHDRAWN"]),
  reviewNotes: z.string().optional(),
});

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");

    const whereClause: any = {};
    if (statusFilter) {
      whereClause.status = statusFilter;
    }

    const applications = await prisma.application.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            country: true,
            state: true,
            professionalBackground: true,
            experienceLevel: true,
            preferredFormat: true,
          },
        },
        programme: {
          select: {
            id: true,
            title: true,
            school: true,
            slug: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ applications });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch applications" }, { status: 500 });
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
    const validated = reviewSchema.parse(body);

    const app = await prisma.application.findUnique({
      where: { id: validated.applicationId },
      include: { user: true, programme: true },
    });

    if (!app) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const updatedApp = await prisma.application.update({
      where: { id: validated.applicationId },
      data: {
        status: validated.status,
        reviewNotes: validated.reviewNotes || app.reviewNotes,
        reviewedBy: session.user.email,
      },
    });

    // Write immutable audit trail
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: `ADMISSIONS_APPLICATION_${validated.status}`,
        targetId: app.id,
        details: `Application status for candidate ${app.user.email} updated to ${validated.status}. Notes: ${validated.reviewNotes || "None"}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Candidate application status updated to ${validated.status}`,
      application: updatedApp,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || "Failed to update application" }, { status: 500 });
  }
}
