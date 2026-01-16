import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { JobApplicationStatus, JobStatusSource } from "@prisma/client";

const VALID_STATUSES: JobApplicationStatus[] = ["APPLIED", "INTERVIEW", "REJECTED", "OFFER"];

interface UpdateStatusBody {
  status: string;
}

/**
 * PATCH /api/admin/job-applications/[id]/status
 *
 * Manual status override by admin.
 *
 * Payload: { status: "APPLIED" | "INTERVIEW" | "REJECTED" | "OFFER" }
 *
 * Behavior:
 * - Updates job status to the provided value
 * - Sets statusSource = MANUAL
 * - Sets statusOverriddenAt = now
 * - Creates JobStatusAudit entry with source = MANUAL
 * - Returns updated job application
 *
 * This ensures automation will not override manually-set statuses.
 */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body: UpdateStatusBody = await req.json();

    const status = body.status?.trim().toUpperCase() as JobApplicationStatus;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Fetch current job application
    const existingJob = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return NextResponse.json({ error: "Job application not found" }, { status: 404 });
    }

    const previousStatus = existingJob.status;
    const now = new Date();

    // Update job application
    const updatedJob = await prisma.jobApplication.update({
      where: { id },
      data: {
        status,
        statusSource: JobStatusSource.MANUAL,
        statusOverriddenAt: now,
      },
    });

    // Create audit log entry
    await prisma.jobStatusAudit.create({
      data: {
        jobApplicationId: id,
        previousStatus,
        newStatus: status,
        source: JobStatusSource.MANUAL,
        reason: "Manual override",
        emailMessageId: null,
      },
    });

    // Format response
    const response = {
      id: updatedJob.id,
      company: updatedJob.company,
      role: updatedJob.role,
      link: updatedJob.link,
      dateApplied: updatedJob.dateApplied.toISOString(),
      status: updatedJob.status,
      statusSource: updatedJob.statusSource,
      statusOverriddenAt: updatedJob.statusOverriddenAt?.toISOString() ?? null,
      createdAt: updatedJob.createdAt.toISOString(),
      updatedAt: updatedJob.updatedAt.toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("Update job status failed:", err);
    return NextResponse.json({ error: "Failed to update job status" }, { status: 500 });
  }
}
