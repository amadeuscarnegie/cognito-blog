---
status: complete
priority: p2
issue_id: "011"
tags: [code-review, typescript]
dependencies: []
---

# Add `noUncheckedIndexedAccess: true` to tsconfig

## Problem Statement

With `strict: true` but without `noUncheckedIndexedAccess`, every array index access (`themes[0]`, `languages[focusedIndex]`, etc.) returns `T` instead of `T | undefined`. This masks potential runtime errors where array access could return `undefined`.

Current unsafe patterns:
- `themes[0]` fallback in `client.tsx:34`
- `languages[focusedIndex]` in `footer.tsx:53`

## Proposed Solutions

### Option A: Add the flag and fix type errors (Recommended)
Add `"noUncheckedIndexedAccess": true` to `tsconfig.json`. Fix any resulting type errors with proper checks.

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] `noUncheckedIndexedAccess: true` in tsconfig
- [ ] All array accesses properly handle `undefined`
- [ ] `tsc --noEmit` passes cleanly

## Resources

- `tsconfig.json`
- TypeScript handbook: noUncheckedIndexedAccess
