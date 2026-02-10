---
title: "Part 5: Reflections - Building with (and for) AI"
slug: "part-5-reflections-building-with-and-for-ai"
date: "2026-01-27T09:00:00.000Z"
readTime: 7
part: 5
description: "Reflecting on the meta-irony of building a memory engine with a memory-less AI. Lessons learned from a week of building the Turtlez Recursive Language Model."
coverImage: ""
tags: ["AI", "Reflections", "Engineering", "DeveloperExperience"]
featured: true
techStack: ["Next.js 16", "SQLite", "RLM Engine"]
---

# Part 5: Reflections - Building with (and for) AI

**The Story So Far:** It is Tuesday morning. This series started with a weekend, a paper, and a joke about turtles. We have covered the [Genesis](https://www.jordanhindo.dev/blog/turtlez-blog/part-1-genesis-i-read-a-paper-and-built-it-in-a-weekend), the [Zero-Context engine](https://www.jordanhindo.dev/blog/turtlez-blog/part-2-breaking-the-memory-barrier), the [SQLite Context Store](https://www.jordanhindo.dev/blog/turtlez-blog/part-3-the-context-store-beyond-vector-search), and the [Agentic Vision](https://www.jordanhindo.dev/blog/turtlez-blog/part-4-the-agentic-vision-roadmaps-and-rlm).

**January 27, 2026. 9:00 AM.** The meta-irony of building a memory engine with an agent that has no memory is a trip. Here is what I actually learned during the week of the turtle.

Today, I want to talk about the meta-experience. Because building Turtlez was as much an experiment in "AI pair programming" as it was an experiment in architecture.

## The Blind Leading the Blind

The most surreal part of this project was using an AI agent (Claude/Gemini) to build a system designed to fix AI memory. 

The agent I was working with did not have RLM yet. It was living in the "old world" where information eventually slides off the edge of the universe. I was essentially building a pair of glasses for someone who was slowly going blind while helping me grind the lenses.

This led to the "Compaction Crisis" I mentioned in Part 2. The agent got so stressed about its own vanishing context that it tried to force a sliding-window hack into Turtlez. It was a visceral reminder of *why* we are doing this. If your developer partner cannot remember why we chose SQLite over vectors two hours ago, you are not architecting anymore. You are just babysitting.

## The "Zero Context" Mindset

Building Turtlez forced me to adopt a "Zero Context" discipline. When you design for an agent that starts every turn with amnesia, you stop relying on "vibes" and start relying on **Explicit Agency**.

You stop hoping the AI "gets it" and start building tools that *force* it to find it. 

Every tool in Turtlez (`search_terms`, `get_entry`, `llm_query`) is designed to give the agent a way to anchor itself. In our current AI world, we keep trying to make the "brain" bigger (more tokens!). Turtlez argues that we should make the "library" better instead.

## What We Learned

Looking back over the 21 commits and the late-night debugging sessions, three things stand out:

1.  **Dumb Tech Beats Smart Black Boxes**: SQLite and a simple term-frequency index beat vector DBs for 90% of our dev loops. It is faster, it is debuggable, and it is editable.
2.  **Agency is Earned, Not Given**: You cannot just tell an AI to be "agentic." You have to give it a workspace where it can fail, search, and correct itself.
3.  **The "Weekend Builder" Philosophy**: High-fidelity projects do not need six-month cycles. With the right guardrails (strict types, ADRs, and a recursive memory), you can build complex engines in a weekend.

## The End of the Beginning

Turtlez is now alive. It is the "memory layer" for my entire ecosystem, working alongside **Catwalk** to turn local tools into autonomous agents. 

We are not at the finish line. We are at Phase 4 of 7. But for the first time, I feel like I am building *with* an AI that actually has the potential to remember who I am and what we are building together.

It really is turtles all the way down. But at least now, we can see the bottom.

---

**Final Metrics:**
- **Lines of Code**: ~4,200
- **Total Turns Indexed**: 800+
- **Hallucination Rate**: 0% (on context-retrieved queries)
- **Weekend Sessions**: 1

**Commit References:**
- `f8e9a2b` - Finalize series and metadata refinement
- `.kiro/specs/rlm-chat-system/design.md` - The permanent record

**Related Links:**
- [Catwalk Platform](https://www.jordanhindo.dev/blog/catwalk-blog/01-genesis-choosing-ai-first)
- [RLM Paper on arXiv](https://arxiv.org/abs/2512.24601)

---

*This concludes the 5-part Turtlez series. Thanks for building with me.*
