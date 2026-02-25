---
status: pending
priority: p3
issue_id: "012"
tags: [code-review, simplicity]
dependencies: []
---

# Inline Single-Use Wrapper Components

## Problem Statement

Multiple components are single-use trivial wrappers that each get their own file:
- `ButtonGroup` (14 LOC, used 1x) -- wraps a flex div
- `DotSeparator` (17 LOC, used 1x) -- renders a 2px dot
- `LoginLink` (16 LOC, used 1x) -- renders a paragraph with login link
- `LoadMoreButton` (15 LOC, used 1x) -- wraps a Button in a centering div
- `SectionDivider` (11 LOC, used 1x) -- renders Container + hr
- `CardMeta` (17 LOC, used 1x) -- composes Chip + DotSeparator
- `Chip` (19 LOC, used 1x in CardMeta) -- styled span

Total: ~109 LOC in 7 files that could be inlined at their single call sites.

## Proposed Solutions

### Option A: Inline all 7 components at their call sites
Delete the files, inline the JSX. Reduces file count by 7 and LOC by ~109.

**Effort:** Small | **Risk:** Low

### Option B: Keep as-is (if component library is expected to grow)
If these will be reused in future pages, keeping them extracted is reasonable.

## Acceptance Criteria

- [ ] Each inlined component's functionality preserved at call site
- [ ] No visual regressions

## Resources

- `src/components/ui/button-group.tsx`, `dot-separator.tsx`, `login-link.tsx`, `chip.tsx`
- `src/components/articles-grid/card-meta.tsx`, `load-more-button.tsx`
- `src/components/layout/section-divider.tsx`
