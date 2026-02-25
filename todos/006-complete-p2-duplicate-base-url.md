---
status: complete
priority: p2
issue_id: "006"
tags: [code-review, architecture]
dependencies: []
---

# Duplicated BASE_URL Constant Across 5+ Files

## Problem Statement

`BASE_URL = "https://cognitolearning.co.uk"` is defined independently in:
- `src/lib/json-ld.tsx` (line 14)
- `src/app/blog/theme/[themeName]/page.tsx` (line 11)
- `src/app/layout.tsx` (hardcoded in metadata)
- `src/app/sitemap.ts` (line 4)
- `src/app/robots.ts` (hardcoded in return)

When this URL changes (staging, preview deploys, domain migration), 5+ files must be updated.

## Proposed Solutions

### Option A: Extract to `src/lib/constants.ts` (Recommended)
Single source of truth, import everywhere.

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] Single `BASE_URL` definition, imported by all consumers
- [ ] No hardcoded domain strings in source files

## Resources

- `src/lib/json-ld.tsx:14`, `src/app/blog/theme/[themeName]/page.tsx:11`, `src/app/sitemap.ts:4`
