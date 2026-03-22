---
phase: 1
slug: foundation-skeleton
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-22
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shopify Theme Check (linting) + Lighthouse CLI (performance) |
| **Config file** | none — Shopify Theme Check uses built-in rules |
| **Quick run command** | `shopify theme check --fail-level error` |
| **Full suite command** | `shopify theme check && echo "Theme check passed"` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `shopify theme check --fail-level error`
- **After every plan wave:** Run full theme check
- **Before `/gsd:verify-work`:** Theme check must be green + Lighthouse audit on dev server
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | FOUND-01 | lint | `shopify theme check layout/theme.liquid` | ✅ | ⬜ pending |
| 1-01-02 | 01 | 1 | FOUND-01 | lint | `shopify theme check templates/` | ✅ | ⬜ pending |
| 1-01-03 | 01 | 1 | FOUND-02 | manual | Verify sections editable in theme editor | N/A | ⬜ pending |
| 1-01-04 | 01 | 1 | FOUND-03 | manual | Responsive check via Chrome DevTools | N/A | ⬜ pending |
| 1-01-05 | 01 | 1 | FOUND-04 | perf | `lighthouse --only-categories=performance` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Shopify CLI installed and authenticated (`shopify theme dev` works)
- [ ] Lighthouse CLI available for performance baseline

*If Shopify CLI not available: theme check can be run via `npm run check` (already in package.json).*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Sections editable in theme editor | FOUND-02 | Requires running Shopify dev server and using admin UI | Run `shopify theme dev`, open customizer, verify sections appear and are configurable |
| Mobile responsive layout | FOUND-03 | Visual verification needed | Open dev server, use Chrome DevTools device emulation (iPhone SE, iPad) |
| Page load < 3s LCP | FOUND-04 | Requires dev server running | Run Lighthouse on dev server URL, check LCP metric |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
