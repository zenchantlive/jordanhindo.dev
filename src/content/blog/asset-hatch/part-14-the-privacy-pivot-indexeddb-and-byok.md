---
title: "Part 14: The Privacy Pivot - IndexedDB and BYOK"
slug: "part-14-the-privacy-pivot-indexeddb-and-byok"
date: "2026-01-05T00:03:09.374Z"
readTime: 2
part: 14
description: "If Part 13 was about the where (Postgres), Part 14 is about the who. Specifically: Who owns the data?
As we prepared to open-source Asset Hatch, we hit a philosophical wall. Do I really want to store ..."
coverImage: ""
tags: ["56744723958ef13879b952fc","5c4c8cbe86ae9b1b6b0e9999","656653b07175efc56504e003","56744722958ef13879b94f32","56744722958ef13879b94fb7"]
---

If Part 13 was about the *where* (Postgres), Part 14 is about the *who*. Specifically: **Who owns the data?**

As we prepared to open-source Asset Hatch, we hit a philosophical wall. Do I really want to store 5,000 AI-generated images of "Cute Slime with a Top Hat" on my server? Do users want me to have their API keys?

The answer was a resounding **"No."**

## The "Image Bloat" Problem

Storing images as Blobs in a database is fine for a prototype. But for a production app, it’s a recipe for a massive cloud bill and a slow user experience.

We made a radical decision: **Remove image storage from the server.**

Now, when an image is generated:

1. The server passes the raw image data back to the client.
    
2. The client saves it directly to **IndexedDB** (via Dexie).
    
3. The server only stores the *metadata* (prompt, timestamp, status).
    

Your images never live on my server. They live in your browser. It’s faster, it’s private, and it’s basically free for me (the host).

## BYOK: Bring Your Own Key

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1767571315340/3500a650-1056-4b4e-80ff-e9773fd5a9fa.png align="center")

We also implemented a **Settings Page** for "Bring Your Own Key" (BYOK) support.

Instead of routing everything through a central (and expensive) API proxy, users can now input their own **OpenRouter** or **Gemini** keys.

* Keys are stored in the user's browser (local storage/indexedDB).
    
* They are only sent to the server for the duration of the request.
    
* They are NEVER persisted in our database.
    

## The "Browser Storage Warning"

This shift created a new UX challenge. If a user clears their browser cache, they lose their images.

We added a subtle **Browser Storage Warning** in the header. It’s not an "Error"—it’s a reminder: "Hey, your assets are safe on your machine, but if you want to keep them forever, make sure you Export them!"

## Why This Matters for Open Source

By moving the "Heavy Lifting" (image storage) and the "Secret Keeping" (API keys) to the client, we’ve made Asset Hatch remarkably easy to deploy. You don't need a massive S3 bucket or a complex encryption service. You just need a standard web server.

We’ve turned a centralized "Service" into a decentralized "Tool."

## Conclusion

We’re lean, we’re private, and we’re ready. The infrastructure is solid. The privacy is baked in.

Now, it’s time to tackle the ungodly Mobile view. Prepare for relative units, flexbox, and a whole lot of CSS positioning.
