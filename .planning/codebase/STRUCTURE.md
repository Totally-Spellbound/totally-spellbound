# Codebase Structure

**Analysis Date:** 2026-03-22

## Directory Layout

```
totally-spellbound/
├── layout/                    # Global page templates
│   ├── theme.liquid          # Main document shell (all pages)
│   └── password.liquid        # Password-protected store page
├── templates/                 # Page type definitions
│   ├── index.json            # Homepage
│   ├── product.json          # Product detail
│   ├── collection.json       # Collection listing
│   ├── article.json          # Blog post
│   ├── blog.json             # Blog listing
│   ├── page.json             # Static page
│   ├── page.contact.json     # Contact page
│   ├── cart.json             # Shopping cart
│   ├── search.json           # Search results
│   ├── 404.json              # 404 page
│   ├── gift_card.liquid      # Gift card display
│   ├── password.json         # Password page
│   ├── list-collections.json # All collections
│   └── (other variants)
├── sections/                  # Reusable content modules (56 files)
│   ├── header-group.json     # Header section group definition
│   ├── footer-group.json     # Footer section group definition
│   ├── header.liquid         # Header section
│   ├── footer.liquid         # Footer section
│   ├── hero.liquid           # Hero/banner section
│   ├── featured-product.liquid
│   ├── featured-blog-posts.liquid
│   ├── collection-list.liquid
│   ├── slideshow.liquid
│   ├── carousel.liquid
│   ├── media-with-content.liquid
│   ├── main-product.liquid
│   ├── main-collection.liquid
│   ├── main-blog-post.liquid
│   ├── main-blog.liquid
│   ├── main-cart.liquid
│   ├── main-page.liquid
│   ├── main-404.liquid
│   ├── main-collection-list.liquid
│   ├── spellbound-*.liquid   # Theme-specific sections
│   │   ├── spellbound-oracle.liquid
│   │   ├── spellbound-product-lore.liquid
│   │   ├── spellbound-product-nav.liquid
│   │   ├── spellbound-product-extras.liquid
│   │   ├── spellbound-chakra-attunement.liquid
│   │   └── (others)
│   ├── divider.liquid
│   ├── custom-liquid.liquid
│   └── (additional sections)
├── blocks/                    # UI component blocks (96 files)
│   ├── _header-logo.liquid   # Header logo block
│   ├── _header-menu.liquid   # Header navigation menu
│   ├── _announcement.liquid  # Announcement bar item
│   ├── _card.liquid          # Generic card wrapper
│   ├── _collection-card.liquid
│   ├── _featured-product.liquid
│   ├── _blog-post-card.liquid
│   ├── _product-card.liquid
│   ├── _image.liquid
│   ├── _carousel-content.liquid
│   ├── _featured-blog-posts-*.liquid
│   ├── _footer-*.liquid
│   ├── _media.liquid
│   ├── _content.liquid
│   ├── _divider.liquid
│   └── (additional blocks)
├── snippets/                  # Reusable Liquid partials (94 files)
│   ├── meta-tags.liquid      # SEO and social meta tags
│   ├── stylesheets.liquid    # CSS loading
│   ├── fonts.liquid          # Font declarations
│   ├── scripts.liquid        # JS loading and initialization
│   ├── color-schemes.liquid  # Theme color CSS variables
│   ├── theme-styles-variables.liquid
│   ├── theme-editor.liquid
│   ├── header-*.liquid       # Header utilities
│   │   ├── header-actions.liquid
│   │   ├── header-row.liquid
│   │   ├── header-drawer.liquid
│   │   └── header-logo.liquid
│   ├── search*.liquid        # Search components
│   │   ├── search.liquid
│   │   ├── search-modal.liquid
│   │   └── predictive-search-empty.liquid
│   ├── cart-*.liquid         # Cart components
│   │   ├── cart-bubble.liquid
│   │   ├── cart-products.liquid
│   │   ├── cart-summary.liquid
│   │   └── cart-note.liquid
│   ├── button.liquid         # Button component
│   ├── icon.liquid           # Icon wrapper
│   ├── media.liquid          # Image/video wrapper
│   ├── image.liquid
│   ├── link-*.liquid         # Link utilities
│   ├── format-price.liquid   # Price formatting
│   ├── gap-style.liquid
│   ├── divider.liquid
│   ├── group.liquid          # Layout group
│   ├── filter-*.liquid       # Search/filter components
│   ├── localization-form.liquid
│   ├── quick-add-modal.liquid
│   ├── gift-card-recipient-form.liquid
│   └── (additional utilities)
├── assets/                    # Static resources and JS modules (120+ files)
│   ├── --- JavaScript (core) ---
│   ├── component.js          # Base Component class
│   ├── utilities.js          # Helper functions (debounce, clamp, requestIdleCallback, etc.)
│   ├── events.js             # Custom event definitions
│   ├── --- JavaScript (features) ---
│   ├── header.js
│   ├── header-drawer.js
│   ├── header-menu.js
│   ├── cart-drawer.js
│   ├── cart-icon.js
│   ├── cart-discount.js
│   ├── cart-note.js
│   ├── component-cart-items.js
│   ├── component-cart-quantity-selector.js
│   ├── component-quantity-selector.js
│   ├── search-modal.js
│   ├── dialog.js
│   ├── announcement-bar.js
│   ├── facets.js             # Collection filtering
│   ├── comparison-slider.js
│   ├── drag-zoom-wrapper.js  # Image zoom/drag
│   ├── floating-panel.js
│   ├── accordion-custom.js
│   ├── auto-close-details.js
│   ├── blog-posts-list.js
│   ├── paginated-list.js
│   ├── collection-links.js
│   ├── scrolling.js          # Scroller class
│   ├── focus.js              # Focus management
│   ├── copy-to-clipboard.js
│   ├── anchored-popover.js
│   ├── gift-card-recipient-form.js
│   ├── --- JavaScript (spellbound-specific) ---
│   ├── spellbound-oracle.js  # Oracle tool interactivity
│   ├── spellbound-*.js       # Other Spellbound features
│   ├── --- CSS ---
│   ├── base.css              # Global styles
│   ├── spellbound-custom.css # Theme customizations
│   ├── --- Icons (SVG) ---
│   ├── icon-*.svg            # 40+ icon files
│   ├── --- Type Definitions ---
│   ├── global.d.ts           # TypeScript declarations
│   └── jsconfig.json         # JS config with @theme/* alias
├── config/                    # Theme settings
│   ├── settings_schema.json  # Editable theme settings definition
│   │                         # Colors, fonts, logo, spacing, etc.
│   └── settings_data.json    # Current theme settings values
├── locales/                   # Translations (53 files)
│   ├── en.json               # English strings
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   ├── ja.json
│   └── (other languages)
├── .vscode/                   # VS Code settings
├── .cursor/                   # Cursor IDE settings
├── .planning/                 # Project planning
│   └── codebase/             # Architecture documentation
├── package.json              # NPM metadata (Shopify CLI, @shopify/theme)
├── README.md                 # Setup and development guide
├── LICENSE.md
└── release-notes.md
```

