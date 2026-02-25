---
status: complete
priority: p2
issue_id: "010"
tags: [code-review, architecture, simplicity]
dependencies: []
---

# Extract LanguageSelector from Footer - Non-functional, Forces Client Boundary

## Problem Statement

A 95-line `LanguageSelector` component is defined inline inside `footer.tsx`. It:
1. Is a self-contained interactive widget with its own state, keyboard handling, and accessibility
2. Forces the entire Footer (60+ links) into a `"use client"` boundary
3. Has no actual effect -- selecting a language doesn't trigger localization, routing, or state change outside the component

## Proposed Solutions

### Option A: Extract to own file + make Footer server component (Recommended)
Move `LanguageSelector` to `src/components/ui/language-selector.tsx` with `"use client"`. Make `Footer` a server component.

### Option B: Remove entirely if i18n isn't planned
Delete the LanguageSelector. The footer becomes a pure server component.

## Acceptance Criteria

- [ ] LanguageSelector in its own file OR removed
- [ ] Footer renders as server component (HTML in initial response)

## Resources

- `src/components/footer/footer.tsx:11-106`
