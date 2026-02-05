import { Navigation, Footer, AuroraBackground } from '@/components';
import { Download, MapPin, Mail, Globe, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Project thumbnail images
import assetHatchImg from './images/asset-hatch.png';
import catwalkImg from './images/catwalk.png';
import thefeedImg from './images/thefeed.png';

export const metadata = {
    title: 'Resume | Jordan Hindo',
    description: 'AI Agent Developer & Technical Educator. Creator of multi-agent pipelines, tool-calling systems, and 40+ technical blog posts on AI-native development.',
};

export default function ResumePage() {
    return (
        <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
            <AuroraBackground />
            <Navigation />

            <section className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Card */}
                    <div className="glass-card rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />

                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                    Jordan <span className="text-gradient">Hindo</span>
                                </h1>
                                <p className="text-xl text-purple-400 font-medium mb-2">
                                    AI Agent Developer & Technical Educator
                                </p>
                                <p className="text-sm text-gray-400 mb-6">
                                    40+ technical posts documenting AI-native development across 3 production project series
                                </p>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4" />
                                        <span>JordanLive121@gmail.com</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>Sacramento, CA / Bay Area</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4" />
                                        <Link href="https://jordanhindo.dev" className="hover:text-white transition-colors">jordanhindo.dev</Link>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Github className="w-4 h-4" />
                                        <Link href="https://github.com/zenchantlive" className="hover:text-white transition-colors">github.com/zenchantlive</Link>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/resume.pdf"
                                target="_blank"
                                className="download-button flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-purple-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Left Column - Experience */}
                        <div className="md:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 text-sm">01</span>
                                    Projects &amp; Experience
                                </h2>

                                <div className="space-y-12">
                                    <ExperienceItem
                                        title="Independent AI Engineer & Researcher"
                                        company="Self-Employed"
                                        period="Jan 2023 - Present"
                                        description="Architecting and shipping production-grade agentic systems. specialized in Model Context Protocol (MCP) infrastructure, multi-agent orchestration, and privacy-first AI architectures."
                                        stats={['MCP', 'Vercel AI SDK', 'Orchestration', 'System Architecture']}
                                    >
                                        <div className="mt-8 space-y-8 border-l-2 border-white/5 pl-6 ml-1">
                                            <ProjectHighlight
                                                name="Catwalk"
                                                role="Infrastructure Engineer"
                                                description="Built a serverless deployment platform for MCP servers. Engineered a custom stdio-to-HTTP bridge implementing the June 2025 MCP Streamable HTTP spec, enabling local agents to securely access remote tools. Implemented a security sandbox to validate AI-generated package imports against npm/PyPI registries to prevent supply-chain attacks."
                                                link="https://github.com/zenchantlive/catwalk"
                                                image={catwalkImg}
                                                liveUrl="https://catwalk-xi.vercel.app"
                                                tags={['MCP Streamable HTTP', 'FastAPI', 'Fly.io Machines', 'Security Sandboxing']}
                                            />

                                            <ProjectHighlight
                                                name="Asset Hatch"
                                                role="Lead Architect"
                                                description="Designed a hybrid persistence engine using Client-side IndexedDB (Dexie) for zero-latency UI state and Server-side Postgres (Prisma) for data durability. Implemented a Privacy-First 'Bring Your Own Key' (BYOK) architecture, ensuring sensitive inference data never touches intermediate servers. Orchestrated a multi-agent loop that shipped 30,000 lines of type-safe code in 11 days."
                                                link="https://github.com/zenchantlive/Asset-Hatch"
                                                image={assetHatchImg}
                                                liveUrl="https://asset-hatch.vercel.app"
                                                tags={['Hybrid Persistence', 'Local-First', 'Multi-Agent', 'Systematic Debugging']}
                                            />

                                            <ProjectHighlight
                                                name="TheFeed"
                                                role="Full Stack Engineer"
                                                description="Integrated 'Sous-Chef' AI assistant using CopilotKit for context-aware recipe generation. Built a dual-path auth system for anonymous crisis access. Solved complex geospatial challenges with Mapbox GL and PostGIS for precise food bank discovery."
                                                link="https://thefeed-phi.vercel.app"
                                                image={thefeedImg}
                                                liveUrl="https://thefeed-phi.vercel.app"
                                                tags={['CopilotKit', 'Geospatial', 'Dual-Auth', 'RAG']}
                                            />
                                        </div>
                                    </ExperienceItem>

                                    <ExperienceItem
                                        title="Workability Tech"
                                        company="San Juan USD"
                                        period="Jan 2024 - Present"
                                        description="Customer success specialist bridging education and employment for students with disabilities. Provide 1:1 job coaching, resume/interview training, and stakeholder coordination. Tech-first operations with standardized workflows."
                                        stats={['Customer Training', 'Accessibility', 'Stakeholder Management']}
                                    />
                                </div>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-sm">02</span>
                                    Education
                                </h2>
                                <div className="glass-card rounded-2xl p-6 border-white/5">
                                    <h3 className="text-lg font-bold text-white mb-1">BA Sociology, Minor in Communications</h3>
                                    <p className="text-blue-400 text-sm mb-2">Cal-Poly Humboldt (HSU) • 2018-2020</p>
                                    <p className="text-gray-400 text-sm mb-2">3.45 GPA (3.94 final semester)</p>
                                    <p className="text-gray-500 text-sm italic">Research: &quot;The Effect of Social Media on Subjective Well-Being&quot;</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Skills & Info */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-8">Skills</h2>
                                <div className="space-y-8">
                                    <SkillGroup
                                        title="AI Agent Development"
                                        skills={['Multi-Agent Pipelines', 'Tool Calling / Function Calling', 'RAG (Airweave)', 'LLM Orchestration', 'Context Engineering', 'MCP Protocol']}
                                    />
                                    <SkillGroup
                                        title="Frontend"
                                        skills={['React', 'Next.js 15', 'TypeScript', 'Tailwind CSS', 'Framer Motion']}
                                    />
                                    <SkillGroup
                                        title="Backend"
                                        skills={['Node.js', 'Python', 'FastAPI', 'Prisma', 'Drizzle', 'PostgreSQL']}
                                    />
                                    <SkillGroup
                                        title="Infrastructure"
                                        skills={['Vercel', 'Fly.io', 'Docker', 'Git', 'GitHub Actions']}
                                    />
                                </div>
                            </div>

                            <div className="glass-card rounded-2xl p-8 border-white/5 bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                                <h3 className="text-lg font-bold text-white mb-4">Let&apos;s Connect</h3>
                                <p className="text-gray-400 text-sm mb-6">
                                    Open to AI Agent Developer, Developer Advocate, and Forward Deployed roles. Bay Area or remote.
                                </p>
                                <div className="flex gap-4">
                                    <Link href="https://www.linkedin.com/in/jordan-hindo-711007173/" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                    <Link href="https://github.com/zenchantlive" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                                        <Github className="w-5 h-5" />
                                    </Link>
                                    <Link href="mailto:JordanLive121@gmail.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
                                        <Mail className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// ExperienceItem component displays a single experience entry in the timeline
// Supports optional link prop to make the company name clickable
// Supports optional image prop to show project screenshot (clickable to live site)
import type { StaticImageData } from 'next/image';

function ExperienceItem({ title, company, period, description, stats, link, image, liveUrl, children }: {
    title: string;
    company: string;
    period: string;
    description: string;
    stats: string[];
    link?: string;
    image?: StaticImageData;
    liveUrl?: string;
    children?: React.ReactNode;
}) {
    return (
        <div className="relative pl-8 border-l border-white/5 pb-12 last:pb-0">
            {/* Timeline dot with glow effect */}
            <div className="absolute left-0 top-0 w-3 h-3 rounded-full bg-purple-500 -ml-[6.5px] mt-2 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />

            {/* Header row with title and period */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">{title}</h3>
                    {/* Company name is clickable if link is provided */}
                    {link ? (
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-purple-400 font-medium hover:text-purple-300 transition-colors">
                            {company} ↗
                        </a>
                    ) : (
                        <p className="text-purple-400 font-medium">{company}</p>
                    )}
                </div>
                <span className="text-sm text-gray-500 font-mono">{period}</span>
            </div>

            {/* Large project screenshot - subdued, clickable to live site */}
            {image && (
                <a
                    href={liveUrl || link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-print block mb-6 group/img relative h-40 md:h-48 rounded-xl overflow-hidden border border-white/10 bg-white/5 hover:border-purple-500/40 transition-all duration-300 shadow-lg hover:shadow-purple-500/10"
                >
                    {/* Subdued overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 group-hover/img:from-black/40 group-hover/img:via-transparent transition-all duration-300" />

                    {/* Image */}
                    <Image
                        src={image}
                        alt={`${company} screenshot`}
                        className="w-full h-full object-cover object-top opacity-80 group-hover/img:opacity-100 group-hover/img:scale-[1.02] transition-all duration-500"
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                    />

                    {/* "View Live" indicator */}
                    <div className="absolute bottom-3 right-3 z-20 px-3 py-1.5 bg-purple-500/80 backdrop-blur-sm rounded-full text-xs font-medium text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        View Live ↗
                    </div>
                </a>
            )}

            <p className="text-gray-400 mb-6 leading-relaxed">
                {description}
            </p>

            {/* Skills/tech tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {stats.map(stat => (
                    <span key={stat} className="px-3 py-1 bg-white/5 border border-white/5 text-gray-400 text-xs rounded-full">
                        {stat}
                    </span>
                ))}
            </div>

            {children}
        </div>
    );
}

function ProjectHighlight({ name, role, description, link, image, liveUrl, tags }: {
    name: string;
    role: string;
    description: string;
    link: string;
    image: StaticImageData;
    liveUrl: string;
    tags: string[];
}) {
    return (
        <div className="group/project">
            <div className="flex flex-col md:flex-row gap-6 mb-4">
                {/* Thumbnail - smaller than main experience item */}
                <a
                    href={liveUrl || link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-full md:w-48 h-32 relative rounded-lg overflow-hidden border border-white/10 bg-white/5 hover:border-purple-500/40 transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-black/20 group-hover/project:bg-transparent transition-colors z-10" />
                    <Image
                        src={image}
                        alt={name}
                        className="object-cover transition-transform duration-500 group-hover/project:scale-105"
                        fill
                        sizes="(max-width: 768px) 100vw, 200px"
                    />
                </a>

                <div className="flex-1">
                    <div className="flex items-baseline justify-between mb-1">
                        <h4 className="text-lg font-bold text-white group-hover/project:text-purple-300 transition-colors">
                            <a href={link} target="_blank" rel="noopener noreferrer">{name}</a>
                        </h4>
                        <span className="text-sm text-purple-400 font-medium">{role}</span>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] uppercase tracking-wide rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
    return (
        <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{title}</h3>
            <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/5 text-white text-sm rounded-lg hover:border-purple-500/30 transition-colors cursor-default">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}
