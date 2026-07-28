import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get user enrollment details
    const enrollment = await prisma.enrollment.findFirst({
      where: { userId: session.user.id },
      include: {
        cohort: true,
        paymentRecords: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json({
        enrolled: false,
        message: "You are not enrolled in any cohort yet.",
      });
    }

    // 2. Fetch track, modules, and assignments. 
    // Since there's one main track, we'll fetch the first available track or search for it.
    const track = await prisma.track.findFirst({
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            assignments: {
              include: {
                submissions: {
                  where: { userId: session.user.id },
                },
              },
            },
          },
        },
      },
    });

    if (!track) {
      return NextResponse.json({
        enrolled: true,
        enrollment,
        track: null,
        progressPercent: 0,
      });
    }

    // 3. Calculate progress percentage (approved submissions / total assignments)
    let totalAssignmentsCount = 0;
    let approvedSubmissionsCount = 0;

    track.modules.forEach((mod) => {
      mod.assignments.forEach((assignment) => {
        totalAssignmentsCount++;
        const submission = assignment.submissions[0];
        if (submission && submission.status === "APPROVED") {
          approvedSubmissionsCount++;
        }
      });
    });

    const progressPercent = totalAssignmentsCount > 0 
      ? Math.round((approvedSubmissionsCount / totalAssignmentsCount) * 100) 
      : 0;

    return NextResponse.json({
      enrolled: true,
      enrollment,
      track,
      progressPercent,
    });
  } catch (error: any) {
    console.error("Student dashboard fetch error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
