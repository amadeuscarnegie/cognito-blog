---
status: pending
priority: p2
issue_id: "021"
tags: [code-review, type-safety, architecture]
dependencies: []
---

# ThemeSlug Type System Gap — "all" Missing, Theme.slug Untyped

## Problem Statement

`ThemeSlug` is defined as `"study-tips" | "science" | "maths" | "wellbeing"` but the themes array includes `slug: "all"`. Meanwhile `Theme.slug` is typed as bare `string`, not any slug union. This creates a split-brain type system: articles correctly use the narrow `ThemeSlug`, but everything else (state, callbacks, props, image maps) falls back to `string` with zero compiler protection.

**Why it matters:**
- Adding a new theme won't produce compiler errors for missing image mappings
- Passing `"banana"` as a theme slug compiles without error
- The `themeImageMap` in `hero-illustration.tsx` is `Record<string, string>` — no exhaustiveness check
- All callbacks (`onThemeChange`, `handleThemeChange`) accept `string`
- `themeNameFromSlug` accepts `ThemeSlug` but `Theme.slug` is `string` — type mismatch waiting to happen

## Findings

- **TypeScript reviewer**: 4 of 5 HIGH findings trace to this root cause
- **Architecture strategist**: Rated HIGH — "the two concepts that should be linked are completely decoupled at the type level"
- Affects: `types/blog.ts`, `content-data.ts`, `blog-interactive.tsx`, `blog-hero.tsx`, `blog-nav.tsx`, `hero-illustration.tsx`

## Proposed Solutions

### Option A: Introduce ThemeFilterSlug union (Recommended)
```ts
type ThemeSlug = "study-tips" | "science" | "maths" | "wellbeing";
type ThemeFilterSlug = ThemeSlug | "all";

interface Theme {
  id: string;
  name: string;
  slug: ThemeFilterSlug;
  description: string;
}
```
Thread `ThemeFilterSlug` through all callbacks, state, and props. Type `themeImageMap` as `Record<ThemeFilterSlug, string>`.

**Pros:** Fixes all 4 HIGH type safety findings in one pass, compiler catches missing cases
**Cons:** Touches ~8 files for prop/callback type updates
**Effort:** Small-Medium
**Risk:** Low

## Acceptance Criteria

- [ ] `Theme.slug` is typed as a constrained union, not `string`
- [ ] `themeImageMap` uses exhaustive typed record
- [ ] All `onThemeChange` callbacks use `ThemeFilterSlug` not `string`
- [ ] `activeTheme` state is typed as `ThemeFilterSlug`
- [ ] Adding a new theme to the array without updating the union produces a compiler error

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | Root cause of 4 HIGH type safety findings |

## Resources

- `src/types/blog.ts:1` (ThemeSlug definition)
- `src/types/blog.ts:14-19` (Theme interface)
- `src/lib/content-data.ts:7` ("all" slug)
- `src/app/blog/theme/[themeName]/blog-interactive.tsx:20,45`
- `src/components/blog-hero/hero-illustration.tsx:3` (themeImageMap)
