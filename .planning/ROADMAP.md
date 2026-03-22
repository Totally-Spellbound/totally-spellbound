# Roadmap: Totally Spellbound

**Created:** 2026-03-22
**Milestone:** v1 — SLC (Simple, Lovable, Complete)
**Core Value:** A thoughtful, independent e-commerce experience that gently guides customers to the right products.

## Phase Overview

| Phase | Name | Goal | Requirements |
|-------|------|------|-------------|
| 1 | Foundation Skeleton | Clean, structured base for all core pages | FOUND-01 → FOUND-04 |
| 2 | Design System | Dark palette, typography, components — the visual identity | DSGN-01 → DSGN-05 |
| 3 | Homepage Experience | The first impression — hero, animations, star sign entry, indie messaging | HOME-01 → HOME-07 |
| 4 | Smart Search | Prominent, instant, helpful search with suggestions | SRCH-01 → SRCH-04 |
| 5 | Products & Collections | Product pages, collection pages, star sign curation | PROD-01 → PROD-05, COLL-01 → COLL-04 |
| 6 | Cart & Checkout Polish | Themed cart, shipping tiers, "Your Cauldron" | CART-01 → CART-03 |
| 7 | Events Page | Craft fairs and lives — visual timeline, admin-editable | EVNT-01 → EVNT-03 |

---

## Phase 1: Foundation Skeleton

**Goal:** Strip back existing theme to a clean, well-structured skeleton. All core pages render with correct Shopify wiring (sections, blocks, templates) but minimal styling. This is the bones everything else builds on.

**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04

**Plans:** 2 plans

Plans:
- [ ] 01-01-PLAN.md — Homepage skeleton section + tech debt cleanup
- [ ] 01-02-PLAN.md — JS performance optimization + responsive CSS + verification

**What gets built:**
- Clean layout template (theme.liquid) with proper head/body structure
- Skeleton templates for: index, product, collection, cart, search, page, 404
- Header section with navigation (minimal styling, correct structure)
- Footer section with basic info
- Section/block architecture that works with Shopify theme editor
- Mobile-first responsive grid foundation
- Asset pipeline cleanup — remove unused CSS/JS from previous theme
- Performance baseline: fast load, no render-blocking assets

**Success criteria:**
- All core pages render cleanly with structured content
- Sections are configurable via Shopify admin theme editor
- Page loads < 3s LCP on mobile (Lighthouse)
- No visual design applied yet — this is raw structure

**Dependencies:** None — this is the starting point

---

## Phase 2: Design System

**Goal:** Build the visual identity layer on top of the skeleton. Dark palette, typography, component styles. After this phase, the site should *look* like Totally Spellbound even without content.

**Requirements:** DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05

**What gets built:**
- CSS custom properties for color palette (dark base, purple/violet accents, warm gold, off-white text)
- Light/dark theme toggle with localStorage persistence
- Typography system: serif display font for headings, clean sans-serif body
- Button styles ("Add to Cauldron" primary, secondary, ghost variants)
- Card component styles (product cards, collection cards, info cards)
- Input/form styles matching the dark palette
- Spacing and layout tokens
- Transition/animation utility classes (fade-in, float-up, glow)

