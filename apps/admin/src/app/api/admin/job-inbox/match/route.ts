import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { matchEmailToJobs, MatchResult } from "@/lib/emailJobMatching";

interface MatchResultItem {
  emailId: string;
  outcome: "matched" | "ambiguous" | "unmatched";
  jobApplicationId?: string;
  candidates?: { jobApplicationId: string; score: number }[];
}

interface MatchSummary {
  processed: number;
  matched: number;
  ambiguous: number;
  unmatched: number;
  results: MatchResultItem[];
}

export async function POST() {
  try {
    // Fetch unlinked emails
    const emails = await prisma.emailMessage.findMany({
      where: { jobApplicationId: null },
    });

    // Fetch all job applications
    const jobs = await prisma.jobApplication.findMany({
      select: { id: true, company: true, role: true },
    });

    const results: MatchResultItem[] = [];
    let matchedCount = 0;
    let ambiguousCount = 0;
    let unmatchedCount = 0;

    for (const email of emails) {
      const matchResult: MatchResult = matchEmailToJobs(
        {
          subject: email.subject,
          preview: email.preview,
          body: email.body,
        },
        jobs
      );

      if (matchResult.type === "matched") {
        // Persist the match
        await prisma.emailMessage.update({
          where: { id: email.id },
          data: { jobApplicationId: matchResult.jobApplicationId },
        });

        results.push({
          emailId: email.id,
          outcome: "matched",
          jobApplicationId: matchResult.jobApplicationId,
        });
        matchedCount++;
      } else if (matchResult.type === "ambiguous") {
        // Do not persist; report candidates
        results.push({
          emailId: email.id,
          outcome: "ambiguous",
          candidates: matchResult.candidates,
        });
        ambiguousCount++;
      } else {
        results.push({
          emailId: email.id,
          outcome: "unmatched",
        });
        unmatchedCount++;
      }
    }

    const summary: MatchSummary = {
      processed: emails.length,
      matched: matchedCount,
      ambiguous: ambiguousCount,
      unmatched: unmatchedCount,
      results,
    };

    return NextResponse.json(summary, { status: 200 });
  } catch (err) {
    console.error("Email matching failed:", err);
    return NextResponse.json({ error: "Failed to match emails" }, { status: 500 });
  }
}
