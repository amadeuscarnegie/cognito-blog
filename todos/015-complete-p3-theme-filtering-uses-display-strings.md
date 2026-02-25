---
status: complete
priority: p3
issue_id: "015"
tags: [code-review, architecture, typescript]
dependencies: []
---

# Theme Filtering Uses Display Strings Instead of Slugs

## Problem Statement

Article filtering compares `a.theme.toLowerCase()` against `currentTheme.name.toLowerCase()`. Both are display strings (e.g., "Study tips"). If someone renames a theme display name, filtering silently breaks. The `ArticleTheme` type and `Theme.name` values are defined independently with no compile-time enforcement.

## Proposed Solutions

### Option A: Use theme slugs as canonical identifier (Recommended)
Change `Article.theme` to store the slug. Filter by slug instead of display name. Create a shared `ThemeSlug` type.

**Effort:** Small | **Risk:** Low

## Resources

- `src/app/blog/theme/[themeName]/client.tsx:42-44`
- `src/types/blog.ts`
- `src/lib/content-data.ts`
