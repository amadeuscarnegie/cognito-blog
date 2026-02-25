---
status: complete
priority: p1
issue_id: "003"
tags: [code-review, security]
dependencies: []
---

# Missing Security Headers in next.config.ts

## Problem Statement

The Next.js configuration contains zero security response headers. No CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, or Permissions-Policy headers are configured. This leaves the site vulnerable to clickjacking and lacks defense-in-depth against XSS.

**Why it matters:**
- Without CSP, any future XSS vector has no browser-level defense
- Without X-Frame-Options/frame-ancestors, the site can be embedded in iframes on any domain (clickjacking)
- Without X-Content-Type-Options, browsers may MIME-sniff responses
- Without Referrer-Policy, full URLs may leak to external sites

## Findings

- **Security sentinel**: Rated MEDIUM severity -- single most impactful security improvement
- No other security vulnerabilities found in codebase (clean static site)
- Vercel provides some defaults, but explicit configuration ensures protection regardless of deployment platform

## Proposed Solutions

### Option A: Add headers to next.config.ts (Recommended)
```ts
async headers() {
  return [{
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none';" },
    ],
  }];
}
```

**Pros:** Comprehensive, works on all deployment platforms
**Cons:** CSP may need tuning for Google Fonts, Next.js inline scripts
**Effort:** Small (15 minutes)
**Risk:** Low -- may need to iterate on CSP if it blocks legitimate resources

## Acceptance Criteria

- [ ] All 5 security headers present in response
- [ ] CSP does not block Google Fonts or Next.js functionality
- [ ] Site loads correctly with headers enabled

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from code review | Only actionable security finding in an otherwise clean static site |

## Resources

- `next.config.ts`
- OWASP Security Headers guide
