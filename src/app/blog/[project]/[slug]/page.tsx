import { Navigation, Footer, AuroraBackground, MarkdownRenderer } from '@/components';
import { getPostsForSeries, getSeriesMetadata, getPostBySlug } from '@/lib/blog';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Calendar, Share2 } from 'lucide-react';
import { notFound } from 'next/navigation';

interface PostPageProps {
    params: Promise<{ project: string; slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps) {
    const { project, slug } = await params;
    const post = await getPostBySlug(project, slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Building Asset Hatch`,
        description: post.description,
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { project, slug } = await params;
    const series = await getSeriesMetadata(project);
    const post = await getPostBySlug(project, slug);
    const allPosts = await getPostsForSeries(project);

    if (!series || !post) {
        notFound();
    }

    const currentIndex = allPosts.findIndex(p => p.slug === slug);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a]">
            <AuroraBackground />
            <Navigation />

            {/* Sticky Back Button - Desktop Only */}
            <div className="hidden xl:block fixed left-10 top-32 z-50">
                <Link
                    href={`/blog/${project}`}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-semibold px-2">Back to Series</span>
                </Link>
            </div>

            <article className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href={`/blog/${project}`}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {series.title}
                        </Link>

                        <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>

                    <header className="mb-12">
                        <div className="flex items-center gap-3 text-purple-400 text-sm font-semibold mb-4">
                            <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                                PART {post.part} OF {allPosts.length}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {post.title.replace(/^Part \d+: /, '')}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        </div>
                    </header>

                    <div className="relative mb-16">
                        <MarkdownRenderer content={post.content} />
                    </div>

                    <hr className="border-white/10 mb-12" />

                    {/* Post Navigation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                        {prevPost ? (
                            <Link
                                href={`/blog/${project}/${prevPost.slug}`}
                                className="group p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all"
                            >
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                                    <ChevronLeft className="w-3 h-3" />
                                    PREVIOUS PART
                                </div>
                                <div className="text-white font-bold group-hover:text-purple-300 transition-colors line-clamp-1">
                                    {prevPost.title.replace(/^Part \d+: /, '')}
                                </div>
                            </Link>
                        ) : <div />}

                        {nextPost ? (
                            <Link
                                href={`/blog/${project}/${nextPost.slug}`}
                                className="group p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 hover:border-white/10 transition-all text-right"
                            >
                                <div className="flex items-center gap-2 text-gray-500 text-xs mb-2 justify-end">
                                    NEXT PART
                                    <ChevronRight className="w-3 h-3" />
                                </div>
                                <div className="text-white font-bold group-hover:text-purple-300 transition-colors line-clamp-1">
                                    {nextPost.title.replace(/^Part \d+: /, '')}
                                </div>
                            </Link>
                        ) : <div />}
                    </div>

                    <div className="bg-[#161b22]/50 border border-white/10 rounded-3xl p-8 mb-20">
                        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-2xl font-bold flex-shrink-0">
                                JH
                            </div>
                            <div>
                                <h3 className="text-white font-bold mb-1">Jordan Hindo</h3>
                                <p className="text-gray-400 text-sm mb-4 max-w-sm">
                                    Full-stack Developer & AI Engineer building in public. Exploring the future of agentic coding and AI-generated assets.
                                </p>
                                <Link href="/#contact" className="text-purple-400 hover:text-purple-300 text-sm font-semibold inline-flex items-center gap-1 group">
                                    Get in touch
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            <Footer />
        </main>
    );
}
