import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
  country: z.string().optional().default("Nigeria"),
  programmeSlug: z.string().optional().default("generative-ai-for-work-and-productivity"),
  paymentPlan: z.enum(["FULL_UPFRONT", "INSTALLMENT"]).optional().default("FULL_UPFRONT"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.parse(body);

    const emailNormalized = validated.email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in." },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = bcrypt.hashSync(validated.password, 10);

    // Find or locate flagship programme
    let programme = await prisma.programme.findFirst({
      where: { slug: validated.programmeSlug },
      include: { cohorts: true },
    });

    if (!programme) {
      programme = await prisma.programme.findFirst({
        include: { cohorts: true },
      });
    }

    // Create User account
    const newUser = await prisma.user.create({
      data: {
        name: validated.name.trim(),
        email: emailNormalized,
        passwordHash,
        phone: validated.phone?.trim() || null,
        country: validated.country,
        role: "LEARNER",
        prideAccepted: true,
      },
    });

    // Locate active cohort for the programme
    let cohort = programme?.cohorts?.[0];
    if (!cohort) {
      cohort = await prisma.cohort.findFirst({
        where: { status: "UPCOMING" },
      });
    }

    // Create Enrolment in PENDING_PAYMENT status
    if (cohort) {
      const tuitionPrice = programme ? Number(programme.price) : 150000.00;
      await prisma.enrollment.create({
        data: {
          userId: newUser.id,
          cohortId: cohort.id,
          paymentPlan: validated.paymentPlan,
          totalAmount: tuitionPrice,
          amountPaid: 0.00,
          status: "PENDING_PAYMENT",
        },
      });
    }

    // Record audit log
    await prisma.auditLog.create({
      data: {
        userId: newUser.id,
        action: "APPLICANT_REGISTERED",
        details: `New learner registration for ${programme?.title || "DTA Programme"} (${emailNormalized})`,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account registered successfully! Redirecting to student workspace...",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to register account" },
      { status: 500 }
    );
  }
}
