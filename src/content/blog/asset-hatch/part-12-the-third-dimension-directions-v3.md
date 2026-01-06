---
title: "Part 12: The Third Dimension - Directions v3"
slug: "part-12-the-third-dimension-directions-v3"
date: "2026-01-04T23:54:17.763Z"
readTime: 3
part: 12
description: "December 31st. The final countdown. While the rest of the world was preparing for parties, we were deep in the guts of the Generation UI, performing open-heart surgery on the Direction Selection syste..."
coverImage: ""
tags: ["695afda82ccfd97102b2ffc1","695afda82ccfd97102b2ffc2","5b5b1cd9d8f5763f693b02b7","63b1ef8cd1e499a9b865b6e6","56744723958ef13879b95434","586df60da55d5976a1f5bdd1"]
---

December 31st. The final countdown. While the rest of the world was preparing for parties, we were deep in the guts of the Generation UI, performing open-heart surgery on the Direction Selection system. Likely I will have PTSD from this day. heh.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1767570701725/1906edf6-9bca-4256-9837-daa82ea4f412.png align="center")

Welcome to Part 12. It’s about the overhaul that almost broke us, and the patterns that saved us.

## The Icon-Based Failure

We started the day with "Direction Selection UX v2." It was icon-based, scientific, and... completely boring. You clicked a compass needle, and you *hoped* the AI generated a "back view." But you couldn't see it until the batch finished.

The User (me) gave some blunt feedback:

> "The direction variants should be a part of the main image's card... replace the current image at the top with the direction grid."

He was right.

## Image-Based Directions: The 3x3 Grid

We scrapped the icons and built an **Image-Based 3x3 Grid** ([ADR-019](https://github.com/zenchantlive/Asset-Hatch/blob/main/src/memory/adr/019-direction-grid-image-based-preview.md)).

* The **Center Cell** is the "Reference direction" (usually Front).
    
* The **8 surrounding cells** show actual generated previews of the other directions.
    
* Uncaptured directions are greyed out with a ghost-like `opacity-40` and a hover reveal.
    

It fits the "Premium" aesthetic perfectly. It flows, it’s responsive, and it makes you feel like a game director.

## The "Asset not found" Race Condition

Then we hit the wall.

When you click "Generate" on a new direction in the grid, the UI has to:

1. Create a "Child Asset" in the database.
    
2. Immediately trigger an API call to generate its image.
    

**The Problem**: React is async. Database writes are async. By the time the API call fired, the database update hadn't "settled," and the API would throw a 404: "Asset not found."

We chased this ghost for two hours before implementing the **"Pass Object Directly" pattern**. Instead of telling the generator: "Go find asset ID #123," we tell it: "Here is the asset object I just created. Use this while you wait for the state to catch up."

It’s documented in `system_patterns.md` as our primary defense against React state race conditions.

## Custom Prompts (Stop the Gaslighting)

We also fixed a lingering frustration. If you edited a prompt (e.g., "Give him a blue hat instead of red") and hit regenerate, the system used to ignore your edits and rebuild the prompt from the original template.

We updated the `GenerateRequest` logic to prioritize `customPrompt`. Now, when you edit, the AI listens. It’s the difference between a tool that "helps" and a tool that "collaborates."

## The Batch Heart

Finally, we rounded out the year with the **Batch Workflow Infrastructure** (f8c80e4).

* **Version Carousel**: Flip through 5 different attempts at the same sword before deciding which one is "The One."
    
* **Sequential Animation**: Approved assets now have a 300ms "spin out" exit animation. It’s subtle, but it makes bulk approval feel like popping digital bubble wrap.
    

## Conclusion

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1767570718727/b0257f4a-9430-4bbd-9f5d-19db70e5b7df.png align="center")

We’ve moved from a basic chat app to a high-speed production pipeline. We have model-swapping, cost-tracking, style-anchoring, and a 3rd-dimension direction grid that actually works.

One more post to go... Or now. I thought I was done. Turns out, I was wrong. Next up: Migrating to Neon and Prisma.
