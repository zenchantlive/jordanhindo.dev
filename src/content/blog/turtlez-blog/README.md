# Turtlez: Recursive Context in the Shell

A 5-part series documenting the development of **Turtlez** - a Node-based implementation of the Recursive Language Model (RLM). This journey follows the project from a weekend "curiosity build" to a core piece of an autonomous agentic ecosystem.

## About the Project

**Turtlez** is built to solve the "Short-Term Memory" problem in LLM agents. Instead of sending the entire conversation history back to the model, Turtlez maintains an external, append-only **Context Store**. The agent doesn't "see" history; it searches it.

- **Infinite Context**: Memory is limited only by your disk space, not the model's token window.
- **Search-as-Reasoning**: The model uses agency to retrieve the specific memories it needs.
- **Boring Tech**: I built it with SQLite and the Level 1 Indexing pattern for 100% precision.

**Tech Stack**: Next.js 16, Bun, SQLite (better-sqlite3), Tailwind CSS v4, Playwright, Vitest.

**Repository**: [zenchantlive/Turtlez](https://github.com/zenchantlive/Turtlez)

## Series Overview

### [Part 1: Genesis - I Read a Paper and Built It in a Weekend](01-genesis-i-read-a-paper-and-built-it-in-a-weekend.md)
*January 22, 2026*

The initial spark. Discovering the RLM paper and staying up late to build the core backend loop with Next.js and Bun.

---

### [Part 2: Breaking the Memory Barrier - The Zero-Context Agent](02-breaking-the-memory-barrier.md)
*January 23, 2026*

The scary reality of an agent that starts every turn with zero history. Plus, the "Meta-Irony" of building this with a memory-less coding agent.

---

### [Part 3: The Context Store - Beyond Vector Search](03-building-the-context-store.md)
*January 24, 2026*

Why SQLite and "dumb" keyword indexing often beat the "black box" of vector databases for development loops.

---

### [Part 4: The Agentic Vision - Roadmaps and RLM](04-the-agentic-vision.md)
*January 26, 2026*

The 7-Phase Roadmap. From a simple chat tool to an autonomous operating system for agents that can manage entire workspaces.

---

### [Part 5: Reflections - Building with (and for) AI](05-reflections-building-with-ai.md)
*January 27, 2026*

What we learned about the "Zero Context" discipline and why the future isn't bigger prompts, it's smarter retrieval agency.

---

**Start Reading**: [Part 1: Genesis →](01-genesis-i-read-a-paper-and-built-it-in-a-weekend.md)
