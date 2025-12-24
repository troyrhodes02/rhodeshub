import { NextResponse } from "next/server";

export const revalidate = 3600; // Revalidate every hour

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
}

export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "rhodeshub-portfolio",
    };

    // Add Authorization header if GITHUB_TOKEN is present
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch("https://api.github.com/repos/troyrhodes02/rhodeshub", {
      headers,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data: GitHubRepoResponse = await response.json();

    // Return only the fields we need
    return NextResponse.json({
      name: data.name,
      description: data.description,
      html_url: data.html_url,
      pushed_at: data.pushed_at,
    });
  } catch (error) {
    console.error("Error fetching GitHub repo data:", error);
    return NextResponse.json({ error: "Failed to fetch repository data" }, { status: 500 });
  }
}
