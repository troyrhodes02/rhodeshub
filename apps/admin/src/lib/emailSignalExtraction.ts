/**
 * Deterministic email signal extraction service.
 * Extracts structured signals (company, role, dates, next steps) from email content.
 * Uses regex/keyword-based extraction only (no LLM calls).
 */

export type EmailSignalExtractionInput = {
  subject: string;
  from: string;
  preview: string;
  body: string;
  receivedAt?: string | Date;
};

export type ExtractedDate = {
  iso: string; // ISO string
  raw: string; // matched phrase
  kind: "interview" | "deadline" | "start" | "other";
};

export type EmailExtractedSignals = {
  company: string | null;
  role: string | null;
  dates: ExtractedDate[];
  nextStepIndicators: string[]; // e.g., ["schedule", "assessment", "interview"]
};

// Next-step keywords to detect
const NEXT_STEP_KEYWORDS = [
  "schedule",
  "interview",
  "call",
  "assessment",
  "take-home",
  "offer",
  "background check",
  "onsite",
  "phone screen",
  "video call",
  "technical",
  "coding challenge",
  "meet",
];

// Keywords that indicate date context
const INTERVIEW_DATE_KEYWORDS = ["interview", "call", "meet", "speak", "chat"];
const DEADLINE_DATE_KEYWORDS = ["deadline", "due", "by", "before", "submit"];
const START_DATE_KEYWORDS = ["start", "begin", "join", "onboard"];

/**
 * Extract company name from email sender address.
 * Parses the domain portion before the first dot.
 * Example: "jobs@google.com" → "Google"
 */
function extractCompanyFromEmailAddress(email: string): string | null {
  const match = email.match(/@([^.]+)/);
  if (match && match[1]) {
    const domain = match[1].toLowerCase();
    // Skip generic email providers
    const genericDomains = ["gmail", "yahoo", "outlook", "hotmail", "icloud", "aol", "mail"];
    if (genericDomains.includes(domain)) {
      return null;
    }
    // Capitalize first letter
    return domain.charAt(0).toUpperCase() + domain.slice(1);
  }
  return null;
}

/**
 * Extract company name from email content using pattern matching.
 * Looks for patterns like "at {Company}", "{Company} team", "from {Company}".
 */
function extractCompanyFromContent(text: string): string | null {
  // Patterns to match company names (conservative, short matches)
  const patterns = [
    /\bat\s+([A-Z][A-Za-z0-9]+(?:\s+[A-Z][A-Za-z0-9]+)?)\s+(?:team|inc|corp|llc|company)/i,
    /\bfrom\s+(?:the\s+)?([A-Z][A-Za-z0-9]+(?:\s+[A-Z][A-Za-z0-9]+)?)\s+(?:team|recruiting|hr)/i,
    /\b([A-Z][A-Za-z0-9]+(?:\s+[A-Z][A-Za-z0-9]+)?)\s+(?:is excited|is pleased|would like)/i,
    /\bwelcome\s+to\s+([A-Z][A-Za-z0-9]+(?:\s+[A-Z][A-Za-z0-9]+)?)/i,
    /\bthank\s+you\s+for\s+(?:your\s+)?interest\s+in\s+([A-Z][A-Za-z0-9]+(?:\s+[A-Z][A-Za-z0-9]+)?)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const company = match[1].trim();
      // Sanity check: reasonable length (2-40 chars)
      if (company.length >= 2 && company.length <= 40) {
        return company;
      }
    }
  }

  return null;
}

/**
 * Extract role/position from email content.
 * Uses patterns like "for the X role", "position: X", "role of X".
 */
function extractRole(text: string): string | null {
  const patterns = [
    /\bfor\s+the\s+(.+?)\s+(?:role|position)/i,
    /\bposition[:\s]+(.+?)(?:\.|,|\s+at\s+|\s+with\s+|$)/i,
    /\brole\s+of\s+(.+?)(?:\.|,|\s+at\s+|\s+with\s+|$)/i,
    /\bapplied\s+(?:for|to)\s+(?:the\s+)?(.+?)\s+(?:role|position)/i,
    /\bapplication\s+for\s+(?:the\s+)?(.+?)(?:\.|,|$)/i,
    /\binterviewing\s+for\s+(?:the\s+)?(.+?)\s+(?:role|position)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      let role = match[1].trim();
      // Strip trailing punctuation
      role = role.replace(/[.,;:!?]+$/, "").trim();
      // Sanity check: reasonable length (2-80 chars)
      if (role.length >= 2 && role.length <= 80) {
        return role;
      }
    }
  }

  return null;
}

/**
 * Parse a date string into ISO format.
 * Handles various formats and uses receivedAt year as fallback.
 */
