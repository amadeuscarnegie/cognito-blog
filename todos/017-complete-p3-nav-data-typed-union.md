---
status: complete
priority: p3
issue_id: "017"
tags: [code-review, typescript]
dependencies: []
---

# Nav Data Lacks Typed Discriminated Union

## Problem Statement

`navItems` in `nav-data.ts` is implicitly typed. Items have either `hasDropdown: true` or `href: string` but not both. TypeScript infers a union but it's not explicit, losing exhaustive type checking in the NavItem component.

## Proposed Solutions

Add a discriminated union type:
```ts
type NavDropdownItem = { label: string; hasDropdown: true };
type NavLinkItem = { label: string; href: string; hasDropdown?: never };
type NavItem = NavDropdownItem | NavLinkItem;
```

**Effort:** Small | **Risk:** Low

## Resources

- `src/lib/nav-data.ts`
- `src/components/nav/nav-item.tsx`
