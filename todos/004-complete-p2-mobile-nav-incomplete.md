---
status: complete
priority: p2
issue_id: "004"
tags: [code-review, architecture, accessibility]
dependencies: []
---

# Mobile Nav Toggle Does Nothing - No Menu Panel

## Problem Statement

The `NavMobileToggle` button toggles `mobileOpen` state, but there is no corresponding mobile menu panel. The hamburger button switches between Menu and X icons, but nothing appears or disappears. Mobile users see a toggle button that appears to do nothing. Screen reader users hear "Close menu" but there is no menu.

## Findings

- **TypeScript reviewer**: Flagged as missing functionality (HIGH confidence)
- **Architecture strategist**: Rated HIGH -- both a UX bug and unnecessary client boundary
- Desktop nav items remain `hidden lg:flex`, so mobile users cannot access navigation

## Proposed Solutions

### Option A: Implement mobile menu panel
Build a slide-out or dropdown menu panel that shows nav items on mobile.

**Effort:** Medium | **Risk:** Low

### Option B: Remove the toggle entirely
If mobile nav isn't needed yet, remove the hamburger button to avoid misleading users.

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] Either mobile menu works OR toggle is removed
- [ ] No misleading aria-label on a non-functional button

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from code review | Hamburger exists but no drawer/panel |

## Resources

- `src/components/nav/nav.tsx:12-13, 54-59`
- `src/components/nav/nav-mobile-toggle.tsx`
