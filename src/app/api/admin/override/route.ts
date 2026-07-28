import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { enrollmentId, status } = await req.json();
    if (!enrollmentId || !status) {
      return NextResponse.json({ error: "Enrollment ID and status are required" }, { status: 400 });
    }

    const validStatuses = ["PENDING", "ACTIVE", "SUSPENDED", "GRADUATED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status },
      include: { user: true },
    });

    console.log(`Admin override: Updated enrollment ${enrollmentId} status to ${status}`);

    return NextResponse.json({ success: true, enrollment: updatedEnrollment });
  } catch (error: any) {
    console.error("Admin override error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
