import { NextResponse } from "next/server";
import { syncGmailInbox } from "@/lib/gmail/gmailIngest";
import { isGmailConnected, getGmailEmail } from "@/lib/gmail/gmailClient";

/**
 * POST /api/admin/job-inbox/gmail/sync
 * 
 * Triggers Gmail inbox sync.
 * Fetches new emails from Gmail and persists them to the database.
 */
export async function POST() {
  try {
    // Check if Gmail is connected
    const connected = await isGmailConnected();
    if (!connected) {
      return NextResponse.json(
        {
          error: "Gmail not connected. Please complete OAuth flow first.",
          connectUrl: "/api/admin/job-inbox/gmail/oauth/start",
        },
        { status: 400 }
      );
    }

    // Run sync
    const result = await syncGmailInbox();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err) {
    console.error("Gmail sync error:", err);
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Gmail sync failed: ${errorMsg}` },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/job-inbox/gmail/sync
 * 
 * Returns Gmail connection status.
 */
export async function GET() {
  try {
    const connected = await isGmailConnected();
    const email = connected ? await getGmailEmail() : null;

    return NextResponse.json({
      connected,
      email,
      oauthStartUrl: connected ? null : "/api/admin/job-inbox/gmail/oauth/start",
    });
  } catch (err) {
    console.error("Gmail status check error:", err);
    return NextResponse.json(
      { error: "Failed to check Gmail connection status" },
      { status: 500 }
    );
  }
}

