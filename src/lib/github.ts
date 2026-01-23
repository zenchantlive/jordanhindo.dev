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
export function getProjectStatus(lastActivity: string): ProjectStatus {
  const last = new Date(lastActivity).getTime();
  const now = Date.now();
  const daysSince = (now - last) / (1000 * 60 * 60 * 24);
  
  if (daysSince < 1) return 'active';
  if (daysSince < 7) return 'active';
  return 'stale';
}

// Project color mappings
const REPO_GRADIENTS: Record<string, string> = {
  'jordanhindo.dev': 'from-purple-500 to-blue-500',
  'asset-hatch': 'from-green-500 to-emerald-500',
  'catwalk': 'from-orange-500 to-red-500',
  'thefeed': 'from-blue-500 to-cyan-500',
  'rlm': 'from-pink-500 to-rose-500',
};

export function getRepoGradient(name: string): string {
  const key = name.toLowerCase();
  for (const [pattern, gradient] of Object.entries(REPO_GRADIENTS)) {
    if (key.includes(pattern.toLowerCase())) return gradient;
  }
  return 'from-gray-500 to-slate-500';
}
