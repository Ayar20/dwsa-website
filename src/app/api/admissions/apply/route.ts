import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const applicationSchema = z.object({
  programmeId: z.string().optional(),
  programmeTitle: z.string().default("Generative AI for Work & Productivity"),
  country: z.string().min(2, "Country is required"),
  state: z.string().optional(),
  phone: z.string().min(5, "Phone number is required"),
  professionalBackground: z.string().min(5, "Please describe your professional background"),
  experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  preferredFormat: z.enum(["SELF_PACED", "INSTRUCTOR_LED", "HYBRID"]),
  backgroundNotes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to submit your DTA admissions application." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const validated = applicationSchema.parse(body);

    // IDOR Protection: Fetch user based strictly on session email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User account not found." }, { status: 404 });
    }

    // 1. Update user profile details
    await prisma.user.update({
      where: { id: user.id },
      data: {
        phone: validated.phone,
        country: validated.country,
        state: validated.state || null,
        professionalBackground: validated.professionalBackground,
        experienceLevel: validated.experienceLevel,
        preferredFormat: validated.preferredFormat,
        role: user.role === "PUBLIC_VISITOR" ? "APPLICANT" : user.role,
      },
    });

    // 2. Find or create Programme
    let programme = await prisma.programme.findFirst({
      where: {
        OR: [
          { id: validated.programmeId },
          { title: validated.programmeTitle },
          { slug: "generative-ai-for-work-and-productivity" },
        ],
      },
    });

    if (!programme) {
      programme = await prisma.programme.create({
        data: {
          title: validated.programmeTitle,
          slug: "generative-ai-for-work-and-productivity",
          school: "School of Generative Artificial Intelligence",
          description: "Flagship 8-week DTA programme in workplace AI automation and prompt engineering.",
          durationWeeks: 8,
          deliveryMode: validated.preferredFormat,
          price: 150000.00,
          earlyBirdPrice: 120000.00,
          isPublished: false,
        },
      });
    }

    // 3. Check for existing active application for this programme
    const existingApp = await prisma.application.findFirst({
      where: {
        userId: user.id,
        programmeId: programme.id,
      },
    });

    if (existingApp) {
      return NextResponse.json({
        success: true,
        message: "Your application for this programme has already been received.",
        application: existingApp,
      });
    }

    // 4. Create new Application
    const application = await prisma.application.create({
      data: {
        userId: user.id,
        programmeId: programme.id,
        status: "SUBMITTED",
        backgroundNotes: validated.backgroundNotes || validated.professionalBackground,
      },
    });

    // Log to AuditLog
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: "ADMISSIONS_APPLICATION_SUBMITTED",
        targetId: application.id,
        details: `Application submitted for programme: ${programme.title}`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your admissions application for DWSA Digital Technology Academy has been submitted successfully!",
        application,
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
      { error: err.message || "Failed to submit admissions application." },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        applications: {
          include: {
            programme: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        country: user.country,
        state: user.state,
        professionalBackground: user.professionalBackground,
        experienceLevel: user.experienceLevel,
        preferredFormat: user.preferredFormat,
        role: user.role,
      },
      applications: user.applications,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch application status" }, { status: 500 });
  }
}
