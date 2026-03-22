# Phase 1: Foundation Skeleton - Research

**Researched:** 2026-03-22
**Domain:** Shopify Liquid Theme Architecture — brownfield skeleton rebuild
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Clean skeleton structure for all core pages (home, product, collection, cart, search) | All core templates already exist as JSON; the skeleton approach is to replace section content in each, not delete templates |
| FOUND-02 | Shopify theme editor compatibility — sections and blocks configurable via admin | Existing header, footer, and core `main-*` sections already wire correctly; custom `spellbound-*` sections must also expose schema |
| FOUND-03 | Mobile-responsive layout — most traffic comes from social media on phones | `base.css` provides the responsive foundation; new sections must use CSS custom properties and the same breakpoint patterns |
| FOUND-04 | Performance: pages load fast on mobile (< 3s LCP) | `scripts.liquid` loads 30+ JS modules globally; view-transitions.js can block render; `base.css` is 4,946 lines — the cleanup and audit is the work |
</phase_requirements>

---

## Summary

This is a brownfield Shopify theme built on top of the Horizon theme base. The current codebase is a first pass that is functional but messy: it mixes Horizon's highly capable component system with a set of custom `spellbound-*` sections that provide the store's distinctive look and feel. Phase 1 is about stripping the homepage and core page sections back to clean skeletons, while preserving the essential Shopify wiring that makes the theme editor, cart, search, and routing work.

The most critical insight is that **the Shopify wiring layer is already correct and mostly complete**. The layout (`theme.liquid`), all core templates (index.json, product.json, collection.json, cart.json, search.json, page.json, 404.json), and the header/footer section groups all exist and function. Phase 1 does not need to build the skeleton from scratch — it needs to decide which existing sections to keep as-is, which to replace with simplified custom versions, and which to remove entirely from the current template definitions.

The key design decision for Phase 1 is: the homepage (`index.json`) currently wires to multiple `spellbound-*` custom sections (hero, discovery grid, editorial, oracle, countdown, featured products). These need to be replaced with a minimal placeholder structure that renders without breaking the theme editor — but Phase 2+ will add the actual design. The core page templates (product, collection, cart, search) wire to Horizon's standard `main-*` sections which are production-ready; these should be preserved with minimal modification.

**Primary recommendation:** Keep the wiring layer (theme.liquid, all JSON templates, header/footer groups, snippets/meta-tags, snippets/stylesheets, snippets/scripts). Replace the homepage with a minimal skeleton section. Audit and reduce `scripts.liquid` to eliminate globally-loaded JS for features not yet built. The `base.css` (4,946 lines) should be kept — it's the Horizon design foundation and stripping it would break all existing sections.

---

## What to Preserve vs. Replace

This is the central question for Phase 1 planning. Based on code inspection:

### Preserve As-Is (Essential Shopify Wiring)

| File | Why Preserve |
|------|-------------|
| `layout/theme.liquid` | The document shell. Contains `content_for_header`, section groups, the critical inline header-height script, and search modal render. Removing any part breaks core Shopify functionality. |
| `snippets/meta-tags.liquid` | SEO, social, canonical URLs — required on every page |
| `snippets/stylesheets.liquid` | Loads `overflow-list.css` and `base.css` — both required |
| `snippets/scripts.liquid` | Contains the import map (module resolution), `Theme` global object with cart/routes/search URLs, and `view-transitions.js`. The import map must stay. The per-feature JS loads can be audited. |
| `snippets/fonts.liquid` | Font loading — preserve |
| `snippets/color-schemes.liquid` | CSS custom properties for color schemes — required by `base.css` |
| `snippets/theme-styles-variables.liquid` | CSS custom properties for spacing, typography tokens |
| `sections/header-group.json` + `sections/header.liquid` | Header is already correctly structured with announcement bar, logo, menu, search, sticky behaviour |
| `sections/footer-group.json` + `sections/footer.liquid` | Footer group wiring |
| `sections/main-product.liquid` (via `product-information` type) | Full product page with media gallery, variant picker, add to cart — correct Shopify wiring |
| `sections/main-collection.liquid` | Collection grid with filters and sorting — correct Shopify wiring |
| `sections/main-cart.liquid` | Cart with products, summary, checkout — correct wiring |
| `sections/search-header.liquid` + `sections/search-results.liquid` | Search results page wiring |
| `sections/main-page.liquid` | Generic page template |
| `sections/main-404.liquid` | 404 page |
| `config/settings_schema.json` | Theme editor settings definition |
| `config/settings_data.json` | Current settings values |
| `locales/en.json` (and others) | All translation strings — required for `t:key` references throughout |
| `assets/base.css` | 4,946-line Horizon CSS foundation — nearly every section depends on it |
| `assets/component.js`, `assets/utilities.js`, `assets/events.js` | Core JS base classes — required by all feature JS |
| All core Horizon JS in `assets/` | Cart drawer, variant picker, facets, dialog, search-modal etc. — wires core Shopify features |

