# Technology Stack

**Analysis Date:** 2026-03-22

## Languages

**Primary:**
- Liquid - Shopify's templating language for theme development
- JavaScript (ES6+) - Client-side scripting
- CSS - Stylesheet language for theme styling

**Secondary:**
- JSON - Configuration and localization files
- HTML - Semantic markup (generated via Liquid templates)

## Runtime

**Environment:**
- Node.js v18+ - Required for Shopify CLI and theme development tools
- Ruby - Required by Shopify CLI for theme management

**Package Manager:**
- npm - JavaScript package management
- Lockfile: Not present (minimal dependencies)

## Frameworks

**Core:**
- Shopify Hydrogen-like patterns - Theme architecture uses Shopify's Horizon theme foundation
- Web Components - Native custom elements for interactive features
- ES6 Modules - Import/export module system for JavaScript

**Build/Dev:**
- Shopify Theme CLI - Official theme development and deployment tool
- Shopify Theme Dev Server - Hot reload development environment running on `http://127.0.0.1:9292`

## Key Dependencies

**Framework:**
- `@shopify/cli` - Command-line interface for Shopify theme development
- `@shopify/theme` - Theme-specific CLI tools

**Theme Assets:**
- No npm package dependencies listed in `package.json` - all theme logic is Liquid-based and vanilla JavaScript
- Custom theme modules loaded via import map in `snippets/scripts.liquid`

## Configuration

**Environment:**
- Store: `totally-spellbound-2.myshopify.com`
- Theme configuration via Shopify admin UI and version control

**Build:**
- `package.json` - Minimal npm configuration
- `config/settings_schema.json` - Theme customization settings (~54KB)
- `config/settings_data.json` - Current theme settings and configuration state

**Theme Files:**
- `layout/theme.liquid` - Main HTML layout template with header/footer groups
- `layout/password.liquid` - Password-protected store layout
- Asset import map defined in `snippets/scripts.liquid` with @theme/* aliases

## Platform Requirements

**Development:**
- Node.js v18 or higher
- Ruby (for Shopify CLI)
- Git for version control
- macOS/Linux/Windows with shell access

**Production:**
- Shopify Plus or standard Shopify storefront
- Deployed as a theme to `totally-spellbound-2.myshopify.com`
- Deployment via Shopify CLI commands

## Asset Pipeline

**CSS:**
- `assets/base.css` (~123KB) - Main stylesheet
- `assets/spellbound-custom.css` - Custom branding styles
- Style variables and color schemes rendered via Liquid

**JavaScript Modules:**
- 100+ modular JavaScript files in `assets/` directory
- Module aliases: `@theme/component`, `@theme/utilities`, `@theme/dialog`, etc.
- Hot module loading during development

**Static Assets:**
- SVG icons: `assets/icon-*.svg` (cart, account, chevron, etc.)
- Image handling via Shopify's CDN with responsive image filters

---

*Stack analysis: 2026-03-22*
