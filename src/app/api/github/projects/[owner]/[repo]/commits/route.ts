import { NextResponse } from "next/server";
import { Commit } from "@/lib/github";

type GitHubCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
      name: string;
      email: string;
    };
  };
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
  } | null;
  parents: Array<{ sha: string }>;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ owner: string; repo: string }> }
) {
  const { owner, repo } = await params;
  
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "JordanHindoPortfolio",
    };
    
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=15`,
      { headers, next: { revalidate: 300 } }
    );

    if (!res.ok) {
      console.error("Failed to fetch commits:", await res.text());
      return NextResponse.json({ error: "Failed to fetch commits" }, { status: res.status });
    }

    const commits: GitHubCommit[] = await res.json();

    // Process commits - limit to 10
    const processedCommits: Commit[] = commits.slice(0, 10).map((commit) => ({
      id: commit.sha,
      message: commit.commit.message.split('\n')[0], // First line only
      repo: `${owner}/${repo}`,
      date: commit.commit.author.date,
      url: commit.html_url,
    }));

    console.log(`Returning ${processedCommits.length} commits for ${owner}/${repo}`);

    return NextResponse.json({ commits: processedCommits });
  } catch (error) {
    console.error("Failed to fetch commits:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
