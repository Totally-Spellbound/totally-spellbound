# Architecture

**Analysis Date:** 2026-03-22

## Pattern Overview

**Overall:** Shopify Liquid Theme Architecture (Template-driven, Component-based)

**Key Characteristics:**
- Server-side Liquid templating with hybrid JavaScript interactivity
- Shopify section/block system for theme editor customization
- Asset pipeline with CSS, JavaScript, and SVG modules
- Hierarchical layout system (layout → template → section → snippet → block)
- Real-time configuration through JSON schema settings

## Layers

**Layout Layer:**
- Purpose: Global HTML structure and document shell (head/body setup, script initialization)
- Location: `layout/theme.liquid`, `layout/password.liquid`
- Contains: Meta tags, stylesheets, fonts, scripts, header/footer groups, main content area
- Depends on: Snippets (`meta-tags`, `stylesheets`, `fonts`, `scripts`), section groups
- Used by: All templates; foundational for every page

**Section Groups Layer:**
- Purpose: Organize sections into logical regions (header-group, footer-group)
- Location: `sections/header-group.json`, `sections/footer-group.json`
- Contains: Section definitions with nested blocks and settings
- Depends on: Individual sections and blocks
- Used by: Layout layer, section renderer system

**Template Layer:**
- Purpose: Page type definitions (home, product, collection, article, etc.)
- Location: `templates/` (JSON: `index.json`, `product.json`, `collection.json`, etc.)
- Contains: Page-specific sections and their configuration
- Depends on: Sections for content rendering
- Used by: Shopify routing; defines what appears on each page type

**Section Layer:**
- Purpose: Reusable, themed content modules (hero, product cards, collections, etc.)
- Location: `sections/` (50+ `.liquid` and `.json` files)
- Examples: `hero.liquid`, `spellbound-oracle.liquid`, `spellbound-product-lore.liquid`, `header.liquid`, `footer.liquid`, `featured-product.liquid`
- Contains: Liquid markup, inline styles, block definitions, settings schema
- Depends on: Snippets, blocks, assets (CSS/JS)
- Used by: Templates and other sections (via includes)

**Block Layer:**
- Purpose: Granular UI components within sections (announcement rows, menu items, etc.)
- Location: `blocks/` (96 component files)
- Examples: `_header-logo.liquid`, `_header-menu.liquid`, `_announcement.liquid`, `_card.liquid`, `_collection-card.liquid`, `_featured-product.liquid`
- Contains: Reusable Liquid markup fragments with conditional rendering
- Depends on: Snippets, global styles
- Used by: Sections (rendered via `content_for` blocks system)

**Snippet Layer:**
- Purpose: Utility functions and shared partial templates
- Location: `snippets/` (94 files)
- Examples: `meta-tags.liquid`, `stylesheets.liquid`, `fonts.liquid`, `color-schemes.liquid`, `header-actions.liquid`, `search.liquid`, `button.liquid`, `icon.liquid`, `media.liquid`, `cart-products.liquid`
- Contains: Reusable Liquid markup, parameter-driven rendering
- Depends on: Assets, configuration
- Used by: Layouts, sections, blocks

**Asset Layer:**
- Purpose: Static resources and runtime behavior (CSS, JavaScript, images)
- Location: `assets/` (120+ files)
- JavaScript modules:
  - Core: `component.js` (base class), `utilities.js` (helpers), `events.js` (custom events)
  - Features: `cart-drawer.js`, `cart-icon.js`, `comparison-slider.js`, `dialog.js`, `facets.js`, `header.js`, `search-modal.js`
  - Animations: `drag-zoom-wrapper.js`, `scrolling.js`
- CSS: `base.css`, `spellbound-custom.css`, component-specific styles
- SVG icons: 40+ icon files
- Depends on: None
- Used by: Layouts, sections, snippets

