// Remove redundant Previous/Next navigation lines from markdown files
// These are now handled by the UI component

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

    // Remove lines that start with **Previous:** or **Next:** (including surrounding whitespace)
    content = content.replace(/\n+\*\*Previous:\*\*.*$/gm, '');
    content = content.replace(/\n+\*\*Next:\*\*.*$/gm, '');

    // Also handle the "Previous: <-" and "Next: ->" format
    content = content.replace(/\n+Previous:.*$/gm, '');
    content = content.replace(/\n+Next:.*$/gm, '');

    // Clean up any trailing whitespace/newlines
    content = content.trimEnd() + '\n';

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Cleaned: ${filename}`);
});

console.log('✅ Removed redundant navigation links from all posts!');
