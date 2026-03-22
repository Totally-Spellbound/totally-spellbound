# Phase 2: Design System - Context

**Gathered:** 2026-03-22
**Status:** Ready for planning (design values pending reverse-engineering sessions)

<domain>
## Phase Boundary

Build the visual identity layer on top of the Phase 1 skeleton. Dark palette, typography, component styles, light/dark toggle. After this phase, the site should *look* like Totally Spellbound even without content.

Requirements: DSGN-01 through DSGN-05.

</domain>

<decisions>
## Implementation Decisions

### Design Process
- Andrew provides reference websites — Claude reverse-engineers design values using Chrome DevTools
- This is iterative: inspect sites together, Andrew says what he likes, Claude extracts CSS/values and adapts to Totally Spellbound
- NOT a one-shot handoff — expect multiple rounds of "look at this, extract that, try it, refine"
- Do NOT ask abstract design questions (hex values, font names) without visual context — work from live sites

### Primary Reference
- **Monopo (monopo.vn)** — PRIMARY design reference. Reverse-engineer color palette, typography, animation approach, spatial composition
- **Wope (wope-937)** — SECONDARY reference. Purple palette, bento grid, card styles

### Known Direction (from transcript)
- Dark base with purple/violet accents and warm gold touches
- Light/dark theme toggle (Alison prefers dark, staff prefer light)
- Serif display headings for mystical feel, clean sans-serif body
- "Add to Cauldron" branding on buttons
- Must feel handmade, not template-looking
- Readability critical — high contrast text, Alison can't read low-contrast white-on-black
- Subtle animations and interactions (not annoying)

### Claude's Discretion
- CSS custom property naming conventions
- Shopify settings schema structure for theme toggle
- localStorage implementation for theme persistence
- CSS architecture (how to organize the stylesheet)
- Transition/animation utility class naming

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design direction
- `.planning/research/DESIGN-DIRECTION.md` — Extracted design DNA from all reference sites, anti-patterns, Shopify constraints

### Existing styles
- `assets/base.css` — Horizon base stylesheet (~4,946 lines) — the foundation everything builds on
- `assets/spellbound-custom.css` — Custom styles started in Phase 1 (skeleton responsive CSS)
- `snippets/color-schemes.liquid` — Existing CSS custom property system for color schemes

### Reference sites (inspect via Chrome DevTools)
- `https://monopo.vn/` — PRIMARY reference for palette, typography, motion, spatial composition
- Wope on Godly: `https://godly.website/website/wope-937` — SECONDARY for purple palette, bento cards

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `snippets/color-schemes.liquid` — Already renders CSS custom properties for color schemes. Extend this for dark/light toggle.
- `assets/base.css` — Horizon's full design foundation. Contains existing CSS custom properties (`--font-heading--family`, `--color-foreground`, etc.) that Phase 1 skeleton already uses.
- `config/settings_schema.json` — Theme settings schema (~54KB). Already has color scheme definitions. Extend for dark/light toggle.

### Established Patterns
- CSS custom properties for theming (already in base.css and color-schemes.liquid)
- `.spellbound-section` and `.spellbound-label` class naming (from Phase 1)
- No build step — all CSS is vanilla, loaded via Shopify asset pipeline

### Integration Points
- `layout/theme.liquid` — Where theme toggle JS and global styles connect
- `snippets/stylesheets.liquid` — Where CSS files are loaded
- `config/settings_data.json` — Where theme settings values are stored

</code_context>

<specifics>
## Specific Ideas

- Monopo's fluid, organic feel is the target mood — not sharp/geometric/corporate
- The site should feel like "entering a world" (from transcript)
- Cursor-reactive effects on homepage (Phase 3) will build on this design system's animation utilities
- Design values will be reverse-engineered from live reference sites using Chrome DevTools — not designed from scratch

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-design-system*
*Context gathered: 2026-03-22*
