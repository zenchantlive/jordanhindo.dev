import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github, ChevronDown } from "lucide-react";

/**
 * Hero Section Component
 * Full-height landing section with tagline, profile card, and CTAs
 */
export function HeroSection() {
    return (
        <section className="min-h-[70vh] flex items-center justify-center pt-24 pb-4 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left column - Text content */}
                <div className="space-y-8">
                    {/* Status badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm">
                        <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                        Building in Public
                    </div>

                    {/* Main headline */}
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                        Ship fast. <br />
                        Learn faster. <br />
                        <span className="text-gradient">Document everything.</span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                        I&apos;m Jordan (<span className="text-purple-300">@zenchantlive</span>).
                        I build AI-first applications with hybrid architectures, using AI agents
                        as my pair programmers.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="#projects"
                            className="inline-flex items-center justify-center px-8 py-3 
                         border border-transparent text-base font-medium rounded-full 
                         text-white bg-purple-600 hover:bg-purple-500 
                         shadow-lg shadow-purple-500/25 transition-all hover:scale-105"
                        >
                            See What I Built
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                        <Link
                            href="https://github.com/zenchantlive"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-8 py-3 
                         border border-white/10 text-base font-medium rounded-full 
                         text-white glass-card hover:bg-white/10 transition-all hover:scale-105"
                        >
                            <Github className="mr-2 h-5 w-5" />
                            GitHub
                        </Link>
                    </div>
                </div>

                {/* Right column - Profile card (desktop only) */}
                <div className="relative hidden lg:block">
                    <div className="glass-card rounded-2xl p-2 max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-500">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                            {/* Full card profile image */}
                            <Image
                                src="/jordan-profile.jpg"
                                alt="Jordan - Founder & Engineer"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Gradient overlay for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            {/* Name overlay at bottom */}
                            <div className="absolute bottom-4 left-4 right-4 text-left">
                                <p className="text-sm font-medium text-purple-300 mb-1">
                                    Founder & Engineer
                                </p>
                                <h3 className="text-2xl font-bold text-white">Jordan</h3>
                                <p className="text-xs text-gray-400 mt-1">zenchantlive</p>
                            </div>
                        </div>
                    </div>

                    {/* Floating tech pills */}
                    <div
                        className="absolute -right-8 top-20 glass-card px-4 py-2 rounded-full 
                       flex items-center gap-2 animate-bounce"
                        style={{ animationDuration: "3s" }}
                    >
                        <span className="text-sm font-medium">Vercel AI SDK</span>
                    </div>
                    <div
                        className="absolute -left-4 bottom-32 glass-card px-4 py-2 rounded-full 
                       flex items-center gap-2 animate-bounce"
                        style={{ animationDuration: "4s" }}
                    >
                        <span className="text-sm font-medium">Agentic Workflows</span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
                <ChevronDown className="h-6 w-6" />
            </div>
        </section>
    );
}
