---
status: pending
priority: p2
issue_id: "020"
tags: [code-review, seo, architecture]
dependencies: []
---

# Search Not URL-Addressable + JSON-LD SearchAction Lies

## Problem Statement

The search input stores its query in React `useState` only — it never syncs to the URL. Meanwhile, the JSON-LD structured data at `src/lib/json-ld.tsx:39` advertises a `SearchAction` with URL template `?q={search_term_string}`. This is a false promise: Google may display a sitelinks search box that does not work, and agents/users cannot link to a filtered view.

**Why it matters:**
- JSON-LD SearchAction is actively misleading to search engines
- Search results cannot be shared via URL
- Browser refresh clears the search
- Automated agents cannot use the declared search capability

## Findings

- **Agent-native reviewer**: Rated WARNING — "The JSON-LD SearchAction is actively misleading"
- **Architecture strategist**: Confirmed — "The JSON-LD declares a capability the application does not implement"
- **TypeScript reviewer**: Noted search state is purely client-side
- Theme changes already use `router.replace` for URL sync — search should follow the same pattern

## Proposed Solutions

### Option A: Implement URL-based search (Recommended)
Read `?q=` from `searchParams` in the server component, pass to `BlogInteractive` as `initialSearchQuery`. Sync state changes to URL with `router.replace` (same pattern as theme switching).

**Pros:** Fixes the SearchAction contract, enables shareable search URLs, minimal code change
**Cons:** Adds URL updates on every search (debounce recommended)
**Effort:** Small
**Risk:** Low

### Option B: Remove the SearchAction JSON-LD
Delete the `potentialAction` from `webSiteJsonLd()` in `json-ld.tsx`.

**Pros:** Stops lying to search engines
**Cons:** Loses potential sitelinks search box in Google results
**Effort:** Small
**Risk:** Low

## Acceptance Criteria

- [ ] Either search syncs to `?q=` URL param OR SearchAction removed from JSON-LD
- [ ] If Option A: navigating to `/blog/theme/all?q=revision` pre-fills and filters
- [ ] If Option A: sharing a search URL preserves the query for the recipient

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | JSON-LD SearchAction promises unimplemented feature |

## Resources

- `src/lib/json-ld.tsx:37-43` (SearchAction declaration)
- `src/app/blog/theme/[themeName]/blog-interactive.tsx:21-22` (search state)
- `src/app/blog/theme/[themeName]/blog-interactive.tsx:45-49` (theme URL sync pattern to follow)
