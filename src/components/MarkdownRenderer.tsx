import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

/**
 * Server-side Markdown Renderer
 * Uses a full remark/rehype pipeline to convert markdown to HTML.
 * Supports GFM (GitHub Flavored Markdown) and raw HTML passthrough
 * for Hashnode's embedded images and custom elements.
 */
export default async function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
    // Pre-process content to fix various markdown syntax issues
    // 1. Hashnode-specific image syntax: ![](url align="center")
    // 2. Convert .md links to proper web URLs: [text](file.md) -> [text](/blog/asset-hatch/slug)
    const cleanedContent = content
        // Fix Hashnode image syntax
        .replace(/!\[([^\]]*)\]\(([^)]+)\s+align="[^"]+"\)/g, '![$1]($2)')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl my-8 mx-auto max-w-full" />')
        // Convert .md links to web URLs
        // Pattern: [text](part-X-slug-here.md) -> [text](/blog/asset-hatch/part-X-slug-here)
        .replace(/\[([^\]]+)\]\(([^)]+)\.md\)/g, (match, text, filename) => {
            // Extract just the filename without directory path
            const slug = filename.split('/').pop();
            return `[${text}](/blog/asset-hatch/${slug})`;
        });

    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify)
        .process(cleanedContent);

    const contentHtml = processedContent.toString();

    return (
        <article
            className={`
        prose prose-invert prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-white prose-headings:mt-12 prose-headings:mb-6
        prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
        prose-h3:text-xl prose-h3:text-purple-300
        prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
        prose-strong:text-white prose-strong:font-semibold
        prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-purple-500 prose-blockquote:bg-purple-950/20 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
        prose-code:text-purple-300 prose-code:bg-black/30 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:overflow-x-auto
        prose-ul:my-6 prose-li:text-gray-300 prose-li:my-2
        prose-img:rounded-xl prose-img:my-8
        ${className}
      `}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
    );
}
