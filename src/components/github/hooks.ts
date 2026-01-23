"use client";

import { useState, useEffect } from "react";
import type { Project, PullRequest, Commit } from "./types";

type View = 'projects' | 'detail';
type DetailView = 'prs' | 'commits';

export interface GithubData {
  projects: Project[];
  selectedProject: Project | null;
  prs: PullRequest[];
  commits: Commit[];
  loading: boolean;
  error: boolean;
  view: View;
  detailView: DetailView;
}

export function useGithubFeed(): GithubData & {
  selectProject: (project: Project) => void;
  goBack: () => void;
  setDetailView: (view: DetailView) => void;
  refresh: () => void;
} {
  const [view, setView] = useState<View>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailView, setDetailView] = useState<DetailView>('prs');
  const [projects, setProjects] = useState<Project[]>([]);
  const [prs, setPRs] = useState<PullRequest[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Load projects on mount
  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/github/projects", {
          next: { revalidate: 300 },
        });
        
        if (!res.ok) throw new Error("Failed to fetch projects");
        
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Load PRs when selecting a project
  useEffect(() => {
    if (selectedProject && view === 'detail') {
      const projectName = selectedProject.fullName;
      async function loadPRs() {
        try {
          const res = await fetch(
            `/api/github/projects/${projectName}/prs`,
            { next: { revalidate: 300 } }
          );
          
          if (res.ok) {
            const data = await res.json();
            setPRs(data.prs || []);
          }
        } catch (err) {
          console.error("Failed to load PRs:", err);
        }
      }
      loadPRs();
    }
  }, [selectedProject, view]);

  // Load commits when selecting a project
  useEffect(() => {
    if (selectedProject && view === 'detail' && detailView === 'commits') {
      const projectName = selectedProject.fullName;
      async function loadCommits() {
        try {
          const res = await fetch(
            `/api/github/projects/${projectName}/commits`,
            { next: { revalidate: 300 } }
          );
          
          if (res.ok) {
            const data = await res.json();
            setCommits(data.commits || []);
          }
        } catch (err) {
          console.error("Failed to load commits:", err);
        }
      }
      loadCommits();
    }
  }, [selectedProject, view, detailView]);

  const selectProject = (project: Project) => {
    setSelectedProject(project);
    setView('detail');
    setDetailView('prs');
    setPRs([]);
    setCommits([]);
  };

  const goBack = () => {
    setView('projects');
    setSelectedProject(null);
    setPRs([]);
    setCommits([]);
  };

  const refresh = () => {
    setLoading(true);
    setError(false);
    setProjects([]);
    setSelectedProject(null);
    setPRs([]);
    setCommits([]);
    setView('projects');
    
    async function loadProjects() {
      try {
        const res = await fetch("/api/github/projects", {
          next: { revalidate: 300 },
        });
        
        if (!res.ok) throw new Error("Failed to fetch projects");
        
        const data = await res.json();
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  };

  return {
    projects,
    selectedProject,
    prs,
    commits,
    loading,
    error,
    view,
    detailView,
    selectProject,
    goBack,
    setDetailView,
    refresh,
  };
}
