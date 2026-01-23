import { NextResponse } from "next/server";
import { Commit } from "@/lib/github";

type GitHubCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  } | null;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string; prNumber: string }> }
) {
  const { owner, repo, prNumber } = await params;
  const prNum = parseInt(prNumber, 10);

  if (isNaN(prNum)) {
    return NextResponse.json({ error: "Invalid PR number" }, { status: 400 });
  }

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "JordanHindoPortfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch commits for this specific PR
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNum}/commits?per_page=50`,
      { headers, next: { revalidate: 300 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch PR commits:", await res.text());
      return NextResponse.json({ error: "Failed to fetch PR commits" }, { status: res.status });
    }

    const commitsData: GitHubCommit[] = await res.json();

    // Transform to our Commit type
    const commits: Commit[] = commitsData.map((commit) => ({
      id: commit.sha,
      message: commit.commit.message.split("\n")[0], // First line only
      author: commit.commit.author?.name || "unknown",
      date: commit.commit.author?.date || new Date().toISOString(),
      url: commit.html_url,
    }));

    console.log(`Returning ${commits.length} commits for PR #${prNum} in ${owner}/${repo}`);

    return NextResponse.json({ commits });
  } catch (error) {
    console.error("Failed to fetch PR commits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
