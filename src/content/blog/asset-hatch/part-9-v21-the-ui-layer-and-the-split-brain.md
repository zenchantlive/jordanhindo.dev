---
title: "Part 9: V2.1 - The UI Layer and The Split Brain"
slug: "part-9-v21-the-ui-layer-and-the-split-brain"
date: "2026-01-04T23:34:50.586Z"
readTime: 4
part: 9
description: "It was supposed to be a quiet afternoon. \"Just a few tweaks,\" I said. \"Maybe nice up the Generation UI a bit.\"


Six hours later, I was staring at a completely rewritten frontend architecture, a s..."
coverImage: ""
tags: ["56744723958ef13879b954f5","656653b07175efc56504e003","5a748cf3f7ef75131419eb9e","5f4ebbb150b5c61ec6ef4ad2","56744722958ef13879b950b2"]
---

It was supposed to be a quiet afternoon. "Just a few tweaks," I said. "Maybe nice up the Generation UI a bit."

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1767569414748/e7590996-8ba4-4d76-b464-e2cf98e2fa36.png align="center")

---

Six hours later, I was staring at a completely rewritten frontend architecture, a split-brain condition in my database layer, and a Markdown parser that had decided to go rogue.

Welcome to Part 9. It’s slightly unhinged.

## The Irony of "V2.1"

The goal was simple: Make the Generation UI look "Premium."

The User (me) wanted:

* Responsive grids that actually respond.
    
* A "Mini-Grid" that tucks away politely.
    
* Glassmorphism everywhere.
    
* **Reduced white space.** (ugh).
    

The AI (Antigravity & co) delivered. But the cost was a localized war against CSS positioning.

### The Layout War

You know you're in trouble when your git commit message is just `fix: remove absolute positioning again`.

We had a `DesktopLayout` component. It had a `PreviewPanel`. It had a `BottomAssetBar`. They were meant to be friends. Instead, they fought for `z-index` dominance like gladiators.

The solution? We stopped fighting the browser flow.

* **Old:** `absolute bottom-0 w-full` (The chaos engine)
    
* **New:** `flex-1 min-h-0` (The peace treaty)
    

Now, the layout flows like water. The mini-grid expands, the preview shrinks, and nothing explodes. It looks premium. It feels premium. But underneath, the CSS is holding on for dear life.

---

## The Split Brain: Dexie vs. Prisma

Here is a quote from the implementation plan that sums up our entire day:

> "We probably should have moved away from Dexie by now, but we are too busy making the UI pretty."

We have created a monster.

1. **Client Side:** Dexie (IndexedDB) holds the "Draft" state. It's fast, offline-first, and reactive.
    
2. **Server Side:** Prisma (Postgres) holds the "Truth." It's reliable, structured, and remote.
    

**The Problem:** The user creates a prompt. Dexie says "Got it!" The AI generates an asset. Dexie says "Cool!" The User approves it. Dexie says "Approved!" Then the User clicks "Export." The Server says: **"I have no idea what you're talking about."**

Because we forgot to tell the server.

We spent two hours building a sync bridge that funnels `Approved` assets from the browser's brain (Dexie) to the server's brain (Prisma) *just* so the export endpoint doesn't return an empty ZIP file.

Did we rewrite the app to use a single database? No. Did we write 400 lines of rigorous sync logic to keep our Frankenstein monster alive? **Absolutely.**

---

## Markdown Vampires

Then there were the Markdown Vampires.

You see, our AI is smart. It likes to format things. User: "Plan an isometric cat." AI: "Here is your plan: \\n\\n### 1. The Cat"

The UI? It didn't account for the `###`. So instead of a nice bold header, the user saw: `### 1. The Cat`

It was ugly. It was raw. It was un-premium.

I chased these `###` strings through three layers of components. `PlanPreview`. `ChatInterface`. `MarkdownRenderer`. Every time I fixed one, another appeared. It was whack-a-mole with syntax highlighting.

We finally nuked them with a regex that would make a perl golfer cry. But the UI is clean.

---

## Smart Extraction (or, "Stop Helping Me")

The final boss was the AI's helpfulness. [ADR-014](https://github.com/zenchantlive/Asset-Hatch/blob/main/src/memory/adr/014-asset-extraction-strategy.md) stated clearly: "One Bullet Point = One Asset."

The AI read this as: "One Bullet Point = A nice scene containing all your assets."

**Me:** "I want a robot and a dog." **AI:** "- A robot playing fetch with a dog." **Generation:** A single image of a robot and a dog. **Export:** One sprite. **Me:** "NO. Isolate them!"

We had to implement a "safety net" in the prompt builder. It literally grabs the AI by the collar and says, "Just the first subject. Ignore the rest."

**Old AI:** "A shiny red robot standing next to a blue car." **New AI (Safety Net):** "A shiny red robot."

It's ruthless. It cuts off the AI's creativity at the knees. But now I get individual sprites I can actually use in a game.

---

## Conclusion

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1767569500444/04a10a21-0cdc-44b9-ac63-a218953cc976.png align="center")

We have a beautiful interface. We have a database layer that talks to itself (mostly). We have regexes guarding the gates against markdown. And we have an AI that is terrified to add a second subject to a prompt.

It's beautiful chaos.
