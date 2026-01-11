/**
 * Email Automation Pipeline.
 * Centralized function that:
 *   1. Classifies email + extracts signals and persists to EmailMessage
 *   2. If linked to a job, applies automatic status update rules (no downgrades)
 *   3. Creates audit log entries for any status change
 *
 * Rules:
 *   - No downgrades (OFFER → INTERVIEW/APPLIED not allowed)
 *   - REJECTED is terminal (cannot be changed by automation)
 *   - Manual override respected (statusSource === MANUAL blocks automation)
 *   - Deterministic logic only (no LLM calls, no randomness)
 */

import { prisma } from "@/lib/prisma";
import { classifyEmail } from "@/lib/emailClassification";
import { extractEmailSignals, EmailExtractedSignals } from "@/lib/emailSignalExtraction";
import {
  EmailClassificationLabel,
  JobApplicationStatus,
  JobStatusSource,
} from "@prisma/client";

// Status rank for downgrade prevention
// Higher number = more advanced in pipeline (except REJECTED = terminal)
const STATUS_RANK: Record<JobApplicationStatus, number> = {
  APPLIED: 1,
  INTERVIEW: 2,
  OFFER: 3,
  REJECTED: 99, // Terminal state
};

// Email classification → Job status mapping
const LABEL_TO_JOB_STATUS: Partial<
  Record<EmailClassificationLabel, JobApplicationStatus>
> = {
  INTERVIEW: JobApplicationStatus.INTERVIEW,
  REJECTION: JobApplicationStatus.REJECTED,
  OFFER: JobApplicationStatus.OFFER,
};

export interface AnalyzeEmailResult {
  emailId: string;
  classificationLabel: EmailClassificationLabel;
  classificationConfidence: number;
  extractedSignals: EmailExtractedSignals;
  classifiedAt: string;
  statusUpdate?: {
    jobApplicationId: string;
    previousStatus: JobApplicationStatus | null;
    newStatus: JobApplicationStatus;
    source: "AUTOMATED";
    reason: string;
  };
}

/**
 * Analyze an email and optionally apply job status automation.
 *
 * @param emailId - The ID of the email to analyze
 * @returns AnalyzeEmailResult with classification, signals, and optional status update
 *
 * Pipeline:
 * 1. Fetch email from database
 * 2. Run classification + signal extraction
 * 3. Persist classification results to EmailMessage
 * 4. If email is linked to a job, evaluate status update rules
 * 5. If status change is valid, update JobApplication and create audit log
 */
export async function analyzeEmailAndApplyAutomation(
  emailId: string
): Promise<AnalyzeEmailResult> {
  // 1. Fetch the email
  const email = await prisma.emailMessage.findUnique({
    where: { id: emailId },
    include: {
      jobApplication: true,
    },
  });

  if (!email) {
    throw new Error(`Email not found: ${emailId}`);
  }

  // 2. Run classification
  const classificationResult = classifyEmail({
    subject: email.subject,
    from: email.from,
    preview: email.preview,
    body: email.body,
  });

  // 3. Run signal extraction
  const extractedSignals = extractEmailSignals({
    subject: email.subject,
    from: email.from,
    preview: email.preview,
    body: email.body,
    receivedAt: email.receivedAt,
  });

  // 4. Persist classification results to EmailMessage
  const classifiedAt = new Date();
  await prisma.emailMessage.update({
    where: { id: emailId },
    data: {
      classificationLabel: classificationResult.label,
      classificationConfidence: classificationResult.confidence,
      extractedSignals: extractedSignals as object,
      classifiedAt,
    },
  });

  // Build base result
  const result: AnalyzeEmailResult = {
    emailId,
    classificationLabel: classificationResult.label,
    classificationConfidence: classificationResult.confidence,
    extractedSignals,
    classifiedAt: classifiedAt.toISOString(),
  };

  // 5. If not linked to a job, we're done (no status update)
  if (!email.jobApplicationId || !email.jobApplication) {
    return result;
  }

  const job = email.jobApplication;

  // Determine desired status from classification label
  const desiredStatus = LABEL_TO_JOB_STATUS[classificationResult.label];

  // If label doesn't map to a status change (e.g., CONFIRMATION, UNCLASSIFIED), skip
  if (!desiredStatus) {
    return result;
  }

  // Check if status change is allowed

  // Rule: Manual override respected
  // Only block if admin has EXPLICITLY overridden (statusOverriddenAt is set)
  // The default MANUAL source from job creation should not block automation
  if (job.statusSource === JobStatusSource.MANUAL && job.statusOverriddenAt) {
    // Admin has explicitly overridden status, automation should not change it
    return result;
  }

  // Rule: REJECTED is terminal (cannot be changed by automation)
  if (job.status === JobApplicationStatus.REJECTED) {
    return result;
  }

  // Rule: No downgrades
  const currentRank = STATUS_RANK[job.status];
  const desiredRank = STATUS_RANK[desiredStatus];

  // Allow REJECTED to override anything (it's a valid terminal transition)
  // But don't allow going from a higher rank to lower rank otherwise
  if (desiredStatus !== JobApplicationStatus.REJECTED) {
    if (desiredRank < currentRank) {
      // This would be a downgrade, skip
      return result;
    }
  }

  // If status is already the same, skip
  if (job.status === desiredStatus) {
    return result;
  }

  // Status change is valid, apply it
  const previousStatus = job.status;
  const reason = `Email classified as ${classificationResult.label}`;

  // Update JobApplication status
  await prisma.jobApplication.update({
    where: { id: job.id },
    data: {
      status: desiredStatus,
      statusSource: JobStatusSource.AUTOMATED,
    },
  });

  // Create audit log entry
  await prisma.jobStatusAudit.create({
    data: {
      jobApplicationId: job.id,
      previousStatus,
      newStatus: desiredStatus,
      source: JobStatusSource.AUTOMATED,
      reason,
      emailMessageId: emailId,
    },
  });

  // Add status update to result
  result.statusUpdate = {
    jobApplicationId: job.id,
    previousStatus,
    newStatus: desiredStatus,
    source: "AUTOMATED",
    reason,
  };

  return result;
}

