---
status: pending
priority: p2
issue_id: "023"
tags: [code-review, simplicity, yagni]
dependencies: []
---

# LanguageSelector Is Non-Functional (104 LOC YAGNI)

## Problem Statement

The `LanguageSelector` component is 104 lines of a fully-built accessible dropdown (keyboard navigation, click-outside dismiss, focus management, ARIA attributes) that **does absolutely nothing**. Selecting a language updates local `useState` — there is no i18n system, no locale routing, no content translation, no cookie set. It ships client-side JavaScript for zero functional value.

**Why it matters:**
- 104 LOC of dead interactive code
- Adds to the client JS bundle
- Misleads users into thinking language selection works
- Creates a "use client" boundary in the footer for no reason

## Findings

- **Code simplicity reviewer**: Rated HIGH YAGNI — "the single largest simplification opportunity"
- **TypeScript reviewer**: Rated MEDIUM logic bug — "selection does not do anything"
- Component at `src/components/footer/language-selector.tsx`
- Imported in `src/components/footer/footer.tsx:4,34`

## Proposed Solutions

### Option A: Remove entirely (Recommended)
Delete `language-selector.tsx` and remove its import from `footer.tsx`.

**Pros:** 104 LOC removed, eliminates dead feature, reduces client JS
**Cons:** None — the feature is non-functional
**Effort:** Small
**Risk:** None

### Option B: Keep as placeholder, add TODO comment
Mark as non-functional with a TODO for when i18n is implemented.

**Pros:** Preserves the UI pattern for future use
**Cons:** Ships dead code, misleads users
**Effort:** Small
**Risk:** Low

## Acceptance Criteria

- [ ] LanguageSelector removed from footer
- [ ] No visible language dropdown in the UI
- [ ] Footer renders as a server component (no more client boundary from this component)

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | Fully-built feature with zero backend — pure YAGNI |

## Resources

- `src/components/footer/language-selector.tsx` (entire file)
- `src/components/footer/footer.tsx:4,34` (import and usage)
