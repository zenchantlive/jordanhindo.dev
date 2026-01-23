# Talking Points Library

Reusable phrases for applications and interviews.

---

## On Lack of Traditional Experience

> I've spent the last three years as an independent AI engineer, building production applications. My portfolio isn't just a showcase. It's documentation of real development velocity.

---

## On the Methodology (AI-Native Loop)

> I use what I call the AI-Native Loop: Claude for vision and prompt design, Antigravity IDE for implementation, Perplexity for research, and automated PR bots for review. I maintain living documents that give the AI persistent context across sessions. This isn't prompt engineering. It's context engineering.

---

## On Asset Hatch

> The problem wasn't AI generation itself. Style anchoring is a known technique. The problem was no tooling existed to scaffold the entire workflow: planning assets, managing references, coordinating multi-directional sprite generation, exporting production files. I built that scaffolding.

**Tech details if asked:**
- Next.js 15, Vercel AI SDK, Gemini 3 Pro
- Hybrid persistence: Prisma (server) + Dexie (client IndexedDB)
- TypeScript strict mode, 30,000+ line codebase
- 18-part build log documenting the entire process

---

## On Catwalk Live

> A deployment platform for MCP servers. Users paste a GitHub URL, the system analyzes it, provisions a Docker container on Fly.io, and handles credential encryption with Fernet. It implements the MCP 2025 streamable HTTP spec.

**Tech details if asked:**
- FastAPI backend, Docker containerization
- Fly.io infrastructure
- Auto-analysis of GitHub repos
- Fernet encryption for credentials

---

## On TheFeed

> A food security platform connecting communities with resources. Features an AI "Sous-Chef" that helps users create recipes from available ingredients. Built with dual-path architecture for anonymous crisis access.

**Tech details if asked:**
- CopilotKit for AI assistant
- Mapbox GL for real-time mapping
- Drizzle ORM
- Role-based access control

---

## On Where AI Struggles (Shows Critical Thinking)

> AI has a 20-40% success rate on infrastructure quirks, security vulnerabilities, cross-system integration, and production debugging. I've documented this in my build logs. My role is to architect systems the AI can't guess, review outputs critically, and debug the things AI gets wrong.

---

## On What Makes Me Different

> I don't write much code directly. Maybe 5%. But I work harder than ever. I'm not the typer. I'm the director. I supply the taste. The AI supplies the labor.

---

## On Airweave / RAG Experience

> I use Airweave as my personal RAG layer—it connects Slack, Notion, and Linear so I can semantically search across all my project context. When I'm debugging, I can ask "what did we decide about auth?" and get relevant answers from anywhere in my workflow.

**Tech details if asked:**
- Airweave for multi-source data integration
- Vector embeddings for semantic search
- Connected to Slack, Notion, Linear
- Real-world productivity RAG, not just a tutorial

---

## On LangChain vs Vercel AI SDK

> I prefer Vercel AI SDK over LangChain for the same reason I prefer explicit over magical—type safety and control. The patterns are equivalent: tool calling, streaming, message handling. I chose the one with better TypeScript integration and more explicit data flow.

**If they push:**
> LangChain adds abstraction layers that can obscure what's happening. For production debugging, I want to see exactly how messages flow from client to server to model and back. Vercel AI SDK gives me that visibility.
