import { prisma } from "@/lib/prisma";
import { getGmailAccessToken } from "./gmailClient";
import { analyzeEmailAndApplyAutomation } from "@/lib/emailAutomationPipeline";
import { matchEmailToJobs } from "@/lib/emailJobMatching";

/**
 * Gmail ingestion service.
 * Syncs emails from Gmail inbox to the EmailMessage table.
 */

const GMAIL_API_BASE = "https://gmail.googleapis.com/gmail/v1/users/me";

interface GmailMessage {
  id: string;
  threadId: string;
  labelIds?: string[];
  snippet?: string;
  internalDate?: string;
  payload?: {
    mimeType?: string;
    headers?: Array<{ name: string; value: string }>;
    body?: { data?: string };
    parts?: GmailMessagePart[];
  };
}

interface GmailMessagePart {
  mimeType?: string;
  body?: { data?: string };
  parts?: GmailMessagePart[];
}

interface SyncResult {
  fetchedCount: number;
  insertedCount: number;
  skippedDuplicates: number;
  classifiedCount: number;
  matchedCount: number;
  statusUpdates: number;
  errors: string[];
  debug?: {
    query: string;
    syncMode: "initial" | "incremental";
    historyIdUsed: string | null;
  };
}

/**
 * Get header value from Gmail message headers.
 */
function getHeader(headers: Array<{ name: string; value: string }> | undefined, name: string): string {
  if (!headers) return "";
  const header = headers.find((h) => h.name.toLowerCase() === name.toLowerCase());
  return header?.value ?? "";
}

/**
 * Decode base64url encoded string (Gmail's format).
 */
function decodeBase64Url(str: string): string {
  // Replace URL-safe characters with standard base64
  const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  // Decode from base64
  try {
    return Buffer.from(base64, "base64").toString("utf-8");
  } catch {
    return "";
  }
}

/**
 * Extract text body from Gmail message payload.
 * Handles multipart messages.
 */
function extractBodyText(payload: GmailMessage["payload"]): string {
  if (!payload) return "";

  // Direct body
  if (payload.body?.data) {
    const mimeType = payload.mimeType ?? "";
    if (mimeType === "text/plain" || mimeType === "text/html") {
      return decodeBase64Url(payload.body.data);
    }
  }

  // Multipart message - search for text parts
  if (payload.parts) {
    // Prefer text/plain over text/html
    const textParts = findTextParts(payload.parts);
    const plainPart = textParts.find((p) => p.mimeType === "text/plain");
    if (plainPart?.body?.data) {
      return decodeBase64Url(plainPart.body.data);
    }
    const htmlPart = textParts.find((p) => p.mimeType === "text/html");
    if (htmlPart?.body?.data) {
      // Strip HTML tags for plain text
      return stripHtml(decodeBase64Url(htmlPart.body.data));
    }
  }

  return "";
}

/**
 * Recursively find text parts in multipart message.
 */
function findTextParts(parts: GmailMessagePart[]): GmailMessagePart[] {
  const result: GmailMessagePart[] = [];
  for (const part of parts) {
    if (part.mimeType === "text/plain" || part.mimeType === "text/html") {
      result.push(part);
    }
    if (part.parts) {
      result.push(...findTextParts(part.parts));
    }
  }
  return result;
}

/**
 * Strip HTML tags from string.
 */
function stripHtml(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Generate preview text from body (first ~200 chars).
 */
function generatePreview(body: string): string {
  const cleaned = body.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 200) return cleaned;
  return cleaned.substring(0, 200) + "...";
}

/**
 * Sync Gmail inbox to database.
 * 
 * Strategy:
 * 1. On first run (no lastHistoryId), fetch last 30 days of inbox messages
 * 2. On subsequent runs, use historyId for incremental sync
 * 3. For each message: upsert to EmailMessage, run automation pipeline
 */
