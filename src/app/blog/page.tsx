import { Navigation, Footer, AuroraBackground, TechTag } from '@/components';
import { getAllSeries } from '@/lib/blog';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
    title: 'Blog | Build Logs',
    description: 'Three production apps built with AI - documented from idea to deployment',
};

export default async function BlogHub() {
    const series = await getAllSeries();

    // Calculate total stats
    const totalPosts = series.reduce((acc, s) => acc + s.itemCount, 0);

    // Map series by slug for easy access
    const seriesMap = Object.fromEntries(series.map(s => [s.slug, s]));
    const assetHatch = seriesMap['asset-hatch'];
    const thefeed = seriesMap['thefeed-blog'];
    const catwalk = seriesMap['catwalk-blog'];

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a] selection:bg-purple-500/30">
            <AuroraBackground />
            <Navigation />

            <section className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            Build Logs
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl">
                            Three production apps built with AI - documented from idea to deployment
                        </p>
                    </header>

                    {/* Stats Bar */}
                    <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">{totalPosts}</div>
                                <div className="text-xs text-gray-500 mt-1">Total Posts</div>
                            </div>
                            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">3</div>
                                <div className="text-xs text-gray-500 mt-1">Production Apps</div>
                            </div>
                            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">~500</div>
                                <div className="text-xs text-gray-500 mt-1">Min Reading</div>
                            </div>
                            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">100%</div>
                                <div className="text-xs text-gray-500 mt-1">Built with AI</div>
                            </div>
                            <div className="bg-[#1a1a1a] border border-white/5 rounded-xl p-4">
                                <div className="text-2xl font-bold text-purple-400">Jan 2025</div>
                                <div className="text-xs text-gray-500 mt-1">Last Updated</div>
                            </div>
                        </div>
                    </div>

                    {/* Featured Project: Asset Hatch */}
                    {assetHatch && (
                        <Link
                            href={`/blog/${assetHatch.slug}`}
                            className="group relative block mb-8"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                            <div className="relative bg-[#161b22]/80 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                                {/* Gradient accent line */}
                                <div className="h-0.5 w-80 bg-gradient-to-r from-purple-500 to-pink-500 mb-6" />

                                <div className="flex items-start gap-2 text-purple-400 text-sm font-semibold mb-3">
                                    <span>{assetHatch.itemCount} PARTS • MOST RECENT</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                    {assetHatch.title}
                                </h2>

                                <p className="text-gray-300 mb-6 max-w-3xl">
                                    {assetHatch.description} From problem identification to live deployment - a complete build journey including pivots, technical challenges, and production launch.
                                </p>

                                <div className="mb-6">
                                    <h3 className="text-white font-semibold mb-3">What&apos;s Covered:</h3>
                                    <ul className="text-gray-400 space-y-2 text-sm">
                                        <li>• Full-stack development: Next.js, PostgreSQL, Prisma</li>
                                        <li>• AI integration: OpenRouter API, prompt engineering, fine-tuning</li>
                                        <li>• Production systems: NeonDB, auth, real-time features</li>
                                        <li>• DevOps: CI/CD, monitoring, performance optimization</li>
                                    </ul>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <TechTag tech="Next.js" size="md" />
                                    <TechTag tech="PostgreSQL" size="md" />
                                    <TechTag tech="OpenRouter" size="md" />
                                    <TechTag tech="NeonDB" size="md" />
                                    <TechTag tech="Tailwind" size="md" />
                                </div>

                                <div className="inline-flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-3 transition-all">
                                    Read Series <ArrowRight className="w-5 h-5" />
                                </div>
                            </div>
                        </Link>
                    )}

                    {/* Supporting Projects Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* TheFeed */}
                        {thefeed && (
                            <Link
                                href={`/blog/${thefeed.slug}`}
                                className="group relative block"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 to-blue-500/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-[#161b22]/80 backdrop-blur-xl border-2 border-green-500/30 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 h-full">
                                    <div className="h-0.5 w-60 bg-gradient-to-r from-green-500 to-blue-500 mb-4" />

                                    <div className="text-green-400 text-sm font-semibold mb-2">
                                        {thefeed.itemCount} PARTS
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors">
                                        {thefeed.title}
                                    </h2>

                                    <p className="text-gray-400 mb-4 text-sm">
                                        {thefeed.description} Real-time social features, data aggregation, and scaling challenges.
                                    </p>

                                    <div className="mb-4">
                                        <h3 className="text-white font-semibold text-sm mb-2">Highlights:</h3>
                                        <ul className="text-gray-400 space-y-1 text-sm">
                                            <li>• Real-time social feed architecture</li>
                                            <li>• AI content moderation & recommendations</li>
                                            <li>• Data aggregation & analytics</li>
                                            <li>• User engagement & retention</li>
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <TechTag tech="Next.js" />
                                        <TechTag tech="Community-Focus" />
                                        <TechTag tech="Real-time" />
                                        <TechTag tech="Food Safety" />
                                    </div>

                                    <div className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:gap-3 transition-all text-sm">
                                        Read Series <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Catwalk */}
                        {catwalk && (
                            <Link
                                href={`/blog/${catwalk.slug}`}
                                className="group relative block"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-[#161b22]/80 backdrop-blur-xl border-2 border-blue-500/30 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300 h-full">
                                    <div className="h-0.5 w-60 bg-gradient-to-r from-blue-500 to-cyan-500 mb-4" />

                                    <div className="text-blue-400 text-sm font-semibold mb-2">
                                        {catwalk.itemCount} PARTS
                                    </div>

                                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                                        {catwalk.title}
                                    </h2>

                                    <p className="text-gray-400 mb-4 text-sm">
                                        {catwalk.description} Infrastructure automation, developer tooling, and platform engineering.
                                    </p>

                                    <div className="mb-4">
                                        <h3 className="text-white font-semibold text-sm mb-2">Highlights:</h3>
                                        <ul className="text-gray-400 space-y-1 text-sm">
                                            <li>• Platform engineering & DevOps</li>
                                            <li>• Infrastructure as Code</li>
                                            <li>• Developer tooling & CLI</li>
                                            <li>• Multi-tenant architecture</li>
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <TechTag tech="MCP" />
                                        <TechTag tech="DevOps" />
                                        <TechTag tech="Platform" />
                                        <TechTag tech="Fly.io" />
                                    </div>

                                    <div className="inline-flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all text-sm">
                                        Read Series <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
