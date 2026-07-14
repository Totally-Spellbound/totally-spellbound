# Spellbound Product Enrichment - Build Plan

> Drafted 2026-07-14. The technical + product plan for the internal Shopify admin app
> that AI-enriches products (title, description, metafields, category, tags) and
> suggests store navigation. Read `README.md` first for orientation.

## 0. Status & where things live
- **App code:** does NOT exist yet. New repo to create:
  **https://github.com/Totally-Spellbound/totally-spellbound-product-enricher**
- **Already installed on the store:** an unlisted custom app *"Spellbound Product
  Enrichment"* by Totally Spellbound (installed 2026-07-13, already hosted + embedded,
  has an "Open app" button) plus a sibling *"Spellbound Packshot Studio"*. A prior
  session created the Partner app + install but there is no committed codebase.
  **Reconcile the existing Partner app/install rather than creating a duplicate.**
- **Reference docs (project-level, in this theme repo):** `docs/metafields.md`
  (authoritative choice lists), `docs/brand.md`, `docs/tone-of-voice.md`,
  `docs/sales.md`. The enricher consumes these; copy or vendor them into the app repo.
- **Milestone decision:** finalise the plan now; build in a later dedicated agent
  session working in the enricher repo, using this packet as its instructions.

## 1. Hosting (answered)
An embedded admin app is **your own hosted web app**. Shopify does not run your code; it
loads YOUR URL in an iframe and wraps it with **App Bridge + Polaris** so it looks
native. **Host on Vercel** (Next.js app + Vercel Workflows in one deployment).
Distribution = Partner Dashboard **custom distribution** to the single store. (This is
already the model of the installed app.)

## 2. Architecture
```
Shopify Admin (iframe)
  └─ App Bridge + Polaris UI ── Next.js on Vercel
        │  session-token auth (managed install / token exchange)
        ▼
  Next.js API routes ─────────  Admin GraphQL API (2026-04)
        │                         read products (queue) · productUpdate/productSet
        │                         (title, descriptionHtml, tags, category) ·
        │                         metafieldsSet · menuUpdate (navigation)
        ▼
  Vercel Workflow (start() from an API route; "use workflow" + "use step")
        ├─ step: load product (title, desc, images, type, vendor, current metafields)
        ├─ step: load guidance (docs/brand.md, tone-of-voice.md, sales.md) + metafield enums
        ├─ step: Claude -> STRUCTURED enrichment proposal (JSON schema / tool)
        ├─ step: validate proposal against metafield choice lists (reject invented values)
        └─ step: store as status=pending_review  (DOES NOT write to Shopify yet)
        ▼
  App storage (Vercel Postgres or KV): draft proposals + review status + audit trail
        ▲
  Review UI -> Approve -> API route writes to Shopify + sets custom.enriched=true
```

**Key decision - review is not a waiting workflow.** The workflow generates a draft and
stops. Drafts sit as `pending_review`; a human approves in the UI, which triggers a
separate write. Cheap to bulk-generate overnight, review in the morning. (Vercel
Workflow does support signal/condition waits, but decoupling is simpler and safer here.)

**Model:** Claude (latest Opus 4.8 / Sonnet 5) via the Anthropic SDK inside a `use step`.
Force structured output so every proposal is a typed, validatable object.

## 3. Features
### 3a. Un-enriched product queue (first buildable milestone)
- Polaris `IndexTable` of products where `custom.enriched` != true.
- Add product metafield defs `custom.enriched` (bool) + `custom.enriched_at` (date).
- Filter own-vendor ("Totally Spellbound") vs imported ("Kate's Clothing"/Collective)
  via the `vendor` field.
- Row: image, title, vendor, missing fields, Enrich / bulk "Enrich selected".

### 3b. Enrichment generation (workflow)
Produce a structured proposal: rewritten `title`, `descriptionHtml`, the 8 `metafields`
(each constrained to `docs/metafields.md` enums; multi fields = arrays), `category` (Shopify
Standard Product Taxonomy), `tags`, `rationale`, per-field `confidence`. Strip and
rewrite duplicate dropship manufacturer copy.

### 3c. Review / approve UI
Side-by-side current vs proposed, per-field accept/edit/reject. Metafields shown as the
real choice chips. Approve -> `productUpdate`/`productSet` + `metafieldsSet`, set
`custom.enriched=true`, `enriched_at=now`, write audit record.

### 3d. Navigation / menu suggester
Separate screen. Alison locks in must-have categories; app suggests extra menu items /
structure based on which collections have stock and gaps (she "does not know how to run
a store"). Preview, then on approve write via **`menuUpdate`**
(scope `write_online_store_navigation`). Never auto-apply.

## 4. Scopes
`read_products`, `write_products`, `read_product_listings`,
`write_online_store_navigation`, metafield read/write. Add content scopes only if we
later manage blog/pages. Keep minimal.

## 5. Milestones
1. **Reconcile** existing Partner app/install; create the enricher repo; copy this
   packet in; write the app's own README/AGENTS for future sessions. Create
   `custom.enriched` + `custom.enriched_at` defs.
2. **Queue** - embedded IndexTable + own/imported filter.
3. **Guidance wired** - app reads `docs/brand.md`, `tone-of-voice.md`, `sales.md`.
4. **Workflow** - single-product structured enrichment, choice-list validated,
   stored pending_review.
5. **Review UI** - approve/edit/reject, write back, mark enriched, audit.
6. **Bulk** - queue N, generate overnight, review in the morning.
7. **Navigation suggester** - read + propose + `menuUpdate` on approve.

## 6. Open items to confirm when building
- Existing Partner org / app API credentials location (from prior session).
- App storage choice: Vercel Postgres vs KV.
- Category taxonomy approach (`productSet` category GID vs `productUpdate`).
- Whether Packshot Studio shares infra/auth we can reuse.
