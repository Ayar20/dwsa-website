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

    const role = session.user.role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR" || role === "DTA_MANAGEMENT";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    // 1. Calculate Aggregates
    const enrollments = await prisma.enrollment.findMany({
      include: { user: true, cohort: true },
    });

    const activeStudents = enrollments.filter(e => e.status === "ENROLLED").length;
    const suspendedStudents = enrollments.filter(e => e.status === "SUSPENDED").length;
    const totalRevenue = enrollments.reduce((acc, curr) => acc + Number(curr.amountPaid), 0);

    const pendingSubmissionsCount = await prisma.submission.count({
      where: { status: "PENDING" },
    });

    // 2. Student Ledger List
    const ledger = enrollments.map(e => ({
      enrollmentId: e.id,
      userId: e.userId,
      name: e.user.name,
      email: e.user.email,
      phone: e.user.phone,
      cohort: e.cohort?.title || "Default Cohort",
      paymentPlan: e.paymentPlan,
      totalAmount: Number(e.totalAmount),
      amountPaid: Number(e.amountPaid),
      status: e.status,
    }));

    // 3. Pending Submissions List for Grading Desk
    const pendingSubmissions = await prisma.submission.findMany({
      where: { status: "PENDING" },
      include: {
        user: true,
        assignment: {
          include: {
            module: true,
          },
        },
      },
      orderBy: { submittedAt: "desc" },
    });

    return NextResponse.json({
      stats: {
        totalRevenue,
        activeStudents,
        suspendedStudents,
        pendingSubmissions: pendingSubmissionsCount,
      },
      ledger,
      pendingSubmissions,
    });
  } catch (error: any) {
    console.error("Admin dashboard fetch error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