## Directory Purposes

**layout/:**
- Purpose: Global document structure templates
- Contains: HTML boilerplate, header/footer groups, main content insertion
- Key files: `theme.liquid` (primary), `password.liquid`
- Scope: Wraps all pages

**templates/:**
- Purpose: Page type routing and top-level composition
- Contains: JSON definitions of sections to render for each page type
- Key files: `index.json`, `product.json`, `collection.json`, `article.json`
- Pattern: One template per page type (product, blog post, homepage, etc.)

**sections/:**
- Purpose: Reusable, themeable content modules
- Contains: 50+ Liquid sections, both framework (header, footer, main-*) and custom (spellbound-*)
- Key files:
  - Framework: `header.liquid`, `footer.liquid`, `featured-product.liquid`
  - Custom: `spellbound-oracle.liquid`, `spellbound-product-lore.liquid`
  - Main page content: `main-product.liquid`, `main-collection.liquid`, `main-blog.liquid`
- Pattern: Each section has optional `.json` config; renders blocks via `content_for 'block'`

**blocks/:**
- Purpose: Granular UI components that live within sections
- Contains: 96 reusable block templates (prefixed with `_`)
- Key files:
  - Header: `_header-logo.liquid`, `_header-menu.liquid`
  - Cards: `_card.liquid`, `_collection-card.liquid`, `_featured-product.liquid`
  - Media: `_image.liquid`, `_media.liquid`
- Pattern: Blocks are selected/configured in section JSON; Liquid renders them

**snippets/:**
- Purpose: Shared utilities and partial templates
- Contains: 94 Liquid snippets for reusable functionality
- Categories:
  - Infrastructure: `meta-tags.liquid`, `stylesheets.liquid`, `fonts.liquid`, `scripts.liquid`, `color-schemes.liquid`
  - Header components: `header-actions.liquid`, `header-drawer.liquid`, `header-row.liquid`
  - Cart utilities: `cart-bubble.liquid`, `cart-products.liquid`, `cart-summary.liquid`
  - Search: `search.liquid`, `search-modal.liquid`, `quick-add-modal.liquid`
  - UI components: `button.liquid`, `icon.liquid`, `media.liquid`, `divider.liquid`
  - Layout: `group.liquid`, `gap-style.liquid`
