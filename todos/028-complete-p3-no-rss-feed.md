---
status: pending
priority: p3
issue_id: "028"
tags: [code-review, seo, agent-native]
dependencies: []
---

# No RSS/Atom Feed for Syndication

## Problem Statement

The blog has no RSS or Atom feed. Feed readers, automated monitoring agents, Slack RSS integrations, and AI agents that consume feeds cannot subscribe to this blog's content.

**Why it matters:**
- RSS/Atom is the primary way agents and tools discover blog content without scraping HTML
- All article data is already centralized in `content-data.ts` — generating a feed is trivial

## Proposed Solutions

### Option A: Add RSS route handler (Recommended)
Create `src/app/feed.xml/route.ts` generating RSS 2.0 from the `articles` array. Add `<link rel="alternate" type="application/rss+xml">` to the layout head.

**Effort:** Small | **Risk:** None

## Acceptance Criteria

- [ ] `/feed.xml` returns valid RSS 2.0 or Atom XML
- [ ] Feed includes all articles with titles, links, and descriptions

## Resources

- `src/lib/content-data.ts` (article data source)
- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
