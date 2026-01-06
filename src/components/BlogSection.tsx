import Link from "next/link";
import { BlogPost } from "@/types/blog";

interface BlogSectionProps {
    posts: BlogPost[];
}

/**
 * Blog Section Component
 * Displays featured blog post cards with links to full posts
 */
export function BlogSection({ posts }: BlogSectionProps) {
    return (
        <section id="blog" className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Build <span className="text-gradient">Logs</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            A transparent look at building production AI apps in public.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors whitespace-nowrap"
                    >
                        View all build logs →
                    </Link>
                </div>

                {/* Blog posts grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/asset-hatch/${post.slug}`}
                            className="glass-card rounded-2xl p-8 hover:bg-white/10 hover:border-white/20
                         transition-all duration-300 flex flex-col h-full group"
                        >
                            {/* Part label */}
                            <div className="text-xs text-purple-400 mb-3 font-semibold tracking-wider">
                                PART {post.part}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                {post.title.replace(/^Part \d+: /, '')}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
                                {post.description}
                            </p>

                            {/* Metadata */}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto">
                                <span>{post.readingTime} min read</span>
                                <span className="w-1 h-1 rounded-full bg-gray-700" />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
