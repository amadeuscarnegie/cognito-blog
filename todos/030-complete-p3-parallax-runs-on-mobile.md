---
status: pending
priority: p3
issue_id: "030"
tags: [code-review, performance]
dependencies: ["007"]
---

# useScroll Parallax Fires on Mobile for Hidden Element

## Problem Statement

The `useScroll` + `useTransform` hooks in `FooterCTA` run unconditionally on all devices. The parallax `<motion.div>` is inside a `hidden lg:block` container — invisible on mobile via CSS `display: none`. The scroll listener still fires on every scroll frame on mobile, computing transforms for an invisible element.

**Why it matters:**
- Wasted CPU cycles on mobile scroll
- Minor battery drain from continuous rAF callbacks
- Motion uses passive listeners so it's not catastrophic, but unnecessary

**Note:** This is moot if todo #007 (remove motion library) is implemented.

## Proposed Solutions

### Option A: Guard behind media query check
Only initialize the hook on desktop using a `useMediaQuery` check or `window.matchMedia`.

**Effort:** Small | **Risk:** Low

### Option B: Remove parallax entirely (part of #007)
Replace with CSS or remove the effect. Eliminates the issue entirely.

**Effort:** Medium | **Risk:** Low

## Acceptance Criteria

- [ ] No scroll listeners fire on mobile for the hidden parallax element

## Resources

- `src/components/footer-cta/footer-cta.tsx:10-17,42,57`
