"use client";

interface TechTagProps {
    tech: string;
    size?: 'sm' | 'md';
}

const TECH_LINKS: Record<string, string> = {
    'Next.js': 'https://nextjs.org',
    'PostgreSQL': 'https://www.postgresql.org',
    'OpenRouter': 'https://openrouter.ai',
    'NeonDB': 'https://neon.tech',
    'Tailwind': 'https://tailwindcss.com',
    'Babylon.js': 'https://www.babylonjs.com',
    'Tripo3D': 'https://www.tripo3d.ai',
    '3D-Studio': 'https://github.com/zenchantlive/Asset-Hatch',
    'AI-Agents': 'https://www.anthropic.com/news/claude-3-5-sonnet',
    'OpenHands': 'https://app.all-hands.dev/',
    'MCP': 'https://modelcontextprotocol.io',
    'Fly.io': 'https://www.fly.io',
    'Prisma': 'https://www.prisma.io',
    'Community-Focus': 'https://github.com/zenchantlive/thefeed',
    'RLM': 'https://arxiv.org/abs/2512.24601',
    'SQLite': 'https://www.sqlite.org',
    'Bun': 'https://bun.sh'
};

export function TechTag({ tech, size = 'sm' }: TechTagProps) {
    const sizeClasses = {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm'
    };

    const href = TECH_LINKS[tech];

    const handleClick = (e: React.MouseEvent) => {
        if (href) {
            e.preventDefault();
            e.stopPropagation();
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (href && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            e.stopPropagation();
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <span
            className={`
                inline-flex items-center
                ${sizeClasses[size]}
                bg-[#1a1a1a] border border-blue-500/30
                text-blue-400 rounded-full font-medium
                transition-all duration-200
                ${href ? 'hover:border-blue-500/80 hover:bg-blue-500/10 cursor-pointer' : 'hover:border-blue-500/50'}
            `}
            role={href ? "link" : undefined}
            tabIndex={href ? 0 : undefined}
            onClick={href ? handleClick : undefined}
            onKeyDown={href ? handleKeyDown : undefined}
        >
            {tech}
        </span>
    );
}