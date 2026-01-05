import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
      return NextResponse.json(existing, { status: 200 });
    }

    const emailMessage = await prisma.emailMessage.create({
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

    return NextResponse.json(emailMessage, { status: 201 });
  } catch (err) {
    console.error("Create EmailMessage failed:", err);
    return NextResponse.json({ error: "Failed to create email message" }, { status: 500 });
  }
}