export async function syncGmailInbox(): Promise<SyncResult> {
  const result: SyncResult = {
    fetchedCount: 0,
    insertedCount: 0,
    skippedDuplicates: 0,
    classifiedCount: 0,
    matchedCount: 0,
    statusUpdates: 0,
    errors: [],
  };

  try {
    // Get access token
    const { accessToken } = await getGmailAccessToken();

    // Get or create sync state
    let syncState = await prisma.gmailSyncState.findFirst();
    if (!syncState) {
      syncState = await prisma.gmailSyncState.create({ data: {} });
    }

    // Determine sync strategy
    let messageIds: string[] = [];
    let syncMode: "initial" | "incremental" = "initial";
    let query = "";

    if (syncState.lastHistoryId) {
      // Incremental sync using history API
      syncMode = "incremental";
      messageIds = await fetchMessageIdsSinceHistory(accessToken, syncState.lastHistoryId);
    } else {
      // Initial sync: fetch last 30 days of inbox messages
      syncMode = "initial";
      query = "in:inbox newer_than:30d";
      messageIds = await fetchMessageIdsWithQuery(accessToken, query);
    }

    result.fetchedCount = messageIds.length;
    result.debug = {
      query: syncMode === "initial" ? query : "history API",
      syncMode,
      historyIdUsed: syncMode === "incremental" ? syncState.lastHistoryId : null,
    };

    // Get current historyId for next sync
    const profileResponse = await fetch(`${GMAIL_API_BASE}/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    let newHistoryId: string | null = null;
    if (profileResponse.ok) {
      const profile = await profileResponse.json();
      newHistoryId = profile.historyId;
    }

    // Process each message
    for (const messageId of messageIds) {
      try {
        const emailResult = await processGmailMessage(accessToken, messageId);
        if (emailResult.isNew) {
          result.insertedCount++;
          if (emailResult.classified) {
            result.classifiedCount++;
          }
          if (emailResult.matched) {
            result.matchedCount++;
          }
          if (emailResult.statusUpdated) {
            result.statusUpdates++;
          }
        } else {
          result.skippedDuplicates++;
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        result.errors.push(`Message ${messageId}: ${errorMsg}`);
      }
    }

    // Update sync state
    await prisma.gmailSyncState.update({
      where: { id: syncState.id },
      data: {
        lastHistoryId: newHistoryId ?? syncState.lastHistoryId,
        lastSyncedAt: new Date(),
      },
    });

    return result;
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    result.errors.push(`Sync failed: ${errorMsg}`);
    return result;
  }
}

/**
 * Fetch message IDs matching a Gmail search query.
 */
async function fetchMessageIdsWithQuery(accessToken: string, query: string): Promise<string[]> {
  const ids: string[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL(`${GMAIL_API_BASE}/messages`);
    url.searchParams.set("q", query);
    url.searchParams.set("maxResults", "100");
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gmail API list messages error:", response.status, errorText);
      throw new Error(`Failed to list messages: ${response.status}`);
    }

    const data = await response.json();
    if (data.messages) {
      for (const msg of data.messages) {
        ids.push(msg.id);
      }
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return ids;
}

/**
 * Fetch message IDs since a given historyId (incremental sync).
 */
async function fetchMessageIdsSinceHistory(
  accessToken: string,
  startHistoryId: string
): Promise<string[]> {
  const ids = new Set<string>();
  let pageToken: string | undefined;

  do {
    const url = new URL(`${GMAIL_API_BASE}/history`);
    url.searchParams.set("startHistoryId", startHistoryId);
    url.searchParams.set("historyTypes", "messageAdded");
    url.searchParams.set("maxResults", "100");
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 404) {
      // History ID is too old, fall back to recent fetch
      console.warn("History ID expired, falling back to recent fetch");
      return fetchMessageIdsWithQuery(accessToken, "in:inbox newer_than:30d");
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch history: ${response.status}`);
    }

    const data = await response.json();
    if (data.history) {
      for (const record of data.history) {
        if (record.messagesAdded) {
          for (const added of record.messagesAdded) {
            ids.add(added.message.id);
          }
        }
      }
    }
    pageToken = data.nextPageToken;
  } while (pageToken);

  return Array.from(ids);
}

interface ProcessResult {
  isNew: boolean;
  classified: boolean;
  matched: boolean;
  statusUpdated: boolean;
}

/**
 * Process a single Gmail message: fetch, normalize, upsert, run automation.
 */
async function processGmailMessage(
  accessToken: string,
  messageId: string
): Promise<ProcessResult> {
  // Fetch full message
  const response = await fetch(`${GMAIL_API_BASE}/messages/${messageId}?format=full`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gmail API get message error:", response.status, errorText);
    throw new Error(`Failed to fetch message: ${response.status}`);
  }

  const gmailMessage: GmailMessage = await response.json();

  // Extract normalized email fields
  const headers = gmailMessage.payload?.headers;
  const from = getHeader(headers, "From");
  const to = getHeader(headers, "To");
  const subject = getHeader(headers, "Subject") || "(No Subject)";
  const body = extractBodyText(gmailMessage.payload);
  const preview = gmailMessage.snippet || generatePreview(body);
  const receivedAt = gmailMessage.internalDate
    ? new Date(parseInt(gmailMessage.internalDate, 10))
    : new Date();

  // Use Gmail message ID as externalId (prefixed to distinguish from other sources)
  const externalId = `gmail:${messageId}`;

  // Check if email already exists
  const existing = await prisma.emailMessage.findUnique({
    where: { externalId },
  });

  if (existing) {
    // Email already ingested
    return { isNew: false, classified: false, matched: false, statusUpdated: false };
  }

  // Create new email
  let emailMessage = await prisma.emailMessage.create({
    data: {
      externalId,
      from,
      to,
      subject,
      preview,
      body,
      receivedAt,
    },
  });

  let matched = false;
  let classified = false;
  let statusUpdated = false;

  // Auto-match to job application
  try {
    const jobs = await prisma.jobApplication.findMany({
      select: { id: true, company: true, role: true },
    });

    const matchResult = matchEmailToJobs({ subject, preview, body }, jobs);

    if (matchResult.type === "matched") {
      emailMessage = await prisma.emailMessage.update({
        where: { id: emailMessage.id },
        data: { jobApplicationId: matchResult.jobApplicationId },
      });
      matched = true;
    }
  } catch (err) {
    console.error("Auto-matching failed:", err);
  }

  // Run automation pipeline (classification + status updates)
  try {
    const automationResult = await analyzeEmailAndApplyAutomation(emailMessage.id);
    classified = automationResult.classificationLabel !== "UNCLASSIFIED";
    statusUpdated = !!automationResult.statusUpdate;
  } catch (err) {
    console.error("Automation pipeline failed:", err);
  }

  return { isNew: true, classified, matched, statusUpdated };
}

