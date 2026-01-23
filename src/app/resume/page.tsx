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
    description: 'AI Agent Developer and LLM Application Engineer. Creator of multi-agent pipelines, tool-calling systems, and the AI-Native Loop methodology.',
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
                                <p className="text-xl text-purple-400 font-medium mb-6">
                                    AI Agent Developer & LLM Application Engineer
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
                                        title="Creator & Lead Developer"
                                        company="Asset Hatch"
                                        period="Dec 2025 - Present"
                                        description="Designed multi-agent AI pipeline achieving 70% development time reduction vs manual coding. Built tool-calling system with Vercel AI SDK and Zod schemas for type-safe agent execution. Created AI-Native Loop methodology: Claude (vision) → Antigravity (build) → Perplexity (research) → bots (review). 30,000+ line TypeScript codebase documented across 18-part blog series."
                                        stats={['Multi-Agent Pipelines', 'Tool Calling', 'Vercel AI SDK', 'TypeScript']}
                                        link="https://github.com/zenchantlive/Asset-Hatch"
                                        image={assetHatchImg}
                                        liveUrl="https://asset-hatch.vercel.app"
                                    />

                                    <ExperienceItem
                                        title="Creator"
                                        company="Catwalk"
                                        period="Dec 2025"
                                        description="Built MCP server deployment platform using 100% AI orchestration—zero manual code. Implemented multi-agent code review pipeline with CodeRabbit, Qodo, and Gemini Code Assist. Created 'AI Orchestrator's Handbook' documenting reproducible methodology for agentic development."
                                        stats={['MCP Protocol', 'AI Orchestration', 'FastAPI', 'Fly.io']}
                                        link="https://github.com/zenchantlive/catwalk"
                                        image={catwalkImg}
                                        liveUrl="https://catwalk-xi.vercel.app"
                                    />

                                    <ExperienceItem
                                        title="Creator"
                                        company="TheFeed"
                                        period="Nov - Dec 2025"
                                        description="Integrated AI assistant ('Sous-Chef') using CopilotKit for recipe generation from available ingredients. Built dual-path architecture enabling anonymous crisis access alongside authenticated features. Full-stack with Mapbox GL maps and Drizzle ORM."
                                        stats={['AI Assistant', 'CopilotKit', 'Mapbox GL', 'Full-Stack']}
                                        link="https://thefeed-phi.vercel.app"
                                        image={thefeedImg}
                                        liveUrl="https://thefeed-phi.vercel.app"
                                    />

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
                                    Open to AI Agent Developer, LLM Engineer, and Forward Deployed roles. Bay Area or remote.
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

function ExperienceItem({ title, company, period, description, stats, link, image, liveUrl }: {
    title: string;
    company: string;
    period: string;
    description: string;
    stats: string[];
    link?: string;
    image?: StaticImageData;
    liveUrl?: string;
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
            <div className="flex flex-wrap gap-2">
                {stats.map(stat => (
                    <span key={stat} className="px-3 py-1 bg-white/5 border border-white/5 text-gray-400 text-xs rounded-full">
                        {stat}
                    </span>
                ))}
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
