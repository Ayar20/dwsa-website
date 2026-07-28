import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.module.deleteMany();
  await prisma.track.deleteMany();
  await prisma.paymentRecord.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.cohort.deleteMany();
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
      role: "ADMIN",
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
      role: "STUDENT",
      prideAccepted: false, // Will prompt P.R.I.D.E modal on first login
    },
  });

  const suspendedStudent = await prisma.user.create({
    data: {
      name: "Amara Kalu",
      email: "suspended@dwsa.edu",
      passwordHash: studentPassword,
      phone: "+2348044445555",
      role: "STUDENT",
      prideAccepted: true,
    },
  });

  console.log("Users created:", { admin: admin.email, instructor: instructor.email, student: activeStudent.email, suspended: suspendedStudent.email });

  // 2. Cohorts
  const cohort = await prisma.cohort.create({
    data: {
      title: "Cohort 5 (Alpha)",
      startDate: new Date("2026-07-01"),
      endDate: new Date("2026-10-01"),
      status: "ACTIVE",
    },
  });

  console.log("Cohort created:", cohort.title);

  // 3. Enrollments & Payments
  const enrollmentActive = await prisma.enrollment.create({
    data: {
      userId: activeStudent.id,
      cohortId: cohort.id,
      paymentPlan: "INSTALLMENT",
      totalAmount: 180000,
      amountPaid: 100000,
      status: "ACTIVE",
    },
  });

  await prisma.paymentRecord.create({
    data: {
      enrollmentId: enrollmentActive.id,
      paystackRef: "T_MOCK_REF_11111",
      amount: 100000,
      channel: "card",
    },
  });

  const enrollmentSuspended = await prisma.enrollment.create({
    data: {
      userId: suspendedStudent.id,
      cohortId: cohort.id,
      paymentPlan: "INSTALLMENT",
      totalAmount: 180000,
      amountPaid: 50000,
      status: "SUSPENDED",
    },
  });

  await prisma.paymentRecord.create({
    data: {
      enrollmentId: enrollmentSuspended.id,
      paystackRef: "T_MOCK_REF_22222",
      amount: 50000,
      channel: "ussd",
    },
  });

  console.log("Enrollments created.");

  // 4. Tracks & Modules with YouTube Video Feeds
  const track = await prisma.track.create({
    data: {
      title: "Software Engineering & AI",
      slug: "software-engineering-ai",
      description: "Comprehensive pathway covering front-end, back-end, cloud deployment, and integration of AI APIs.",
    },
  });

  const m1 = await prisma.module.create({
    data: {
      trackId: track.id,
      title: "Module 1: Git & Version Control Workflow",
      order: 1,
      youtubeId: "RGOj5yH7evE",
      durationMinutes: 45,
      isFreePreview: true,
      githubStarterRepo: "https://github.com/dwsa-academy/git-starter",
      contentMarkdown: `## Welcome to Module 1: Git & Version Control Workflow
Git is the industry standard for code versioning and collaborative software development. Watch the HD masterclass above before attempting the practical assignments.

### Key Objectives
1. **Repository Initialization**: Setting up local Git configuration.
2. **Branching & Merging**: Creating feature branches and resolving merge conflicts.
3. **Pull Request Protocol**: Pushing code to GitHub and opening verified PRs.

### Task Instructions
Clone the starter repository below, create a feature branch \`feature/my-first-pr\`, commit your code changes, push to your GitHub account, and submit the Pull Request link in the submission box.`,
    },
  });

  const m2 = await prisma.module.create({
    data: {
      trackId: track.id,
      title: "Module 2: HTML/CSS & Modern Tailwind CSS",
      order: 2,
      youtubeId: "mU6anWqZJcc",
      durationMinutes: 60,
      isFreePreview: false,
      githubStarterRepo: "https://github.com/dwsa-academy/typescript-advanced",
      contentMarkdown: `## Welcome to Module 2: HTML/CSS & Modern Tailwind CSS
Learn to construct high-performance, responsive web interfaces using semantic HTML5 elements and Tailwind CSS design tokens.

### Key Objectives
1. **Semantic HTML5 Layouts**: Structural landmarks (\`<header>\`, \`<main>\`, \`<section>\`, \`<article>\`).
2. **Tailwind Design Systems**: Utility-first styling, responsive break-points, and glassmorphism.
3. **Flexbox & Grid Alignment**: Dynamic container math and media queries.`,
    },
  });

  const m3 = await prisma.module.create({
    data: {
      trackId: track.id,
      title: "Module 3: Full Stack Next.js App Router",
      order: 3,
      youtubeId: "SqcY0GlETPk",
      durationMinutes: 90,
      isFreePreview: false,
      githubStarterRepo: "https://github.com/dwsa-academy/nextjs-starter",
      contentMarkdown: `## Welcome to Module 3: Full Stack Next.js App Router
Master modern React server architecture, API routing, NextAuth.js role-based guards, and Prisma PostgreSQL ORM integration.

### Key Objectives
1. **Server vs Client Components**: Static pre-rendering, dynamic server rendering, and hydration.
2. **Prisma ORM & PostgreSQL**: Database schemas, migrations, and relationship joins.
3. **API Route Handlers**: Secure REST endpoints, webhooks, and session management.`,
    },
  });

  console.log("Track and Modules created.");

  // 5. Assignments & Submissions
  const a1 = await prisma.assignment.create({
    data: {
      moduleId: m1.id,
      title: "Assignment 1.1: Git Repository Setup & Push",
      instructions: "Clone the starter repo, add a README.md file with your profile name, commit, and push it to your own public GitHub repository.",
      githubPRRequired: false,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  const a2 = await prisma.assignment.create({
    data: {
      moduleId: m1.id,
      title: "Assignment 1.2: Branching and Pull Request",
      instructions: "Clone the starter repo, create a branch named 'feature/profile', update index.html, commit, push, create a Pull Request on GitHub, and submit the PR link.",
      githubPRRequired: true,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.submission.create({
    data: {
      userId: activeStudent.id,
      assignmentId: a1.id,
      githubPRUrl: "https://github.com/student/git-starter/pull/1",
      status: "PENDING",
    },
  });

  console.log("Assignments & Sample Submission created successfully.");
  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
