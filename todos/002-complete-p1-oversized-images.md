---
status: done
priority: p1
issue_id: "002"
tags: [code-review, performance]
dependencies: []
---

# Oversized Image Assets

## Problem Statement

Several image assets in `public/assets/` are dramatically oversized, with the desktop CTA battle image at 2.1MB alone. This adds 3-5 seconds to load time on mobile 3G connections and significantly impacts Core Web Vitals.

**Why it matters:**
- `blog-cta-battle-desktop.jpg`: 2.1MB
- `blog-cta-battle-mobile.jpg`: 477KB (oversized for mobile viewport)
- `Brand-building.png`: 871KB
- `Catapult.png`: 1.1MB (unused -- see todo #014)
- `cta-box-desktop.jpg`: 964KB (unused -- see todo #014)
- Total unnecessary weight: ~5.5MB in public assets

## Findings

- **Performance oracle**: Rated CRITICAL -- single highest image optimization impact
- Source file at 2.1MB with `sizes="100vw"` generates large optimized variants
- Decorative images (`aria-hidden="true"`) don't need maximum quality

## Proposed Solutions

### Option A: Compress source images (Recommended)
Run all images through an optimizer (squoosh.app, sharp CLI) targeting:
- JPEGs: quality 75-80, max 200KB per file
- PNGs: lossless compression via pngquant/optipng

**Pros:** Zero code changes, massive savings
**Cons:** Requires re-exporting or compressing assets
**Effort:** Small
**Risk:** Low

### Option B: Add quality prop to Image components
Set `quality={75}` on decorative `<Image>` components for server-side optimization.

**Pros:** Quick code change
**Cons:** Doesn't fix oversized source files, optimization still slow on server
**Effort:** Small
**Risk:** Low

## Acceptance Criteria

- [x] No source image in `public/assets/` exceeds 200KB
- [x] CTA battle images serve under 100KB at typical viewport sizes
- [x] Visual quality remains acceptable

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from code review | 2.1MB single image is the biggest performance bottleneck |
| 2026-02-25 | Resized all 3 images via sips | desktop: 8334x4168 2.1MB -> 1600x800 185KB; mobile: 3200x1600 477KB -> 800x400 72KB; Brand-building: 1924x1238 871KB -> 440x283 119KB. Build verified. |

## Resources

- `src/components/footer-cta/footer-cta.tsx:44-52`
- `public/assets/blog-cta-battle-desktop.jpg`
