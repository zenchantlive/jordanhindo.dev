// GitHub Types for the Portfolio Dashboard

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
  url: string;
};

// New types for the enhanced dashboard

export type ProjectStatus = 'active' | 'new' | 'stale';

export type Project = {
  name: string;
  fullName: string;
  description: string | null;
  stars: number;
  forks: number;
  language: string | null;
  lastActivity: string;
  status: ProjectStatus;
  gradient: string;
  htmlUrl: string;
};

export type PullRequestState = 'open' | 'closed' | 'merged';

export type PRLabel = {
  name: string;
  color: string;
};

export type PullRequest = {
  number: number;
  title: string;
  state: PullRequestState;
  author: string;
  createdAt: string;
  updatedAt: string;
  additions: number;
  deletions: number;
  changedFiles: number;
  labels: PRLabel[];
  comments: number;
  isDraft: boolean;
  headRef: string;
  baseRef: string;
  htmlUrl: string;
};

export type RepoActivity = {
  projects: Project[];
};

// Helper to determine project status based on last activity
export function getProjectStatus(lastActivity: string, repoName?: string): ProjectStatus {
  // Always mark this portfolio as active
  if (repoName?.toLowerCase() === 'jordanhindo.dev') {
    return 'active';
  }

  const last = new Date(lastActivity).getTime();
  const now = Date.now();
  const daysSince = (now - last) / (1000 * 60 * 60 * 24);
  
  if (daysSince < 1) return 'active';
  if (daysSince < 7) return 'active';
  return 'stale';
}

// Available gradients for random assignment
const GRADIENT_OPTIONS = [
  'from-purple-500 to-blue-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-blue-500 to-cyan-500',
  'from-pink-500 to-rose-500',
];

export function getRepoGradient(name: string): string {
  // Use a simple hash of the name to deterministically pick a gradient
  // This ensures the same project always gets the same gradient (preventing hydration mismatches)
  // while distributing them effectively randomly across projects
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % GRADIENT_OPTIONS.length;
  return GRADIENT_OPTIONS[index];
}
