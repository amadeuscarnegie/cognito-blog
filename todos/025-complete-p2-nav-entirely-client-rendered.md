---
status: pending
priority: p2
issue_id: "025"
tags: [code-review, architecture, performance]
dependencies: []
---

# Nav Component Is Entirely Client-Rendered

## Problem Statement

The entire `Nav` component has `"use client"` because of one `useState` for the dropdown. This forces the logo, all static link items (Blog, FAQ, Schools), and sign-in/sign-up buttons into the client JS bundle. These elements have zero interactivity and could be server-rendered HTML.

**Why it matters:**
- The nav is visible above-the-fold — it should be in the initial HTML for SEO and fast paint
- Static nav links are crawlable but require JS hydration before becoming interactive
- Unnecessary client JS for purely static content

## Findings

- **TypeScript reviewer**: Rated MEDIUM — "entire nav is client-rendered for one piece of interactive state"
- **Architecture strategist**: Rated LOW — "extract only the dropdown trigger + panel into a client island"
- **Performance oracle**: Confirmed — "suboptimal trade-off" for initial paint

## Proposed Solutions

### Option A: Extract dropdown into client island (Recommended)
Make `Nav` a server component. Extract the "Find my course" dropdown trigger + `SubNav` into a `NavDropdown` client component. Logo, static links, and buttons render as HTML.

**Pros:** Better initial paint, reduced client JS, crawlable nav links in HTML
**Cons:** Slightly more files, minor refactor
**Effort:** Small-Medium
**Risk:** Low

## Acceptance Criteria

- [ ] Nav logo, static links, and auth buttons render as server HTML
- [ ] Only the dropdown interaction requires client JS
- [ ] Dropdown still opens/closes correctly with keyboard and click-outside

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | Entire nav forced to client for one dropdown toggle |

## Resources

- `src/components/nav/nav.tsx:1` ("use client" directive)
- `src/components/nav/sub-nav.tsx` (the actual interactive part)
