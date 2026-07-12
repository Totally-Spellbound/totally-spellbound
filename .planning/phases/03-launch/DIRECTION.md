# TOTALLY SPELLBOUND — LAUNCH DIRECTION (canonical, 2026-07-05)

This document supersedes `.planning/phases/02-design-system/DESIGN.md` (amethyst direction — DROPPED)
and is the single source of truth for the launch build. Owner: lead orchestrator (Fable).
The client approved the ORIGINAL direction: a traditional, easy-to-use e-commerce store with
gothic/witch/astrology character and a warm candlelit-gold accent. We keep that soul and raise
the craft: cinematic imagery, high contrast, subtle premium motion, zero clutter.

## 1. Brand truths (verified facts — use these, never invent)
- Shop: Totally Spellbound, 108 Outram Street, Sutton-in-Ashfield, NG17 4FS, UK.
  (NOT "Altram Street" — that is a typo in older planning docs.)
- Hours: Mon–Sat 10am–4pm, closed Sunday. Owner: Alison — family-run independent shop.
- Email gothicwitches@gmail.com · Phone +44 7380 149004 · facebook.com/totallyspellbound
- Domain: totallyspellbound.co.uk (store: totally-spellbound-2.myshopify.com)
- Shipping (verified in admin): UK only. Standard £4.99 (orders under £50), FREE standard £50+,
  Express £6.99. Pickup in store ("click & collect") is ON and free.
- Catalog: 105 live products, median £7.50, range £1.50–£100. Many one-of-a-kind pieces
  ("This is the exact piece pictured").
- Voice: friendly, wholesome, knowledgeable, never pushy — "a conversation in the shop".
  Witchy-playful commerce strings: Add to Cauldron / Brewing... / Join the Coven / Enter the Vault /
  Return to Vault / Your Cauldron. Tasteful gothic: NO Halloween fonts, NO clipart, no gimmick cursors.
- READABILITY IS A HARD REQUIREMENT. Alison (65) cannot read low-contrast white-on-black.
  Body text ≥ 70% white equivalent. Never ship rgba(255,255,255,0.4) body copy.

## 2. Palette — "Candlelight" tokens
Dark, cinematic, warm. Gold is the ONLY interactive accent. Violet exists solely as an
atmospheric glow inside imagery-driven sections (celestial, chakra, hero vignettes) — never
for text, links, buttons, or borders.

CSS custom properties (defined once in assets/spellbound-custom.css `:root`; ALL spellbound
sections must consume vars, no hardcoded accent hex anywhere):

```css
:root {
  --spellbound-bg: #050505;            /* page base (matches scheme-1) */
  --spellbound-surface: #121014;       /* cards, panels */
  --spellbound-surface-2: #1b181e;     /* raised panels, hovers */
  --spellbound-border: rgba(255,255,255,0.14);
  --spellbound-border-strong: rgba(255,255,255,0.28);
  --spellbound-text: #f5f2ea;          /* warm frost white — headings 100% */
  --spellbound-text-soft: rgba(245,242,234,0.78);  /* body copy — MINIMUM for paragraphs */
  --spellbound-text-faint: rgba(245,242,234,0.55); /* micro-labels/captions only, >=12px */
  --spellbound-gold: #e5a94d;          /* primary accent: labels, active states, links */
  --spellbound-gold-bright: #f7cf8a;   /* hovers, glows, selection */
  --spellbound-gold-deep: rgba(229,169,77,0.45);   /* accent lines, borders */
  --spellbound-gold-glow: rgba(229,169,77,0.18);   /* ambient glows, focus rings */
  --spellbound-violet-glow: rgba(139,109,255,0.16);/* atmosphere ONLY (imagery sections) */
}
```

Horizon scheme-1 (config/settings_data.json, BOTH "current" and "presets.Default"):
- primary: #e5a94d · primary_hover: #f7cf8a
- foreground: #f5f2eac7 (~78%) · foreground_heading: #f5f2ea
- border: #ffffff1f
- primary_button: #f5f2ea bg / #050505 text; hover bg/border #f7cf8a
- secondary_button_hover_text/border: #f7cf8a
- selected_variant hover bg/border: #f7cf8a
- badge_sale_color_scheme: scheme-2 (light — visible) · badge_sold_out_color_scheme: scheme-5
Old amber #f59e0b / #fde68a / rgba(245,158,11,x) must reach ZERO occurrences repo-wide.

## 3. Typography
- Headings: Cormorant (cormorant_n3), accents/italics cormorant_i4. Body/UI: Inter (inter_n4/n6). KEEP.
- Product title on PDP and card titles: heading font (Cormorant), NOT body font.
- Card/product link text colour: --spellbound-text (white), never gold. Prices stay white; gold is reserved for functional badges, active states and links.
- **NO EYEBROWS, KICKERS OR OVERLINES.** Never place a small uppercase, widely tracked line above a heading as decorative hierarchy. It is a generic AI-layout tell and is not part of this brand. If the words add meaning, integrate them into the heading or supporting copy. If they do not, remove them. Functional badges, form labels and status text are allowed only when they convey real information.
- Long italic quotes: Cormorant italic, ≥ --spellbound-text-soft.

## 4. Motion language (subtle, premium — never gimmicky)
- Reveal-on-scroll: IntersectionObserver adds .is-visible → opacity 0→1 + translateY(24px→0),
  600–900ms, cubic-bezier(0.16,1,0.3,1), stagger 60–90ms between siblings. One shared utility in
  spellbound-custom.css + tiny shared script assets/spellbound-motion.js (data-spellbound-reveal).