function parseDateToISO(dateStr: string, receivedAt?: Date): string | null {
  const currentYear = receivedAt?.getFullYear() ?? new Date().getFullYear();

  // Already ISO format (YYYY-MM-DD)
  const isoMatch = dateStr.match(/\b(\d{4})-(\d{2})-(\d{2})\b/);
  if (isoMatch) {
    return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
  }

  // Month name formats: "Jan 6", "January 6", "January 6, 2026"
  const monthNames: Record<string, string> = {
    jan: "01",
    january: "01",
    feb: "02",
    february: "02",
    mar: "03",
    march: "03",
    apr: "04",
    april: "04",
    may: "05",
    jun: "06",
    june: "06",
    jul: "07",
    july: "07",
    aug: "08",
    august: "08",
    sep: "09",
    september: "09",
    oct: "10",
    october: "10",
    nov: "11",
    november: "11",
    dec: "12",
    december: "12",
  };

  // "January 6, 2026" or "Jan 6, 2026" or "January 6 2026"
  const monthDayYearMatch = dateStr.match(
    /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s*(\d{4})\b/i
  );
  if (monthDayYearMatch) {
    const month = monthNames[monthDayYearMatch[1].toLowerCase()];
    const day = monthDayYearMatch[2].padStart(2, "0");
    const year = monthDayYearMatch[3];
    return `${year}-${month}-${day}`;
  }

  // "January 6" or "Jan 6" (no year - use receivedAt year)
  const monthDayMatch = dateStr.match(
    /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+(\d{1,2})(?:st|nd|rd|th)?\b/i
  );
  if (monthDayMatch) {
    const month = monthNames[monthDayMatch[1].toLowerCase()];
    const day = monthDayMatch[2].padStart(2, "0");
    return `${currentYear}-${month}-${day}`;
  }

  // "1/6/2026" or "01/06/2026" (M/D/YYYY format)
  const slashFormatWithYear = dateStr.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
  if (slashFormatWithYear) {
    const month = slashFormatWithYear[1].padStart(2, "0");
    const day = slashFormatWithYear[2].padStart(2, "0");
    const year = slashFormatWithYear[3];
    return `${year}-${month}-${day}`;
  }

  // "1/6" (M/D format, no year - use receivedAt year)
  const slashFormat = dateStr.match(/\b(\d{1,2})\/(\d{1,2})\b/);
  if (slashFormat) {
    const month = slashFormat[1].padStart(2, "0");
    const day = slashFormat[2].padStart(2, "0");
    return `${currentYear}-${month}-${day}`;
  }

  return null;
}

/**
 * Determine the kind of date based on surrounding context.
 */
function determineDateKind(context: string): ExtractedDate["kind"] {
  const lowerContext = context.toLowerCase();

  if (INTERVIEW_DATE_KEYWORDS.some((kw) => lowerContext.includes(kw))) {
    return "interview";
  }
  if (DEADLINE_DATE_KEYWORDS.some((kw) => lowerContext.includes(kw))) {
    return "deadline";
  }
  if (START_DATE_KEYWORDS.some((kw) => lowerContext.includes(kw))) {
    return "start";
  }
  return "other";
}

/**
 * Extract dates from email content.
 * Returns array of dates with ISO format, raw text, and kind.
 */
function extractDates(text: string, receivedAt?: Date): ExtractedDate[] {
  const dates: ExtractedDate[] = [];
  const seenISO = new Set<string>();

  // Date patterns to search for
  const datePatterns = [
    // ISO format
    /\b(\d{4}-\d{2}-\d{2})\b/g,
    // Month name with day and optional year: "January 6, 2026" or "Jan 6"
    /\b((?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?(?:,?\s*\d{4})?)\b/gi,
    // M/D/YYYY or M/D format
    /\b(\d{1,2}\/\d{1,2}(?:\/\d{4})?)\b/g,
  ];

  for (const pattern of datePatterns) {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const raw = match[1] || match[0];
      const iso = parseDateToISO(raw, receivedAt);

      if (iso && !seenISO.has(iso)) {
        seenISO.add(iso);

        // Get surrounding context (50 chars before and after) for kind detection
        const start = Math.max(0, match.index - 50);
        const end = Math.min(text.length, match.index + raw.length + 50);
        const context = text.substring(start, end);

        dates.push({
          iso,
          raw: raw.trim(),
          kind: determineDateKind(context),
        });
      }
    }
  }

  return dates;
}

/**
 * Extract next-step indicators from email content.
 * Returns deduplicated list of detected keywords.
 */
function extractNextStepIndicators(text: string): string[] {
  const lowerText = text.toLowerCase();
  const indicators: string[] = [];

  for (const keyword of NEXT_STEP_KEYWORDS) {
    if (lowerText.includes(keyword) && !indicators.includes(keyword)) {
      indicators.push(keyword);
    }
  }

  return indicators;
}

/**
 * Main extraction function.
 * Extracts structured signals from email content.
 *
 * @param input - Email data (subject, from, preview, body, receivedAt)
 * @returns EmailExtractedSignals - Structured extraction result
 *
 * Sanity checks:
 * - Gracefully handles missing/empty fields (returns nulls/empty arrays)
 * - Company extraction: tries content patterns first, falls back to sender domain
 * - Role extraction: conservative patterns, limits length to 80 chars
 * - Date extraction: handles ISO, "Jan 6", "January 6, 2026", "1/6/2026" formats
 * - Next-step indicators: keyword detection with deduplication
 */
export function extractEmailSignals(input: EmailSignalExtractionInput): EmailExtractedSignals {
  // Handle missing fields gracefully
  const subject = input.subject ?? "";
  const from = input.from ?? "";
  const preview = input.preview ?? "";
  const body = input.body ?? "";

  // Parse receivedAt if provided
  let receivedAt: Date | undefined;
  if (input.receivedAt) {
    receivedAt =
      input.receivedAt instanceof Date ? input.receivedAt : new Date(input.receivedAt);
    if (isNaN(receivedAt.getTime())) {
      receivedAt = undefined;
    }
  }

  // Combine text for extraction (subject + preview + body)
  const combinedText = `${subject} ${preview} ${body}`;

  // Extract company: try content patterns first, then sender domain fallback
  let company = extractCompanyFromContent(combinedText);
  if (!company) {
    company = extractCompanyFromEmailAddress(from);
  }

  // Extract role
  const role = extractRole(combinedText);

  // Extract dates
  const dates = extractDates(combinedText, receivedAt);

  // Extract next-step indicators
  const nextStepIndicators = extractNextStepIndicators(combinedText);

  return {
    company,
    role,
    dates,
    nextStepIndicators,
  };
}

