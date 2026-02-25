---
status: pending
priority: p1
issue_id: "019"
tags: [code-review, architecture, routing]
dependencies: []
---

# Article Card Links Navigate to 404

## Problem Statement

Every `ArticleCard` links to `/blog/${article.slug}` (e.g., `/blog/how-to-revise-effectively-gcses`), but no individual article pages exist. The only route is `/blog/theme/[themeName]`. Every article click leads to the 404 page. This is the primary user interaction on the blog — clicking an article card — and it is completely broken.

**Why it matters:**
- The entire article grid is a collection of dead links
- Users clicking any article hit a dead end
- Search engines crawling these links find 404s, harming SEO
- The sitemap does not include article URLs either

## Findings

- **Architecture strategist**: Rated HIGH — "broken user contract", highest risk finding
- **Agent-native reviewer**: Noted sitemap only lists theme pages, not articles
- `ArticleCard` at `src/components/articles-grid/article-card.tsx:14` constructs the link
- No `src/app/blog/[slug]/page.tsx` or similar route exists

## Proposed Solutions

### Option A: Create article detail pages (Recommended if content exists)
Add `src/app/blog/[articleSlug]/page.tsx` with `generateStaticParams` from the articles array. Include article-level metadata, JSON-LD (`BlogPosting` schema), and add article URLs to the sitemap.

**Pros:** Completes the blog architecture, improves SEO with individual article pages
**Cons:** Requires article body content (currently only titles/metadata exist in content-data.ts)
**Effort:** Medium
**Risk:** Low

### Option B: Remove Link wrapper (if article pages aren't planned yet)
Replace the `<Link>` in `ArticleCard` with a `<div>`, removing the navigable card pattern. Remove hover/scale effects that imply clickability.

**Pros:** Honest UI — cards don't promise navigation they can't deliver
**Cons:** Reduces engagement, articles become static display only
**Effort:** Small
**Risk:** Low

### Option C: Link to external Cognito article pages
If articles exist on the main Cognito domain, link to those URLs instead. Add an `externalUrl` field to the Article type.

**Pros:** Leverages existing content
**Cons:** Navigates users away from the blog
**Effort:** Small
**Risk:** Low

## Acceptance Criteria

- [ ] Clicking an article card either navigates to a working page OR cards are not clickable
- [ ] No 404s reachable from the article grid
- [ ] Sitemap updated to include article URLs (if Option A)

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | Every article card is a dead link — highest-impact UX bug |

## Resources

- `src/components/articles-grid/article-card.tsx:14`
- `src/app/sitemap.ts` (missing article URLs)
- `src/lib/content-data.ts` (article data lacks body content)
