---
status: complete
priority: p2
issue_id: "008"
tags: [code-review, performance]
dependencies: []
---

# `key={activeTheme}` Forces Full ArticlesGrid DOM Remount

## Problem Statement

`<ArticlesGrid key={activeTheme} .../>` destroys and recreates the entire grid component on every theme switch. All 12+ ArticleCard components and their `<Image>` elements are destroyed and recreated from scratch. Every image loses its loaded state and must re-decode, causing a visible flash.

## Proposed Solutions

### Option A: Reset pagination with useEffect instead (Recommended)
Remove the `key` prop. Inside `ArticlesGrid`, reset `visibleCount` when `articles` changes:
```tsx
useEffect(() => { setVisibleCount(INITIAL_COUNT); }, [articles]);
```

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] Theme switching does not destroy/recreate the article DOM
- [ ] Pagination resets correctly on theme change
- [ ] No visible flash during theme transitions

## Resources

- `src/app/blog/theme/[themeName]/client.tsx:92`
- `src/components/articles-grid/articles-grid.tsx`
