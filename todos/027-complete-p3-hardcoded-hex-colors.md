---
status: pending
priority: p3
issue_id: "027"
tags: [code-review, consistency]
dependencies: []
---

# Hardcoded Hex Colors Bypass Theme Token System

## Problem Statement

Several files use hardcoded `#0b3c61` and `#ecf7ff` instead of the Tailwind theme tokens (`text-text-primary`, `bg-bg-secondary`) defined in `globals.css`. This defeats the design token system and makes future color changes require multi-file find-and-replace.

**Affected files:**
- `src/components/ui/button.tsx:10` — `bg-[#0b3c61] text-[#ecf7ff]`
- `src/app/not-found.tsx:17` — `text-[#0b3c61]`

**Note:** OG image files (`opengraph-image.tsx`) legitimately use hardcoded values since they can't use Tailwind classes.

## Proposed Solutions

### Option A: Replace with theme tokens (Recommended)
Use `bg-text-primary text-bg-secondary` (or introduce dedicated `--color-button-primary-bg` / `--color-button-primary-text` tokens).

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] No hardcoded `#0b3c61` or `#ecf7ff` in component files (OG images excluded)

## Resources

- `src/components/ui/button.tsx:10`
- `src/app/not-found.tsx:17`
- `src/app/globals.css:5` (token definitions)
