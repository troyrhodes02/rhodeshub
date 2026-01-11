/**
 * Deterministic email classification service.
 * Classifies job-related emails into predefined categories using keyword matching.
 */

import { EmailClassificationLabel } from "@prisma/client";

// Re-export the Prisma enum for convenience
export { EmailClassificationLabel };

// Legacy type alias for backward compatibility (maps to Prisma enum values)
export type EmailClassificationLabelLegacy =
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

export interface ClassifyEmailResult {
  label: EmailClassificationLabel;
  confidence: number;
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
 * 1. Offer (confidence: 0.9)
 * 2. Rejection (confidence: 0.9)
 * 3. Interview (confidence: 0.8)
 * 4. Confirmation (confidence: 0.7)
 * 5. Unclassified (confidence: 0.3)
 *
 * This ensures deterministic results when multiple categories could match.
 */
export function classifyEmail(input: ClassifyEmailInput): ClassifyEmailResult {
  // Combine subject, preview, and body for matching (from is not typically useful for keywords)
  const combinedText = `${input.subject} ${input.preview} ${input.body}`;

  // Check in priority order: Offer > Rejection > Interview > Confirmation > Unclassified
  if (containsKeyword(combinedText, OFFER_KEYWORDS)) {
    return { label: EmailClassificationLabel.OFFER, confidence: 0.9 };
  }

  if (containsKeyword(combinedText, REJECTION_KEYWORDS)) {
    return { label: EmailClassificationLabel.REJECTION, confidence: 0.9 };
  }

  if (containsKeyword(combinedText, INTERVIEW_KEYWORDS)) {
    return { label: EmailClassificationLabel.INTERVIEW, confidence: 0.8 };
  }

  if (containsKeyword(combinedText, CONFIRMATION_KEYWORDS)) {
    return { label: EmailClassificationLabel.CONFIRMATION, confidence: 0.7 };
  }

  return { label: EmailClassificationLabel.UNCLASSIFIED, confidence: 0.3 };
}

/**
 * Maps legacy label strings to Prisma enum values.
 * Useful for backward compatibility with existing code.
 */
export function mapLegacyLabelToEnum(
  legacy: EmailClassificationLabelLegacy
): EmailClassificationLabel {
  switch (legacy) {
    case "Offer":
      return EmailClassificationLabel.OFFER;
    case "Rejection":
      return EmailClassificationLabel.REJECTION;
    case "Interview":
      return EmailClassificationLabel.INTERVIEW;
    case "Confirmation":
      return EmailClassificationLabel.CONFIRMATION;
    case "Unclassified":
    default:
      return EmailClassificationLabel.UNCLASSIFIED;
  }
}

/**
 * Maps Prisma enum values to display-friendly strings.
 * Useful for UI rendering.
 */
export function mapEnumToDisplayLabel(label: EmailClassificationLabel): string {
  switch (label) {
    case EmailClassificationLabel.OFFER:
      return "Offer";
    case EmailClassificationLabel.REJECTION:
      return "Rejection";
    case EmailClassificationLabel.INTERVIEW:
      return "Interview";
    case EmailClassificationLabel.CONFIRMATION:
      return "Confirmation";
    case EmailClassificationLabel.UNCLASSIFIED:
    default:
      return "Unclassified";
  }
}