### Replace / Simplify (Phase 1 Work)

| File | Action | Why |
|------|--------|-----|
| `templates/index.json` | Replace section list with a minimal placeholder | Current homepage wires to 8 `spellbound-*` custom sections that are in "rough first pass" state — the skeleton just needs a render-clean placeholder |
| `sections/spellbound-hero.liquid` | Keep but strip to skeleton | Will be rebuilt in Phase 3; Phase 1 version should render a minimal heading block without broken JS |
| `sections/spellbound-discovery-grid.liquid` | Evaluate — keep or stub | Depends on whether theme editor needs it for homepage; can stub if blocking |
| `sections/spellbound-oracle.liquid` | Keep for theme editor but ensure it does not break on load | Oracle wires to `spellbound-oracle.js`; confirm JS is not causing errors |
| `sections/spellbound-featured-products.liquid` | Keep for homepage skeleton | Provides product display on homepage; can simplify |
| `assets/spellbound-custom.css` | Keep and extend | 178 lines of clean utility CSS; this is where Phase 1 skeleton overrides go |

### Remove Entirely (Tech Debt Cleanup)

| File | Why Remove |
|------|-----------|
| `/temp.tsx` | Abandoned experimentation file at repo root (1000+ lines) |
| `/new-celestial.html` | 116KB prototype at repo root — not a theme file |

---

## Standard Stack

### Core Shopify Theme Architecture

| Component | Version/Type | Purpose | Why Standard |
|-----------|-------------|---------|--------------|
| Shopify Liquid | Platform-provided | Templating language | Required for Shopify themes — no alternative |
| Shopify section/block system | Platform-provided | Theme editor configurability | FOUND-02 requirement — admin editability |
| `layout/theme.liquid` | Existing file | Document shell for all pages | Shopify requires this exact file at this path |
| `templates/*.json` | Existing files | Page routing and section composition | Shopify's JSON template system — modern standard |
| `sections/header-group.json` + `sections/footer-group.json` | Existing files | Section groups for header/footer persistence | Required for sticky header and footer across page navigation |
| `assets/base.css` | Horizon-derived, ~4,946 lines | Global design foundation, CSS custom properties | Already in codebase; all existing sections depend on it |
| `assets/spellbound-custom.css` | Project-specific, 178 lines | Spellbound overrides and utility classes | Clean, extensible — the right place for Phase 1 skeleton styles |

### JavaScript Module System

| Component | Purpose | Notes |
|-----------|---------|-------|
| Import map in `snippets/scripts.liquid` | Resolves `@theme/*` module aliases | Must be preserved — all JS modules depend on it |
| `assets/component.js` | Base class for web components | Foundation for all interactive elements |
| `assets/utilities.js` | Shared helpers | `debounce`, `fetchConfig`, `startViewTransition`, etc. |
| `assets/events.js` | Custom event system | `CartAddEvent`, `DialogOpenEvent`, etc. |
| `assets/view-transitions.js` | Page transitions | Can block render if `settings.page_transition_enabled` is true |

### Shopify CLI

