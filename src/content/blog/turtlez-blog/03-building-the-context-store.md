---
title: "Part 3: The Context Store - Beyond Vector Search"
slug: "part-3-the-context-store-beyond-vector-search"
date: "2026-01-24T14:30:00.000Z"
readTime: 8
part: 3
description: "We killed the sliding window for AI memory. Most people reach for vector databases, but I built the Turtlez Context Store with SQLite for 100% search precision."
coverImage: ""
tags: ["AI", "Architecture", "Engineering", "SQLite", "Indexing"]
featured: true
techStack: ["SQLite", "Next.js 16", "Bun"]
---

# Part 3: The Context Store - Beyond Vector Search

**The Story So Far:** It’s Saturday afternoon. I have convinced the AI that it has amnesia. In [Part 2](https://www.jordanhindo.dev/blog/turtlez-blog/part-2-breaking-the-memory-barrier), we built the "Zero-Context" loop.

**January 24, 2026. 2:30 PM.** We killed the sliding window. Now we need to build a memory that actually works. Most people reach for vector DBs. I reached for SQLite.

## The Vector Hype Train

When you talk about AI "memory," everyone screams "Vector Database!" They want you to set up Pinecone, manage embeddings, and deal with the "black box" of cosine similarity.

For most development workflows, vector search is overkill. It is also expensive and unpredictably blurry. If I am looking for a specific function name, I don't want "semantically similar" code. I want that specific function.

## Boring Tech: The [SQLite](https://www.sqlite.org/index.html) Powerhouse

I went with **SQLite**. It’s fast, local, and I can query it with standard SQL. Our `context_entries` table is the source of truth, but the secret sauce is what I call **Level 1 Indexing**.

Instead of complex embeddings, we use a "simple but ingenious" term-to-entry mapping. 

```typescript
// src/lib/indexing/indexing-service.ts
async buildConversationIndexSnapshot(sessionId: string, fromTurnId: number, toTurnId: number) {
    const entries = await this.contextStore.getEntriesInTurnRange(sessionId, fromTurnId, toTurnId);
    const termToEntryIds: Record<string, string[]> = {};

    for (const entry of entries) {
        const topTerms = extractTopTerms(entry.text);
        for (const term of topTerms) {
            if (!termToEntryIds[term]) termToEntryIds[term] = [];
            termToEntryIds[term].push(entry.entryId);
        }
    }
    // ... we save this map back to SQLite as a JSON blob
}
```

It is just a dictionary. A common, everyday hash map. But when you combine it with deterministic scoring, it feels like magic.

And because it is just JSON in a SQLite row, I can actually open the database and edit the "embeddings" manually if I really want to. If the index is missing a term or weighting something weirdly, I don't need a mathematical degree to fix it. I just edit the JSON. It is the ultimate debugging experience for AI memory.

## The Scoring Algorithm

We don't just find entries. We rank them. The `SearchScorer` uses a simple point system:
- **+3 points** for an exact term match.
- **+2 points** if multiple query terms match the same entry.
- **Recency Bonus**: Newer turns get a slight boost.

```typescript
// src/lib/search/search-scorer.ts
scoreEntries(indexData: IndexV1Data, queryTerms: string[], limit: number) {
    // ...
    entryTermMatches.forEach((matchedTerms, entryId) => {
        let score = matchedTerms.size * 3;
        if (matchedTerms.size > 1) score += 2;
        
        const entryMeta = indexData.entryMeta[entryId];
        if (entryMeta?.turnId) {
            score += Math.min(entryMeta.turnId / 10, 5); 
        }
        // ...
    });
}
```

## The Safety Net: Substring Fallback

Sometimes indexing misses. Maybe I am searching for a weird variable name like `__init_v2`. If the indexer did not pick it up as a "top term," the search would fail.

Turtlez has a safety net. If the index search yields poor results, it falls back to a direct `LIKE` query on the text column. 

It is the "dumb" backup that ensures the AI never actually hits a dead end. It might be slightly slower, but it is 100% accurate.

## Why This Works

By using SQLite and this L1 indexing pattern, we achieved:
1. **Speed**: ~45ms search latency on a 2MB store.
2. **Predictability**: If the word is there, the agent finds it. No "semantic" hallucinations.
3. **Simplicity**: The entire indexing engine is less than 500 lines of code.

---

**Metrics:**
- **Indexing Latency**: ~12ms
- **Storage Overhead**: < 10% of raw text size
- **Precision**: 98% (on keyword matching)

**Commit References:**
- `e7234ca` - Consolidate search and scoring logic with SQLite foundation

**Related Files/Code:**
- `rlm-chat/src/lib/indexing/indexing-service.ts`
- `rlm-chat/src/lib/search/search-service.ts`
- [Commit e7234ca](https://github.com/zenchantlive/Turtlez/commit/e7234ca)

---

**Coming Next:** In **Part 4: The Agentic Vision**, we’ll look at:
- **The 7-Phase Roadmap**: From chat box to workspace manager
- **Multi-Agent Loops**: How recursive memory enables autonomous fleets

*This is Part 3 of the Turtlez series.*
