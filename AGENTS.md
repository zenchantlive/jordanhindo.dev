# AGENTS.md - Working on jordanhindo.dev

## Mission Statement

**This portfolio exists to get Jordan hired in the AI/Agent industry.**

The core value proposition to demonstrate: **"I don't write code—I orchestrate AI agents to ship production-quality software at 10x velocity."**

Every change should reinforce this narrative. The portfolio itself is proof of the methodology.

---

## 🎯 Job Hunt Protocol

**Our primary active objective is landing a high-value "AI Agent Engineer" role.**

### 1. The Pipeline
All activity is tracked in `src/content/marketing/job-applications/index.md`.
- **Fit Score (1-10):**
  - **10/10:** Perfect match (skills + role + domain). Priority 1.
  - **9/10:** Excellent match (skills + role). Priority 1.
  - **8/10:** Good match, minor gaps. Priority 2.
  - **<7/10:** Only apply if distinct strategic value.
- **Status States:** `🟡 Applying` → `⏳ Applied` → `📞 Interview` → `✅ Offer` / `❌ Rejected`

### 2. Application Assets
For *every* application, we create a dedicated markdown file in `src/content/marketing/job-applications/applications/{company-slug}.md` containing:
- **Research:** Company mission, funding, key players.
- **Fit Analysis:** Verified skills vs. gaps.
- **Cover Letter:** Tailored, high-impact copy.
- **Follow-up Schedule:** Dates for checking back.

### 3. The Narrative ("The Pitch")
We position Jordan not just as a developer, but as a **Builder/Founder**.
- **Key Proof Points:**
  - **Speed:** "Asset Hatch in 11 days" (30k lines).
  - **Methodology:** "AI-Native Loop" (Claude/Antigravity/Perplexity).
  - **Documentation:** "40+ blog posts" (Building in Public).
  - **Tooling:** "Built Catwalk (MCP Platform)" (Technical depth).

---

## 🤝 Collaboration Rules

**How we work to maintain velocity:**

1.  **Be Proactive:** If a file needs fixing (typo, formatting, missing field), **fix it**. Don't ask for permission for reversible changes.
2.  **Update the Tracker:** The `index.md` tracker is the Source of Truth. Update it *immediately* after any status change.
3.  **Concise Communication:** When reporting status, use tables or bullet points. Avoid long paragraphs.
4.  **Artifact Sync:**
    - If you update the **Resume** (`src/app/resume/page.tsx`), consider if **LinkedIn/ZipRecruiter** profiles need the same update.
    - If you Create a **Job Application**, ensure the **Tracker** is updated.
5.  **Stop & Think:** If a user request seems off-strategy (e.g., applying to a low-fit role), **flag it** with a fit score before executing, but respect the override.

---

## Build Commands

```bash
# Development server
bun dev

# Type checking (strict mode enabled)
bun typecheck

# Linting (ESLint with Next.js config)
bun lint

# Full build (typecheck + lint + Next.js build)
bun build

# Production preview
bun start
```

---

## Code Style Guidelines

### TypeScript
- **Strict mode enabled** — no `any`, no `// @ts-ignore`
- Define interfaces for all data structures (see `src/types/blog.ts`)
- Use explicit return types for public functions
- Avoid type inference for complex object shapes

### Imports
- Use absolute imports with `@/` prefix (e.g., `import { Foo } from '@/components/Foo'`)
- Barrel exports in `components/index.ts` for clean imports
- Group imports: external → internal → components

### Naming Conventions
- **Components**: PascalCase (`HeroSection`, `BlogSection`)
- **Variables/functions**: camelCase (`featuredPosts`, `getPostsForSeries`)
- **Constants**: UPPER_SNAKE_CASE for config values
- **Interfaces**: PascalCase with descriptive names (`BlogPost`, `ContactFormData`)

### Component Structure
- Use TypeScript interfaces for props
- Add JSDoc comments for complex functions
- Extract data arrays outside component (see `ProjectsSection.tsx`)
- Keep components focused — one responsibility per file

### Error Handling
- Always wrap async operations in try/catch
- Log errors with context: `console.error('Failed to load posts:', error)`
- Return user-friendly error states in UI
- API routes: return proper `NextResponse.json` with status codes

### React/Next.js Patterns
- Use Server Components by default (async components in `app/`)
- `"use client"` only where interaction is needed (Navigation, ContactSection)
- Use Next.js 15 `await params` pattern for dynamic routes
- Prefer native fetch over external data fetching libraries

### Styling (Tailwind v4)
- Use design tokens from `globals.css` (glass-card, text-gradient, colors)
- Responsive classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Dark theme colors: white text, gray-400/500 secondary, purple-400/500 accents
- Avoid custom CSS when Tailwind classes suffice

---

## The Methodology (For Context)

This portfolio was built using the **AI Orchestrator Framework** documented in the blog series. Key principles:

### Multi-Agent Pipeline
The workflow follows this loop:
```
Claude Code (Vision/Build) → Perplexity (Research) → Gemini Flash (Testing) → CodeRabbit/Qodo (Review) → Merge
```

