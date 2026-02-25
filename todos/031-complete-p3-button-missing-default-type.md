---
status: pending
priority: p3
issue_id: "031"
tags: [code-review, correctness]
dependencies: []
---

# Button Component Missing Default type="button"

## Problem Statement

The `Button` component does not set a default `type` attribute. In HTML, the default button type is `"submit"`, which means any `Button` inside a `<form>` will submit the form unless the caller explicitly passes `type="button"`. No forms exist today, but this is a latent bug.

## Proposed Solutions

### Option A: Add default type="button" (Recommended)
Spread `type="button"` as the default, allowing callers to override with `type="submit"` when needed.

**Effort:** Small | **Risk:** None

## Acceptance Criteria

- [ ] `Button` renders with `type="button"` by default
- [ ] Callers can still override with `type="submit"` if needed

## Resources

- `src/components/ui/button.tsx:29`