**Configuration Layer:**
- Purpose: Theme settings and localization
- Location: `config/settings_schema.json`, `config/settings_data.json`
- Contains: Color schemes, fonts, logo/favicon, spacing, feature toggles
- Depends on: None
- Used by: All layout/section layers via `settings.*` variables

**Localization Layer:**
- Purpose: Multi-language support (53 locale files)
- Location: `locales/` (en.json, es.json, fr.json, etc.)
- Contains: Translated strings referenced in Liquid via `t:key` syntax
- Depends on: None
- Used by: All layers for translatable content

## Data Flow

**Page Render Flow:**

1. User requests URL (e.g., `/products/item`)
2. Shopify routes to appropriate template (e.g., `product.json`)
3. Layout `theme.liquid` loads:
   - Sets up HTML structure
   - Renders header-group sections
   - Inlines header height calculations (prevents layout shift)
   - Renders `{{ content_for_layout }}` (template-specific content)
   - Renders footer-group sections
4. Template (e.g., `product.json`) defines sections to render
5. Each section:
   - Loads its `.liquid` file
   - Executes Liquid logic with `section.settings`
   - Renders `content_for 'block'` calls to include block variants
   - Includes snippets for shared markup
6. Blocks render based on section configuration
7. Assets (CSS, JS) load and execute post-render

**Settings/Configuration Flow:**

1. Theme editor UI driven by `settings_schema.json` (color_schemes, fonts, etc.)
2. User selections stored in `settings_data.json` and Shopify backend
3. Available via `settings.*` Liquid variables throughout theme
4. Example: `{{ settings.logo | image_url: width: 100 }}`

**State Management:**

- **Server-side (Liquid):** Product/collection data, cart contents, customer info (all from Shopify)
- **Client-side (JavaScript):** View state (drawer open/closed, search results, cart drawer), animations, interactivity
- **Custom Events:** `CartAddEvent`, `CartUpdateEvent`, `DiscountUpdateEvent`, `DialogOpenEvent`, `DialogCloseEvent`, `SlideshowSelectEvent` for cross-component communication

## Key Abstractions

**Component System:**
- Purpose: JavaScript class-based organization for interactive elements
- Location: `assets/component.js` (base class)
- Pattern: Extend Component for custom elements (web components)
- Examples: `AnnouncementBar`, `AnchoredPopoverComponent`, `CartDrawer`, `DialogComponent`
- Usage: Automatic initialization via HTML attributes/classes

**Section Renderer:**
- Purpose: Dynamically update sections without full page reload
- Location: `assets/section-renderer.js`
- Pattern: `morphSection()` function updates section DOM
- Used by: Cart updates, discount codes

**View Transitions API:**
- Purpose: Smooth page transitions with visual continuity
- Location: `assets/utilities.js`
- Pattern: `startViewTransition()` wraps navigation callbacks
- Settings: Controlled via `settings.page_transition_enabled`, `settings.transition_to_main_product`
- Includes state preservation for product cards with `view-transition-name`

**Scrolling/Scroller:**
- Purpose: Managed scrolling behavior for carousels
- Location: `assets/scrolling.js`
- Pattern: `Scroller` class with smooth scroll, snap points
- Used by: Product carousels, collection slideshows

**Dialog/Modal System:**
- Purpose: Overlay dialogs (search, quick-add, cart drawer)
- Location: `assets/dialog.js`
- Pattern: `DialogComponent` web component with `DialogOpenEvent`/`DialogCloseEvent`
- Used by: Search modal, quick-add modal, cart drawer

**Header Layout System:**
- Purpose: Calculate and maintain responsive header dimensions
- Location: `assets/header.js`, inline script in `theme.liquid` lines 48-114
- Pattern: CSS custom properties (`--header-height`, `--header-group-height`, `--top-row-height`)
- Handles: Transparent header offset, sticky header, touch device menu style detection
- Synced across: Inline calculations, `utilities.js` functions (`calculateHeaderGroupHeight()`, `updateTransparentHeaderOffset()`)

