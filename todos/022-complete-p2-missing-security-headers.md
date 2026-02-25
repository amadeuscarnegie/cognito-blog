---
status: pending
priority: p2
issue_id: "022"
tags: [code-review, security]
dependencies: []
---

# Missing CSP and HSTS Security Headers

## Problem Statement

The `next.config.ts` headers configuration includes `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy`, but is missing two important defense-in-depth headers: Content-Security-Policy (CSP) and Strict-Transport-Security (HSTS).

**Why it matters:**
- **CSP**: Without it, if an XSS vulnerability is ever introduced (future features, compromised CDN, supply chain attack), there is no browser-enforced layer preventing script execution
- **HSTS**: Without it, first visits via `http://` could be intercepted via SSL stripping on untrusted networks before the Vercel redirect occurs

## Findings

- **Security sentinel**: Both rated MEDIUM — "CSP is the single most effective mitigation against XSS attacks"
- **Architecture strategist**: Confirmed — "defense-in-depth against XSS"
- Current risk is LOW for a static site, but these are standard best practices

## Proposed Solutions

### Option A: Add both headers (Recommended)
Add to the headers array in `next.config.ts`:

```ts
{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
{ key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'" },
```

**Pros:** Standard security hardening, minimal effort
**Cons:** CSP may need tuning for Next.js inline scripts; test in report-only mode first
**Effort:** Small
**Risk:** Low (test CSP in `Content-Security-Policy-Report-Only` first)

## Acceptance Criteria

- [ ] HSTS header present with max-age >= 1 year
- [ ] CSP header present (even if initially in report-only mode)
- [ ] No functional regressions from CSP (fonts load, images render, scripts execute)

## Work Log

| Date | Action | Learnings |
|------|--------|-----------|
| 2026-02-25 | Created from full codebase review | Security sentinel rated both MEDIUM |

## Resources

- `next.config.ts:8-23` (current headers)
- OWASP A05:2021 — Security Misconfiguration
- [HSTS Preload List](https://hstspreload.org/)
