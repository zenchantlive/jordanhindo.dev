import { NextResponse } from "next/server";
import { Project, getProjectStatus } from "@/lib/github";

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
      { headers, next: { revalidate: 60 } }
    );

    if (!reposRes.ok) {
      console.error("Failed to fetch repos:", await reposRes.text());
      return NextResponse.json({ error: "Failed to fetch repositories" }, { status: reposRes.status });
    }

    const repos: GitHubRepo[] = await reposRes.json();

    // Fetch recent events to determine actual activity
    const eventsRes = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=100`,
      { headers, next: { revalidate: 60 } }
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

    // Define gradients locally to ensure we have access to them for unique assignment
    const GRADIENT_OPTIONS = [
      'from-purple-500 to-blue-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-blue-500 to-cyan-500',
      'from-pink-500 to-rose-500',
    ];

    // Process repos into projects with rich metadata
    let projects: Project[] = repos
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
          status: getProjectStatus(lastActivity, repo.name),
          gradient: '', // Placeholder, will assign unique below
          htmlUrl: repo.html_url,
        };
      })
      .sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime())
      .slice(0, 5); // Top 5 by activity

    // Assign unique gradients
    projects = projects.map((project, index) => ({
      ...project,
      gradient: GRADIENT_OPTIONS[index % GRADIENT_OPTIONS.length]
    }));

    console.log(`Returning ${projects.length} active projects`);

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
