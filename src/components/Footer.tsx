/**
 * Footer Component
 * Simple footer with copyright and attribution
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 py-8 relative z-10 bg-slate-900/50 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                <p>
                    &copy; {currentYear} Zenchantlive.
                    <span className="text-purple-400">♥</span>
                </p>
            </div>
        </footer>
    );
}
