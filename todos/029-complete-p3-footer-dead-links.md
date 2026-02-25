---
status: pending
priority: p3
issue_id: "029"
tags: [code-review, routing]
dependencies: []
---

# Footer Contains ~40 Dead Links

## Problem Statement

The footer links to `/schools`, `/features/video-lessons`, `/about`, `/gcse/biology`, and ~37 other routes that don't exist in this application. The "Blog" link points to `/blog` which also 404s (correct path is `/blog/theme/all`).

If deployed standalone, these are all dead links. If deployed as part of a larger Cognito app via rewrite rules, they may work — but this is not documented.

## Proposed Solutions

### Option A: Prefix with main site URL
Add a `MAIN_SITE_URL` constant and prefix all footer links. Fix `/blog` to `/blog/theme/all`.

**Effort:** Small | **Risk:** Low

### Option B: Document deployment model
If the blog is deployed behind the main Cognito domain, document this in a README or config comment.

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] Footer "Blog" link navigates to `/blog/theme/all` (not `/blog`)
- [ ] Deployment model documented OR links prefixed with main site URL

## Resources

- `src/components/footer/footer-links.tsx:8-97`
