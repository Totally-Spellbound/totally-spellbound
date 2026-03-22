---
phase: 01-foundation-skeleton
plan: "01"
subsystem: ui
tags: [shopify, liquid, sections, templates, theme-editor]

# Dependency graph
requires: []
provides:
  - "sections/spellbound-homepage.liquid: minimal skeleton homepage section with theme editor schema"
  - "templates/index.json: single-section homepage template wired to spellbound-homepage"
  - "Clean repo root: abandoned prototype files removed"
affects: [02-design-system, 03-homepage-experience]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Shopify section schema with presets for theme editor configurability"
    - "page-width wrapper div for Horizon max-width container"
    - "spellbound-section + spellbound-section--{name} CSS class pattern"

key-files:
  created:
    - sections/spellbound-homepage.liquid
  modified:
    - templates/index.json

key-decisions:
  - "Replace all 8 complex homepage sections with a single minimal skeleton to establish a clean base for Phase 2 and 3"
  - "Keep all existing spellbound-*.liquid section files — only rewire index.json, do not delete section files"
  - "Use presets array in schema so section appears in Shopify theme editor Add Section picker"

patterns-established:
  - "Homepage section: single section in templates/index.json with type spellbound-homepage"
  - "Section class naming: spellbound-section spellbound-section--{name}"

requirements-completed: [FOUND-01, FOUND-02]

# Metrics
duration: 1min
completed: 2026-03-22
---

# Phase 1 Plan 1: Foundation Skeleton Summary

**Minimal spellbound-homepage.liquid section with Shopify theme editor schema replacing 8 complex prototype sections, plus removal of abandoned temp.tsx and new-celestial.html from repo root**

## Performance

- **Duration:** 1 min
- **Started:** 2026-03-22T17:31:35Z
- **Completed:** 2026-03-22T17:32:46Z
- **Tasks:** 2
- **Files modified:** 3 (1 created, 1 modified, 2 deleted)

## Accomplishments
- Created `sections/spellbound-homepage.liquid` — minimal skeleton with `{% schema %}`, `page-width` wrapper, heading/subheading rendered via Liquid, and presets for theme editor
- Replaced `templates/index.json` from 8-section complex layout to a single clean skeleton section, removing all spellbound-hero/discovery-grid/editorial/oracle references
- Removed 3,452 lines of abandoned prototype code (`temp.tsx`, `new-celestial.html`) from repo root

## Task Commits

Each task was committed atomically:

1. **Task 1: Create skeleton homepage section and rewire index.json** - `07a8192` (feat)
2. **Task 2: Remove abandoned prototype files from repo root** - `0d4ea44` (chore)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified
- `sections/spellbound-homepage.liquid` - Minimal Shopify homepage section skeleton with schema for theme editor
- `templates/index.json` - Replaced with single-section template referencing spellbound-homepage only
- `temp.tsx` - Deleted (abandoned React prototype)
- `new-celestial.html` - Deleted (abandoned CSS solar system prototype)

## Decisions Made
- Replaced all 8 existing homepage sections with a single skeleton rather than incrementally removing them — cleaner base for Phase 2 rebuild
- Kept all existing `sections/spellbound-*.liquid` files untouched — only `templates/index.json` wiring was changed
- No JavaScript, no inline `<style>` blocks, no external CSS references in the skeleton section — purely server-side Liquid

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Foundation skeleton is complete and clean — Phase 2 (Design System) can build on top of `spellbound-homepage.liquid`
- All existing spellbound-*.liquid section files are preserved and available for Phase 3 (Homepage Experience) to reference
- No blockers

---
*Phase: 01-foundation-skeleton*
*Completed: 2026-03-22*
