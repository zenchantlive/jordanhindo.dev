# Engineering Guidelines

**Communication Style (CRITICAL):**
- **No "AI Voice":** Do not use em-dashes (—), flowery adjectives ("testament", "delve", "tapestry"), or the phrase "I don't treat LLMs as chatbots" (it is cliché).
- **Plain Text Only:** When drafting emails or messages, do not use Markdown formatting (bold, bullets) unless specifically requested. Use standard spacing.
- **Human Tone:** Be direct, evidence-based, and professional. Speak peer-to-peer (e.g., "Hi Dan," not "Dear Hiring Manager").

**Code Style:**
- **Strict Type Safety:** Zod schemas for all external inputs. Interfaces for all components.
- **Functional Components:** React Server Components by default. Client components only when interaction is required (`use client`).
- **Self-Documenting:** Meaningful variable names over comments. Comments should explain *why*, not *what*.

**The "Orchestrator" Narrative:**
- **Role:** Independent AI Engineer & Researcher (Jan 2023 - Present).
- **Core Pitch:** "I build the orchestration layer (OS) for agents."
- **Key Projects:**
    - **Hatch-Studios (Asset Hatch):** 3D Game Orchestration Engine. solved context drift via "Shared Document Strategy" (not just "Hybrid Persistence").
    - **Catwalk:** MCP deployment platform. Solved remote tool access via "Streamable HTTP" bridge.
    - **Turtlez:** Recursive agent library based on RLM paper.

**Job Application Protocol:**
- **Resume:** Always remind user to attach `resume.pdf`.
- **Follow-up:** Create a `.txt` file in `src/content/marketing/job-applications/yc-batch/` for every message drafted.
- **Fit Check:** 10/10 roles are "Founding Engineer" or "Agentic Infrastructure." Avoid "Sales" or generic "Full Stack" roles unless the team is elite.
