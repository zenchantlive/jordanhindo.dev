import { NextResponse } from "next/server";
import { PullRequest } from "@/lib/github";

type GitHubPRSummary = {
  id: number;
  number: number;
  title: string;
  state: string;
  html_url: string;
  user: { login: string };
  created_at: string;
  updated_at: string;
  merged_at: string | null;
  labels: Array<{ name: string; color: string }>;
  comments: number;
  draft: boolean;
  head: { ref: string };
  base: { ref: string };
};

type GitHubPRDetail = {
  additions: number;
  deletions: number;
  changed_files: number;
  mergeable: boolean;
  maintainer_can_modify: boolean;
};

async function fetchPRDetail(
  owner: string, 
  repo: string, 
  prNumber: number,
  headers: HeadersInit
): Promise<GitHubPRDetail | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
      { headers, next: { revalidate: 300 } }
    );
    
    if (!res.ok) return null;
    
    const data = await res.json();
    return {
      additions: data.additions ?? 0,
      deletions: data.deletions ?? 0,
      changed_files: data.changed_files ?? 0,
      mergeable: data.mergeable ?? false,
      maintainer_can_modify: data.maintainer_can_modify ?? false,
    };
  } catch {
    return null;
  }
}

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

    const listRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls?state=all&sort=updated&direction=desc&per_page=10`,
      { headers, next: { revalidate: 300 } }
    );

    if (!listRes.ok) {
      console.error("Failed to fetch PRs:", await listRes.text());
      return NextResponse.json({ error: "Failed to fetch PRs" }, { status: listRes.status });
    }

    const prSummaries: GitHubPRSummary[] = await listRes.json();
    // direction=desc returns newest first, so just slice
    const topPRs = prSummaries.slice(0, 10);

    // Fetch individual PR details for accurate diffs
    const pullRequests: PullRequest[] = await Promise.all(
      topPRs.map(async (pr) => {
        // Determine state
        let state: 'open' | 'closed' | 'merged' = 'open';
        if (pr.merged_at !== null) {
          state = 'merged';
        } else if (pr.state === 'closed') {
          state = 'closed';
        }

        // Fetch detailed stats for this PR
        const detail = await fetchPRDetail(owner, repo, pr.number, headers);

        return {
          number: pr.number,
          title: pr.title,
          state,
          author: pr.user.login,
          createdAt: pr.created_at,
          updatedAt: pr.updated_at,
          additions: detail?.additions ?? 0,
          deletions: detail?.deletions ?? 0,
          changedFiles: detail?.changed_files ?? 0,
          labels: pr.labels.map(l => ({ name: l.name, color: l.color })),
          comments: pr.comments,
          isDraft: pr.draft,
          headRef: pr.head.ref,
          baseRef: pr.base.ref,
          htmlUrl: pr.html_url,
        };
      })
    );

    console.log(`Returning ${pullRequests.length} PRs for ${owner}/${repo}`);

    return NextResponse.json({ prs: pullRequests });
  } catch (error) {
    console.error("Failed to fetch PRs:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