### Context Engineering
Four living documents are read at the start of every session:
- `active_state.md`: Current brain dump
- `system_patterns.md`: Code conventions and patterns
- `project_roadmap.md`: High-level roadmap
- **ADRs**: Architecture decisions with "why"

### ADR-Driven Development
- Write an ADR first (Architecture Decision Record)
- Command: "Implement ADR-014"
- AI follows a blueprint, doesn't guess

### Quality Standards (Non-Negotiable)
1. **Type Safety** — Zero `any` types, strict mode
2. **Linter Compliance** — Passes all checks
3. **Error Handling** — All failure modes covered
4. **Input Validation** — Pydantic/TypeScript schemas
5. **Security** — Multi-agent review (CodeRabbit, Qodo)
6. **Documentation** — Self-documenting code + comments

---

## Architecture Patterns

### Data Flow
- Blog posts: markdown files in `src/content/blog/{series}/`
- Dynamic routing: `app/blog/[project]/[slug]/page.tsx`
- Data utilities: `lib/blog.ts` (reads files, parses frontmatter)

### API Routes
- Location: `src/app/api/{route}/route.ts`
- Input validation: check required fields, return 400 on missing
- Error handling: try/catch, return 500 on failure
- Environment variables: `process.env.RESEND_API_KEY` (never expose keys)

### Types
- Single source of truth: `src/types/blog.ts`
- Export interfaces, not implementations
- Use `null` instead of `undefined` for optional fields

---

## Portfolio-Specific Guidelines

### When Editing Content (blog posts)
- Frontmatter fields: `title`, `date`, `description`, `part`, `readTime`
- Date format: ISO 8601 (`2026-01-05`)
- Part numbering: 1, 2, 3... for series continuity
- Keep tone: transparent, technical, "building in public"

### When Adding Projects
- Follow `projects` array structure in `ProjectsSection.tsx`
- Include: title, subtitle, description, tech stack, features, links
- Tech stack should highlight AI/Agent technologies
- Features should demonstrate architectural thinking

### When Adding Skills
- Update `skills` array in `SkillsSection.tsx`
- Group by category: AI Engineering, Frontend, Persistence, Infrastructure
- Use specific tool names, not generic categories

---

## Quality Standards (What "Production Grade" Means)

Every code change should demonstrate:

1. **Type Safety** — No implicit `any`, no type suppression
2. **Error Handling** — Graceful failures with logging
3. **Accessibility** — Semantic HTML, aria labels on interactive elements
4. **Performance** — Lazy loading images, optimized bundles, no unnecessary re-renders
5. **Security** — Input validation, environment variable isolation
6. **Documentation** — Self-documenting code with inline comments for complex logic

---

## The Narrative (For Context)

**Jordan Hindo: AI-Augmented Solo Founder**

- Builds production AI applications using agents as pair programmers
- Specializes in: Vercel AI SDK, Agentic Workflows, Multi-Agent Systems, MCP Servers
- Philosophy: "Ship fast, learn faster, document everything"
- Current focus: Generative UI, Multi-Agent Systems, MCP Infrastructure

**Projects Showcase:**
- Asset Hatch: AI game asset generator with style anchoring
- Catwalk Live: "Vercel for MCP" deployment platform
- TheFeed: AI-powered food security platform

## Main Goal

The main goal of this portfolio is to get Jordan hired in the AI/Agent industry. The core value proposition to demonstrate: "I don't write code—I orchestrate AI agents to ship production-quality software at 10x velocity."

Every change should reinforce this narrative. The portfolio itself is proof of the methodology.

---

## Key Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage (Hero, Skills, About, Projects, Blog, Contact) |
| `src/components/*.tsx` | Individual sections (all modular, well-typed) |
| `src/lib/blog.ts` | Markdown parsing and blog data utilities |
| `src/app/api/contact/route.ts` | Contact form email handler (Resend) |
| `src/content/blog/` | Build log markdown files |
| `src/globals.css` | Design tokens, glassmorphism, animations |

---

## Common Mistakes AI Makes (Learn From)

Based on documented experience in the blog series:

### Where AI Struggles (20-40% success rate)
- **Infrastructure-specific quirks** — Fly.io SSL, PostgreSQL drivers, Docker CRLF
- **Security vulnerabilities** — command injection, credential leaks, missing input validation
- **Cross-system integration** — auth ↔ database sync, API ↔ frontend contracts
- **Environment configuration** — secret mismatches, timing issues, .env validation
- **Production debugging** — log interpretation, infrastructure failures

### Where AI Excels (95%+ success rate)
- **Boilerplate and patterns** — API routes, React components, type definitions
- **Testing** — unit tests, edge cases, mocking patterns
- **Documentation structure** — README, API docs, setup guides
- **Refactoring** — extract functions, rename variables, update imports
- **Type definitions** — TypeScript interfaces, Pydantic schemas

### Your Role as AI Orchestrator
- Architect systems (don't let AI guess)
- Write structured prompts with explicit constraints
- Review outputs critically (never trust blindly)
- Debug infrastructure and environment issues
- Think adversarially about security
- Document decisions (ADR-Driven Development)
