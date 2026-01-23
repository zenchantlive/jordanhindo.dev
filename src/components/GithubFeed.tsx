import { getRecentCommits } from "@/lib/github";
import { GitCommit, ExternalLink } from "lucide-react";

export default async function GithubFeed() {
  const commits = await getRecentCommits("zenchantlive");

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <GitCommit className="text-blue-400" />
          Live Build Feed
        </h3>
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>

      <div className="space-y-4">
        {commits.length > 0 ? (
          commits.map((commit) => (
            <div
              key={commit.id}
              className="group flex flex-col border-l-2 border-white/5 pl-4 py-1 hover:border-blue-500/50 transition-colors"
            >
              <p className="text-sm font-medium text-gray-200 line-clamp-1">
                {commit.message}
              </p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-blue-400 font-mono">
                  {commit.repo.split('/')[1] || commit.repo}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {new Date(commit.date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No recent commits found.</p>
        )}
      </div>

      <a
        href="https://github.com/zenchantlive"
        target="_blank"
        className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 hover:text-white transition-colors pt-4 border-t border-white/5"
      >
        View full GitHub <ExternalLink size={12} />
      </a>
    </div>
  );
}
