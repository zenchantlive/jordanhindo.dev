import { Navigation, Footer, AuroraBackground } from '@/components';
import { getPostsForSeries, getSeriesMetadata } from '@/lib/blog';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
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
    const posts = await getPostsForSeries(project);

    if (!series || posts.length === 0) {
        notFound();
    }

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
            <AuroraBackground />
            <Navigation />

            <section className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Build Logs
                    </Link>

                    <header className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            {series.title}
                        </h1>
                        <p className="text-xl text-gray-400 mb-8 max-w-2xl">
                            {series.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            <div className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full">
                                {series.itemCount} Parts
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>~{posts.reduce((acc, p) => acc + p.readingTime, 0)} min total read</span>
                            </div>
                        </div>
                    </header>

                    <div className="relative">
                        {/* Thread line */}
                        <div className="absolute left-[19px] top-4 bottom-4 w-px bg-gradient-to-b from-purple-500/50 via-gray-800 to-transparent md:left-[23px]" />

                        <div className="space-y-6">
                            {posts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${project}/${post.slug}`}
                                    className="group relative flex items-start gap-6 md:gap-8"
                                >
                                    {/* Dot */}
                                    <div className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full border border-gray-800 bg-[#0a0a0a] flex items-center justify-center group-hover:border-purple-500/50 group-hover:bg-purple-950/20 transition-all duration-300 md:w-12 md:h-12">
                                        <span className="text-sm font-bold text-gray-500 group-hover:text-purple-400">
                                            {post.part}
                                        </span>
                                    </div>

                                    <div className="flex-1 pb-8 border-b border-white/5 group-last:border-0 group-hover:border-white/10 transition-colors">
                                        <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                            {post.title.replace(/^Part \d+: /, '')}
                                        </h2>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                            {post.description}
                                        </p>

                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(post.date).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{post.readingTime} min read</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Link
                            href={`/blog/${project}/${posts[0].slug}`}
                            className="inline-flex items-center px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-purple-400 transition-all hover:scale-105 active:scale-95"
                        >
                            Start Reading Part 1
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
