export type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string };
  payload: {
    commits?: Array<{
      sha: string;
      message: string;
    }>;
  };
  created_at: string;
};

export type Commit = {
  id: string;
  message: string;
  repo: string;
  date: string;
};

export async function getRecentCommits(username: string): Promise<Commit[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public`,
      {
        // Cache for 1 hour using Next.js 15+ revalidate option
        // @ts-expect-error - next option is supported in Next.js 15+
        next: { revalidate: 3600 },
        headers: process.env.GITHUB_TOKEN
          ? { Authorization: `token ${process.env.GITHUB_TOKEN}` }
          : {},
      }
    );

    if (!res.ok) return [];

    const events: GitHubEvent[] = await res.json();

    // Filter for PushEvents and map to a flat list of commits
    return events
      .filter((event) => event.type === "PushEvent" && event.payload.commits)
      .flatMap((event) =>
        event.payload.commits!.map((commit) => ({
          id: commit.sha,
          message: commit.message,
          repo: event.repo.name,
          date: event.created_at,
        }))
      )
      .slice(0, 10); // Limit to top 10
  } catch (error) {
    console.error("Failed to fetch GitHub activity", error);
    return [];
  }
}
