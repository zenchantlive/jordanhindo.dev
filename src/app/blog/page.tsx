import { Navigation, Footer, AuroraBackground } from '@/components';
import { getAllSeries } from '@/lib/blog';
import Link from 'next/link';
import { BookOpen, Calendar, ChevronRight } from 'lucide-react';

export const metadata = {
    title: 'Blog | Build Logs',
    description: 'Transparent documentation of building production AI apps.',
};

export default async function BlogHub() {
    const series = await getAllSeries();

    return (
        <main className="min-h-screen relative overflow-hidden bg-[#0a0a0a] selection:bg-purple-500/30">
            <AuroraBackground />
            <Navigation />

            <section className="relative z-10 pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <header className="mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">
                            Build Logs
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl">
                            Transparent documentation of building production AI apps.
                        </p>
                    </header>

                    <div className="grid gap-8">
                        {series.map((item) => (
                            <Link
                                key={item.id}
                                href={`/blog/${item.slug}`}
                                className="group relative"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
                                <div className="relative bg-[#161b22]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-3">
                                                <BookOpen className="w-4 h-4" />
                                                <span>Build Log Series</span>
                                            </div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                                {item.title}
                                            </h2>
                                            <p className="text-gray-400 mb-6 line-clamp-2 max-w-2xl">
                                                {item.description}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Updated {new Date(item.lastUpdated).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                                    <span>{item.itemCount} Parts</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-all duration-300">
                                            <ChevronRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
