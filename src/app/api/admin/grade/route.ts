import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { submissionId, status, grade, feedback } = await req.json();
    if (!submissionId || !status) {
      return NextResponse.json({ error: "Submission ID and status are required" }, { status: 400 });
    }

    const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedSubmission = await prisma.submission.update({
      where: { id: submissionId },
      data: {
        status,
        grade: grade || null,
        feedback: feedback || null,
      },
      include: {
        user: true,
        assignment: true,
      },
    });

    console.log(`Admin/Instructor graded submission ${submissionId}: status = ${status}, grade = ${grade}`);

    return NextResponse.json({ success: true, submission: updatedSubmission });
  } catch (error: any) {
    console.error("Grading error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
