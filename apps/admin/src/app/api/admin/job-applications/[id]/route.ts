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
      createdAt: jobApplication.createdAt.toISOString(),
      updatedAt: jobApplication.updatedAt.toISOString(),
      emails: jobApplication.emails.map((email) => ({
        id: email.id,
        subject: email.subject,
        from: email.from,
        preview: email.preview,
        receivedAt: email.receivedAt.toISOString(),
      })),
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("Fetch JobApplication failed:", err);
    return NextResponse.json({ error: "Failed to fetch job application" }, { status: 500 });
  }
}
