import Link from "next/link";
import Image from "next/image";
import { Github, CheckCircle2 } from "lucide-react";

// Project data
const projects = [
    {
        title: "Asset Hatch",
        subtitle: "AI-Powered Game Asset Studio",
        description:
            "Solving the visual consistency problem in AI-generated game art. A conversational interface where users describe their game, and an AI agent builds a complete, visually cohesive asset package using style anchoring.",
        status: "Live Demo",
        statusColor: "bg-green-500/20 border-green-500/30 text-green-300",
        image: "/projects/asset-hatch.png",
        techStack: [
            { label: "Next.js 15", color: "bg-purple-500/20 border-purple-500/30 text-purple-200" },
            { label: "Vercel AI SDK", color: "bg-blue-500/20 border-blue-500/30 text-blue-200" },
            { label: "Dexie/Prisma", color: "bg-teal-500/20 border-teal-500/30 text-teal-200" },
        ],
        features: [
            "Style Anchor System for consistency",
            "Tool-calling AI Agents (Gemini 3 Pro)",
            "Hybrid Persistence (Server + Client DB)",
        ],
        githubUrl: "https://github.com/zenchantlive/Asset-Hatch",
        blogUrl: "/blog/asset-hatch",
        liveUrl: "https://asset-hatch.vercel.app",
    },
    {
        title: "Catwalk Live",
        subtitle: "MCP Server Deployment Platform",
        description:
            'A "Vercel for MCP" platform allowing one-click deployment of Remote MCP servers to Fly.io. Built entirely via a multi-stage AI orchestration pipeline. Handles credential encryption and container provisioning.',
        status: "Live Demo",
        statusColor: "bg-pink-500/20 border-pink-500/30 text-pink-300",
        image: "/projects/catwalk.png",
        techStack: [
            { label: "Fly.io", color: "bg-pink-500/20 border-pink-500/30 text-pink-200" },
            { label: "FastAPI", color: "bg-indigo-500/20 border-indigo-500/30 text-indigo-200" },
            { label: "Docker", color: "bg-gray-500/20 border-gray-500/30 text-gray-200" },
        ],
        features: [
            "Auto-analysis of GitHub Repos",
            "Streamable HTTP (MCP 2025 Spec)",
            "Fernet Credential Encryption",
        ],
        githubUrl: "https://github.com/zenchantlive/catwalk",
        blogUrl: "/blog/catwalk-blog",
        liveUrl: "https://catwalk-xi.vercel.app",
    },
    {
        title: "TheFeed",
        subtitle: "AI-Powered Food Security Platform",
        description:
            "Connecting communities with food resources via dynamic mapping. Features an AI 'Sous-Chef' that helps users create recipes from available ingredients. Built with dual-path architecture for anonymous crisis access.",
        status: "Live Demo",
        statusColor: "bg-orange-500/20 border-orange-500/30 text-orange-300",
        image: "/projects/thefeed.png",
        techStack: [
            { label: "Mapbox GL", color: "bg-orange-500/20 border-orange-500/30 text-orange-200" },
            { label: "CopilotKit", color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-200" },
            { label: "Drizzle ORM", color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-200" },
        ],
        features: [
            "Real-time Resource Mapping",
            "AI Recipe Assistant (CopilotKit)",
            "Role-based Access Control",
        ],
        githubUrl: null,
        blogUrl: "/blog/thefeed-blog",
        liveUrl: "https://thefeed-phi.vercel.app",
    },
];

/**
 * Projects Section Component
 * Displays featured project cards with tech stacks and features
 */
export function ProjectsSection() {
    return (
        <section id="projects" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Featured <span className="text-gradient">Builds</span>
                        </h2>
                        <p className="text-gray-400">
                            Flagship projects built with AI orchestration.
                        </p>
                    </div>
                </div>

                {/* Projects grid */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.title}
                            className="glass-card rounded-2xl overflow-hidden hover-lift group flex flex-col h-full"
                        >
                            {/* Project image/header area */}
                            <div className="relative h-48 overflow-hidden bg-gray-900 border-b border-white/5">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />

                                {/* Status badge */}
                                {project.status && (
                                    <div
                                        className={`absolute top-3 right-3 px-2.5 py-0.5 ${project.statusColor} 
                                border backdrop-blur-md rounded-full text-[10px] uppercase tracking-wider font-bold shadow-lg z-10`}
                                    >
                                        {project.status}
                                    </div>
                                )}
                            </div>

                            {/* Project content */}
                            <div className="p-6 flex-grow flex flex-col relative -mt-12 z-20">
                                <div className="mb-4 pt-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-1">
                                        {project.title}
                                    </h3>
                                    <p className="text-purple-400 font-medium text-xs uppercase tracking-wide">
                                        {project.subtitle}
                                    </p>
                                </div>

                                {/* Tech stack pills */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech.label}
                                            className={`px-2 py-1 ${tech.color} border backdrop-blur-xl rounded text-[10px] font-medium shadow-sm`}
                                        >
                                            {tech.label}
                                        </span>
                                    ))}
                                </div>

                                <p className="text-gray-200 text-sm mb-6 leading-relaxed line-clamp-4 flex-grow">
                                    {project.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {project.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-2 text-xs text-gray-300 group-hover:text-gray-200 transition-colors"
                                        >
                                            <CheckCircle2 className="h-3.5 w-3.5 text-green-400/70" />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex gap-4">
                                        {project.githubUrl && (
                                            <Link
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-300 hover:text-white transition-colors"
                                            >
                                                <Github className="h-5 w-5" />
                                            </Link>
                                        )}
                                        {project.liveUrl && (
                                            <Link
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-300 hover:text-white transition-colors text-xs flex items-center gap-1 font-medium"
                                            >
                                                Visit Live ↗
                                            </Link>
                                        )}
                                    </div>

                                    {project.blogUrl ? (
                                        <Link
                                            href={project.blogUrl}
                                            className="text-xs font-bold text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all hover:border-purple-500/30"
                                        >
                                            View Build Log →
                                        </Link>
                                    ) : (
                                        <span className="text-[10px] text-gray-600 font-medium uppercase tracking-wider">Coming Soon</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
