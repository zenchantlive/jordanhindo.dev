"use client";

import { FolderGit2, Star, GitFork, Clock, ChevronRight, MessageSquare, GitCommit } from "lucide-react";
import type { ProjectStatus, Project, PullRequest, Commit } from "./types";
import { formatTimeAgo } from "./utils";

interface StatusBadgeProps {
  status: ProjectStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    active: { className: "swiss-badge-active", label: "Active" },
    new: { className: "swiss-badge-new", label: "New" },
    stale: { className: "swiss-badge-stale", label: "Stale" },
  };

  const { className, label } = config[status];

  return <span className={`swiss-badge ${className}`}>{label}</span>;
}

interface PRStatusProps {
  state: PullRequest["state"];
}

export function PRStatus({ state }: PRStatusProps) {
  const config = {
    merged: { className: "swiss-badge-merged", label: "Merged" },
    open: { className: "swiss-badge-open", label: "Open" },
    closed: { className: "swiss-badge-closed", label: "Closed" },
  };

  const { className, label } = config[state];

  return <span className={`swiss-badge ${className}`}>{label}</span>;
}

interface ProjectItemProps {
  project: Project;
  onClick: () => void;
}

export function ProjectItem({ project, onClick }: ProjectItemProps) {
  const gradient = project.gradient;
  const shortName = project.name.split("/")[1] || project.name;

  return (
    <button
      onClick={onClick}
      className="w-full group swiss-card text-left p-3 sm:p-4 active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center sm:items-start gap-3 sm:gap-4">
        {/* Icon */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
          <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
            <span className="font-semibold text-gray-100 group-hover:text-white transition-colors truncate">
              {shortName}
            </span>
            <div className="flex items-center gap-2">
              <StatusBadge status={project.status} />
              {project.name.toLowerCase() === 'jordanhindo.dev' && (
                <span className="swiss-badge-portfolio hidden sm:inline-flex">This Website!</span>
              )}
            </div>
          </div>

          <p className="swiss-text-label text-gray-500 line-clamp-1 mb-2 sm:mb-3 lowercase italic">
            {project.description || "No description"}
          </p>

          {/* Metadata row */}
          <div className="flex items-center gap-3 sm:gap-5 swiss-text-mono text-gray-500 text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1.5">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {project.stars}
            </span>
            <span className="flex items-center gap-1.5">
              <GitFork className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {project.forks}
            </span>
            <span className="flex items-center gap-1.5 text-terracotta-light/70">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {formatTimeAgo(project.lastActivity)}
            </span>
          </div>
        </div>

        {/* Chevron */}
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-terracotta-light transition-colors flex-shrink-0" />
      </div>
    </button>
  );
}

interface PRLabelProps {
  label: { name: string; color: string };
}

function PRLabel({ label }: PRLabelProps) {
  const bgColor = `#${label.color}20`;
  const textColor = `#${label.color}`;

  return (
    <span
      className="swiss-label"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label.name}
    </span>
  );
}

interface PRItemProps {
  pr: PullRequest;
  onToggleCommits?: () => void;
  commitsExpanded?: boolean;
}

export function PRItem({ pr, onToggleCommits, commitsExpanded }: PRItemProps) {
  return (
    <div className="swiss-card block group p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        {/* Top/Left: Status + Number */}
        <div className="flex items-center sm:flex-col sm:items-start gap-2 min-w-0 sm:min-w-[5.5rem]">
          <PRStatus state={pr.state} />
          <span className="swiss-text-mono text-gray-500 text-[10px] sm:text-xs">#{pr.number}</span>
        </div>

        {/* Middle: Title + Labels + Toggle */}
        <div className="flex-1 min-w-0 w-full">
          <a
            href={pr.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-200 group-hover:text-white transition-colors line-clamp-2 sm:line-clamp-1 mb-2 sm:mb-1 inline-block text-sm sm:text-base font-medium"
          >
            {pr.title}
          </a>

          {/* Labels row */}
          {pr.labels.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-2">
              {pr.labels.slice(0, 2).map((label) => (
                <PRLabel key={label.name} label={label} />
              ))}
              {pr.labels.length > 2 && (
                <span className="swiss-text-mono text-gray-500 text-[10px]">
                  +{pr.labels.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Meta row: date + toggle */}
          <div className="flex items-center justify-between mt-1">
            <span className="swiss-text-mono text-[10px] text-gray-500">
              {formatTimeAgo(pr.updatedAt)}
            </span>

            {/* Toggle commits button */}
            {onToggleCommits && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  onToggleCommits();
                }}
                className="text-[10px] sm:text-xs text-terracotta-light hover:text-terracotta transition-colors swiss-text-mono flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-terracotta/5 hover:bg-terracotta/10 sm:bg-transparent"
              >
                <GitCommit className="w-3.5 h-3.5" />
                {commitsExpanded ? "Hide" : "Commits"}
              </button>
            )}
          </div>
        </div>

        {/* Bottom/Right: Stats */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1.5 swiss-text-mono text-[10px] sm:text-xs pt-2 sm:pt-0 border-t border-white/5 sm:border-0 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-green-400">+{pr.additions}</span>
            <span className="text-red-400">-{pr.deletions}</span>
          </div>
          {pr.comments > 0 && (
            <div className="flex items-center gap-1 text-gray-500">
              <MessageSquare className="w-3.5 h-3.5" />
              {pr.comments}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface CommitCardSmallProps {
  commit: Commit;
}

export function CommitCardSmall({ commit }: CommitCardSmallProps) {
  const shortSha = commit.id.substring(0, 7);

  return (
    <a
      href={commit.url}
      target="_blank"
      rel="noopener noreferrer"
      className="swiss-card block group p-3"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="swiss-text-mono text-xs text-terracotta-light font-medium">
          {shortSha}
        </span>
        <span className="swiss-text-mono text-xs text-gray-500">
          {formatTimeAgo(commit.date)}
        </span>
      </div>
      <p className="swiss-text-mono text-xs text-gray-400 group-hover:text-gray-200 transition-colors line-clamp-1">
        {commit.message}
      </p>
    </a>
  );
}

export function GithubFeedSkeleton() {
  return (
    <div className="swiss-card rounded-xl p-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gray-700 animate-pulse" />
          <div className="h-6 w-36 bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="w-2 h-2 rounded-full bg-terracotta-light animate-pulse" />
      </div>

      {/* Skeleton items */}
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-gray-800/30 rounded-xl p-4 animate-pulse"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gray-700" />
              <div className="flex-1">
                <div className="h-4 w-28 bg-gray-700 rounded mb-2" />
                <div className="h-3 w-full bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface GithubFeedErrorProps {
  onRetry: () => void;
}

export function GithubFeedError({ onRetry }: GithubFeedErrorProps) {
  return (
    <div className="swiss-card rounded-xl p-6 border-terracotta/30">
      <div className="flex items-center gap-2 text-terracotta-light mb-3">
        <span className="text-xl font-semibold">Error</span>
      </div>
      <p className="swiss-text-label text-gray-500 mb-4">
        Unable to load GitHub data
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg bg-terracotta/10 border border-terracotta/30 text-terracotta-light hover:bg-terracotta/20 transition-colors text-sm font-medium"
      >
        Retry
      </button>
    </div>
  );
}
