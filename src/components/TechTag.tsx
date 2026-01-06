interface TechTagProps {
    tech: string;
    size?: 'sm' | 'md';
}

export function TechTag({ tech, size = 'sm' }: TechTagProps) {
    const sizeClasses = {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm'
    };

    return (
        <span className={`
            inline-flex items-center
            ${sizeClasses[size]}
            bg-[#1a1a1a] border border-blue-500/30
            text-blue-400 rounded-full font-medium
            hover:border-blue-500/50 transition-colors
        `}>
            {tech}
        </span>
    );
}