- Hero: slow Ken Burns (scale 1→1.06 over 14s) + content fade-up.
- Cards: image scale 1.03, 500ms; gold accent line scaleX 0→1; NO grayscale-by-default
  (colour photos always visible — grayscale-to-colour is dropped store-wide for contrast).
- Respect prefers-reduced-motion: disable transforms/animations.
- Touch devices: everything legible without hover; hover is enhancement only.

## 5. Imagery
- Generated assets live in assets/ as spellbound-img-*.jpg (Shopify CDN serves them).
- Sections use image_picker settings with `asset_url` fallback so they render beautifully
  out of the box. Every <img> needs proper alt, width/height, loading (hero eager, rest lazy).
- Style: cinematic candlelit still-life, deep shadow, warm gold rim-light, occasional cool
  violet atmosphere. No text baked into images. No people's faces (uncanny risk).

## 6. Voice & copy bank (use, extend in same register)
- Announcement rotation: "Free UK delivery on orders over £50" · "Free click & collect in
  Sutton-in-Ashfield" · "The veil is thinning — new arrivals weekly"
- Hero opening: H1: "Every crystal holds a story." · sub: "Hand-picked
  crystals, tarot & curiosities from a real little shop in Nottinghamshire." CTAs: "Enter the Vault" / "Find your intention"
- Featured: "New Manifestations". Categories: "Browse the Collections". Intentions: "Shop by Intention —
  what do you seek?"
- Editorial/story: "Proudly Independent" — Alison's real shop, no corporate warehouse; every piece
  chosen by hand. CTA "Visit us in Sutton-in-Ashfield".
- Countdown: "Lammas — the First Harvest · 1st August" — "Gather abundance while the wheel turns."
  CTA "Shop the Harvest Ritual" → /collections/intention-abundance
- Oracle: "Consult the Oracle" — "Let intuition choose for you."
- Cart: title "Your Cauldron"; empty: "Your cauldron is empty… for now." button "Begin the ritual".
- Search: "Seek and You Shall Find". 404: "You've wandered beyond the veil." button "Return to the Vault".
- NEVER claim: awards, review counts, "free shipping over £30/$100" (wrong), discounts that
  don't exist in admin, or countdown-gated fake urgency. The Lammas date (2026-08-01) is real.

## 7. Page compositions
### Homepage (templates/index.json) — order:
1. hero (spellbound-hero, rebuilt)
2. category-tiles (NEW section spellbound-category-tiles) — 6 tiles: Crystals & Stones,
   Tarot & Oracle, Incense & Burners, Books & Guides, Altar & Home, Handmade by Us
   (links /collections/crystals-stones, /collections/tarot-oracle, /collections/incense-burners,
   /collections/books-guides, /collections/altar-home, /collections/handmade)
3. featured products "New Manifestations" (spellbound-featured-products, collection=all, 8)
4. intentions row (spellbound-discovery-grid variant compact) — Protection, Abundance, Love,
   Calm, Healing, Manifestation → intention-* collections
5. editorial → "Proudly Independent" story + visit info (spellbound-editorial, rebuilt)
6. oracle (spellbound-oracle, fixed)
7. ritual-countdown → Lammas 2026-08-01 (fixed JS)
8. zodiac strip (spellbound-discovery-grid) — 12 real zodiac glyph SVGs → zodiac collections
9. trust bar (part of footer area or small section): Free UK delivery £50+ · Click & collect ·
   Family-run · One-of-a-kind pieces
### Collection: tightened header · working filter ribbon · facets · badged product cards.
### Product: nav · main (Cormorant title, readable description) · extras · lore · celestial
(SELF-HOSTED/CSS planets) · chakra (rebuilt, interactive) · recommendations (badged) ·
"Pairs well with" cross-sell by shared intention inside lore/extras.
### Cart: "Your Cauldron", dark summary (scheme-1), free-shipping nudge line, cross-sell.
### Search: facets ENABLED (mirror collection.json filters settings). 404: veil copy + products.

## 8. Engineering rules
- Shopify Horizon theme. Section schema names ≤ 25 chars. JSON templates = pure JSON (no /* */ header).
- All spellbound sections: consume the CSS vars; inline <style> allowed but no accent hex literals.
- Shared snippet snippets/spellbound-badges.liquid renders metafield badges (element + intention,
  via spellbound-metafield-value); used by featured-products, chakra, and injected into
  blocks/_product-card-gallery.liquid inside .product-badges wrapper.
- JS: every script must (a) init via querySelectorAll per instance, (b) re-init on
  document 'shopify:section:load', (c) guard invalid data (no NaN), (d) clear intervals when done.
- Metafield string compares ALWAYS case-insensitive (downcase both sides).
- No third-party hotlinked assets. No new fonts. No new apps.
- Contrast: text on imagery needs a gradient scrim; verify 4.5:1 for body, 3:1 for large headings.
- File ownership is assigned per agent — do not touch files outside your assignment.
  SHARED FILES (orchestrator only): assets/spellbound-custom.css, config/settings_data.json,
  locales/en.default.json, sections/header-group.json, sections/footer-group.json, layout/theme.liquid.

## 9. Verification checklist (every page, desktop 1440 + mobile 390)
- No console errors; no 404 requests; no NaN/undefined text; no dead links (click every CTA).
- All interactive elements respond (oracle steps, countdown ticks, celestial panel, filters,
  quick-add, add to cauldron, drawer).
- Copy is on-voice, prices in £, no lorem/placeholder text or images.
- Reduced-motion respected; touch legibility without hover.
