import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
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
        error: "Forbidden: An active, paid enrollment (ENROLLED status) is required to submit assessment attempts.",
      }, { status: 403 });
    }

    // 2. Fetch assessment record
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        attempts: {
          where: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!assessment) {
      return NextResponse.json({ error: "Assessment not found" }, { status: 404 });
    }

    // 3. Verify attempt limits
    if (assessment.attempts.length >= assessment.maxAttempts) {
      return NextResponse.json({
        error: `Maximum attempts limit (${assessment.maxAttempts}) reached for this assessment.`,
      }, { status: 400 });
    }

    const { submittedAnswers } = await req.json();
    if (!submittedAnswers || typeof submittedAnswers !== "object") {
      return NextResponse.json({ error: "Invalid submitted answers format" }, { status: 400 });
    }

    // 4. Authoritative Server-Side Scoring Calculation
    let rawQuestions: any[] = [];
    try {
      rawQuestions = JSON.parse(assessment.questionsJson || "[]");
    } catch (e) {
      console.error("Error parsing assessment questionsJson:", e);
    }

    let earnedPoints = 0;
    let totalPossiblePoints = 0;

    rawQuestions.forEach((q: any, idx: number) => {
      const qId = q.id || `q_${idx + 1}`;
      const questionWeight = q.points || 10;
      totalPossiblePoints += questionWeight;

      const studentAnswer = submittedAnswers[qId] || submittedAnswers[idx];
      const expectedAnswer = q.correctAnswer || q.answerKey;

      if (studentAnswer && expectedAnswer && String(studentAnswer).trim().toLowerCase() === String(expectedAnswer).trim().toLowerCase()) {
        earnedPoints += questionWeight;
      }
    });

    const calculatedScore = totalPossiblePoints > 0
      ? Math.round((earnedPoints / totalPossiblePoints) * 100 * 10) / 10
      : 0;

    const isPassed = calculatedScore >= assessment.passScore;

    // 5. Create AssessmentAttempt
    const attempt = await prisma.assessmentAttempt.create({
      data: {
        assessmentId: assessment.id,
        userId: session.user.id,
        score: calculatedScore,
        passed: isPassed,
        answersJson: JSON.stringify(submittedAnswers),
      },
    });

    // 6. Write AuditLog entry
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "ASSESSMENT_SUBMITTED",
        targetId: attempt.id,
        details: `Assessment "${assessment.title}" submitted. Score: ${calculatedScore}% (${isPassed ? "PASSED" : "FAILED"}).`,
      },
    });

    return NextResponse.json({
      success: true,
      attemptId: attempt.id,
      score: calculatedScore,
      passed: isPassed,
      passScore: assessment.passScore,
      completedAt: attempt.completedAt,
    });
  } catch (error: any) {
    console.error("Submit assessment error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
