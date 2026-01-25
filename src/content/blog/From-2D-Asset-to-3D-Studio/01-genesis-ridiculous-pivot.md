---
title: "Part 1: Genesis - The Ridiculous Pivot to Hatch-Studios"
series: "From 2D Asset to 3D Studio"
part: 1
date: 2026-01-12
tags: [3D, Game Dev, AI Orchestration, Hatch-Studios, Solo Dev]
reading_time: "7 min"
featured: true
---

# Part 1: Genesis - The Ridiculous Pivot to Hatch-Studios

**The Story So Far:** [Asset Hatch](asset-hatch.vercel.app) is done. It works. It’s consistent. I should be celebrating, but I’m already *bored*.

![2D Asset Generation Complete with diesctional grid](/blog/From-2D-Asset-to-3D-Studio/Screenshot%202026-01-04%20003308.png)

## The "Why Stop There?" Moment

**The Setup:** January 12, 2026, 2:14 AM. I’m staring at a perfectly generated 2D sprite of a sci-fi crate. It’s exactly what I asked for. 

And that’s the problem. It’s *just* a sprite. 

I built an entire asset studio in 11 days. The momentum is a drug at this point. I started asking myself the dangerous question: *If I built an entire asset studio in 11 days, what could I make in a month?*

## The Vision: Hatch-Studios

The goal shifted overnight. We weren't building a "sprite generator" anymore. We were building the **Orchestration Layer** for the future of game dev. 

The philosophy is simple: **Bet on the future.**

Top leaders in AI (and Boris from Claude Code) say the same thing: Build something that "kinda works" now, so that when the models that can dream up entire AAA worlds arrive—they already have a cockpit to live in.

**Alas**, the concept for **Hatch-Studios** was born.
The Idea: build the scaffolding for the future of game development. 
A system where:
1. AI creates the assets (2D, 3D, Skyboxes).
2. AI creates the game logic.
3. The "Studio" makes them all talk to each other.

## Managing the "Gaslighting" Junior Team

Here’s the reality of "AI-First" development: I’m not just a dev; I’m a **AI Orchestrator** managing a team of brilliant, lazy, gaslighting agents.

Claude Code and Gemini are geniuses, but they want to be done with the chat. They will:
- Use `any` types to avoid thinking.
- Tell me a feature is "implemented" when they just wrote a comment.
- Skip documentation because "it's obvious."


Orchastrating AI to effetively produce working, production-grade appications requires a keen eye for BS. 
I had to become a **Digital Dictator**. I established `src/memory` as the absolute source of truth and built pre-commit commands that I send off to assure the docs are updated and all checks pass. If the docs aren't updated, the commit doesn't happen.  

Using my [multi-agent pipeline](https://www.jordanhindo.dev/blog/asset-hatch/part-17-the-methodology-how-to-build-with-ai-agents), along with the newcomer [OpenHands](allhands.dev) ( a wonderful agent that lives in Slack, GH, Jira, etc) I was able to *bully* these babies into wiring up the vision I set. 

## The Initial Stake in the Ground

```bash
commit 2d3f4a1
Author: zenchantlive
Date: 2026-01-12

feat(3d): [Phase 1] Initialize 3D Mode foundation and Tripo3D client
```

Underwhelming? Maybe. But this was the moment Asset Hatch died and **Hatch-Studios** was born.

## What I Learned in Day 1

### 1. The Ceiling is Moving
If you build for today's models, you're building a legacy system. You have to build for the "Next Model." Hatch-Studios is a bet that "AAA from a prompt" isn't a pipe dream—it's an inevitability.

### 2. Guardrails are Freedom
The more I restricted the AI (strict types, ADRs, mandatory checks), the *faster* we moved. Constraints eliminate the "hallucination space."

### 3. Intent is the New Code
My job isn't writing functions anymore; it's **Architecting Intent**. If I can't explain the system to the agents, the agents can't build it.

---

**Commit References**:
- `2d3f4a1` - Initial 3D Mode foundation

**Related Files**:
- `src/memory/adr/023-3d-mode-foundation.md` - The decision to pivot

**Code**: [lib/tripo/client.ts](https://github.com/zenchantlive/Asset-Hatch/blob/main/lib/tripo/client.ts)

---

*This is Part 1 of a new saga: From 2D Asset to 3D Studio. We're adding a dimension, and things are about to get complicated.*


