---
title: "Part 1: Genesis - Building Turtlez in a Weekend"
slug: "part-1-genesis-i-read-a-paper-and-built-it-in-a-weekend"
date: "2026-01-22T23:03:00.000Z"
readTime: 6
part: 1
description: "I read a research paper on Recursive Language Models and realized AI coding needs better memory, not bigger prompts. Building Turtlez from scratch in a weekend."
coverImage: ""
tags: ["AI", "RLM", "Next.js", "Context Engineering", "OpenSource"]
featured: true
techStack: ["Next.js 16", "SQLite", "Bun", "RLM JS"]
---

# Part 1: Genesis - I Read a Paper and Built It in a Weekend

**The Spark:** Most people were sleeping. I was reading a paper on Recursive Language Models and realizing the future of AI coding isn't bigger prompts, it's better amnesia.

**January 22, 2026. 11:03 PM.** [Asset Hatch](https://www.jordanhindo.dev/blog/asset-hatch/part-1-genesis-why-build-this) is behind me. It's consistent. It works. But I'm hitting a wall elsewhere. After sixty minutes in a single session, my AI agents start acting like they have trauma-brain.

## The Context Decay

We talk about "context windows" like they're a hard limit, but the reality is messier. It isn't just that the AI "forgets" once you hit the limit. It’s that the conversation degrades. 

By the one-hour mark, the "brilliant" coding assistant starts hallucinating variable names. It suggests an implementation using an authentication provider I ripped out thirty minutes ago. It tries to write a database query for a table that hasn't existed since the second commit. 

It doesn't say "I'm lost." It just gives me confidently wrong answers that waste my next twenty minutes debugging a ghost project.

## The Paper: A Simple Stroke of Genius

I was scrolling through arXiv when I hit [Recursive Language Models](https://arxiv.org/abs/2512.24601v1). 

The idea is simple, and brilliant. **Recursive context management.** 

The paper argued that if you treat the model as a recursive function, where it uses tools to search an externalized and append-only **Context Store**, you don't need a huge prompt history. You just need a way for the AI to "think" about what it needs to remember.

I saw the Python implementation from the paper and the ingenuity blew me away. But as I looked at the landscape, I realized there wasn't a robust Node-ready version designed for a modern web dev workflow. It was all Python REPLs and research code.

## The Thursday Night Spark: Why Node?

I'm a Next.js guy. I want my agentic tools to live where my code lives. I wanted to see if I could take that arXiv logic and build a Node-native implementation that felt like it belonged in a production pipeline.

### The Philosophy: Turtles All The Way Down

The name **Turtlez** is a nod to the [infinite regress problem](https://en.wikipedia.org/wiki/Turtles_all_the_way_down). In RLM, the AI uses its previous outputs and external context to build a tower of reasoning. If it needs to know more, it digs deeper. It's a recursive loop that provides an "infinite" context window by never actually trying to cram it all into the prompt.

### The Stack:
- **[Next.js 16](https://nextjs.org/blog/next-16)**: My preferred cockpit for AI agents.
- **[SQLite (better-sqlite3)](https://github.com/WiseLibs/better-sqlite3)**: The RLM Context Store. No complex vector logic yet. Just raw, fast, append-only history with a simple indexing layer.
- **[Bun](https://bun.sh/)**: Speed is a requirement. If the agent is going to be recursive, the tool execution needs to be near-instant.

## The First Stake

```bash
# Git Log
commit 9ea788f
Author: zenchantlive
Date: Thu Jan 22 23:03:00 2026 +0000

chore: initial commit for project root
```

By Sunday night, I didn't just have a chat app. I had a loop that worked.

1. **Root Agent**: Receives the query with *zero* conversation history.
2. **Tool Selection**: The agent realizes it has no context and reaches for the store.
3. **Recursive Search**: It searches the SQLite logs for the relevant "memories."
4. **Synthesis**: It returns an answer grounded in the actual project history.

## What I Learned in 48 Hours

### 1. Hallucinations are a Context Management Problem
If you give the agent the specific piece of history it needs, instead of the last 20,000 tokens of noise, the accuracy sky-rockets.

### 2. The Gap is Execution
The arXiv paper proved the math. The weekend sprint proved the utility. Node needed this.

---

**Metrics:**
- **Lines of code**: ~600 (Next.js + SQLite)
- **Time spent**: ~48 hours
- **Manual coding**: 0 lines (100% AI-orchestrated)
- **Quality**: Research-grade but functional

**Commit References:**
- `9ea788f` - Initial RLM-JS foundation

**Related Files/Code:**
- [context-store.ts](https://github.com/zenchantlive/Turtlez/blob/master/rlm-chat/src/lib/db/context-store.ts)
- `.kiro/specs/rlm-chat-system/design.md` - The architecture
- `memory/system_patterns.md` - The RLM Loop definition

---

**Coming Next:** In **Part 2: Breaking the Memory Barrier**, we’ll look at:
- **The Amnesia Superpower**: Why total amnesia is better than a sliding window
- **The Meta-Irony**: Building memory with a memory-less pair programmer

*This is Part 1 of the Turtlez series.*

