import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const jobApplication = await prisma.jobApplication.findUnique({
      where: { id },
      include: {
        emails: {
          orderBy: { receivedAt: "desc" },
          select: {
            id: true,
            subject: true,
            from: true,
            preview: true,
            receivedAt: true,
          },
        },
        statusAudits: {
          orderBy: { createdAt: "desc" },
          take: 25,
          select: {
            id: true,
            previousStatus: true,
            newStatus: true,
            source: true,
            reason: true,
            emailMessageId: true,
            createdAt: true,
          },
        },
      },
    });

    if (!jobApplication) {
      return NextResponse.json({ error: "Job application not found" }, { status: 404 });
    }

    // Format response
    const response = {
      id: jobApplication.id,
      company: jobApplication.company,
      role: jobApplication.role,
      link: jobApplication.link,
      dateApplied: jobApplication.dateApplied.toISOString(),
      status: jobApplication.status,
      statusSource: jobApplication.statusSource,
      statusOverriddenAt: jobApplication.statusOverriddenAt?.toISOString() ?? null,
      createdAt: jobApplication.createdAt.toISOString(),
      updatedAt: jobApplication.updatedAt.toISOString(),
      emails: jobApplication.emails.map((email) => ({
        id: email.id,
        subject: email.subject,
        from: email.from,
        preview: email.preview,
        receivedAt: email.receivedAt.toISOString(),
      })),
      statusAudits: jobApplication.statusAudits.map((audit) => ({
        id: audit.id,
        previousStatus: audit.previousStatus,
        newStatus: audit.newStatus,
        source: audit.source,
        reason: audit.reason,
        emailMessageId: audit.emailMessageId,
        createdAt: audit.createdAt.toISOString(),
      })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("Fetch JobApplication failed:", err);
    return NextResponse.json({ error: "Failed to fetch job application" }, { status: 500 });
  }
}
