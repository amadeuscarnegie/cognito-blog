---
status: pending
priority: p2
issue_id: "026"
tags: [code-review, performance]
dependencies: []
---

# avatar-sherlock.svg Is 62KB for a 60-80px Display

## Problem Statement

The `avatar-sherlock.svg` file is 62,569 bytes of unoptimized SVG with high-precision decimal coordinates (4-6 decimal places). It is displayed at 60x60 on mobile and 80x80 on desktop. This is a decorative illustration that should be under 15KB after optimization.

**Why it matters:**
- 62KB for a thumbnail-sized decorative image
- SVG path data contains unnecessary precision
- Quick win — 5 minutes of optimization saves ~45KB

## Findings

- **Performance oracle**: Rated HIGH — "running through SVGO would likely reduce to under 15KB"

## Proposed Solutions

### Option A: Optimize with SVGO (Recommended)
Run through `svgo` CLI or the online SVGO tool. Target: under 15KB.

**Pros:** Zero code changes, ~45KB saved
**Cons:** None
**Effort:** Small (5 minutes)
**Risk:** None (verify visual quality after)

## Acceptance Criteria

- [ ] `avatar-sherlock.svg` is under 15KB
- [ ] Visual appearance unchanged at 60-80px display size

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | Quick win — 5 min for 45KB savings |

## Resources

- `public/assets/avatar-sherlock.svg` (62KB)
- `src/components/faqs/faqs-section.tsx:18-24` (usage)
