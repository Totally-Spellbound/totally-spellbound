# Enricher app - brief

Private embedded Shopify admin app (staff only) using Claude + Vercel Workflows to
enrich products: rewrite title/description in brand voice, suggest metafields (from
fixed choice lists), category, tags. Un-enriched queue -> generate draft -> human
review/approve -> write to Shopify. Also a nav-menu suggester for the owner.

Why: ~800 dropship products with generic copy + own handmade range; owner (Alison, not a
merchandiser) needs guided suggestions to approve. Human approves every change.

Code: NOT built yet. Repo to create:
github.com/Totally-Spellbound/totally-spellbound-product-enricher (separate from this
theme repo). Already installed on store: unlisted app "Spellbound Product Enrichment"
(hosted+embedded, 2026-07-13) + sibling "Spellbound Packshot Studio" - reconcile, don't
duplicate.

Read:
- `PLAN.md` - hosting, architecture, features, milestones.
- `../../docs/metafields.md` - authoritative metafield choice lists (validate against).
- `../../docs/brand.md`, `tone-of-voice.md`, `sales.md` - product-copy guidance.

Non-negotiables: embedded apps are self-hosted (Vercel; App Bridge + Polaris); metafields
are fixed choice lists (reject invented values); no em/en dashes, UK spelling, £, no
medical claims; human-in-the-loop review before any write; track via `custom.enriched`
+ `custom.enriched_at`, split own/imported by `vendor`.
