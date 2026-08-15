import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data in dependency order
  await prisma.auditLog.deleteMany();
  await prisma.certificateRecord.deleteMany();
  await prisma.assessmentAttempt.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.liveClass.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.module.deleteMany();
  await prisma.track.deleteMany();
  await prisma.paymentRecord.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.application.deleteMany();
  await prisma.cohort.deleteMany();
  await prisma.programme.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  // Create Hashed Passwords
  const adminPassword = bcrypt.hashSync("admin123", 10);
  const instructorPassword = bcrypt.hashSync("instructor123", 10);
  const studentPassword = bcrypt.hashSync("student123", 10);

  // 1. Users
  const admin = await prisma.user.create({
    data: {
      name: "DWSA Admin",
      email: "admin@dwsa.edu",
      passwordHash: adminPassword,
      phone: "+2348011112222",
      role: "DTA_ADMINISTRATOR",
      prideAccepted: true,
    },
  });

  const instructor = await prisma.user.create({
    data: {
      name: "Efe Otaru",
      email: "instructor@dwsa.edu",
      passwordHash: instructorPassword,
      phone: "+2348022223333",
      role: "INSTRUCTOR",
      prideAccepted: true,
    },
  });

  const activeStudent = await prisma.user.create({
    data: {
      name: "Chidi Benson",
      email: "student@dwsa.edu",
      passwordHash: studentPassword,
      phone: "+2348033334444",
      role: "LEARNER",
      prideAccepted: false,
    },
  });

  console.log("Users created:", { admin: admin.email, instructor: instructor.email, student: activeStudent.email });

  // 2. Flagship Programme
  const flagshipProgramme = await prisma.programme.create({
    data: {
      title: "Generative AI for Work & Productivity",
      slug: "generative-ai-for-work-and-productivity",
      school: "School of Generative Artificial Intelligence",
      description: "Master workplace AI automation, prompt engineering, agentic workflows, custom GPT construction, and document intelligence.",
      objectives: [
        "Master prompt engineering & zero-shot/few-shot technique",
        "Build workplace AI agents and automated email/document workflows",
        "Construct custom GPTs & domain-specific knowledge bases",
        "Deploy enterprise AI tools safely adhering to data privacy standards",
      ],
      durationWeeks: 8,
      deliveryMode: "ONLINE_LIVE",
      price: 150000.00,
      earlyBirdPrice: 120000.00,
      isPublished: false,
    },
  });

  console.log("Flagship Programme created:", flagshipProgramme.title);

  // 3. Initial Cohort (GENAI-WP-001)
  const cohort = await prisma.cohort.create({
    data: {
      programmeId: flagshipProgramme.id,
      cohortCode: "GENAI-WP-001",
      title: "Generative AI Cohort 1 (Alpha)",
      startDate: new Date("2026-09-01"),
      endDate: new Date("2026-10-31"),
      capacity: 30,
      instructorId: instructor.id,
      status: "UPCOMING",
    },
  });

  console.log("Cohort created:", cohort.cohortCode);

  // 4. Sample Lead & Admissions Application
  await prisma.lead.create({
    data: {
      name: "Dr. Adaeze Okonkwo",
      email: "adaeze@example.com",
      phone: "+2348099998888",
      programmeInterest: "Generative AI for Work & Productivity",
      source: "LinkedIn",
      campaign: "GENAI-SEPT-2026",
      status: "NEW",
    },
  });

  await prisma.application.create({
    data: {
      userId: activeStudent.id,
      programmeId: flagshipProgramme.id,
      status: "SUBMITTED",
      backgroundNotes: "Executive Manager seeking to automate organizational workflow reporting.",
    },
  });

  console.log("Seeding complete successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
