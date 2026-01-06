import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { classifyEmail } from "@/lib/emailClassification";

interface ClassifyByIdPayload {
  emailId: string;
}

interface ClassifyByContentPayload {
  subject: string;
  from: string;
  preview: string;
  body: string;
}

type ClassifyRequestBody = ClassifyByIdPayload | ClassifyByContentPayload;

function isClassifyById(body: ClassifyRequestBody): body is ClassifyByIdPayload {
  return "emailId" in body && typeof body.emailId === "string";
}

function isClassifyByContent(body: ClassifyRequestBody): body is ClassifyByContentPayload {
  return "subject" in body && "from" in body && "preview" in body && "body" in body;
}

export async function POST(req: NextRequest) {
  try {
    const body: ClassifyRequestBody = await req.json();

    // Mode A: Classify by emailId (fetch from database)
    if (isClassifyById(body)) {
      const emailId = body.emailId?.trim();

      if (!emailId) {
        return NextResponse.json(
          { error: "emailId is required and must be a non-empty string" },
          { status: 400 }
        );
      }

      const emailMessage = await prisma.emailMessage.findUnique({
        where: { id: emailId },
      });

      if (!emailMessage) {
        return NextResponse.json({ error: "Email not found" }, { status: 404 });
      }

      const result = classifyEmail({
        subject: emailMessage.subject,
        from: emailMessage.from,
        preview: emailMessage.preview,
        body: emailMessage.body,
      });

      return NextResponse.json(result, { status: 200 });
    }

    // Mode B: Classify by content (direct input)
    if (isClassifyByContent(body)) {
      const subject = body.subject?.trim();
      const from = body.from?.trim();
      const preview = body.preview?.trim();
      const emailBody = body.body?.trim();

      if (!subject || !from || !preview || !emailBody) {
        return NextResponse.json(
          {
            error: "Missing required fields: subject, from, preview, body (all must be non-empty)",
          },
          { status: 400 }
        );
      }

      const result = classifyEmail({
        subject,
        from,
        preview,
        body: emailBody,
      });

      return NextResponse.json(result, { status: 200 });
    }

    // Invalid payload
    return NextResponse.json(
      { error: "Invalid request: provide either emailId or subject/from/preview/body" },
      { status: 400 }
    );
  } catch (err) {
    console.error("Email classification failed:", err);
    return NextResponse.json({ error: "Failed to classify email" }, { status: 500 });
  }
}
