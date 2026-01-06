/**
 * Aurora Background Component
 * Creates subtle animated gradient blobs for visual depth
 * Fixed position, behind all content
 */
export function AuroraBackground() {
    return (
        <div className="aurora-background fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Top left purple blob */}
            <div
                className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full 
                   mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
            />

            {/* Top right blue blob */}
            <div
                className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full 
                   mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
            />

            {/* Bottom pink blob */}
            <div
                className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500 rounded-full 
                   mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
            />

            {/* Center dark overlay for depth */}
            <div
                className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-slate-800 rounded-full 
                   mix-blend-multiply filter blur-[100px] opacity-30 -translate-x-1/2 -translate-y-1/2"
            />
        </div>
    );
}
