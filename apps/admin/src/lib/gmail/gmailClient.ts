import { prisma } from "@/lib/prisma";

/**
 * Gmail OAuth token management.
 * Handles token refresh and provides valid access tokens.
 */

interface TokenResult {
  accessToken: string;
  expiresAt: Date;
}

/**
 * Get a valid access token for Gmail API requests.
 * Refreshes the token if expired or missing.
 */
export async function getGmailAccessToken(): Promise<TokenResult> {
  // Get stored credentials
  const credential = await prisma.gmailCredential.findFirst();

  if (!credential) {
    throw new Error("Gmail not connected. Please complete OAuth flow first.");
  }

  // Check if current access token is still valid (with 5-minute buffer)
  const now = new Date();
  const bufferMs = 5 * 60 * 1000; // 5 minutes

  if (
    credential.accessToken &&
    credential.accessTokenExpiresAt &&
    credential.accessTokenExpiresAt.getTime() > now.getTime() + bufferMs
  ) {
    return {
      accessToken: credential.accessToken,
      expiresAt: credential.accessTokenExpiresAt,
    };
  }

  // Need to refresh the token
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Google OAuth credentials not configured");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: credential.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Token refresh failed:", errorText);
    throw new Error("Failed to refresh Gmail access token. Please re-authorize.");
  }

  const tokens = await response.json();

  const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);

  // Update stored credentials
  await prisma.gmailCredential.update({
    where: { id: credential.id },
    data: {
      accessToken: tokens.access_token,
      accessTokenExpiresAt: expiresAt,
    },
  });

  return {
    accessToken: tokens.access_token,
    expiresAt,
  };
}

/**
 * Check if Gmail is connected (has stored credentials).
 */
export async function isGmailConnected(): Promise<boolean> {
  const credential = await prisma.gmailCredential.findFirst();
  return !!credential;
}

/**
 * Get the connected Gmail email address.
 */
export async function getGmailEmail(): Promise<string | null> {
  const credential = await prisma.gmailCredential.findFirst();
  return credential?.email ?? null;
}