- Pattern: Included via `{% include 'snippet-name' %}`; accepts parameters

**assets/:**
- Purpose: Static resources and client-side behavior
- Contains: JavaScript modules, CSS, SVG icons
- JavaScript organization:
  - Base: `component.js` (class inheritance), `utilities.js` (helpers), `events.js` (event system)
  - Feature modules: `header.js`, `cart-drawer.js`, `facets.js`, `dialog.js`, etc.
  - Spellbound-specific: `spellbound-oracle.js`, `spellbound-*.js`
- CSS: `base.css` (global), `spellbound-custom.css` (overrides)
- Icons: SVG files for cart, menu, close, arrows, etc.
- Loading: Lazy-loaded via `{{ 'filename.js' | asset_url | script_tag }}`

**config/:**
- Purpose: Theme configuration and localization
- Contains: JSON settings schema and current settings
- Key files:
  - `settings_schema.json` - Defines editable theme settings (colors, fonts, logo height, etc.)
  - `settings_data.json` - Current values for those settings
- Accessibility: Via `settings.*` Liquid variables throughout theme

**locales/:**
- Purpose: Multi-language string management
- Contains: 53 JSON files with translated strings
- Key files: `en.json`, `es.json`, `fr.json`, etc.
- Usage: Referenced in Liquid via `t:key.path` syntax (e.g., `t:names.header`)

## Key File Locations

**Entry Points:**
- `layout/theme.liquid` - Main document shell; loaded on every page
- `templates/index.json` - Homepage template
- `templates/product.json` - Product page template
- `templates/collection.json` - Collection page template

