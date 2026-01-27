# Tech Stack

**Frontend Framework:**
- **Next.js 15 (App Router):** Server Components for performance.
- **TypeScript:** Strict mode enabled. No `any` types allowed.
- **Tailwind CSS v4:** Utility-first styling with "Glassmorphism" design tokens.
- **Framer Motion:** For micro-interactions (Aurora backgrounds, transitions).

**Content & Data:**
- **Markdown/JSON:** All data (blogs, projects, job apps) is stored in flat files (`src/content`).
- **Content Collections:** Type-safe data access via `src/lib/blog.ts`.

**Infrastructure:**
- **Vercel:** Hosting and edge functions.
- **Bun:** Package manager and runtime for scripts.

**The "AI-Native Loop" Tools (Development Environment):**
- **Claude Desktop:** For high-level vision and prompt engineering.
- **Antigravity IDE:** For code generation and implementation planning.
- **Perplexity:** For researching docs and libraries (replacing StackOverflow).
- **Gemini Flash/Pro:** For unit test generation and quick logic checks.
- **Context7:** Custom MCP server for injecting up-to-date documentation.

**Key Libraries:**
- `lucide-react`: Icons.
- `resend`: Email API (contact form).
- `zod`: Schema validation for all data inputs.
