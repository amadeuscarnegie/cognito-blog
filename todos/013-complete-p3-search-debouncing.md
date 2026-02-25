---
status: complete
priority: p3
issue_id: "013"
tags: [code-review, performance]
dependencies: []
---

# Search Input Lacks Debouncing

## Problem Statement

Every keystroke triggers `setSearchQuery`, which triggers `useMemo` recalculation and re-render of the entire ArticlesGrid. With 14 articles this is imperceptible, but will cause input lag at 100+ articles.

## Proposed Solutions

### Option A: Use React 19 `useDeferredValue` (Recommended)
```tsx
const deferredQuery = useDeferredValue(searchQuery);
// Use deferredQuery in filteredArticles useMemo
```

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] Search input remains responsive during typing
- [ ] Filtering updates with slight deferral

## Resources

- `src/app/blog/theme/[themeName]/client.tsx:47-50`
- `src/components/ui/search-input.tsx`
