import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogSeries } from '@/types/blog';

const BLOG_ROOT = path.join(process.cwd(), 'src/content/blog');

export async function getSeriesMetadata(seriesId: string): Promise<BlogSeries | null> {
    const seriesPath = path.join(BLOG_ROOT, seriesId);

    try {
        const files = await fs.readdir(seriesPath);
        const mdFiles = files.filter(f => f.endsWith('.md') && !f.toLowerCase().includes('readme'));

        if (mdFiles.length === 0) return null;

        // Series metadata lookup
        const seriesMetadata: Record<string, Omit<BlogSeries, 'itemCount'>> = {
            'asset-hatch': {
                id: 'asset-hatch',
                title: 'Building Asset Hatch',
                description: 'A transparent build log of a production-ready AI game asset generator.',
                lastUpdated: '2026-01-05',
                slug: 'asset-hatch',
                githubRepo: 'zenchantlive/Asset-Hatch',
                techStack: ['Next.js', 'PostgreSQL', 'OpenRouter', 'Prisma']
            },
            'From-2D-Asset-to-3D-Studio': {
                id: 'From-2D-Asset-to-3D-Studio',
                title: 'Hatch-Studios: From 2D Asset to 3D Studio',
                description: 'The evolution of Asset Hatch from a 2D generator to a comprehensive 3D game studio.',
                lastUpdated: '2026-01-24',
                slug: 'From-2D-Asset-to-3D-Studio',
                githubRepo: 'zenchantlive/Asset-Hatch',
                techStack: ['Babylon.js', 'Tripo3D', '3D-Studio', 'OpenHands', 'Next.js']
            },
            'catwalk-blog': {
                id: 'catwalk-blog',
                title: 'Building Catwalk Live',
                description: 'The journey of creating a "Vercel for MCP" deployment platform using AI-first development.',
                lastUpdated: '2025-12-27',
                slug: 'catwalk-blog',
                githubRepo: 'zenchantlive/catwalk',
                techStack: ['MCP', 'DevOps', 'Platform', 'Fly.io']
            },
            'thefeed-blog': {
                id: 'thefeed-blog',
                title: 'TheFeed Development Journey',
                description: 'Building an AI-powered food security platform from starter kit to production.',
                lastUpdated: '2025-12-27',
                slug: 'thefeed-blog',
                techStack: ['Next.js', 'Community-Focus', 'Real-time']
            },
            'turtlez-blog': {
                id: 'turtlez-blog',
                title: 'Turtlez: The Recursive Context Engine',
                description: 'Building a near-infinite context engine for AI agents using Recursive Language Models (RLM).',
                lastUpdated: '2026-01-27',
                slug: 'turtlez-blog',
                githubRepo: 'zenchantlive/Turtlez',
                techStack: ['RLM', 'SQLite', 'Next.js', 'Bun']
            }
        };

        const metadata = seriesMetadata[seriesId];
        if (!metadata) return null;

        return {
            ...metadata,
            itemCount: mdFiles.length
        };
    } catch (error) {
        console.error(`Error loading series metadata for ${seriesId}:`, error);
        return null;
    }
}

export async function getPostsForSeries(seriesId: string): Promise<BlogPost[]> {
    const seriesPath = path.join(BLOG_ROOT, seriesId);

    try {
        const files = await fs.readdir(seriesPath);
        // Filter out README files and only include markdown files
        const mdFiles = files.filter(f => f.endsWith('.md') && !f.toLowerCase().includes('readme'));

        const posts = await Promise.all(
            mdFiles.map(async (filename) => {
                const filePath = path.join(seriesPath, filename);
                const fileContent = await fs.readFile(filePath, 'utf-8');

                // Parse markdown with frontmatter
                const { data, content } = matter(fileContent);

                // Generate slug from filename if not in frontmatter
                // e.g., "01-genesis-choosing-ai-first.md" -> "genesis-choosing-ai-first"
                const filenameSlug = filename
                    .replace('.md', '')
                    .replace(/^\d+-/, ''); // Remove leading number prefix like "01-"

                const slug = data.slug || filenameSlug;

                // Handle reading_time string format (e.g., "8 min") or readTime number
                let readingTime = 5;
                if (typeof data.readTime === 'number') {
                    readingTime = data.readTime;
                } else if (typeof data.reading_time === 'string') {
                    const match = data.reading_time.match(/(\d+)/);
                    if (match) readingTime = parseInt(match[1], 10);
                }

                return {
                    id: slug,
                    title: data.title,
                    slug: slug,
                    content: content,
                    date: data.date,
                    description: data.description || data.brief || '',
                    coverImage: data.coverImage || '',
                    readingTime: readingTime,
                    tags: data.tags || [],
                    part: data.part,
                    featured: data.featured || false,
                    techStack: data.techStack || []
                };
            })
        );

        return posts.sort((a, b) => (a.part || 0) - (b.part || 0));
    } catch (error) {
        console.error(`Error loading posts for ${seriesId}:`, error);
        return [];
    }
}

export async function getPostBySlug(seriesId: string, slug: string): Promise<BlogPost | null> {
    const posts = await getPostsForSeries(seriesId);
    return posts.find(p => p.slug === slug) || null;
}

export async function getAllSeries(): Promise<BlogSeries[]> {
    const dirs = await fs.readdir(BLOG_ROOT, { withFileTypes: true });
    const seriesDirs = dirs.filter(d => d.isDirectory()).map(d => d.name);

    const seriesList = await Promise.all(
        seriesDirs.map(id => getSeriesMetadata(id))
    );

    return seriesList.filter((s): s is BlogSeries => s !== null);
}

