import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const programmeSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  school: z.string().default("School of Generative Artificial Intelligence"),
  description: z.string().min(10, "Description is required"),
  objectives: z.array(z.string()).default([]),
  durationWeeks: z.number().int().default(8),
  deliveryMode: z.string().default("ONLINE_LIVE"),
  price: z.number().positive(),
  earlyBirdPrice: z.number().optional(),
  isPublished: z.boolean().default(false),
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

    const programmes = await prisma.programme.findMany({
      include: {
        cohorts: {
          include: {
            instructor: {
              select: { id: true, name: true, email: true },
            },
          },
        },
        modules: true,
        _count: {
          select: { applications: true, cohorts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ programmes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch programmes" }, { status: 500 });
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
    const validated = programmeSchema.parse(body);

    let programme;
    if (validated.id) {
      programme = await prisma.programme.update({
        where: { id: validated.id },
        data: {
          title: validated.title,
          slug: validated.slug,
          school: validated.school,
          description: validated.description,
          objectives: validated.objectives,
          durationWeeks: validated.durationWeeks,
          deliveryMode: validated.deliveryMode,
          price: validated.price,
          earlyBirdPrice: validated.earlyBirdPrice || null,
          isPublished: validated.isPublished,
        },
      });
    } else {
      programme = await prisma.programme.create({
        data: {
          title: validated.title,
          slug: validated.slug,
          school: validated.school,
          description: validated.description,
          objectives: validated.objectives,
          durationWeeks: validated.durationWeeks,
          deliveryMode: validated.deliveryMode,
          price: validated.price,
          earlyBirdPrice: validated.earlyBirdPrice || null,
          isPublished: validated.isPublished,
        },
      });
    }

    // Write audit trail
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: validated.id ? "PROGRAMME_UPDATED" : "PROGRAMME_CREATED",
        targetId: programme.id,
        details: `Programme '${programme.title}' (isPublished: ${programme.isPublished}) updated by ${session.user.email}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Programme '${programme.title}' saved successfully.`,
      programme,
    });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: err.issues }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || "Failed to save programme" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
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

    const { id, isPublished } = await req.json();
    if (!id || typeof isPublished !== "boolean") {
      return NextResponse.json({ error: "Programme ID and boolean isPublished flag required" }, { status: 400 });
    }

    const programme = await prisma.programme.update({
      where: { id },
      data: { isPublished },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "PROGRAMME_PUBLISH_TOGGLED",
        targetId: programme.id,
        details: `Programme '${programme.title}' publication status set to: ${isPublished}`,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Programme '${programme.title}' publication status set to ${isPublished ? "PUBLISHED" : "UNPUBLISHED"}.`,
      programme,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to toggle publication status" }, { status: 500 });
  }
}