| Tool | Version | Purpose |
|------|---------|---------|
| `@shopify/cli` | Installed per package.json | Theme development server and deployment |
| `@shopify/theme` | Installed per package.json | Theme-specific CLI commands |
| Dev server | `http://127.0.0.1:9292` | Hot reload during development |

**Development commands:**
```bash
shopify theme dev --store totally-spellbound-2.myshopify.com
shopify theme push
```

---

## Architecture Patterns

### Recommended Skeleton Structure

For Phase 1, the file structure stays the same — it's a modification exercise, not a creation exercise. The key structural changes are:

```
layout/
  theme.liquid                  # Preserve as-is — document shell is correct

templates/
  index.json                    # REPLACE section list — skeleton homepage
  product.json                  # Keep — already correct Shopify wiring
  collection.json               # Keep — already correct Shopify wiring
  cart.json                     # Keep — already correct Shopify wiring
  search.json                   # Keep — already correct Shopify wiring
  page.json                     # Keep — already correct
  404.json                      # Keep — already correct

sections/
  header-group.json             # Keep — correct
  footer-group.json             # Keep — correct
  spellbound-homepage.liquid    # NEW: minimal homepage skeleton section
  spellbound-hero.liquid        # Simplify: strip to structure-only, no broken JS deps
  (all other sections)          # Keep — needed for product/collection/cart/search

assets/
  spellbound-custom.css         # Extend: add skeleton layout tokens here
  (all other assets)            # Keep — required by existing sections
```

### Pattern 1: Shopify Section with Schema

Every section file (`.liquid`) must include a `{% schema %}` block for theme editor compatibility (FOUND-02). The schema must define settings, and blocks if the section uses `content_for 'block'`.

**Skeleton section pattern:**
```liquid
<section class="spellbound-section spellbound-section--homepage">
  <div class="page-width">
    <h1>{{ section.settings.heading }}</h1>
    <p>{{ section.settings.subheading }}</p>
  </div>
</section>

{% schema %}
{
  "name": "Homepage",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Totally Spellbound"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading",
      "default": "Crystals, incense & more"
    }
  ]
}
{% endschema %}
```

### Pattern 2: Template JSON Wiring

Templates reference sections by type name. The section file must exist in `sections/` with the matching name. Templates are the composition layer — they never contain markup, only section references.

**Minimal index.json pattern for skeleton:**
```json
{
  "sections": {
    "main": {
      "type": "spellbound-homepage",
      "settings": {
        "heading": "Totally Spellbound"
      }
    }
  },
  "order": ["main"]
}
```

### Pattern 3: CSS Custom Properties

The skeleton's minimal styling should use the existing CSS custom properties from `color-schemes.liquid` and `theme-styles-variables.liquid`. Do not define new colour/spacing values — use the existing tokens.

Key tokens available from `base.css` and color-schemes:
- `var(--color-foreground)` — text colour
- `var(--color-background)` — page background
- `var(--color-accent-1)` — primary accent
- `var(--font-body--family)` — body font
- `var(--font-heading--family)` — heading font
- `var(--page-width)` — max content width

**Class utility for max-width container (from base.css):**
```html
<div class="page-width">...</div>
```

### Pattern 4: Mobile-First Responsive Grid

The Horizon `base.css` provides responsive grid utilities. For Phase 1 skeleton, use these patterns rather than custom CSS:
- `.grid` — CSS grid container
- `.grid--1-col-mobile` — single column on mobile
- `.grid--2-col-tablet` — two columns on tablet+
- Media queries in `base.css` primarily use `min-width: 750px` (tablet) and `min-width: 990px` (desktop)

### Pattern 5: JS Module Loading — Minimal Approach

For Phase 1, the goal is performance. `scripts.liquid` currently loads 30+ JS modules globally on every page. Many of these are only needed on specific page types (product-form.js, sticky-add-to-cart.js, media-gallery.js, etc.).

The import map must stay. The individual `<script type="module">` tags should be audited:

**Keep globally (needed on most pages):**
- `view-transitions.js` — page navigation
- `dialog.js` — search modal dependency
- `overflow-list.js` — header navigation
- `popover-polyfill.js` — cross-browser

