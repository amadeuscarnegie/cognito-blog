---
status: complete
priority: p2
issue_id: "009"
tags: [code-review, architecture]
dependencies: ["001"]
---

# Fragile onClickCapture Link Interception Pattern

## Problem Statement

The `handleLinkClick` function in `client.tsx` (lines 62-78) intercepts every click event in the entire page via `onClickCapture`, checks for anchor tags, and conditionally prevents navigation. This is the root cause forcing the entire page into a single client component (see todo #001).

Problems:
- Captures events on the entire DOM -- any future widget could have click behavior intercepted
- `new URL(anchor.href)` could throw on malformed/`javascript:` protocol links
- Creates an invisible behavioral contract that every developer must know about
- `as HTMLElement` cast is unsafe (could be SVG or text node)

## Proposed Solutions

### Option A: `<ComingSoonLink>` wrapper component (Recommended)
Replace the global interception with a declarative component used at each link site.

### Option B: Next.js middleware redirect
Redirect unimplemented routes to `/coming-soon` server-side.

### Option C: Next.js `not-found.tsx` with better UX
Let unimplemented routes 404, improve the 404 page to suggest going back to the blog.

## Acceptance Criteria

- [ ] No global click event interception
- [ ] "Coming soon" behavior preserved for unimplemented routes
- [ ] Enables extracting components out of the client boundary

## Resources

- `src/app/blog/theme/[themeName]/client.tsx:62-78`
