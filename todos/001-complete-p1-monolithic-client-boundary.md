---
status: complete
priority: p1
issue_id: "001"
tags: [code-review, architecture, performance, typescript]
dependencies: []
---

# Monolithic Client Boundary - Entire Page in Single "use client" Component

## Problem Statement

The entire blog page (Nav, Hero, ArticlesGrid, FAQs, FooterCTA, Footer) is wrapped inside a single `"use client"` component (`BlogThemeClient` in `client.tsx`). This defeats Next.js 16's server-side rendering, streaming, and automatic code-splitting. No HTML is server-rendered in the initial response -- users see an empty shell until JS hydrates.

**Why it matters:**
- LCP is delayed because hero heading, images, and article cards are not in the initial HTML
- The entire dependency graph (motion, Radix Dialog, Radix Accordion, Lucide icons) must load before first paint
- SEO crawlers that don't execute JavaScript see an empty page
- Footer's 60+ links lose SEO link equity
- At scale (100+ articles), all article data is serialized into the client bundle

## Findings

- **TypeScript reviewer**: Flagged as architectural issue -- FAQsSection, Footer, FooterCTA, SectionDivider have no client-side state requirements
- **Performance oracle**: Rated CRITICAL -- estimated 1-3 second LCP improvement on mobile from fixing this
- **Architecture strategist**: Rated CRITICAL -- the `onClickCapture` link interception pattern is the root cause forcing everything into a single client component
- **Agent-native reviewer**: Noted that without server-rendered HTML, agents/crawlers cannot access content

**Affected files:**
- `src/app/blog/theme/[themeName]/client.tsx` (lines 80-131)
- `src/app/blog/theme/[themeName]/page.tsx`

## Proposed Solutions

### Option A: Push client boundary down to interactive components only
Move page composition back to `page.tsx` (server component). Only wrap interactive pieces in `"use client"`:
- `BlogNav` (tab switching + motion animation)
- `SearchInput` (keyboard shortcut)
- `ArticlesGridClient` (filtering + load-more)
- `Accordion` (already correctly scoped)

Replace the `onClickCapture` link interception with either a `<ComingSoonLink>` wrapper or Next.js middleware redirect.

**Pros:** Maximum server rendering, proper streaming, smallest client bundle
**Cons:** Requires rethinking the "Coming Soon" modal pattern
**Effort:** Medium
**Risk:** Low -- each component is already self-contained

### Option B: Thin client wrapper for link interception only
Keep the current structure but extract a minimal client wrapper that only captures click events, without forcing child components to be client-rendered. Use React Server Component composition to pass server-rendered children through the client wrapper.

**Pros:** Minimal code change, preserves current behavior
**Cons:** Still ships more JS than Option A, link interception pattern remains fragile
**Effort:** Small
**Risk:** Low

### Option C: Replace link interception with middleware
Use Next.js middleware to redirect unimplemented routes to a `/coming-soon` page. This eliminates the need for the `onClickCapture` handler entirely.

**Pros:** Cleanest separation, no client-side interception needed, works without JS
**Cons:** Requires a separate `/coming-soon` page, slightly different UX (full page vs modal)
**Effort:** Small
**Risk:** Low

## Recommended Action

_To be filled during triage_

## Technical Details

**Affected files:**
- `src/app/blog/theme/[themeName]/client.tsx`
- `src/app/blog/theme/[themeName]/page.tsx`
- `src/components/nav/nav.tsx`
- `src/components/footer/footer.tsx`
- `src/components/faqs/faqs-section.tsx`
- `src/components/footer-cta/footer-cta.tsx`

## Acceptance Criteria

- [ ] FAQsSection, Footer, SectionDivider render as server components (HTML in initial response)
- [ ] Nav renders as server component (or minimal client boundary for SubNav toggle)
- [ ] LCP hero content is in the initial HTML before JS execution
- [ ] "Coming Soon" behavior still works for unimplemented routes
- [ ] No visual or functional regressions

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from code review | Flagged by 4/6 review agents as the highest-priority issue |
| 2026-02-25 | Resolved — split into server layout + client island | Deleted `client.tsx`, created `blog-interactive.tsx` with narrow client boundary (BlogHero + ArticlesGrid only). Moved Nav, SectionDivider, FAQsSection, FooterCTA, Footer to server-rendered `page.tsx`. Removed `"use client"` from `blog-hero.tsx`. Removed `@radix-ui/react-dialog` dependency. Unimplemented routes now 404 via existing `not-found.tsx`. |

## Resources

- `src/app/blog/theme/[themeName]/client.tsx:80-131`
- `src/app/blog/theme/[themeName]/page.tsx`
- Next.js 16 Server Components documentation
