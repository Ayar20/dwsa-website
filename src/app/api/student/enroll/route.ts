import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const enrollSchema = z.object({
  programmeSlug: z.string().optional().default("generative-ai-for-work-and-productivity"),
  paymentPlan: z.enum(["FULL_UPFRONT", "INSTALLMENT"]).optional().default("FULL_UPFRONT"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const validated = enrollSchema.parse(body);

    // Find programme & active cohort
    let programme = await prisma.programme.findFirst({
      where: { slug: validated.programmeSlug },
      include: { cohorts: true },
    });

    if (!programme) {
      programme = await prisma.programme.findFirst({
        include: { cohorts: true },
      });
    }

    let cohort: any = programme?.cohorts?.[0];
    if (!cohort) {
      cohort = await prisma.cohort.findFirst({
        where: { status: "UPCOMING" },
      });
    }

    if (!cohort) {
      return NextResponse.json({ error: "No active cohort found for registration" }, { status: 404 });
    }

    const tuitionPrice = programme ? Number(programme.price) : 150000.00;

    // Create or update enrollment
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId_cohortId: {
          userId: session.user.id,
          cohortId: cohort.id,
        },
      },
      update: {
        paymentPlan: validated.paymentPlan,
        totalAmount: tuitionPrice,
        status: "PENDING_PAYMENT",
      },
      create: {
        userId: session.user.id,
        cohortId: cohort.id,
        paymentPlan: validated.paymentPlan,
        totalAmount: tuitionPrice,
        amountPaid: 0.00,
        status: "PENDING_PAYMENT",
      },
      include: {
        cohort: true,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "ENROLLMENT_REGISTERED",
        details: `Student registered for cohort ${cohort.cohortCode || cohort.title} with plan ${validated.paymentPlan}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Enrolment registered successfully! Proceeding to tuition checkout...",
      enrollment,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || "Validation failed" }, { status: 400 });
    }
    console.error("Student self-enrollment error:", error);
    return NextResponse.json({ error: error.message || "Failed to register enrolment" }, { status: 500 });
  }
}
