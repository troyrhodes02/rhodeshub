import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    // Update the email
    const updatedEmail = await prisma.emailMessage.update({
      where: { id },
      data: { jobApplicationId },
      include: {
        jobApplication: {
          select: { id: true, company: true, role: true },
        },
      },
    });

    return NextResponse.json(updatedEmail, { status: 200 });
  } catch (err) {
    console.error("Link email to job failed:", err);
    return NextResponse.json({ error: "Failed to link email to job" }, { status: 500 });
  }
}
