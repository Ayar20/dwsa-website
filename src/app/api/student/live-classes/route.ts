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

    // 1. Resolve active enrollment with ENROLLED status requirement
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        status: "ENROLLED",
      },
      include: {
        cohort: true,
      },
    });

    if (!enrollment) {
      return NextResponse.json({
        error: "Forbidden: An active, paid enrollment (ENROLLED status) is required to access live class schedules.",
      }, { status: 403 });
    }

    // 2. Fetch live classes scheduled for learner's assigned cohort
    const liveClasses = await prisma.liveClass.findMany({
      where: {
        cohortId: enrollment.cohortId,
      },
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        attendances: {
          where: {
            userId: session.user.id,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    // 3. Format response safely
    const formattedClasses = liveClasses.map((cls) => {
      const userAttendance = cls.attendances[0];
      return {
        id: cls.id,
        title: cls.title,
        scheduledAt: cls.scheduledAt,
        durationMins: cls.durationMins,
        meetingUrl: cls.meetingUrl,
        recordingUrl: cls.recordingUrl,
        instructorName: cls.instructor?.name || "DTA Faculty Instructor",
        attendanceStatus: userAttendance ? userAttendance.status : "UPCOMING",
      };
    });

    return NextResponse.json({
      cohortTitle: enrollment.cohort?.title || "GENAI-WP-001",
      liveClasses: formattedClasses,
    });
  } catch (error: any) {
    console.error("Fetch live classes error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