**Conditionalize (already partially done):**
- `sticky-add-to-cart.js` — already wrapped in `{% if template.name == 'product' %}`
- `fly-to-cart.js` — only needed on product page
- `localization.js` — already wrapped in localization check

**Phase 1 performance action:** Ensure `view-transitions.js` does not have `blocking="render"` unless explicitly needed. The current `scripts.liquid` adds `blocking="render"` when `settings.page_transition_enabled` is true. Check settings_data.json to see if this is on.

### Anti-Patterns to Avoid

- **Deleting templates without replacement:** Never remove a `.json` template file — Shopify routes will return 404 for the entire page type. Replace section content instead.
- **Inlining large amounts of CSS in section files:** Keep section styles minimal for skeleton phase; primary styles belong in `base.css` or `spellbound-custom.css`.
- **Creating `<style>` blocks with colour values hardcoded:** All colours must use CSS custom properties to respect color-scheme settings in the theme editor.
- **Custom elements without conditional registration:** All web component definitions need `if (!customElements.get('element-name'))` guard to prevent double-registration.
- **Touching `settings_data.json` manually:** This file is partially auto-generated by the Shopify admin. Change settings through the theme editor or `settings_schema.json`.
- **Removing the inline header-height script from theme.liquid:** The 65-line inline script in `theme.liquid` (lines 48-114) prevents layout shift on every page load. It must stay.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sticky header | Custom JS sticky logic | Existing `header.liquid` + `assets/header.js` + `enable_sticky_header` setting | Already implemented with CSS custom property sync |
| Mobile nav drawer | Custom drawer HTML/JS | Existing `_header-menu` block + `header-drawer.js` | Fully implemented with focus management and accessibility |
| Search modal | Custom search overlay | Existing `snippets/search-modal.liquid` + `assets/search-modal.js` | Predictive search, keyboard handling, a11y all done |
| Cart item count | Custom counter logic | Existing `snippets/cart-bubble.liquid` + `assets/cart-icon.js` | Cart count synced via sessionStorage and custom events |
| Image responsive sizing | Custom `srcset` markup | Shopify `image_url` filter with `width:` parameter | Shopify CDN handles responsive delivery — `{{ image | image_url: width: 400 }}` |
| Page width container | Custom max-width CSS | `.page-width` class from `base.css` | Synced to `settings.page_width` theme setting |
| CSS grid layout | Custom grid framework | Horizon `.grid` classes in `base.css` | Already responsive, matches breakpoints used everywhere |
| Color scheme CSS vars | Custom CSS variable definitions | `snippets/color-schemes.liquid` rendered in `<head>` | Generates all `--color-*` vars from Shopify color settings |

**Key insight:** The Horizon base theme ships with a comprehensive, production-tested component system. Phase 1 builds on it, not around it. The only custom code is in `spellbound-*` sections/assets.

---

## Common Pitfalls

### Pitfall 1: Breaking the Homepage by Removing Custom Sections
**What goes wrong:** If `index.json` references a `spellbound-*` section type and that `.liquid` file is deleted or has a Liquid error, the entire homepage returns a 500 error.
**Why it happens:** Shopify resolves section types at render time — a missing section file is a fatal error, not a graceful 404.
**How to avoid:** Always replace, never delete. When rebuilding the homepage skeleton, keep all referenced `spellbound-*` section files present (even if simplified to a minimal stub). Update `index.json` to reference the simplified section.
**Warning signs:** Shopify theme dev server shows "Liquid error" in the browser; page returns blank or server error.

### Pitfall 2: Stripping JS That the Header Silently Depends On
**What goes wrong:** Removing scripts from `scripts.liquid` thinking they are unused for Phase 1 breaks the header (menu drawer, search, cart icon counter).
**Why it happens:** The header web component (`header-component`) auto-initializes on `connectedCallback` and expects certain modules (dialog.js, overflow-list.js) to be loaded.
**How to avoid:** Only remove JS that is clearly page-specific (product-form.js, sticky-add-to-cart.js, media-gallery.js). Never remove dialog.js, overflow-list.js, or view-transitions.js.
**Warning signs:** Mobile menu fails to open; search icon does nothing; cart drawer doesn't open.

