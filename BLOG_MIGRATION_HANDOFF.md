# Blog Migration Handoff Document

This document outlines the process for migrating blog posts from other projects (Catwalk, TheFeed) into the `jordanhindo.dev` portfolio system.

## High-Level Architecture
The blog system uses a "Series-First" organization. Each project is treated as a distinct series.
Posts are stored as individual `.json` files (Hashnode export format) in `src/content/blog/[project-id]/`.

## File Structure
```text
src/content/blog/
├── asset-hatch/
│   ├── post-1.json
│   ├── post-2.json
│   └── ...
├── catwalk/ (To be created)
└── the-feed/ (To be created)
```

## JSON Requirements
The system expects files to contain a JSON object with at least the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `_id` | string | Unique identifier |
| `title` | string | Full title (e.g., "Part 1: Genesis") |
| `slug` | string | URL-friendly name |
| `contentMarkdown` | string | The actual markdown content |
| `dateAdded` | string | ISO date string |
| `brief` | string | Short summary for cards |
| `readTime` | number | Reading time in minutes |
| `tags` | string[] | Array of tag IDs or names |

## Migration Steps for New Projects
1. **Export**: Get the Hashnode JSON export for the project.
2. **Split**: Ensure each post is in its own `.json` file named after the slug.
3. **Move**: Copy these files into a new directory under `src/content/blog/[project-name]`.
4. **Register**: Update `src/lib/blog.ts` in the `getSeriesMetadata` function to add the new series metadata (title, description, etc.).
5. **Verify**: Check the `/blog` hub to ensure the new series card appears.

## Technical Notes
- **Markdown Rendering**: Handled via `remark` and `remark-html` in `MarkdownRenderer.tsx`.
- **Styling**: Uses Tailwind `prose-invert` for the reading experience.
- **Part Numbers**: Automatically extracted from titles matching the pattern `Part (\d+)`.
