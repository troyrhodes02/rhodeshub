/**
 * Deterministic email classification service.
 * Classifies job-related emails into predefined categories using keyword matching.
 */

export type EmailClassificationLabel =
  | "Unclassified"
  | "Confirmation"
  | "Interview"
  | "Offer"
  | "Rejection";

interface ClassifyEmailInput {
  subject: string;
  from: string;
  preview: string;
  body: string;
}

interface ClassifyEmailResult {
  label: EmailClassificationLabel;
}

// Keyword sets for each category (lowercase for case-insensitive matching)
const OFFER_KEYWORDS = [
  "offer",
  "we are pleased",
  "compensation",
  "salary",
  "congratulations",
  "employment offer",
  "job offer",
  "offer letter",
  "pleased to offer",
  "extend an offer",
];

const REJECTION_KEYWORDS = [
  "unfortunately",
  "regret to inform",
  "not moving forward",
  "decided to pursue other candidates",
  "rejected",
  "will not be moving forward",
  "not be proceeding",
  "other candidates",
  "not selected",
  "position has been filled",
];

const INTERVIEW_KEYWORDS = [
  "interview",
  "schedule",
  "availability",
  "phone screen",
  "technical interview",
  "onsite",
  "zoom",
  "meet with",
  "calendar invite",
  "screening call",
  "video call",
  "hiring manager",
  "next steps in our process",
  "would like to speak with you",
  "schedule a call",
  "schedule a time",
];

const CONFIRMATION_KEYWORDS = [
  "thank you for applying",
  "application received",
  "we received your application",
  "submission received",
  "application submission",
  "successfully submitted",
  "thank you for your interest",
  "we have received your",
  "application has been received",
  "thanks for applying",
];

/**
 * Checks if the combined text contains any of the given keywords.
 * Case-insensitive matching.
 */
function containsKeyword(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase();
  return keywords.some((keyword) => lowerText.includes(keyword.toLowerCase()));
}

/**
 * Classifies an email into a predefined category based on keyword matching.
 *
 * Priority order (highest to lowest):
 * 1. Offer
 * 2. Rejection
 * 3. Interview
 * 4. Confirmation
 * 5. Unclassified (default)
 *
 * This ensures deterministic results when multiple categories could match.
 */
export function classifyEmail(input: ClassifyEmailInput): ClassifyEmailResult {
  // Combine subject, preview, and body for matching (from is not typically useful for keywords)
  const combinedText = `${input.subject} ${input.preview} ${input.body}`;

  // Check in priority order: Offer > Rejection > Interview > Confirmation > Unclassified
  if (containsKeyword(combinedText, OFFER_KEYWORDS)) {
    return { label: "Offer" };
  }

  if (containsKeyword(combinedText, REJECTION_KEYWORDS)) {
    return { label: "Rejection" };
  }

  if (containsKeyword(combinedText, INTERVIEW_KEYWORDS)) {
    return { label: "Interview" };
  }

  if (containsKeyword(combinedText, CONFIRMATION_KEYWORDS)) {
    return { label: "Confirmation" };
  }

  return { label: "Unclassified" };
}