### Pitfall 3: view-transitions.js Blocking Render
**What goes wrong:** LCP score tanks because `view-transitions.js` loads with `blocking="render"`.
**Why it happens:** The condition in `scripts.liquid` adds `blocking="render"` when either `settings.page_transition_enabled` or `settings.transition_to_main_product` is true. These may be enabled in the current `settings_data.json`.
**How to avoid:** Check `settings_data.json` for these settings; if enabled, either disable in theme settings or ensure they're explicitly `false` in the skeleton's settings data for Phase 1.
**Warning signs:** Lighthouse LCP report shows render-blocking resources; page feels slow to show content on first load.

### Pitfall 4: Mobile Layout Breaking Because of Missing CSS Custom Properties
**What goes wrong:** Skeleton sections look fine on desktop but break on mobile because they use hardcoded sizes instead of CSS custom properties.
**Why it happens:** Horizon's grid system uses `--page-width`, container queries, and CSS custom properties that are set by `color-schemes.liquid` and `theme-styles-variables.liquid`. If new sections use hardcoded widths, they can overflow.
**How to avoid:** Use `class="page-width"` for all content containers. Never hardcode `max-width` — always use `var(--page-width)`.
**Warning signs:** Content overflows viewport on mobile; horizontal scroll appears.

### Pitfall 5: temp.tsx and new-celestial.html Causing Deployment Issues
**What goes wrong:** These files at the repo root will be included in any Shopify theme push and may cause unexpected deployment warnings.
**Why it happens:** `shopify theme push` uploads all tracked files. Non-Shopify files in the root are ignored by Shopify but clutter the theme file list and increase push time.
**How to avoid:** Delete both files as part of Phase 1 cleanup. Archive to a local branch if reference is needed.
**Warning signs:** `shopify theme push` shows unexpected files being uploaded.

### Pitfall 6: Section Schema Missing for Theme Editor Compatibility
**What goes wrong:** New `spellbound-*` skeleton sections appear in the theme editor but have no configurable settings, or worse, cause editor errors.
**Why it happens:** Shopify's theme editor requires the `{% schema %}` block to be valid JSON with correct structure. An empty or invalid schema silently breaks the editor panel.
**How to avoid:** Every new section must have a `{% schema %}` block with at least a `"name"` field. Even a minimal schema keeps the editor happy.
**Warning signs:** Shopify theme editor shows blank section panel; "Error loading section" in admin.

---

## Code Examples

Verified patterns from existing codebase inspection:

### Rendering a Section Group (Layout Layer)
```liquid
{# In theme.liquid — do not modify this pattern #}
<div id="header-group">
  {% sections 'header-group' %}
</div>

<main id="MainContent" class="content-for-layout" role="main">
  {{ content_for_layout }}
</main>

<footer>
  {% sections 'footer-group' %}
</footer>
```

### Referencing a Shopify Image with Responsive Sizing
```liquid
{# Source: Shopify Liquid image_url filter #}
{{ product.featured_image | image_url: width: 800 | image_tag: loading: 'lazy', alt: product.title }}
```

### Minimal Skeleton Section with Schema
```liquid
{# sections/spellbound-homepage.liquid #}
<section class="spellbound-section spellbound-section--homepage">
  <div class="page-width">
    <p class="spellbound-label">{{ section.settings.label }}</p>
    <h1>{{ section.settings.heading }}</h1>
  </div>
</section>

{% schema %}
{
  "name": "Homepage",
  "settings": [
    { "type": "text", "id": "label", "label": "Label", "default": "Welcome" },
    { "type": "richtext", "id": "heading", "label": "Heading", "default": "<h1>Totally Spellbound</h1>" }
  ],
  "presets": [{ "name": "Homepage" }]
}
{% endschema %}
```

