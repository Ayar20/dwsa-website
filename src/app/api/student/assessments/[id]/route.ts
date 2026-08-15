import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    // 1. Verify learner has active ENROLLED status
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        status: "ENROLLED",
      },
    });

    if (!enrollment) {
      return NextResponse.json({
        error: "Forbidden: An active, paid enrollment (ENROLLED status) is required to access assessments.",
      }, { status: 403 });
    }

    // 2. Fetch assessment details
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            programmeId: true,
          },
        },
        attempts: {
          where: {
            userId: session.user.id,
          },
          orderBy: {
            completedAt: "desc",
          },
        },
      },
    });

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    // 3. Parse questionsJson and STRIP correct answers server-side
    let questions = [];
    try {
      const parsed = JSON.parse(assessment.questionsJson || "[]");
      questions = parsed.map((q: any) => {
        // Explicitly strip answer key and hidden evaluation metadata
        const { correctAnswer, answerKey, solution, ...safeQuestion } = q;
        return safeQuestion;
      });
    } catch (e) {
      console.error("Error parsing assessment questionsJson:", e);
    }

    const attemptsCount = assessment.attempts.length;
    const bestAttempt = assessment.attempts.find((a) => a.passed) || assessment.attempts[0];

    return NextResponse.json({
      assessment: {
        id: assessment.id,
        title: assessment.title,
        description: assessment.description,
        passScore: assessment.passScore,
        timeLimitMins: assessment.timeLimitMins,
        maxAttempts: assessment.maxAttempts,
        moduleTitle: assessment.module?.title || "Generative AI Module",
        questions,
      },
      userSummary: {
        attemptsCount,
        maxAttempts: assessment.maxAttempts,
        canAttempt: attemptsCount < assessment.maxAttempts && !bestAttempt?.passed,
        bestScore: bestAttempt ? bestAttempt.score : null,
        passed: bestAttempt ? bestAttempt.passed : false,
      },
    });
  } catch (error: any) {
    console.error("Fetch assessment error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
