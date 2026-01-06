// Fix internal markdown links to match new filenames
// Replaces (01-..., (02-..., etc with (part-1-..., (part-2-..., etc

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, 'src/content/blog/asset-hatch');

const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

files.forEach(filename => {
    const filePath = path.join(BLOG_DIR, filename);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace (0X- with (part-X-
    // Special case for things like (01- PRODUCT_OVERVIEW.md) which might be external docs
    // But we want to fix the ones that point to our blog posts.

    // Let's use a regex that looks specifically for the pattern in your blog posts
    // Usually [Text](XX-slug.md)
    content = content.replace(/\((\d+)-([^)]+)\.md\)/g, (match, part, slug) => {
        const partNum = parseInt(part);
        if (!isNaN(partNum)) {
            return `(part-${partNum}-${slug}.md)`;
        }
        return match;
    });

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Fixed links in: ${filename}`);
});

console.log('✅ Links fixed!');
