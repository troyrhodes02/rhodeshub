import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeEmailAndApplyAutomation } from "@/lib/emailAutomationPipeline";

interface LinkPayload {
  jobApplicationId: string | null;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body: LinkPayload = await req.json();
    const { jobApplicationId } = body;

    // Validate email exists
    const email = await prisma.emailMessage.findUnique({
      where: { id },
    });

    if (!email) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // If linking to a job, validate it exists
    if (jobApplicationId !== null) {
      const job = await prisma.jobApplication.findUnique({
        where: { id: jobApplicationId },
      });

      if (!job) {
        return NextResponse.json({ error: "Job application not found" }, { status: 404 });
      }
    }

    // Update the email link
    await prisma.emailMessage.update({
      where: { id },
      data: { jobApplicationId },
    });

    // If linking to a job (not unlinking), re-run automation pipeline
    // This triggers status updates based on email classification
    if (jobApplicationId !== null) {
      try {
        await analyzeEmailAndApplyAutomation(id);
      } catch (err) {
        console.error("Automation pipeline failed after linking:", err);
        // Continue - linking succeeded, automation is a secondary effect
      }
    }

    // Fetch updated email with job relation for response
    const updatedEmail = await prisma.emailMessage.findUnique({
      where: { id },
      include: {
        jobApplication: {
          select: { id: true, company: true, role: true, status: true },
        },
      },
    });

    return NextResponse.json(updatedEmail, { status: 200 });
  } catch (err) {
    console.error("Link email to job failed:", err);
    return NextResponse.json({ error: "Failed to link email to job" }, { status: 500 });
  }
}


