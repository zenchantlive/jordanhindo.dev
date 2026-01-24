"use client";

import { useState } from "react";
import { GitCommit, ExternalLink, ArrowLeft } from "lucide-react";
import { useGithubFeed } from "./hooks";
import {
  GithubFeedSkeleton,
  GithubFeedError,
  ProjectItem,
  PRItem,
  CommitCardSmall,
  StatusBadge,
} from "./ui";
import type { Commit } from "@/lib/github";

export function GithubFeed() {
  const {
    projects,
    selectedProject,
    prs,
    loading,
    error,
    view,
    selectProject,
    goBack,
    refresh,
  } = useGithubFeed();

  // Track which PR's commits are being viewed
  const [commitsView, setCommitsView] = useState<Map<number, Commit[]>>(new Map());
  const [loadingCommits, setLoadingCommits] = useState<Set<number>>(new Set());

  async function loadPRCommits(prNumber: number) {
    if (!selectedProject) return;

    setLoadingCommits((prev) => new Set(prev).add(prNumber));

    try {
      const res = await fetch(
        `/api/github/projects/${selectedProject.fullName}/prs/${prNumber}/commits`,
        { next: { revalidate: 60 } }
      );

      if (res.ok) {
        const data = await res.json();
        setCommitsView((prev) => new Map(prev).set(prNumber, data.commits || []));
      }
    } catch (err) {
      console.error("Failed to load PR commits:", err);
    } finally {
      setLoadingCommits((prev) => {
        const next = new Set(prev);
        next.delete(prNumber);
        return next;
      });
    }
  }

  function toggleCommits(prNumber: number) {
    if (commitsView.has(prNumber)) {
      // Hide commits
      setCommitsView((prev) => {
        const next = new Map(prev);
        next.delete(prNumber);
        return next;
      });
    } else {
      // Load commits
      loadPRCommits(prNumber);
    }
  }

  if (loading) {
    return <GithubFeedSkeleton />;
  }

  if (error) {
    return <GithubFeedError onRetry={refresh} />;
  }

  return (
    <div className="swiss-card rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-terracotta-light" />
          {view === "projects" ? "Active Projects" : selectedProject?.name}
        </h3>
        <div className="w-2 h-2 rounded-full bg-terracotta-light" />
      </div>

      {/* Projects List View */}
      {view === "projects" && (
        <div className="space-y-3">
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No projects found</p>
          ) : (
            projects.map((project, idx) => (
              <div
                key={project.fullName}
                className="swiss-reveal"
                style={{ animationDelay: `${idx * 0.08}s` } as React.CSSProperties}
              >
                <ProjectItem
                  project={project}
                  onClick={() => selectProject(project)}
                />
              </div>
            ))
          )}
        </div>
      )}

      {/* Detail View */}
      {view === "detail" && selectedProject && (
        <>
          {/* Back button */}
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-terracotta-light transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Project header */}
          <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-gray-800/30 border border-gray-800">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedProject.gradient} flex items-center justify-center`}
            >
              <span className="text-white font-bold">
                {selectedProject.name.split("/")[1]?.[0]?.toUpperCase() || "G"}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-200">{selectedProject.name}</span>
                <StatusBadge status={selectedProject.status} />
              </div>
              <p className="swiss-text-label text-gray-500 line-clamp-1 mt-0.5">
                {selectedProject.description || "No description"}
              </p>
            </div>
          </div>

          {/* PRs List */}
          <div className="space-y-3">
            <h4 className="swiss-text-label text-gray-400 mb-2">Pull Requests</h4>
            {prs.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No pull requests</p>
            ) : (
              prs.map((pr, idx) => (
                <div key={pr.number}>
                  <div
                    className="swiss-reveal"
                    style={{ animationDelay: `${idx * 0.05}s` } as React.CSSProperties}
                  >
                    <PRItem 
                      pr={pr} 
                      onToggleCommits={() => toggleCommits(pr.number)}
                      commitsExpanded={commitsView.has(pr.number)}
                    />
                  </div>

                  {/* Commits for this PR */}
                  {commitsView.has(pr.number) && (
                    <div className="mt-2 ml-4 pl-4 border-l border-gray-800">
                      {loadingCommits.has(pr.number) ? (
                        <div className="py-3 text-sm text-gray-500 swiss-text-mono">
                          Loading commits...
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {commitsView.get(pr.number)?.map((commit) => (
                            <CommitCardSmall key={commit.id} commit={commit} />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Footer link */}
      <a
        href="https://github.com/zenchantlive"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-terracotta-light transition-colors pt-4 border-t border-gray-800"
      >
        View on GitHub
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

export default GithubFeed;
