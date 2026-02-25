---
status: pending
priority: p2
issue_id: "007"
tags: [code-review, performance]
dependencies: []
---

# Motion Library (~30-40KB gzip) for 2 Minor Animations

## Problem Statement

The `motion` (Framer Motion v12) library adds ~30-40KB gzip to the client bundle. It is used in exactly two places:
1. `blog-nav.tsx` -- `layoutId` animated tab indicator (pill slides between tabs)
2. `footer-cta.tsx` -- `useScroll` + `useTransform` for 40px parallax on CTA card

## Proposed Solutions

### Option A: Replace with CSS transitions
Tab indicator: measure active tab position, animate `left`/`width` with CSS transitions.
Parallax: use `IntersectionObserver` + `requestAnimationFrame` or CSS `scroll-timeline`.

**Effort:** Medium | **Risk:** Low (tab indicator may lose some smoothness)

### Option B: Keep motion (if more animations planned)
If the site will gain more animations, the library cost is amortized.

**Effort:** None | **Risk:** None

## Acceptance Criteria

- [ ] Either motion removed with equivalent CSS replacements, OR justified as needed for future animations
- [ ] No visual regression in tab switching or CTA parallax

## Resources

- `src/components/blog-hero/blog-nav.tsx:67-75`
- `src/components/footer-cta/footer-cta.tsx:5,11-17,57`
