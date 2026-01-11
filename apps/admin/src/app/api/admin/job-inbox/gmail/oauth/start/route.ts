import { NextResponse } from "next/server";

/**
 * GET /api/admin/job-inbox/gmail/oauth/start
 * 
 * Initiates Google OAuth flow for Gmail read-only access.
 * Redirects user to Google OAuth consent screen.
 */
export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_GMAIL_REDIRECT_URI;

  if (!clientId) {
    return NextResponse.json(
      { error: "GOOGLE_CLIENT_ID is not configured" },
      { status: 500 }
    );
  }

  if (!redirectUri) {
    return NextResponse.json(
      { error: "GOOGLE_GMAIL_REDIRECT_URI is not configured" },
      { status: 500 }
    );
  }

  // Generate a simple random state for CSRF protection
  const state = crypto.randomUUID();

  // Build Google OAuth URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/gmail.readonly",
    access_type: "offline",
    prompt: "consent", // Force consent to ensure refresh_token is returned
    include_granted_scopes: "true",
    state,
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return NextResponse.redirect(authUrl);
}

