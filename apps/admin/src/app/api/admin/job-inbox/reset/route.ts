import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * POST /api/admin/job-inbox/reset
 *
 * Admin-only endpoint to delete E2E/test data from the Job Inbox.
 * Requires x-cron-secret header matching CRON_SECRET env var (in addition to Basic Auth).
 *
 * Deletes:
 * - EmailMessage rows where externalId starts with "e2e-"
 * - EmailMessage rows where from/to contains "example.com" or test patterns
 * - Associated JobStatusAudit rows that reference deleted emails
 */
export async function POST(req: NextRequest) {
  // Additional auth check: require x-cron-secret header
  const cronSecret = process.env.CRON_SECRET;
  const providedSecret = req.headers.get("x-cron-secret");

  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured. Cannot perform reset." },
      { status: 500 }
    );
  }

  if (providedSecret !== cronSecret) {
    return NextResponse.json({ error: "Invalid or missing x-cron-secret header" }, { status: 403 });
  }

  try {
    // Find E2E/test emails to delete
    const testEmails = await prisma.emailMessage.findMany({
      where: {
        OR: [
          { externalId: { startsWith: "e2e-" } },
          { externalId: { startsWith: "test-" } },
          { from: { contains: "example.com" } },
          { to: { contains: "example.com" } },
          { from: { contains: "@test." } },
          { to: { contains: "@test." } },
        ],
      },
      select: { id: true, externalId: true },
    });

    const testEmailIds = testEmails.map((e) => e.id);

    // Delete JobStatusAudit rows that reference test emails
    const deletedAudits = await prisma.jobStatusAudit.deleteMany({
      where: {
        emailMessageId: { in: testEmailIds },
      },
    });

    // Delete test EmailMessage rows
    const deletedEmails = await prisma.emailMessage.deleteMany({
      where: {
        id: { in: testEmailIds },
      },
    });

    // Also reset GmailSyncState to force fresh sync
    const syncState = await prisma.gmailSyncState.findFirst();
    if (syncState) {
      await prisma.gmailSyncState.update({
        where: { id: syncState.id },
        data: {
          lastHistoryId: null,
          lastSyncedAt: null,
        },
      });
    }

    return NextResponse.json({
      success: true,
      deleted: {
        emailMessages: deletedEmails.count,
        jobStatusAudits: deletedAudits.count,
      },
      testEmailsFound: testEmails.map((e) => e.externalId),
      syncStateReset: !!syncState,
    });
  } catch (err) {
    console.error("Reset failed:", err);
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Reset failed: ${errorMsg}` }, { status: 500 });
  }
}
