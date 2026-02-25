---
status: complete
priority: p3
issue_id: "014"
tags: [code-review, simplicity, performance]
dependencies: []
---

# Remove Unused Assets

## Problem Statement

The following files in `public/assets/` are not referenced anywhere in source code:
- `Catapult.png` (1.1MB)
- `cta-box-desktop.jpg` (964KB)

Total: ~2MB of dead weight in the deployed public directory.

## Proposed Solutions

### Option A: Delete the files (Recommended)
Verify with `grep -r "Catapult" src/` and `grep -r "cta-box-desktop" src/`, then delete.

**Effort:** Small | **Risk:** Low

## Acceptance Criteria

- [ ] Unused files removed from public/assets/
- [ ] No broken image references

## Resources

- `public/assets/Catapult.png`
- `public/assets/cta-box-desktop.jpg`
