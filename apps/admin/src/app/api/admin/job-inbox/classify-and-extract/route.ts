import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { classifyEmail } from "@/lib/emailClassification";
import { extractEmailSignals, EmailExtractedSignals } from "@/lib/emailSignalExtraction";
import { EmailClassificationLabel } from "@prisma/client";

interface ClassifyAndExtractPayload {
  emailId: string;
}

interface ClassifyAndExtractResponse {
  emailId: string;
  classificationLabel: EmailClassificationLabel;
  classificationConfidence: number;
  extractedSignals: EmailExtractedSignals;
  classifiedAt: string;
}

/**
 * POST /api/admin/job-inbox/classify-and-extract
 *
 * Classifies an email and extracts structured signals, then persists the results.
 *
 * Payload: { emailId: string }
 *
 * Behavior:
 * - Fetches EmailMessage by id
 * - Runs classifyEmail() to get { label, confidence }
 * - Runs extractEmailSignals() to get EmailExtractedSignals
 * - Persists classificationLabel, classificationConfidence, extractedSignals, classifiedAt onto EmailMessage
 * - Returns the persisted values
 *
 * Constraints:
 * - No job matching, no status updates
 * - Idempotent: re-running overwrites the persisted values
 */
export async function POST(req: NextRequest) {
  try {
    const body: ClassifyAndExtractPayload = await req.json();

    const emailId = body.emailId?.trim();

    if (!emailId) {
      return NextResponse.json(
        { error: "emailId is required and must be a non-empty string" },
        { status: 400 }
      );
    }

    // Fetch the email message
    const emailMessage = await prisma.emailMessage.findUnique({
      where: { id: emailId },
    });

    if (!emailMessage) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // Run classification
    const classificationResult = classifyEmail({
      subject: emailMessage.subject,
      from: emailMessage.from,
      preview: emailMessage.preview,
      body: emailMessage.body,
    });

    // Run signal extraction
    const extractedSignals = extractEmailSignals({
      subject: emailMessage.subject,
      from: emailMessage.from,
      preview: emailMessage.preview,
      body: emailMessage.body,
      receivedAt: emailMessage.receivedAt,
    });

    // Persist the results
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

    const response: ClassifyAndExtractResponse = {
      emailId,
      classificationLabel: classificationResult.label,
      classificationConfidence: classificationResult.confidence,
      extractedSignals,
      classifiedAt: classifiedAt.toISOString(),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("Email classification and extraction failed:", err);
    return NextResponse.json(
      { error: "Failed to classify and extract email signals" },
      { status: 500 }
    );
  }
}

