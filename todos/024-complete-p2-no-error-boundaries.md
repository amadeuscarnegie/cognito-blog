---
status: pending
priority: p2
issue_id: "024"
tags: [code-review, architecture, resilience]
dependencies: []
---

# No Error Boundaries — Unhandled Errors Crash the Page

## Problem Statement

The app has no `error.tsx` or `global-error.tsx` files. If any component throws during rendering — the Motion-based `FooterCTA`, the Radix `Accordion`, or the client-side `BlogInteractive` — the entire page crashes with Next.js's default error UI (white screen or dev overlay).

**Why it matters:**
- Production users would see a blank/broken page with no recovery path
- Client-side errors in `BlogInteractive` take down the entire page, including static sections
- No telemetry or user-friendly messaging on failure

## Findings

- **Architecture strategist**: Rated MEDIUM — "unhandled errors would display a generic white screen"
- No `error.tsx` exists anywhere in the `src/app/` directory tree

## Proposed Solutions

### Option A: Add minimal error boundaries (Recommended)
Create:
- `src/app/global-error.tsx` — root-level catch-all with "Something went wrong" + retry
- `src/app/blog/theme/[themeName]/error.tsx` — route-specific recovery

**Pros:** Graceful degradation, recovery mechanism, standard Next.js pattern
**Cons:** Small effort to create
**Effort:** Small
**Risk:** None

## Acceptance Criteria

- [ ] `global-error.tsx` exists and renders a user-friendly fallback
- [ ] Route-level `error.tsx` provides a "try again" mechanism
- [ ] Throwing an error in any client component shows the error boundary, not a white screen

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | No error boundaries anywhere in the app |

## Resources

- `src/app/` directory (no error.tsx files)
- [Next.js Error Handling docs](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
