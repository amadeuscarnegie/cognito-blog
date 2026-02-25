---
status: complete
priority: p2
issue_id: "005"
tags: [code-review, architecture, simplicity]
dependencies: []
---

# Font Identity Crisis - Playfair Display Exported as "stratford"

## Problem Statement

The heading font creates three naming confusions:
1. JS export `stratford` is actually `Playfair_Display` from Google Fonts
2. CSS fallback in `@theme` references "Stratford Serial" -- a font family never registered as `@font-face`
3. Font files `StratfordSerial.ttf` and `StratfordSerial.woff` exist in `src/assets/fonts/` but are never loaded

## Proposed Solutions

### Option A: Use actual Stratford Serial font via next/font/local
Load the existing `.woff` file, remove Playfair Display.

### Option B: Rename export, remove unused files
Rename `stratford` to `headingFont` or `playfairDisplay`, delete unused Stratford font files, fix CSS fallback.

## Acceptance Criteria

- [ ] Font export name matches the actual font loaded
- [ ] No unused font files in repository
- [ ] CSS fallback references a font that is actually available

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from code review | Flagged by architecture + simplicity reviewers |

## Resources

- `src/lib/fonts.ts:10-15`
- `src/app/globals.css:20`
- `src/assets/fonts/StratfordSerial.ttf`
- `src/assets/fonts/StratfordSerial.woff`
