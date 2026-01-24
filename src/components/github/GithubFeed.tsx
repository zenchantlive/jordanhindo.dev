"use client";

import { GitCommit, ExternalLink } from "lucide-react";
import { useGithubFeed } from "./hooks";
import {
  GithubFeedSkeleton,
  GithubFeedError,
  ProjectItem,
} from "./ui";
import { GithubProjectDetails } from "./ProjectDetails";

export function GithubFeed() {
  const {
    projects,
    selectedProject,
    loading,
    error,
    view,
    selectProject,
    goBack,
    refresh,
  } = useGithubFeed();

  // Responsive project limiting: show only 3 on mobile, up to 5 on desktop
  const displayedProjects = projects.slice(0, 5); // Base limit from API is 5

  if (loading) {
    return <GithubFeedSkeleton />;
  }

  if (error) {
    return <GithubFeedError onRetry={refresh} />;
  }

  return (
    <div className="swiss-card rounded-xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
          <GitCommit className="w-5 h-5 text-terracotta-light" />
          {view === "projects" ? "Active Projects" : selectedProject?.name}
        </h3>
        <div className="w-2 h-2 rounded-full bg-terracotta-light" />
      </div>

      {/* Projects List View */}
      {view === "projects" && (
        <div className="space-y-3">
          {displayedProjects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No projects found</p>
          ) : (
            displayedProjects.map((project, idx) => (
              <div
                key={project.fullName}
                className={`swiss-reveal ${idx >= 3 ? "hidden sm:block" : ""}`}
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
        <GithubProjectDetails 
          project={selectedProject} 
          onBack={goBack} 
        />
      )}

      {/* Footer link */}
      <a
        href={selectedProject?.htmlUrl || "https://github.com/zenchantlive"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-terracotta-light transition-colors pt-4 border-t border-gray-800"
      >
        {selectedProject ? `View ${selectedProject.name} on GitHub` : "View all projects on GitHub"}
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  );
}

export default GithubFeed;
