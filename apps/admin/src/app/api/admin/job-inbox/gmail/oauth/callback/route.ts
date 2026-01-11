import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/admin/job-inbox/gmail/oauth/callback
 * 
 * Handles Google OAuth callback after user consent.
 * Exchanges authorization code for tokens and stores refresh_token.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { error: `OAuth error: ${error}` },
      { status: 400 }
    );
  }

  if (!code) {
    return NextResponse.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_GMAIL_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: "Google OAuth credentials not fully configured" },
      { status: 500 }
    );
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Token exchange failed:", errorData);
      return NextResponse.json(
        { error: "Failed to exchange authorization code for tokens" },
        { status: 400 }
      );
    }

    const tokens = await tokenResponse.json();

    // Validate we received a refresh_token
    if (!tokens.refresh_token) {
      return NextResponse.json(
        {
          error: "No refresh_token received. This usually happens when the app was previously authorized. Please revoke access at https://myaccount.google.com/permissions and try again with prompt=consent.",
        },
        { status: 400 }
      );
    }

    // Calculate token expiry
    const accessTokenExpiresAt = tokens.expires_in
      ? new Date(Date.now() + tokens.expires_in * 1000)
      : null;

    // Use "me" as the account identifier.
    // Gmail API supports "me" as userId to reference the authenticated mailbox.
    // No need to fetch actual email address for V1 ingestion.
    const accountId = "me";

    // Upsert Gmail credentials (single row pattern)
    await prisma.gmailCredential.upsert({
      where: { email: accountId },
      update: {
        refreshToken: tokens.refresh_token,
        accessToken: tokens.access_token,
        accessTokenExpiresAt,
        updatedAt: new Date(),
      },
      create: {
        email: accountId,
        refreshToken: tokens.refresh_token,
        accessToken: tokens.access_token,
        accessTokenExpiresAt,
      },
    });

    // Ensure GmailSyncState exists (single row)
    const existingSyncState = await prisma.gmailSyncState.findFirst();
    if (!existingSyncState) {
      await prisma.gmailSyncState.create({
        data: {},
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Gmail connected successfully",
    });
  } catch (err) {
    console.error("Gmail OAuth callback error:", err);
    return NextResponse.json(
      { error: "Failed to process OAuth callback" },
      { status: 500 }
    );
  }
}

