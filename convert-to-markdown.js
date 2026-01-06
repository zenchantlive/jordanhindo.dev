// Convert JSON blog files to Markdown with YAML frontmatter
// This script reads all JSON files from src/content/blog/asset-hatch/
// and converts them to clean .md files with YAML frontmatter

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const JSON_DIR = path.join(__dirname, 'src/content/blog/asset-hatch');
const MD_DIR = path.join(__dirname, 'src/content/blog/asset-hatch');

// Ensure output directory exists
if (!fs.existsSync(MD_DIR)) {
    fs.mkdirSync(MD_DIR, { recursive: true });
}

// Read all JSON files
const jsonFiles = fs.readdirSync(JSON_DIR).filter(f => f.endsWith('.json'));

console.log(`Found ${jsonFiles.length} JSON files to convert\n`);

jsonFiles.forEach(filename => {
    const filePath = path.join(JSON_DIR, filename);
    const jsonContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonContent);

    // Extract part number from title
    const partMatch = data.title.match(/Part (\d+)/i);
    const part = partMatch ? parseInt(partMatch[1]) : null;

    // Create YAML frontmatter
    const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
slug: "${data.slug}"
date: "${data.dateAdded}"
readTime: ${data.readTime}
part: ${part}
description: "${(data.brief || '').replace(/"/g, '\\"').substring(0, 200)}..."
coverImage: "${data.coverImage || ''}"
tags: ${JSON.stringify(data.tags || [])}
---

`;

    // Use contentMarkdown as the body (it's already in markdown format)
    const markdownContent = frontmatter + (data.contentMarkdown || '');

    // Generate output filename (replace .json with .md)
    const mdFilename = filename.replace('.json', '.md');
    const mdPath = path.join(MD_DIR, mdFilename);

    // Write markdown file
    fs.writeFileSync(mdPath, markdownContent, 'utf-8');
    console.log(`✓ Converted: ${filename} → ${mdFilename}`);
});

console.log(`\n✅ Conversion complete! Created ${jsonFiles.length} markdown files.`);
console.log(`\nNext steps:`);
console.log(`1. Review the generated .md files in ${MD_DIR}`);
console.log(`2. Update src/lib/blog.ts to read .md files instead of .json`);
console.log(`3. Delete the .json files once you've verified everything works`);
