---
title: "Part 11: The Safety Net, Security, and Singular Cats"
slug: "part-11-the-safety-net-security-and-singular-cats"
date: "2026-01-04T23:47:23.810Z"
readTime: 2
part: 11
description: "December 30th. The penultimate day of the year. While most people were thinking about champagne and resolutions, I was thinking about how to stop my AI from being \"too helpful\" and how to make it se..."
coverImage: ""
tags: ["56744722958ef13879b94fb7","632c41ac318ff0fa183371ff","56744722958ef13879b951eb","639eeb95d1e499a9b88a2301","56744722958ef13879b94f32"]
---

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1767570306093/3b3c3bb5-8ec0-4b47-b9ed-292c0cec888d.png align="center")

December 30th. The penultimate day of the year. While most people were thinking about champagne and resolutions, I was thinking about how to stop my AI from being "too helpful" and how to make it see.

Welcome to Part 11. It’s about the checks, the balances, and why singularization is harder than it looks.

## Style Anchors: Teaching the AI to See

The biggest challenge today was "Style Consistency." You can't just tell an AI "make it look like my other assets" and expect it to work. You have to feed it the actual DNA of your style.

We collaborated on the **Style Anchor system** ([ADR-008](https://github.com/zenchantlive/Asset-Hatch/blob/main/src/memory/adr/008-style-anchor-image-generation.md)).

* We use **GPT-4o vision** to analyze user-uploaded reference images.
    
* It extracts specific keywords for lighting, colors, and brushwork.
    
* We even built a canvas-based color palette extractor.
    

Now, instead of a vague description, every prompt is injected with a "Style Anchor" payload that forces visual consistency.

## The Safety Net: One Cat, Please

Then there was the "Singularization Crisis."

Our AI has a tendency toward maximalism. You ask it for a "cat sprite," and it thinks, "You know what would be better? A cat, in a hat, on a mat, with a bat, in a 13-stage isometric animation sequence."

No. I just want the cat.

We implemented **The Safety Net** ([ADR-008](https://github.com/zenchantlive/Asset-Hatch/blob/main/src/memory/adr/008-style-anchor-image-generation.md)). We pulled in the `pluralize` library and wired it into the `prompt-builder.ts`. Now, the system looks at the AI's flowery descriptions and ruthlessly singularizes the subject.

**AI:** "A group of cheerful farmers tending to their crops in a sunny field." **The Safety Net:** "A cheerful farmer."

It's the digital equivalent of a "Shut up and sit down" for AI creativity.

## Hardening the Hatch

With the open-source release looming, we spent the afternoon in a "Security Hardening" rabbit hole.

* **Zod Guardians**: Every API route now has a Zod schema at the gate. If the data isn't shaped exactly like we expect, it doesn't get in.
    
* **OAuth Safety**: We audited the GitHub account linking logic to prevent race conditions.
    
* **Phase Consistency**: You can't skip from Planning to Export. The system now enforces the workflow phases strictly.
    

## Conclusion

Today was about control. Control over the style, control over the AI's plural-brain, and control over the security layer. We paved the way for the biggest UX overhaul of the project.
