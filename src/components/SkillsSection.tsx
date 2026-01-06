import { Sparkles, Layout, Database, Server } from "lucide-react";

/**
 * Skills/Stack Section Component
 * Displays tech stack in a grid of glassmorphic cards
 */
export function SkillsSection() {
    // Skills data with icons and descriptions
    const skills = [
        {
            icon: Sparkles,
            iconColor: "text-purple-400",
            bgColor: "bg-purple-500/20",
            title: "AI Engineering",
            description: "Vercel AI SDK, Gemini 3 Pro, Claude Code",
        },
        {
            icon: Layout,
            iconColor: "text-blue-400",
            bgColor: "bg-blue-500/20",
            title: "Frontend",
            description: "Next.js 15, React 19, TypeScript, Tailwind v4",
        },
        {
            icon: Database,
            iconColor: "text-teal-400",
            bgColor: "bg-teal-500/20",
            title: "Persistence",
            description: "Prisma + Dexie (Hybrid Sync), PostgreSQL",
        },
        {
            icon: Server,
            iconColor: "text-pink-400",
            bgColor: "bg-pink-500/20",
            title: "Infrastructure",
            description: "Fly.io, Docker, FastAPI, Fernet Encryption",
        },
    ];

    return (
        <section id="skills" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        The <span className="text-gradient">Stack</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Modern tools for modern AI applications.
                    </p>
                </div>

                {/* Skills grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                        <div
                            key={skill.title}
                            className="glass-card p-6 rounded-xl text-center hover:bg-white/10 
                         transition-colors group"
                        >
                            {/* Icon container */}
                            <div
                                className={`mx-auto w-12 h-12 ${skill.bgColor} rounded-full 
                           flex items-center justify-center mb-4 
                           group-hover:scale-110 transition-transform`}
                            >
                                <skill.icon className={`h-6 w-6 ${skill.iconColor}`} />
                            </div>

                            {/* Skill title */}
                            <h3 className="text-white font-semibold mb-2">{skill.title}</h3>

                            {/* Skill description */}
                            <p className="text-xs text-gray-500">{skill.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