### CSS Custom Property Usage Pattern (from spellbound-custom.css)
```css
/* Use existing tokens — never hardcode colours */
.spellbound-label {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: #f59e0b; /* amber — this will become var(--color-accent) in Phase 2 */
}
```

### Conditional JS Loading Pattern (from scripts.liquid)
```liquid
{# Only load product-specific JS on product pages #}
{% if template == 'product' or template.name == 'product' %}
  <script src="{{ 'sticky-add-to-cart.js' | asset_url }}" type="module" fetchpriority="low"></script>
{% endif %}
```

### Theme Global Object (Required — provides cart/search URLs to JS)
```liquid
{# In scripts.liquid — must stay #}
<script>
  const Theme = {
    routes: {
      cart_add_url: '{{ routes.cart_add_url | append: '.js' }}',
      cart_url: '{{ routes.cart_url }}',
      predictive_search_url: '{{ routes.predictive_search_url }}',
    }
  };
</script>
```

---

## State of the Art

| Old Approach | Current Approach | Status in This Codebase |
|--------------|------------------|------------------------|
| `.liquid` templates for pages | JSON templates (`product.json`, `collection.json`) | Already using JSON templates — correct |
| Global section rendering | Section groups (`header-group`, `footer-group`) | Already implemented correctly |
| Custom JS bundler (webpack/rollup) | Native ES modules with import map | Already using import maps — no build step needed |
| jQuery | Vanilla JS web components | Already Vanilla JS |
| CSS preprocessors (SASS/LESS) | CSS custom properties | Already using CSS custom properties |

**Deprecated/outdated in this codebase:**
- `{{ 'script.js' | script_tag }}` (sync): The theme uses `type="module"` and `fetchpriority="low"` instead. Any new scripts must follow this pattern.
- `{% include 'snippet' %}`: Prefer `{% render 'snippet' %}` (scoped) over `{% include %}` (shared scope). The codebase uses both — new code should use `render`.

---

## Performance Guidance for FOUND-04 (< 3s LCP mobile)

The performance target is achievable with this stack. Key actions for Phase 1:

1. **Audit `scripts.liquid`**: The file loads ~30 JS modules globally. For skeleton phase, many feature-specific modules can be deferred or made page-conditional. Estimated impact: reduces initial JS parse time.

2. **Disable view-transitions render blocking**: Check `settings_data.json` for `page_transition_enabled` and `transition_to_main_product`. If true, these add `blocking="render"` to `view-transitions.js`, which blocks LCP. For skeleton phase, these should be false.

3. **`base.css` is 4,946 lines**: Shopify serves it with a CDN and it has a preload tag. This is expected for a full theme — do not try to strip it in Phase 1. It's the foundation everything else depends on.

4. **No render-blocking scripts in `<head>`**: The current `theme.liquid` structure is correct — `view-transitions.js` is the only potentially blocking script, and only when the settings enable it.

5. **Images via Shopify CDN with width parameters**: Use `image_url: width: N` on all images. Shopify CDN auto-compresses and delivers WebP where supported.

6. **Lighthouse LCP target context**: LCP < 3s on mobile (simulated 4G in Lighthouse). With the CDN, optimized images, and deferred JS, this is achievable for a skeleton with minimal content.

---

## Open Questions

1. **Homepage template strategy: single skeleton section vs. keeping all spellbound-* sections**
   - What we know: `index.json` currently references 8 `spellbound-*` custom sections; all exist as `.liquid` files; some have custom JS
   - What's unclear: Whether keeping all 8 sections in the template (even as stubs) is needed for Alison to use the theme editor during Phase 1, or whether a single `spellbound-homepage` section is sufficient
   - Recommendation: Replace `index.json` content with a single minimal `spellbound-homepage` section that renders cleanly. The full section architecture returns in Phase 3.

2. **view-transitions.js blocking setting value**
   - What we know: `scripts.liquid` conditionally adds `blocking="render"` based on two theme settings
   - What's unclear: The current values of `page_transition_enabled` and `transition_to_main_product` in `settings_data.json` were not read during research (file is large)
   - Recommendation: As a task, read `config/settings_data.json` and check these two values. If true, disable as part of Phase 1 performance work.

