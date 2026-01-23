import { NextResponse } from "next/server";
import { Project, getProjectStatus, getRepoGradient } from "@/lib/github";

type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  updated_at: string;
  created_at: string;
};

export async function GET() {
  const username = "zenchantlive";
  
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "JordanHindoPortfolio",
    };
    
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
    }

    // Fetch user's repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers, next: { revalidate: 300 } }
    );

    if (!reposRes.ok) {
      console.error("Failed to fetch repos:", await reposRes.text());
      return NextResponse.json({ error: "Failed to fetch repositories" }, { status: reposRes.status });
    }

    const repos: GitHubRepo[] = await reposRes.json();

    // Fetch recent events to determine actual activity
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      { headers, next: { revalidate: 300 } }
    );

    let events: Array<{ repo: { name: string }; created_at: string }> = [];
    if (eventsRes.ok) {
      events = await eventsRes.json();
    }

    // Build activity map from events
    const activityMap = new Map<string, string>();
    for (const event of events) {
      if (!activityMap.has(event.repo.name)) {
        activityMap.set(event.repo.name, event.created_at);
      }
    }

    // Process repos into projects with rich metadata
    const projects: Project[] = repos
      .map((repo) => {
        // Determine last activity from events or repo update
        const lastActivity = activityMap.get(repo.full_name) || repo.pushed_at;
        
        return {
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          lastActivity,
          status: getProjectStatus(lastActivity),
          gradient: getRepoGradient(repo.name),
          htmlUrl: repo.html_url,
        };
      })
      .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
      .slice(0, 3); // Top 3 by activity

    console.log(`Returning ${projects.length} active projects`);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
