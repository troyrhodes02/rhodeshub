import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VALID_STATUSES = ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"] as const;
type JobApplicationStatus = (typeof VALID_STATUSES)[number];

interface CreateJobApplicationBody {
  company: string;
  role: string;
  link: string;
  dateApplied: string;
  status: string;
}

export interface JobApplicationListItem {
  id: string;
  company: string;
  role: string;
  link: string;
  dateApplied: string;
  status: JobApplicationStatus;
  createdAt: string;
  updatedAt: string;
  lastActivityAt: string;
  latestEmailReceivedAt?: string;
}

export async function GET() {
  try {
    const jobApplications = await prisma.jobApplication.findMany({
      include: {
        emails: {
          take: 1,
          orderBy: { receivedAt: "desc" },
          select: { receivedAt: true },
        },
      },
    });

    // Compute lastActivityAt and format response
    const items: JobApplicationListItem[] = jobApplications.map((job) => {
      const latestEmailReceivedAt = job.emails[0]?.receivedAt;
      const lastActivityAt =
        latestEmailReceivedAt && latestEmailReceivedAt > job.updatedAt
          ? latestEmailReceivedAt
          : job.updatedAt;

      return {
        id: job.id,
        company: job.company,
        role: job.role,
        link: job.link,
        dateApplied: job.dateApplied.toISOString(),
        status: job.status as JobApplicationStatus,
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
        lastActivityAt: lastActivityAt.toISOString(),
        latestEmailReceivedAt: latestEmailReceivedAt?.toISOString(),
      };
    });

    // Sort by lastActivityAt descending
    items.sort(
      (a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime()
    );

    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    console.error("Fetch JobApplications failed:", err);
    return NextResponse.json({ error: "Failed to fetch job applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateJobApplicationBody = await req.json();

    const { company, role, link, dateApplied, status } = body;

    if (!company || !role || !link || !dateApplied || !status) {
      return NextResponse.json(
        { error: "Missing required fields: company, role, link, dateApplied, status" },
        { status: 400 }
      );
    }

    if (!VALID_STATUSES.includes(status as JobApplicationStatus)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const parsedDate = new Date(dateApplied);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid dateApplied format. Provide a valid ISO date string." },
        { status: 400 }
      );
    }

    const jobApplication = await prisma.jobApplication.create({
      data: {
        company,
        role,
        link,
        dateApplied: parsedDate,
        status: status as JobApplicationStatus,
      },
    });

    return NextResponse.json(jobApplication, { status: 201 });
  } catch (err) {
    console.error("Create JobApplication failed:", err);
    return NextResponse.json({ error: "Failed to create job application" }, { status: 500 });
  }
}
