/**
 * Deterministic email-to-job matching service.
 * Matches emails to job applications based on company/role heuristics.
 */

export type MatchResult =
  | { type: "matched"; jobApplicationId: string; score: number }
  | { type: "ambiguous"; candidates: { jobApplicationId: string; score: number }[] }
  | { type: "unmatched" };

interface EmailData {
  subject: string;
  preview: string;
  body: string;
}

interface JobApplicationData {
  id: string;
  company: string;
  role: string;
}

/**
 * Normalize text for matching:
 * - lowercase
 * - strip punctuation
 * - collapse whitespace
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // strip punctuation
    .replace(/\s+/g, " ") // collapse whitespace
    .trim();
}

/**
 * Tokenize a string into words
 */
function tokenize(text: string): string[] {
  return normalizeText(text).split(" ").filter(Boolean);
}

/**
 * Score an email against a job application.
 *
 * Scoring:
 * - company exact contains => +5
 * - company token contains => +3
 * - role token contains => +1 per token (cap +3)
 */
function scoreMatch(email: EmailData, job: JobApplicationData): number {
  // Create combined email text
  const combinedEmailText = normalizeText(`${email.subject} ${email.preview} ${email.body}`);
  const normalizedCompany = normalizeText(job.company);
  const companyTokens = tokenize(job.company);
  const roleTokens = tokenize(job.role);

  let score = 0;

  // Company exact contains => +5
  if (combinedEmailText.includes(normalizedCompany)) {
    score += 5;
  } else {
    // Company token contains => +3 (if any company token found)
    const hasCompanyToken = companyTokens.some(
      (token) => token.length >= 3 && combinedEmailText.includes(token)
    );
    if (hasCompanyToken) {
      score += 3;
    }
  }

  // Role token contains => +1 per token (cap +3)
  let roleScore = 0;
  for (const token of roleTokens) {
    // Only match meaningful tokens (3+ chars)
    if (token.length >= 3 && combinedEmailText.includes(token)) {
      roleScore += 1;
    }
    if (roleScore >= 3) break; // Cap at +3
  }
  score += roleScore;

  return score;
}

/**
 * Match an email to job applications.
 *
 * Decision:
 * - confident match if: bestScore >= 6 AND bestScore >= secondBestScore + 2
 * - ambiguous if there are candidates with score >= 4
 * - unmatched otherwise
 */
export function matchEmailToJobs(email: EmailData, jobs: JobApplicationData[]): MatchResult {
  if (jobs.length === 0) {
    return { type: "unmatched" };
  }

  // Score all jobs
  const scoredJobs = jobs
    .map((job) => ({
      jobApplicationId: job.id,
      score: scoreMatch(email, job),
    }))
    .filter((item) => item.score > 0) // Only keep jobs with some score
    .sort((a, b) => b.score - a.score); // Sort descending by score

  if (scoredJobs.length === 0) {
    return { type: "unmatched" };
  }

  const bestScore = scoredJobs[0].score;
  const secondBestScore = scoredJobs.length > 1 ? scoredJobs[1].score : 0;

  // Confident match: bestScore >= 6 AND bestScore >= secondBestScore + 2
  if (bestScore >= 6 && bestScore >= secondBestScore + 2) {
    return {
      type: "matched",
      jobApplicationId: scoredJobs[0].jobApplicationId,
      score: bestScore,
    };
  }

  // Ambiguous: any candidates with score >= 4
  const candidates = scoredJobs.filter((item) => item.score >= 4);
  if (candidates.length > 0) {
    return {
      type: "ambiguous",
      candidates,
    };
  }

  return { type: "unmatched" };
}
