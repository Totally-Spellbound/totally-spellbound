---
name: design-md
description: Analyze the Totally Spellbound live storefront and theme source, then maintain the repository's canonical DESIGN.md.
allowed-tools:
  - Read
  - Write
  - web_fetch
---

# Totally Spellbound DESIGN.md

Maintain the root `DESIGN.md` as the semantic design-system reference for this repository.

## Sources, in order

1. The live Totally Spellbound storefront and its real rendered pages.
2. The theme source, settings and assets in this repository.
3. Stitch screens, only when Andrew explicitly supplies a Stitch project as an additional reference.

The old `DESIGN.md` history and planning-framework files are not design authority.

## Workflow

1. Inspect representative live pages at mobile and desktop widths: Home, Collection, Search, Product and Cart.
2. Trace visible decisions back to theme tokens, settings and component styles.
3. Record the system in plain design language with exact values where the code establishes them.
4. Separate established rules from recommendations. Do not invent a new direction while documenting the existing site.
5. Update root `DESIGN.md`, keeping it useful to both designers and implementation agents.

## Required coverage

- Visual atmosphere and brand character
- Colour roles and exact values
- Typography roles, scale and line height
- Spacing and layout rhythm
- Component geometry, borders and depth
- Product imagery and commerce patterns
- Responsive behaviour and interaction rules
- Accessibility and motion constraints

## Project constraints

- Never add decorative eyebrow, kicker or overline labels above headings.
- Keep the mobile drawer full height; width changes must not change its height behaviour.
- Prefer shared semantic tokens over page-specific approximations.
- Preserve product names in full unless Andrew explicitly approves truncation.

## Output

Write a clear Markdown document at `DESIGN.md`. Explain why a rule exists when that helps a future designer make a consistent choice. Avoid promotional prose and generic design advice.
