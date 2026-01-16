import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeEmailAndApplyAutomation } from "@/lib/emailAutomationPipeline";
import { matchEmailToJobs } from "@/lib/emailJobMatching";
import { EmailClassificationLabel } from "@prisma/client";

interface CreateEmailMessageBody {
  externalId: string;
  from: string;
  to: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
}

export async function GET() {
  try {
    const messages = await prisma.emailMessage.findMany({
      orderBy: { receivedAt: "desc" },
      include: {
        jobApplication: {
          select: { id: true, company: true, role: true },
        },
      },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (err) {
    console.error("Fetch EmailMessages failed:", err);
    return NextResponse.json({ error: "Failed to fetch email messages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateEmailMessageBody = await req.json();

    const externalId = body.externalId?.trim();
    const from = body.from?.trim();
    const to = body.to?.trim();
    const subject = body.subject?.trim();
    const preview = body.preview?.trim();
    const emailBody = body.body?.trim();
    const receivedAtStr = body.receivedAt?.trim();

    if (!externalId || !from || !to || !subject || !preview || !emailBody || !receivedAtStr) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: externalId, from, to, subject, preview, body, receivedAt",
        },
        { status: 400 }
      );
    }

    const receivedAt = new Date(receivedAtStr);
    if (isNaN(receivedAt.getTime())) {
      return NextResponse.json(
        { error: "Invalid receivedAt format. Provide a valid ISO date string." },
        { status: 400 }
      );
    }

    // Deduplication: check if message with externalId already exists
    const existing = await prisma.emailMessage.findUnique({
      where: { externalId },
    });

    if (existing) {
      // If existing email is still unclassified or unlinked, try to process it
      const needsProcessing =
        !existing.classifiedAt ||
        existing.classificationLabel === EmailClassificationLabel.UNCLASSIFIED ||
        !existing.jobApplicationId;

      if (needsProcessing) {
        try {
          // If unlinked, try auto-matching first
          if (!existing.jobApplicationId) {
            const jobs = await prisma.jobApplication.findMany({
              select: { id: true, company: true, role: true },
            });

            const matchResult = matchEmailToJobs(
              { subject: existing.subject, preview: existing.preview, body: existing.body },
              jobs
            );

            if (matchResult.type === "matched") {
              await prisma.emailMessage.update({
                where: { id: existing.id },
                data: { jobApplicationId: matchResult.jobApplicationId },
              });
            }
          }

          // Run automation pipeline
          await analyzeEmailAndApplyAutomation(existing.id);

          // Fetch updated email with job relation for response
          const updatedEmail = await prisma.emailMessage.findUnique({
            where: { id: existing.id },
            include: {
              jobApplication: {
                select: { id: true, company: true, role: true, status: true },
              },
            },
          });
          return NextResponse.json(updatedEmail, { status: 200 });
        } catch (err) {
          console.error("Email processing failed for existing email:", err);
          // Return existing email even if processing fails
          return NextResponse.json(existing, { status: 200 });
        }
      }
      return NextResponse.json(existing, { status: 200 });
    }

    // Create new email message
    let emailMessage = await prisma.emailMessage.create({
      data: {
        externalId,
        from,
        to,
        subject,
        preview,
        body: emailBody,
        receivedAt,
      },
    });

    // Auto-match email to job application
    try {
      const jobs = await prisma.jobApplication.findMany({
        select: { id: true, company: true, role: true },
      });

      const matchResult = matchEmailToJobs({ subject, preview, body: emailBody }, jobs);

      if (matchResult.type === "matched") {
        // Link email to the matched job
        emailMessage = await prisma.emailMessage.update({
          where: { id: emailMessage.id },
          data: { jobApplicationId: matchResult.jobApplicationId },
        });
      }
    } catch (err) {
      console.error("Auto-matching failed for new email:", err);
      // Continue - matching is best-effort
    }

    // Run automation pipeline (classification + status updates if linked)
    try {
      await analyzeEmailAndApplyAutomation(emailMessage.id);
      // Fetch updated email with persisted classification and job relation
      const updatedEmail = await prisma.emailMessage.findUnique({
        where: { id: emailMessage.id },
        include: {
          jobApplication: {
            select: { id: true, company: true, role: true, status: true },
          },
        },
      });
      return NextResponse.json(updatedEmail, { status: 201 });
    } catch (err) {
      console.error("Email automation pipeline failed for new email:", err);
      // Return email even if pipeline fails (classification can be retried later)
      return NextResponse.json(emailMessage, { status: 201 });
    }
  } catch (err) {
    console.error("Create EmailMessage failed:", err);
    return NextResponse.json({ error: "Failed to create email message" }, { status: 500 });
  }
}
