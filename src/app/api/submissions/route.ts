import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const GITHUB_PR_REGEX = /^https:\/\/github\.com\/([a-zA-Z0-9_-]+)\/([a-zA-Z0-9_-]+)\/pull\/([0-9]+)$/;

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { assignmentId, githubPRUrl } = await req.json();
    if (!assignmentId) {
      return NextResponse.json({ error: "Assignment ID is required" }, { status: 400 });
    }

    // 1. Verify student has an ACTIVE enrollment
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,
        status: "ACTIVE",
      },
    });

    if (!enrollment) {
      return NextResponse.json({
        error: "Your access is currently locked. An active, paid enrollment is required to submit assignments.",
      }, { status: 403 });
    }

    // 2. Fetch the assignment details
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      return NextResponse.json({ error: "Assignment not found" }, { status: 404 });
    }

    // 3. GitHub PR Validation
    if (assignment.githubPRRequired) {
      if (!githubPRUrl) {
        return NextResponse.json({ error: "A GitHub Pull Request URL is required for this assignment" }, { status: 400 });
      }

      const match = githubPRUrl.trim().match(GITHUB_PR_REGEX);
      if (!match) {
        return NextResponse.json({
          error: "Invalid GitHub PR URL. Format must be: https://github.com/owner/repo/pull/number",
        }, { status: 400 });
      }

      const owner = match[1];
      const repo = match[2];
      const pullNumber = match[3];

      const githubPat = process.env.GITHUB_PAT;
      if (githubPat) {
        // Real GitHub API check
        try {
          const githubResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`, {
            headers: {
              Authorization: `token ${githubPat}`,
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "DWSA-Academy-Platform",
            },
          });

          if (!githubResponse.ok) {
            return NextResponse.json({
              error: `GitHub repository or Pull Request not found. Status: ${githubResponse.statusText}`,
            }, { status: 400 });
          }

          const prData = await githubResponse.json();
          console.log(`GitHub PR Verified: ${prData.html_url} (${prData.state})`);
        } catch (e: any) {
          console.error("Error calling GitHub API:", e);
          // Allow fallback if network issue
        }
      } else {
        console.warn("GITHUB_PAT is missing. Mock-validating GitHub PR URL...");
      }
    }

    // 4. Create or update submission
    const existingSubmission = await prisma.submission.findFirst({
      where: {
        assignmentId,
        userId: session.user.id,
      },
    });

    let submission;
    if (existingSubmission) {
      submission = await prisma.submission.update({
        where: { id: existingSubmission.id },
        data: {
          githubPRUrl,
          status: "PENDING",
          feedback: null,
          grade: null,
          submittedAt: new Date(),
        },
      });
    } else {
      submission = await prisma.submission.create({
        data: {
          userId: session.user.id,
          assignmentId,
          githubPRUrl,
          status: "PENDING",
        },
      });
    }

    return NextResponse.json({ success: true, submission });
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
