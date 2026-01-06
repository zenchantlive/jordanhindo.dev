/**
 * About Section Component
 * Personal narrative with animated code block visual
 */
export function AboutSection() {
    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass-card rounded-2xl p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left column - Text content */}
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-6">
                                Solo Founder, <span className="text-gradient">AI-Augmented</span>
                            </h2>

                            <div className="space-y-4 text-gray-300">
                                <p>
                                    I don&apos;t just write code; I orchestrate it. As a solo founder,
                                    I leverage AI agents like Claude Code and Gemini as my pair programmers,
                                    allowing me to build complex, enterprise-grade systems at 10x speed.
                                </p>
                                <p>
                                    My philosophy is simple:{" "}
                                    <strong>Ship fast, learn faster, document everything.</strong>{" "}
                                    From 3 AM debugging sessions to architectural pivots, I believe in
                                    transparency and the power of building in public.
                                </p>
                            </div>

                            {/* Current focus tags */}
                            <div className="mt-8 pt-8 border-t border-white/10">
                                <p className="text-sm font-semibold text-purple-400 mb-2">
                                    CURRENT FOCUS:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                        Multi-Agent Systems
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                        MCP Servers
                                    </span>
                                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300">
                                        Generative UI
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right column - Code block visual */}
                        <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden">
                            {/* Gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30" />

                            {/* Animated code block */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5/6">
                                <div className="glass-card p-4 rounded-lg font-mono text-xs text-blue-300 shadow-2xl backdrop-blur-xl bg-black/60">
                                    {/* Window controls */}
                                    <div className="flex justify-between items-center mb-3 border-b border-white/10 pb-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                        </div>
                                        <span className="text-gray-500">pivot.ts</span>
                                    </div>

                                    {/* Code content */}
                                    <p className="text-gray-500">
                                        {`// 3 AM: Migrating to Vercel AI SDK`}
                                    </p>
                                    <p>
                                        <span className="text-pink-400">const</span>{" "}
                                        <span className="text-yellow-300">generateAsset</span> ={" "}
                                        <span className="text-pink-400">async</span> (prompt) =&gt; {"{"}
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-purple-400">return</span>{" "}
                                        <span className="text-blue-400">streamText</span>({"{"}
                                    </p>
                                    <p className="pl-8">
                                        model: <span className="text-green-300">&apos;gemini-pro&apos;</span>,
                                    </p>
                                    <p className="pl-8">
                                        tools: {"{"}{" "}
                                        <span className="text-yellow-300">styleAnchor</span>,{" "}
                                        <span className="text-yellow-300">export</span> {"}"},
                                    </p>
                                    <p className="pl-4">{"}"});</p>
                                    <p>{"}"}</p>

                                    {/* Blinking cursor */}
                                    <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
