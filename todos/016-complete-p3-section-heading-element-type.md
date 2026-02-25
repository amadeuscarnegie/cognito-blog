---
status: complete
priority: p3
issue_id: "016"
tags: [code-review, typescript]
dependencies: []
---

# SectionHeading Accepts Overly Broad ElementType

## Problem Statement

`SectionHeading` accepts `as?: ElementType` which allows any HTML element or React component. For a heading component, this should be narrowed to `"h1" | "h2" | "h3" | "h4" | "h5" | "h6"`.

## Proposed Solutions

Narrow the type: `as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"`

**Effort:** Small | **Risk:** Low

## Resources

- `src/components/ui/section-heading.tsx:4`
