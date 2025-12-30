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
