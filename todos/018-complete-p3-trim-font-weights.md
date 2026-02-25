---
status: complete
priority: p3
issue_id: "018"
tags: [code-review, performance]
dependencies: ["005"]
---

# Playfair Display Loads 3 Weights but Only Uses 1

## Problem Statement

Playfair Display is loaded with `weight: ["400", "500", "600"]` but only weight 600 (`font-semibold`) is used on headings. Weights 400 and 500 are never referenced. Each unused weight adds ~20-30KB to font download.

## Proposed Solutions

Trim to `weight: ["600"]` only. Saves ~40-60KB of font data.

**Effort:** Small | **Risk:** Low

## Resources

- `src/lib/fonts.ts:12`
