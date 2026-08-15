import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const role = session.user.role || "LEARNER";
    const isInstructor = role === "INSTRUCTOR";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR" || role === "DTA_MANAGEMENT";

    if (!isInstructor && !isAdmin) {
      return NextResponse.json({ error: "Forbidden: Instructor or Admin privileges required" }, { status: 403 });
    }

    // Cohort-scoped filtering logic for instructors
    let cohortWhereClause: any = {};
    if (isInstructor) {
      cohortWhereClause = { instructorId: session.user.id };
    }

    // Find cohorts assigned to instructor (or all cohorts for admin)
    const assignedCohorts = await prisma.cohort.findMany({
      where: cohortWhereClause,
      select: { id: true, cohortCode: true, title: true },
    });

    const cohortIds = assignedCohorts.map((c) => c.id);

    // Fetch submissions belonging to students enrolled in assigned cohorts
    const submissions = await prisma.submission.findMany({
      where: {
        user: {
          enrollments: {
            some: {
              cohortId: { in: cohortIds },
            },
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        assignment: {
          include: {
            module: {
              select: {
                id: true,
                title: true,
                programmeId: true,
              },
            },
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    const formattedSubmissions = submissions.map((s) => ({
      id: s.id,
      assignmentId: s.assignmentId,
      assignmentTitle: s.assignment.title,
      moduleTitle: s.assignment.module.title,
      studentId: s.userId,
      studentName: s.user.name || "Learner",
      studentEmail: s.user.email,
      githubPRUrl: s.githubPRUrl,
      status: s.status,
      grade: s.grade,
      feedback: s.feedback,
      submittedAt: s.submittedAt,
    }));

    return NextResponse.json({
      assignedCohorts,
      submissions: formattedSubmissions,
    });
  } catch (error: any) {
    console.error("Fetch instructor submissions error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
