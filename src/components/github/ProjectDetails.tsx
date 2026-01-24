"use client";

import { useState, useEffect } from "react";
import { ExternalLink, ArrowLeft, GitCommit } from "lucide-react";
import Link from "next/link";
import {
  PRItem,
  CommitCardSmall,
  StatusBadge,
} from "./ui";
import type { Project, PullRequest, Commit } from "./types";

interface GithubProjectDetailsProps {
  project?: Project;
  repoFullName?: string;
  onBack?: () => void;
  isDedicatedPage?: boolean;
}

export function GithubProjectDetails({ project: initialProject, repoFullName, onBack, isDedicatedPage = false }: GithubProjectDetailsProps) {
  const [project, setProject] = useState<Project | null>(initialProject || null);
  const [prs, setPRs] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllPRs, setShowAllPRs] = useState(false);
  
  const fullName = initialProject?.fullName || repoFullName;

  // Track which PR's commits are being viewed
  const [commitsView, setCommitsView] = useState<Map<number, Commit[]>>(new Map());
  const [loadingCommits, setLoadingCommits] = useState<Set<number>>(new Set());

  // Responsive PR limiting
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const PR_LIMIT = isMobile ? 2 : 3;
  const displayedPRs = showAllPRs ? prs : prs.slice(0, PR_LIMIT);
  const hasMorePRs = prs.length > PR_LIMIT;

  useEffect(() => {
    if (!fullName) return;

    async function loadData() {
      setLoading(true);
      try {
        if (!project) {
            const projectsRes = await fetch('/api/github/projects');
            if (projectsRes.ok) {
                const data = await projectsRes.json();
                const found = data.projects.find((p: Project) => p.fullName === fullName);
                if (found) setProject(found);
            }
        }

        const res = await fetch(
          `/api/github/projects/${fullName}/prs`,
          { next: { revalidate: 60 } }
        );
        
        if (res.ok) {
          const data = await res.json();
          setPRs(data.prs || []);
        }
      } catch (err) {
        console.error("Failed to load GitHub data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [fullName, project]);

  async function loadPRCommits(prNumber: number) {
    if (!project) return;
    setLoadingCommits((prev) => new Set(prev).add(prNumber));

    try {
      const res = await fetch(
        `/api/github/projects/${project.fullName}/prs/${prNumber}/commits`,
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
      setCommitsView((prev) => {
        const next = new Map(prev);
        next.delete(prNumber);
        return next;
      });
    } else {
      loadPRCommits(prNumber);
    }
  }

  if (loading || !project) {
    return (
      <div className="py-12 flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-terracotta border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 swiss-text-mono">Fetching latest activity...</p>
      </div>
    );
  }

  return (
    <div className={isDedicatedPage ? "" : "swiss-fade"}>
      {/* Back button - only show if onBack is provided */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-terracotta-light transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </button>
      )}

      {/* Project header */}
      <div className={`flex items-start sm:items-center gap-3 mb-4 sm:mb-6 p-3 sm:p-4 rounded-xl bg-gray-800/30 border border-gray-800 relative group/header ${isDedicatedPage ? "bg-transparent border-white/5" : ""}`}>
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-white font-bold">
            {project.name.split("/")[1]?.[0]?.toUpperCase() || "G"}
          </span>
        </div>
        <div className="flex-1 min-w-0 pr-12 sm:pr-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="font-medium text-gray-200 truncate">{project.name}</span>
            <div className="flex">
              <StatusBadge status={project.status} />
            </div>
          </div>
          <p className="swiss-text-label text-gray-500 line-clamp-1 mt-0.5 lowercase italic">
            {project.description || "No description"}
          </p>
        </div>
        {!isDedicatedPage && project.blogUrl && (
          <Link
            href={project.blogUrl}
            className="absolute right-3 sm:right-4 top-3 sm:top-1/2 sm:-translate-y-1/2 text-[10px] font-bold text-terracotta-light bg-terracotta/10 hover:bg-terracotta/20 px-3 py-1.5 rounded-full border border-terracotta/20 transition-all sm:opacity-0 group-hover/header:opacity-100"
          >
            {isMobile ? "Log" : "Full Story →"}
          </Link>
        )}
      </div>

      {/* PRs List */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between mb-2 px-1">
          <h4 className="swiss-text-label text-gray-400">Pull Requests</h4>
          <span className="swiss-text-mono text-[10px] text-gray-500">
            {prs.length} Total
          </span>
        </div>

        {prs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No pull requests</p>
        ) : (
          <>
            <div 
              className={`space-y-2 sm:space-y-3 transition-all duration-300 overflow-y-auto pr-1 sm:pr-2 custom-scrollbar ${
                showAllPRs ? "max-h-[500px] sm:max-h-[600px]" : "max-h-[280px] sm:max-h-[350px]"
              }`}
            >
              {displayedPRs.map((pr, idx) => (
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
                          {commitsView.get(pr.number)?.slice(0, 5).map((commit) => (
                            <CommitCardSmall key={commit.id} commit={commit} />
                          ))}
                          {(commitsView.get(pr.number)?.length || 0) > 5 && (
                            <p className="text-[10px] text-gray-600 italic pl-3">
                              + {(commitsView.get(pr.number)?.length || 0) - 5} more commits in this PR
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {hasMorePRs && (
              <button
                onClick={() => setShowAllPRs(!showAllPRs)}
                className="w-full mt-4 py-2 border border-dashed border-gray-800 rounded-lg text-xs text-gray-500 hover:text-terracotta-light hover:border-terracotta-light/30 transition-all flex items-center justify-center gap-2"
              >
                {showAllPRs ? (
                  <>Show Less</>
                ) : (
                  <>Show More Activity ({prs.length - PR_LIMIT} more items)</>
                )}
              </button>
            )}

            {isDedicatedPage && showAllPRs && (
                <a 
                    href={project.htmlUrl + "/pulls"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full mt-2 py-2 text-[10px] text-gray-600 hover:text-terracotta-light transition-all flex items-center justify-center gap-2"
                >
                    Deep dive into GitHub History ↗
                </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}