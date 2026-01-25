import { Navigation, Footer, AuroraBackground, TechTag } from '@/components';
import { getPostsForSeries, getSeriesMetadata } from '@/lib/blog';
import { GithubProjectDetails } from '@/components/github/ProjectDetails';
import Link from 'next/link';
import { ArrowLeft, Star, GitBranch } from 'lucide-react';
import { notFound } from 'next/navigation';

interface SeriesPageProps {
    params: Promise<{ project: string }>;
}

export async function generateMetadata({ params }: SeriesPageProps) {
    const { project } = await params;
    const series = await getSeriesMetadata(project);
    if (!series) return { title: 'Series Not Found' };

    return {
        title: `${series.title} | Build Log Series`,
        description: series.description,
    };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
    const { project } = await params;
    const series = await getSeriesMetadata(project);
    const allPosts = await getPostsForSeries(project);

    if (!series || allPosts.length === 0) {
        notFound();
    }

    // Split posts into groups
    const featuredPosts = allPosts.filter(p => p.featured);
    const heroPosts = featuredPosts.slice(0, 1); // First featured post as hero
    const sidebarPosts = allPosts.slice(-3).reverse(); // Latest 3 posts

    // Group posts by section (customize per project)
    const foundationPosts = allPosts.filter(p => p.part && p.part >= 1 && p.part <= 6);
    const productionPosts = allPosts.filter(p => p.part && p.part >= 9 && p.part <= 15);
    const remainingPosts = allPosts.filter(p => p.part && p.part >= 7 && p.part <= 8);

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
            <AuroraBackground />
            <Navigation />

            <section className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Build Logs
                    </Link>

                    <header className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                            {series.title}
                        </h1>
                        <p className="text-xl text-gray-400 max-w-3xl mb-6">
                            {series.itemCount}-part series: {series.description}
                        </p>

                        {series.techStack && series.techStack.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {series.techStack.map(tech => (
                                    <TechTag key={tech} tech={tech} size="md" />
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Hero + Sidebar Layout */}
                    <div className="grid lg:grid-cols-[1fr,340px] gap-6 mb-12">
                        {/* Hero Featured Post */}
                        {heroPosts[0] && (
                            <Link
                                href={`/blog/${project}/${heroPosts[0].slug}`}
                                className="group relative block"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-[#161b22]/80 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300">
                                    {/* Featured star */}
                                    <div className="absolute top-6 right-6">
                                        <Star className="w-3 h-3 fill-purple-500 text-purple-500" />
                                    </div>

                                    <div className="text-purple-400 text-sm font-semibold mb-2">
                                        PART {heroPosts[0].part}
                                    </div>

                                    <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                        {heroPosts[0].title.replace(/^Part \d+: /, '')}
                                    </h2>

                                    <p className="text-gray-300 mb-6 line-clamp-4">
                                        {heroPosts[0].description}
                                    </p>

                                    {heroPosts[0].techStack && heroPosts[0].techStack.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {heroPosts[0].techStack.map(tech => (
                                                <TechTag key={tech} tech={tech} size="md" />
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span>📅 {new Date(heroPosts[0].date).toLocaleDateString()}</span>
                                        <span>⏱ {heroPosts[0].readingTime} min read</span>
                                    </div>

                                    <div className="mt-6">
                                        <div className="inline-flex items-center px-6 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 font-semibold rounded-full hover:bg-purple-500/30 transition-colors">
                                            Read Article →
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Sidebar - Latest Posts */}
                        <div className="flex flex-col gap-4">
                            {sidebarPosts.map(post => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${project}/${post.slug}`}
                                    className="group relative block"
                                >
                                    <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300">
                                        {post.featured && (
                                            <div className="absolute top-4 right-4">
                                                <Star className="w-2.5 h-2.5 fill-purple-500 text-purple-500" />
                                            </div>
                                        )}

                                        <div className="text-purple-400 text-xs font-semibold mb-2">
                                            PART {post.part}
                                        </div>

                                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                            {post.title.replace(/^Part \d+: /, '')}
                                        </h3>

                                        {post.techStack && post.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {post.techStack.slice(0, 2).map(tech => (
                                                    <TechTag key={tech} tech={tech} />
                                                ))}
                                            </div>
                                        )}

                                        <div className="text-xs text-gray-500">
                                            ⏱ {post.readingTime} min
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Section: Foundation */}
                    {foundationPosts.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Foundation</h2>
                            <div className="h-px bg-gradient-to-r from-white/20 to-transparent mb-6" />

                            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6 mb-6">
                                {/* Wide featured card */}
                                {foundationPosts[3] && (
                                    <Link
                                        href={`/blog/${project}/${foundationPosts[3].slug}`}
                                        className="group relative block"
                                    >
                                        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                                            {foundationPosts[3].featured && (
                                                <div className="absolute top-5 right-5">
                                                    <Star className="w-3 h-3 fill-purple-500 text-purple-500" />
                                                </div>
                                            )}

                                            <div className="text-purple-400 text-sm font-semibold mb-2">
                                                PART {foundationPosts[3].part}
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                                {foundationPosts[3].title.replace(/^Part \d+: /, '')}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {foundationPosts[3].description}
                                            </p>

                                            {foundationPosts[3].techStack && foundationPosts[3].techStack.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {foundationPosts[3].techStack.map(tech => (
                                                        <TechTag key={tech} tech={tech} />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="text-xs text-gray-500">
                                                ⏱ {foundationPosts[3].readingTime} min read
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {/* Tall card */}
                                {foundationPosts[1] && (
                                    <Link
                                        href={`/blog/${project}/${foundationPosts[1].slug}`}
                                        className="group relative block"
                                    >
                                        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300 h-full">
                                            <div className="text-purple-400 text-sm font-semibold mb-2">
                                                PART {foundationPosts[1].part}
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                                {foundationPosts[1].title.replace(/^Part \d+: /, '')}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-4">
                                                {foundationPosts[1].description}
                                            </p>

                                            {foundationPosts[1].techStack && foundationPosts[1].techStack.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {foundationPosts[1].techStack.map(tech => (
                                                        <TechTag key={tech} tech={tech} />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="text-xs text-gray-500">
                                                ⏱ {foundationPosts[1].readingTime} min read
                                            </div>
                                        </div>
                                    </Link>
                                )}
                            </div>

                            {/* Three equal cards */}
                            <div className="grid md:grid-cols-3 gap-6">
                                {foundationPosts.slice(0, 3).map(post => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${project}/${post.slug}`}
                                        className="group relative block"
                                    >
                                        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300">
                                            <div className="text-purple-400 text-sm font-semibold mb-2">
                                                PART {post.part}
                                            </div>

                                            <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                                {post.title.replace(/^Part \d+: /, '')}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                                {post.description}
                                            </p>

                                            {post.techStack && post.techStack.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mb-3">
                                                    {post.techStack.slice(0, 2).map(tech => (
                                                        <TechTag key={tech} tech={tech} />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="text-xs text-gray-500">
                                                ⏱ {post.readingTime} min
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section: Production Features */}
                    {productionPosts.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-white mb-6">Production Features</h2>
                            <div className="h-px bg-gradient-to-r from-white/20 to-transparent mb-6" />

                            <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6 mb-6">
                                {/* Featured wide card */}
                                {productionPosts.find(p => p.featured) && (
                                    <Link
                                        href={`/blog/${project}/${productionPosts.find(p => p.featured)!.slug}`}
                                        className="group relative block"
                                    >
                                        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                                            <div className="absolute top-5 right-5">
                                                <Star className="w-3 h-3 fill-purple-500 text-purple-500" />
                                            </div>

                                            <div className="text-purple-400 text-sm font-semibold mb-2">
                                                PART {productionPosts.find(p => p.featured)!.part}
                                            </div>

                                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                                {productionPosts.find(p => p.featured)!.title.replace(/^Part \d+: /, '')}
                                            </h3>

                                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                {productionPosts.find(p => p.featured)!.description}
                                            </p>

                                            {productionPosts.find(p => p.featured)!.techStack && (
                                                <div className="flex flex-wrap gap-2 mb-3">
                                                    {productionPosts.find(p => p.featured)!.techStack!.map(tech => (
                                                        <TechTag key={tech} tech={tech} />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="text-xs text-gray-500">
                                                ⏱ {productionPosts.find(p => p.featured)!.readingTime} min read
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                {/* Grid of 2 */}
                                <div className="grid grid-cols-1 gap-6">
                                    {productionPosts.slice(0, 2).map(post => (
                                        <Link
                                            key={post.id}
                                            href={`/blog/${project}/${post.slug}`}
                                            className="group relative block"
                                        >
                                            <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all duration-300">
                                                <div className="text-purple-400 text-sm font-semibold mb-2">
                                                    PART {post.part}
                                                </div>

                                                <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                                    {post.title.replace(/^Part \d+: /, '')}
                                                </h3>

                                                {post.techStack && post.techStack.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                                        {post.techStack.slice(0, 2).map(tech => (
                                                            <TechTag key={tech} tech={tech} />
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="text-xs text-gray-500">
                                                    ⏱ {post.readingTime} min
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* 4 compact cards */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {productionPosts.slice(2, 6).map(post => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${project}/${post.slug}`}
                                        className="group relative block"
                                    >
                                        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
                                            <div className="text-purple-400 text-xs font-semibold mb-2">
                                                PART {post.part}
                                            </div>

                                            <h3 className="text-sm font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                                                {post.title.replace(/^Part \d+: /, '')}
                                            </h3>

                                            {post.techStack && post.techStack.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mb-2">
                                                    {post.techStack.slice(0, 1).map(tech => (
                                                        <TechTag key={tech} tech={tech} />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="text-xs text-gray-500">
                                                ⏱ {post.readingTime} min
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Remaining posts - compact */}
                    {remainingPosts.length > 0 && (
                        <section>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {remainingPosts.map(post => (
                                    <Link
                                        key={post.id}
                                        href={`/blog/${project}/${post.slug}`}
                                        className="group relative block"
                                    >
                                        <div className="bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
                                            <div className="text-purple-400 text-sm font-semibold mb-2">
                                                PART {post.part}
                                            </div>

                                            <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                                {post.title.replace(/^Part \d+: /, '')}
                                            </h3>

                                            <div className="text-xs text-gray-500">
                                                ⏱ {post.readingTime} min
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Section: GitHub Activity */}
                    {series.githubRepo && (
                        <section className="mt-20 pt-20 border-t border-white/5">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2 bg-terracotta/10 rounded-lg">
                                    <GitBranch className="w-6 h-6 text-terracotta-light" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Development Activity</h2>
                                    <p className="text-gray-500 text-sm">Real-time pulse of the build</p>
                                </div>
                            </div>
                            
                            <div className="bg-[#161b22]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-8">
                                <GithubProjectDetails 
                                    repoFullName={series.githubRepo} 
                                    isDedicatedPage={true} 
                                />
                            </div>
                        </section>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
