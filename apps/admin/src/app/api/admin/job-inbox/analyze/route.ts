import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeEmailAndApplyAutomation } from "@/lib/emailAutomationPipeline";
import { EmailClassificationLabel, JobApplicationStatus } from "@prisma/client";

interface AnalyzeResult {
  emailId: string;
  label: EmailClassificationLabel;
  jobStatusChanged: boolean;
}

interface AnalyzeResponse {
  processed: number;
  updatedJobStatuses: number;
  results: AnalyzeResult[];
}

// Email classification → expected Job status mapping
const LABEL_TO_JOB_STATUS: Partial<Record<EmailClassificationLabel, JobApplicationStatus>> = {
  INTERVIEW: JobApplicationStatus.INTERVIEW,
  REJECTION: JobApplicationStatus.REJECTED,
  OFFER: JobApplicationStatus.OFFER,
};

// Status rank for checking if update is needed
const STATUS_RANK: Record<JobApplicationStatus, number> = {
  APPLIED: 1,
  INTERVIEW: 2,
  OFFER: 3,
  REJECTED: 99,
};

/**
 * POST /api/admin/job-inbox/analyze
 *
 * Analyzes emails and applies automation (classification + status sync).
 *
 * Behavior:
 * - Finds emails that need processing:
 *   1. Unclassified emails (classifiedAt null OR label UNCLASSIFIED)
 *   2. Linked emails where job status might need updating (re-sync)
 * - Processes them sequentially with analyzeEmailAndApplyAutomation
 * - Returns summary of processed emails and status updates
 *
 * This endpoint handles both initial classification AND status re-sync.
 */
export async function POST() {
  try {
    // Find emails that need processing
    // 1. Unclassified emails
    const unclassifiedEmails = await prisma.emailMessage.findMany({
      where: {
        OR: [
          { classifiedAt: null },
          { classificationLabel: EmailClassificationLabel.UNCLASSIFIED },
        ],
      },
      select: { id: true },
      orderBy: { receivedAt: "asc" },
    });

    // 2. Linked emails that might need status sync
    // (classified emails linked to jobs where status might be out of sync)
    const linkedClassifiedEmails = await prisma.emailMessage.findMany({
      where: {
        jobApplicationId: { not: null },
        classifiedAt: { not: null },
        classificationLabel: {
          in: [
            EmailClassificationLabel.INTERVIEW,
            EmailClassificationLabel.OFFER,
            EmailClassificationLabel.REJECTION,
          ],
        },
      },
      select: {
        id: true,
        classificationLabel: true,
        jobApplication: {
          select: { status: true, statusSource: true, statusOverriddenAt: true },
        },
      },
      orderBy: { receivedAt: "asc" },
    });

    // Filter linked emails to those that need status update
    const emailsNeedingSync = linkedClassifiedEmails.filter((email) => {
      if (!email.jobApplication) return false;
      
      const expectedStatus = LABEL_TO_JOB_STATUS[email.classificationLabel];
      if (!expectedStatus) return false;

      const job = email.jobApplication;
      
      // Skip if manually overridden
      if (job.statusSource === "MANUAL" && job.statusOverriddenAt) return false;
      
      // Skip if already at expected status or higher (no downgrades)
      const currentRank = STATUS_RANK[job.status];
      const expectedRank = STATUS_RANK[expectedStatus];
      
      // Need sync if expected rank is higher than current
      // (or if expected is REJECTED which can override)
      if (expectedStatus === JobApplicationStatus.REJECTED) {
        return job.status !== JobApplicationStatus.REJECTED;
      }
      
      return expectedRank > currentRank;
    });

    // Combine and dedupe email IDs
    const allEmailIds = new Set<string>();
    unclassifiedEmails.forEach((e) => allEmailIds.add(e.id));
    emailsNeedingSync.forEach((e) => allEmailIds.add(e.id));

    const results: AnalyzeResult[] = [];
    let updatedJobStatuses = 0;

    // Process sequentially to avoid race conditions
    for (const emailId of allEmailIds) {
      try {
        const analysisResult = await analyzeEmailAndApplyAutomation(emailId);

        const jobStatusChanged = !!analysisResult.statusUpdate;
        if (jobStatusChanged) {
          updatedJobStatuses++;
        }

        results.push({
          emailId,
          label: analysisResult.classificationLabel,
          jobStatusChanged,
        });
      } catch (err) {
        console.error(`Failed to analyze email ${emailId}:`, err);
        results.push({
          emailId,
          label: EmailClassificationLabel.UNCLASSIFIED,
          jobStatusChanged: false,
        });
      }
    }

    const response: AnalyzeResponse = {
      processed: results.length,
      updatedJobStatuses,
      results,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("Email backlog analysis failed:", err);
    return NextResponse.json(
      { error: "Failed to analyze email backlog" },
      { status: 500 }
    );
  }
}

