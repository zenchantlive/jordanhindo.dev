"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Terminal,
    Menu,
    X
} from "lucide-react";

/**
 * Navigation Component
 * Fixed navbar with glassmorphism effect
 * Responsive with mobile hamburger menu
 */
export function Navigation() {
    // State for mobile menu toggle
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Navigation links used in both desktop and mobile
    const navLinks = [
        { href: "/#about", label: "About" },
        { href: "/#skills", label: "Stack" },
        { href: "/#projects", label: "Projects" },
        { href: "/blog", label: "Build Logs" },
        { href: "/resume", label: "Resume" },
    ];

    return (
        <nav className="fixed w-full z-50 glass-nav">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / Brand */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                        <Terminal className="h-8 w-8 text-purple-400" />
                        <span className="font-bold text-xl tracking-tight text-white">
                            Zenchantlive
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-300 hover:text-white hover:bg-white/10 
                             px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {/* Connect CTA button */}
                            <Link
                                href="/#contact"
                                className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 
                           rounded-full text-sm font-medium transition-colors 
                           shadow-lg shadow-purple-500/30"
                            >
                                Connect
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md 
                         text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - slides down when open */}
            {isMobileMenuOpen && (
                <div className="md:hidden glass-card border-t-0 border-x-0 absolute w-full animate-slide-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-gray-300 hover:text-white block px-3 py-2 
                           rounded-md text-base font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/#contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-purple-400 hover:text-purple-300 block px-3 py-2 
                         rounded-md text-base font-medium"
                        >
                            Connect
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