**Success criteria:**
- Dark theme looks intentional, not cheap — passes visual review
- Light theme is readable and cohesive
- Toggle works and persists across page loads
- Typography hierarchy is clear and readable (Alison's readability requirement)
- Components feel handmade, not template

**Dependencies:** Phase 1 (skeleton structure exists)

---

## Phase 3: Homepage Experience

**Goal:** The homepage is the first impression. It should feel immersive, animated, and curated — like entering a world, not browsing a catalog.

**Requirements:** HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, HOME-07

**What gets built:**
- Hero section with cursor-reactive effect (subtle glow/parallax, NOT annoying — Alison's bat-cursor warning)
- Featured products in bento-style varied cards (not a uniform grid)
- "Shop by Star Sign" visual entry point — 12 signs as interactive cards or wheel
- "Proudly Independent" section — Alison's story, supporting a real person
- "Visit Our Shop" section — Altram Street, Sutton-in-Ashfield, personality-driven
- Scroll-triggered reveal animations (sections fade/float in)
- Search bar prominently placed in header area

**Success criteria:**
- Homepage has visible motion/interaction on load
- Cursor effects work on desktop, gracefully degrade on mobile
- Star sign entry point is visually compelling and clickable
- Independent messaging feels genuine, not corporate
- Scroll reveals work smoothly without janking
- Mobile layout works and feels good

**Dependencies:** Phase 2 (design system applied)

---

## Phase 4: Smart Search

**Goal:** A prominent, instant search experience where typing gives you results immediately — products, categories, and gentle suggestions.

**Requirements:** SRCH-01, SRCH-02, SRCH-03, SRCH-04

**What gets built:**
- Redesigned search UI — modal/overlay that feels immersive (not a tiny dropdown)
- Shopify Predictive Search API integration for instant results
- Search results show: product image, name, price, collection/category
- "You might also like" suggestions alongside results (using Shopify product recommendations API)
- Search works across product titles, descriptions, tags, and types
- Keyboard accessible, mobile-friendly

**Success criteria:**
- Results appear as you type (< 300ms perceived delay)
- Product images and prices visible in results
- At least one "you might also like" suggestion appears per search
- Works smoothly on mobile
- Search overlay matches dark design system

**Dependencies:** Phase 2 (design system), Phase 1 (skeleton)

---

## Phase 5: Products & Collections

**Goal:** Product pages that tell a story (not just show a price), and collection pages that feel curated — especially the star sign collections.

**Requirements:** PROD-01 → PROD-05, COLL-01 → COLL-04

**What gets built:**
- Product page redesign: large imagery, "Add to Cauldron" button with feedback animation
- Crystal properties section on product pages (what it's for, how to use, care tips)
- "Goes well with" complementary product suggestions (Shopify recommendations API)
- Custom/personalised product support (order notes for engraving requests)
- Star sign collection pages with curated intro text and themed presentation
- Category collection pages with filter/sort
- Collection card design matching bento-style from homepage

**Success criteria:**
- Product pages feel informative, not just transactional
- "Add to Cauldron" has a satisfying visual/haptic response
- Complementary suggestions appear and feel helpful (not salesy)
- Star sign collections feel curated and special (not just a filtered list)
- Custom product flow is clear — customer knows how to request personalisation

**Dependencies:** Phase 2 (design system), Phase 3 (homepage cards establish visual language)

---

## Phase 6: Cart & Checkout Polish

**Goal:** Cart page matches the theme identity. Clear shipping info. The journey from browse to buy feels cohesive.

**Requirements:** CART-01, CART-02, CART-03

**What gets built:**
- Cart page styled as "Your Cauldron" — matching dark design system
- Shipping tiers clearly displayed (£2.50 / £4.50 / free over £30)
- Cart icon in header with animated item count badge
- Remove/update quantity controls styled consistently
- Cart → Checkout transition feels smooth

**Success criteria:**
- Cart page doesn't break the immersion (no default Shopify white page)
- Shipping costs are clear before checkout
- Cart count updates immediately when products are added
- Mobile cart experience works well

**Dependencies:** Phase 2 (design system), Phase 5 (product pages feed into cart)

---

## Phase 7: Events Page

**Goal:** A dedicated page for craft fairs, live sessions, and markets — presented as a visual timeline, not a boring list. Admin-editable so Alison can update without code.

**Requirements:** EVNT-01, EVNT-02, EVNT-03

**What gets built:**
- Events page using a custom Shopify section with repeatable blocks
- Visual timeline or flowing layout (scroll-animated event cards along a path/line)
- Each event: date, location, description, optional link
- Past events auto-dim or move to a "past" section
- Admin can add/edit/remove events via Shopify theme editor (no code needed)

**Success criteria:**
- Events page matches the dark design system
- Timeline feels designed and intentional (not a plain list)
- Alison can add a new event via theme editor in under 2 minutes
- Scroll animations work on the timeline
- Mobile layout is usable

**Dependencies:** Phase 2 (design system), Phase 3 (scroll animation patterns)

---

## Post-v1 Roadmap (v2)

After SLC is live and generating sales:

1. **AI Oracle** — Conversational crystal advisor with Alison's knowledge
2. **Celestial Integration** — Moon phases, planetary events, seasonal content
3. **Educational Resources** — Crystal guides, star sign guides, blog
4. **Enhanced Personalisation** — Custom order showcase, gallery, request forms
5. **Loyalty Program** — Requires customer accounts
6. **Subscription/Mystery Boxes** — Curated monthly boxes

---
*Roadmap created: 2026-03-22*
*Last updated: 2026-03-22 after phase 1 planning*