3. **Spellbound sections with active JS — error risk**
   - What we know: `spellbound-oracle.js`, `spellbound-wishlist.js`, and other spellbound JS files are loaded by sections; if the section is removed from a template but JS is still loading globally, it may throw errors
   - What's unclear: Which spellbound JS files are loaded via section `<script>` tags (lazy, only when section is on page) vs. loaded globally via `scripts.liquid`
   - Recommendation: As a task, audit each `spellbound-*.liquid` section to confirm it loads its JS locally (via `{{ 'spellbound-feature.js' | asset_url | script_tag }}`), not globally. The spellbound JS files are not currently referenced in `scripts.liquid`, which suggests they are section-local — confirm this.

---

## Validation Architecture

Phase 1 is a Shopify Liquid theme — there is no automated test infrastructure and none is expected. Shopify themes are validated through browser-based verification against a live development store.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — Shopify theme CLI provides development server |
| Config file | None required |
| Quick run command | `shopify theme dev --store totally-spellbound-2.myshopify.com` |
| Full verification | Manual browser check across all core page URLs |

### Phase Requirements — Verification Map

| Req ID | Behavior | Test Type | Verification Method |
|--------|----------|-----------|---------------------|
| FOUND-01 | All core pages render without errors | Manual / visual | Visit `/`, `/products/*`, `/collections/*`, `/cart`, `/search`, `/pages/*`, non-existent URL |
| FOUND-02 | Sections configurable in theme editor | Manual / visual | Open Shopify admin > Online Store > Customize — check all pages have editable sections |
| FOUND-03 | Mobile-responsive layout | Manual / visual | Chrome DevTools mobile emulation on each core page; no horizontal scroll |
| FOUND-04 | LCP < 3s on mobile | Lighthouse audit | Run Lighthouse on homepage with mobile preset; check LCP score |

### Wave 0 Gaps

No automated test files required. The verification tooling is the Shopify theme dev server and browser dev tools.

Shopify CLI must be installed and authenticated:
```bash
shopify auth login --store totally-spellbound-2.myshopify.com
shopify theme dev
```

---

## Sources

### Primary (HIGH confidence)
- Direct code inspection: `layout/theme.liquid` — document shell structure, inline script, section group rendering
- Direct code inspection: `snippets/scripts.liquid` — import map, global JS module loading, Theme global object
- Direct code inspection: `snippets/stylesheets.liquid` — CSS loading: `overflow-list.css` + `base.css`
- Direct code inspection: `templates/index.json`, `product.json`, `collection.json`, `cart.json`, `search.json`, `page.json`, `404.json` — current template section wiring
- Direct code inspection: `sections/header-group.json` — header section group with announcement bar + header section
- Direct code inspection: `assets/spellbound-custom.css` — 178 lines of custom utility CSS
- Direct code inspection: `.planning/codebase/ARCHITECTURE.md`, `STRUCTURE.md`, `STACK.md`, `CONVENTIONS.md`, `CONCERNS.md` — codebase analysis documents

### Secondary (MEDIUM confidence)
- Shopify documentation pattern recognition: section/block schema requirements, template JSON structure, `content_for_layout`, `sections` tag behaviour — consistent with Shopify's documented theme architecture

### Tertiary (LOW confidence)
- Performance targets: LCP < 3s on mobile — based on requirement FOUND-04 and general Shopify performance guidance; actual Lighthouse baseline not yet measured

---

## Metadata

**Confidence breakdown:**
- What to preserve vs. replace: HIGH — based on direct code inspection of all key files
- Skeleton section patterns: HIGH — patterns extracted from working existing sections
- Performance actions: MEDIUM — based on code inspection; actual impact requires Lighthouse measurement
- JS audit (which modules are safe to conditionalize): MEDIUM — import map and module structure inspected; runtime dependency graph not fully traced

**Research date:** 2026-03-22
**Valid until:** 2026-06-22 (Shopify theme architecture is stable; check for CLI/API changes if longer)