**Facets/Filtering:**
- Purpose: Product filtering on collection pages
- Location: `assets/facets.js`, `snippets/list-filter.liquid`
- Pattern: Event-driven filter updates with URL management
- Features: Range sliders, checkboxes, sorting

**Cart System:**
- Purpose: Coordinated cart state and UI updates
- Location: `assets/cart-drawer.js`, `assets/cart-icon.js`, `assets/component-cart-items.js`, `assets/component-cart-quantity-selector.js`
- Pattern: Custom events (CartUpdateEvent, CartAddEvent) trigger updates
- Snippets: `cart-products.liquid`, `cart-summary.liquid`, `cart-bubble.liquid`

**Theme Customization (Spellbound-specific):**
- Oracle interactive tool: `sections/spellbound-oracle.liquid`, `assets/spellbound-oracle.js`
- Product lore/celestial correspondence: `sections/spellbound-product-lore.liquid`
- Chakra attunement: `sections/spellbound-chakra-attunement.liquid`
- Product navigation: `sections/spellbound-product-nav.liquid`
- Product extras/tabs: `sections/spellbound-product-extras.liquid`

## Entry Points

**Layout Entry (`theme.liquid`):**
- Location: `layout/theme.liquid`
- Triggers: Every page load
- Responsibilities:
  - Document shell (DOCTYPE, html, head, body)
  - Load meta tags, stylesheets, fonts, scripts
  - Initialize header height CSS variables
  - Render header-group and footer-group sections
  - Provide content_for_layout insertion point

**Template Entry Points:**
- `templates/index.json` - Homepage
- `templates/product.json` - Product detail page
- `templates/collection.json` - Collection listing
- `templates/article.json` - Blog post
- `templates/blog.json` - Blog listing
- `templates/page.json`, `templates/page.contact.json` - Static pages
- `templates/cart.json` - Shopping cart
- `templates/search.json` - Search results
- `templates/404.json` - Not found page

**JavaScript Entry Points:**
- Lazy-loaded via `{{ 'filename.js' | asset_url | script_tag }}`
- Component auto-initialization via class name selectors
- Custom event listeners for inter-component communication

## Error Handling

**Strategy:** Graceful degradation with fallbacks

**Patterns:**
- Conditional rendering based on data existence (`if section.settings.image != blank`)
- View Transitions fallback to instant navigation on unsupported browsers or low-power devices
- Dialog modal fallback to basic form submission
- RequestIdleCallback/requestAnimationFrame fallback chain in `utilities.js`
- Cart update fallback to page reload if Fetch API unavailable
- Responsive design breakpoints prevent layout errors on any screen size

## Cross-Cutting Concerns

**Logging:** Console output via `console.log()` in component classes; no external logging service

**Validation:**
- Liquid-side: Conditional checks on data (if blank, type checks)
- JS-side: Form validation in cart, gift card recipient form, search
- No centralized validation framework; pattern is function-level

**Authentication:**
- Shopify handles user authentication (shop.customer, request.customer)
- Customer account menu in header via `settings.customer_account_menu`
- No custom auth layer; Shopify Staff API used during theme development

**Accessibility:**
- Skip-to-content link in layout
- ARIA roles and labels in modals/dialogs
- Semantic HTML (nav, main, footer)
- Focus management in overlay components
- No centralized a11y library; inline WCAG patterns

**Performance Optimization:**
- CSS custom properties prevent layout shift (header height calc)
- RequestIdleCallback for non-critical tasks
- Content-visibility CSS for off-screen elements
- View Transitions with proper animation blocking
- Section renderer for cart updates (no full page reload)
- Asset preloading via meta tags snippet

**Responsive Design:**
- CSS custom media queries (768px breakpoint common)
- Mobile-specific sections and settings (e.g., `custom_mobile_media` in hero)
- Touch detection for menu style (`'ontouchstart' in window`)
- Grid layouts with clamp() for fluid scaling

---

*Architecture analysis: 2026-03-22*
