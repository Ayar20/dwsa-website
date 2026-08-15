import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const assignSchema = z.object({
  applicationId: z.string(),
  cohortId: z.string(),
  paymentPlan: z.enum(["FULL_UPFRONT", "INSTALLMENT"]).default("FULL_UPFRONT"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const validated = assignSchema.parse(body);

    // 1. Fetch application
    const application = await prisma.application.findUnique({
      where: { id: validated.applicationId },
      include: { user: true, programme: true },
    });

    if (!application) {
      return NextResponse.json({ error: "Admissions application not found" }, { status: 404 });
    }

    if (application.status !== "APPROVED") {
      return NextResponse.json(
        { error: "Application must be APPROVED before assigning candidate to a cohort." },
        { status: 400 }
      );
    }

    // 2. Fetch target cohort
    const cohort = await prisma.cohort.findUnique({
      where: { id: validated.cohortId },
    });

    if (!cohort) {
      return NextResponse.json({ error: "Target cohort not found" }, { status: 404 });
    }

    const totalTuition = application.programme.price;

    // 3. Create Enrollment with @@unique([userId, cohortId]) protection
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId_cohortId: {
          userId: application.userId,
          cohortId: cohort.id,
        },
      },
      update: {
        paymentPlan: validated.paymentPlan,
        totalAmount: totalTuition,
      },
      create: {
        userId: application.userId,
        cohortId: cohort.id,
        paymentPlan: validated.paymentPlan,
        totalAmount: totalTuition,
        amountPaid: 0.00,
        status: "PENDING_PAYMENT",
      },
    });

    // 4. Update candidate role to LEARNER if still APPLICANT
    if (application.user.role === "APPLICANT") {
      await prisma.user.update({
        where: { id: application.userId },
        data: { role: "LEARNER" },
      });
    }

    // 5. Audit Log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "ENROLMENT_COHORT_ASSIGNED",
        targetId: enrollment.id,
        details: `Candidate ${application.user.email} assigned to Cohort ${cohort.cohortCode} (${cohort.title}). Enrolment status: PENDING_PAYMENT`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Candidate ${application.user.name || application.user.email} assigned to Cohort ${cohort.cohortCode} successfully.`,
      enrollment,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || "Failed to assign cohort enrolment" }, { status: 500 });
  }
}