**Configuration:**
- `config/settings_schema.json` - Theme editor UI definition
- `config/settings_data.json` - Current theme settings
- `assets/jsconfig.json` - JS import path aliases (@theme/*)
- `package.json` - Project metadata and Shopify CLI config

**Core Logic:**
- `assets/component.js` - Base class for interactive components
- `assets/utilities.js` - Shared helpers (debounce, clamp, requestIdleCallback, View Transitions)
- `assets/events.js` - Custom event system (CartUpdateEvent, DialogOpenEvent, etc.)
- `assets/header.js` - Header interactivity and responsive behavior

**Cart System:**
- `assets/cart-drawer.js` - Cart overlay component
- `assets/cart-icon.js` - Cart icon with badge
- `assets/component-cart-items.js` - Cart items list
- `snippets/cart-products.liquid` - Cart item rendering
- `snippets/cart-summary.liquid` - Cart total and checkout button

**Header/Navigation:**
- `sections/header.liquid` - Header section wrapper
- `sections/header-group.json` - Header region definition
- `assets/header.js` - Header behavior (sticky, transparent, responsive)
- `snippets/header-actions.liquid` - Search, account, localization buttons

**Search:**
- `snippets/search.liquid` - Search form
- `snippets/search-modal.liquid` - Search overlay
- `assets/search-modal.js` - Search modal behavior
- `sections/search-header.liquid` - Search results header
- `snippets/predictive-search-*.liquid` - Autocomplete variants

**Collection/Filtering:**
- `sections/main-collection.liquid` - Collection page structure
- `assets/facets.js` - Product filtering logic
- `snippets/list-filter.liquid` - Filter UI

**Spellbound Theme Features:**
- `sections/spellbound-oracle.liquid` - Interactive oracle tool
- `assets/spellbound-oracle.js` - Oracle interactivity
- `sections/spellbound-product-lore.liquid` - Product lore/celestial correspondence
- `sections/spellbound-product-nav.liquid` - Custom product navigation
- `sections/spellbound-chakra-attunement.liquid` - Chakra/energy alignment feature
- `sections/spellbound-product-extras.liquid` - Product custom tabs

**Testing:**
- No test files present in repository

## Naming Conventions

**Files:**

- **Sections:** kebab-case.liquid (e.g., `featured-product.liquid`, `spellbound-oracle.liquid`)
- **Blocks:** kebab-case with leading underscore.liquid (e.g., `_header-logo.liquid`, `_card.liquid`)
- **Snippets:** kebab-case.liquid (e.g., `header-actions.liquid`, `cart-products.liquid`)
- **JavaScript:** kebab-case.js (e.g., `header-menu.js`, `cart-drawer.js`, `component.js`)
- **CSS:** kebab-case.css (e.g., `base.css`, `spellbound-custom.css`)
- **SVG Icons:** icon-name.svg (e.g., `icon-cart.svg`, `icon-menu.svg`)
- **Templates:** page-type.json (e.g., `product.json`, `blog.json`) or page.variant.json (e.g., `page.contact.json`)
- **Configuration:** settings_*.json (e.g., `settings_schema.json`, `settings_data.json`)
- **Locales:** language-code.json (e.g., `en.json`, `es.json`)

**Directories:**

- Framework standard: lowercase plural (e.g., `sections/`, `blocks/`, `snippets/`, `assets/`, `layouts/`, `templates/`, `locales/`, `config/`)
- Spellbound customizations: prefixed with `spellbound-` in section/asset names (e.g., `spellbound-oracle.liquid`)

**Liquid Variables:**

- Settings: `settings.setting_name` (camelCase from JSON key with underscores, e.g., `settings.logo_height`)
- Section settings: `section.settings.property_name`
- Block settings: Block settings accessed via `block.settings.property_name`
- Captures and assigns: snake_case (e.g., `assign logo_height = 36`)

**JavaScript:**

- Classes: PascalCase (e.g., `Component`, `CartDrawer`, `DialogComponent`, `AnchoredPopoverComponent`)
- Functions: camelCase (e.g., `debounce()`, `requestIdleCallback()`, `supportsViewTransitions()`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_WIDTH`, `BREAKPOINT_MOBILE`)
- Event classes: PascalCase + "Event" suffix (e.g., `CartAddEvent`, `DialogOpenEvent`)
- Private methods: prefixed with `#` (e.g., `#initialize()`, `#handleClick()`)

## Where to Add New Code

**New Feature Section:**
- Primary code: `sections/spellbound-feature-name.liquid`
- JavaScript behavior (if interactive): `assets/spellbound-feature-name.js`
- Styles (if custom): Inline `<style>` block in section or add to `assets/spellbound-custom.css`
- Configuration: Add block/setting definitions to section JSON or use `settings_schema.json` for theme-wide settings
- Testing: Currently no test infrastructure; unit tests should go in `tests/` (to be created)

**New Block (UI Component):**
- Implementation: `blocks/_component-name.liquid`
- Register in parent section's JSON config (e.g., in `sections/header.json`)
- Pattern: Blocks are always prefixed with underscore and called via `content_for 'block'` in parent section
- Styling: Use CSS classes matching block name (e.g., `component-name__element`)

**New Snippet (Utility/Partial):**
- Implementation: `snippets/feature-name.liquid` or `snippets/utility-name.liquid`
- Include in parent sections: `{% include 'feature-name' %}`
- Accept parameters: `{% include 'feature-name' with product: product, size: 'large' %}`

**New Utility Function (JavaScript):**
- Core utilities: Add to `assets/utilities.js`
- Feature-specific: Create new file `assets/feature-name.js` and import via `@theme/feature-name`
- Pattern: Use ES6 modules with named/default exports
- jsconfig.json alias: `@theme/*` maps to root `/` (e.g., `@theme/utilities` → `assets/utilities.js`)

**New Setting (Theme Customization):**
- Define in: `config/settings_schema.json` (theme-wide) or section JSON (section-specific)
- Access in Liquid: `settings.setting_key` or `section.settings.setting_key`
- Example structure:
  ```json
  {
    "type": "color",
    "id": "primary_color",
    "label": "Primary Color",
    "default": "#000000"
  }
  ```

**New Translation String:**
- Add to: `locales/en.json` and all other language files
- Reference in Liquid: `{{ 't:namespace.key' | capitalize }}`
- Structure: Use dot notation for nested keys (e.g., `"names.logo_and_favicon"`)

**New Icon:**
- Add SVG file: `assets/icon-name.svg`
- Include in sections: `{% include 'icon' with icon: 'name' %}`
- Rendering: Via `snippets/icon.liquid` (filters and renders SVG)

## Special Directories

**`.planning/`:**
- Purpose: Project planning and documentation
- Generated: No; manually created
- Committed: Yes
- Contents: Architecture, structure, and other codebase analysis documents
- Subdirectory: `.planning/codebase/` - ARCHITECTURE.md, STRUCTURE.md, etc.

**`.vscode/`:**
- Purpose: VS Code editor settings and extensions
- Generated: Yes; created by IDE
- Committed: Yes (shared config)
- Contents: Language modes, formatting, extensions recommendations

**`.cursor/`:**
- Purpose: Cursor IDE configuration
- Generated: Manually created
- Committed: Yes
- Contents: Custom rules for AI-assisted development

**`node_modules/` (if created):**
- Purpose: NPM dependencies
- Generated: Yes; `npm install`
- Committed: No (.gitignore)
- Contains: Shopify CLI, theme tools

---

*Structure analysis: 2026-03-22*
