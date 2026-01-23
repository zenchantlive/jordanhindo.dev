import { NextResponse } from "next/server";

type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string; url: string };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
      url: string;
    }>;
    repository_id?: number;
    push_id?: number;
    ref?: string;
    head?: string;
    before?: string;
  };
  created_at: string;
};

type Commit = {
  id: string;
  message: string;
  repo: string;
  date: string;
  url: string;
};

export async function GET() {
  const username = "zenchantlive";
  
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "JordanHindoPortfolio",
    };
    
    // Add auth token if available (server-side only, never exposed to client)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
      console.log("GitHub token found, making authenticated request...");
    } else {
      console.log("No GITHUB_TOKEN found, making unauthenticated request...");
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=300`,
      {
        headers,
        // Cache on Vercel edge for 5 minutes
        next: { revalidate: 300 },
      }
    );

    const responseText = await res.text();
    console.log(`GitHub API response status: ${res.status}`);
    
    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText} - ${responseText}`);
      return NextResponse.json(
        { error: "Failed to fetch GitHub data", details: responseText },
        { status: res.status }
      );
    }

    const events: GitHubEvent[] = JSON.parse(responseText);

    console.log(`Total events received: ${events.length}`);
    console.log(`Event types: ${[...new Set(events.map(e => e.type))].join(", ")}`);
    
    // Check first event structure
    if (events.length > 0) {
      console.log("First event type:", events[0].type);
      console.log("First event payload:", JSON.stringify(events[0].payload, null, 2));
    }

    // Filter for PushEvents
    const pushEvents = events.filter((event) => event.type === "PushEvent");
    console.log("PushEvents count:", pushEvents.length);
    
    const commits: Commit[] = [];
    
    // Process push events - some have commits embedded, others need fetching
    for (const event of pushEvents) {
      if (event.payload.commits && event.payload.commits.length > 0) {
        // Events with embedded commits (some historical events)
        for (const commit of event.payload.commits) {
          commits.push({
            id: commit.sha,
            message: commit.message,
            repo: event.repo.name,
            date: event.created_at,
            url: commit.url || `https://github.com/${event.repo.name}/commit/${commit.sha}`,
          });
        }
      } else if (event.payload.head) {
        // For events without embedded commits, create a commit from push info
        commits.push({
          id: event.payload.head,
          message: `Push to ${event.payload.ref?.replace('refs/heads/', '') || 'unknown'}`,
          repo: event.repo.name,
          date: event.created_at,
          url: `https://github.com/${event.repo.name}/commit/${event.payload.head}`,
        });
      }
      
      // Limit to 10 commits
      if (commits.length >= 10) break;
    }

    console.log(`Extracted ${commits.length} commits`);
    if (commits.length > 0) {
      console.log("First commit:", JSON.stringify(commits[0], null, 2));
    }

    return NextResponse.json({ 
      commits, 
      debug: { 
        totalEvents: events.length, 
        pushEvents: pushEvents.length,
        commitsExtracted: commits.length
      } 
    });
  } catch (error) {
    console.error("Failed to fetch GitHub activity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
