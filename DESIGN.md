# Design System: Totally Spellbound

**Source:** [totallyspellbound.co.uk](https://totallyspellbound.co.uk/), the Shopify theme in this repository, and rendered checks at 390 × 844 and 1440 × 900 on 12 July 2026

**Stitch project ID:** Not applicable. This system was extracted from the live storefront rather than a Stitch project.

## Status

This is the design authority for the storefront. It records the visual language that is already present in the live site so future work can refine it without inventing a new brand.

The code is evidence, not an automatic rule. Where the live implementation conflicts with an owner rule in this document, the owner rule wins.

## 1. Visual Theme and Atmosphere

Totally Spellbound feels like a real crystal and witchcraft shop seen by candlelight. The page is almost black, with aubergine depth rather than neutral grey. Cream text, restrained metallic gold and photographed smoke keep it warm. Purple appears as atmosphere in images and dark surfaces, not as a bright interface accent.

The site should feel authored and slightly theatrical at its entrances, then quieter around reading, product comparison and buying. Product photography stays clear enough to judge the item. Decorative type and motion become less frequent as the customer approaches a practical task.

The visual hierarchy comes from scale, imagery, contrast and space. Do not create hierarchy by placing a small uppercase eyebrow, kicker or overline above a heading.

## 2. Colour Palette and Roles

These values come from `assets/spellbound-custom.css` and the active Shopify colour scheme.

| Name | Value | Role |
| --- | --- | --- |
| Aubergine Black | `#0d0b10` | Page background, dark controls and text on gold actions. |
| Charcoal Surface | `#1a1a1a` | Cards, trust panels and quiet raised areas. |
| Deep Plum Surface | `#2a112b` | Secondary surfaces and purple depth. |
| Ink Plum Panel | `#18131d` | Drawers, popovers and filters. |
| Cream | `#f7f1e3` | Headings and high-emphasis text. |
| Soft Cream | `rgba(247, 241, 227, 0.78)` | Body copy and normal interface text. This is the paragraph contrast floor. |
| Faint Cream | `rgba(247, 241, 227, 0.55)` | Captions and secondary metadata only. Do not use it for paragraphs or essential controls. |
| Metallic Gold | `#d4af37` | Primary actions, active states, focus rings and selected variants. |
| Bright Gold | `#e6c55f` | Hover, emphasis within display headings and selected highlights. |
| Dark Gold | `#b8860b` | Darker metallic detail. Use sparingly. |
| Bronze | `#8c6a2f` | Supporting ornamental detail. |
| Aubergine | `#4b1e4e` | Dark branded accents and surfaces, never ordinary link text. |
| Cream Border | `rgba(247, 241, 227, 0.14)` | Quiet borders around cards and controls. |
| Strong Cream Border | `rgba(247, 241, 227, 0.28)` | Secondary buttons and higher-emphasis dividers. |
| Gold Glow | `rgba(212, 175, 55, 0.18)` | Focus and hover atmosphere. It supports a control rather than becoming a background effect. |

Gold is the interaction colour. Prices and product names remain cream. Purple stays in imagery, shadows and dark surfaces.

Text laid over photography needs a stable dark scrim. Body copy must hold at least 4.5:1 contrast through the full image crop or motion; large display text must hold at least 3:1.

## 3. Typography Rules

The fonts are self-hosted in `assets/`.

### Display

Use **Cinzel Decorative** at weight 400 for hero, page and selected section headings. Weight 700 is available for rare emphasis. The face is part of the shop’s identity, so it becomes weaker when applied everywhere.

- Hero display: `clamp(2.75rem, 6vw, 5.5rem)`, line-height `1.05`, maximum width about `16ch`.
- Section heading: generally `clamp(1.8rem, 3.4vw, 3.75rem)` depending on the section.
- Product card title: currently `1.125rem`, line-height `1.35`.
- Display emphasis: keep the same face and turn the chosen word Bright Gold. Do not switch it to a different italic face.

Use Cinzel where the words carry identity. Do not use it for paragraphs, prices, fields, filters, quantities or long utility copy.

### Reading and interface text

Use **Cormorant Garamond** for body copy, navigation, prices and controls. The live system uses a variable roman font from weight 300 to 800, plus a variable italic.

- Ordinary body: `16px`, line-height about `1.6`.
- Product descriptions and longer reading: `18px`, line-height about `1.75`.
- Hero supporting copy: `16px` on mobile and `18px` on desktop, line-height `1.6`.
- Product price: `17px`, weight 600 in cards. PDP price may be larger, but it stays cream and easy to scan.
- Long quotations: Cormorant Garamond italic in Soft Cream or stronger.

Cormorant Garamond remains the interface face for this mobile upgrade. Improve its size, weight and spacing where utility text needs more clarity; do not introduce a neutral UI font during this work.

### Functional uppercase text

Uppercase with wide tracking is allowed for real controls, statuses and badges. Typical live values are `12px`, weight 600–700 and `0.12em–0.3em` letter spacing.

Do not use this treatment as a decorative line above a heading. Existing phrases such as “The Doors Are Open”, “Curiosities, sorted” and “What do you seek?” are implementation drift when they sit above headings only to manufacture hierarchy. Fold meaningful words into the heading or supporting copy; otherwise remove them.

## 4. Components

### Primary actions

Primary commerce actions use Metallic Gold with Aubergine Black text. Hover moves to Bright Gold. The action needs strong contrast, a visible focus ring and a practical hit region of at least 44px.

The main Add to Cauldron button is rectangular, borderless and direct. It uses uppercase functional text with wide tracking. A soft gold glow may appear on hover, but it must not obscure the label or replace the control boundary.

### Secondary actions

Secondary actions are transparent with a Strong Cream Border and Cream text. Hover may shift the border and text to gold. Keep their weight below the primary action.

### Compact commerce controls

Quick add, badges, filter triggers and selected chips may be pill-shaped because their compact form communicates a different role from the main purchase action.

- Quick add: solid gold pill, dark text and a restrained shadow.
- Badge: dark translucent pill with a quiet cream border. Gold variants use Bright Gold text and a Gold border.
- Facet trigger: transparent pill with Soft Cream text. Open and selected states use Gold.
- Filter drawer rows: flat, full-width rows separated by hairlines. Do not nest pills inside the drawer.

### Cards

Product and editorial imagery uses a `4:5` portrait ratio. Standard card imagery has subtly rounded `10px` corners, a one-pixel Cream Border and no heavy frame. The photograph carries most of the visual weight.

Product names are Cream. Hover may move the title to Bright Gold. Prices stay Cream. Badges must not cover the subject of the photograph.

Category grids use two columns on small screens and three on wider screens in the current site. Product grids must choose their column count from a viable card width and real product names; two columns are not mandatory when the title becomes unreadable.

### Forms and variants

Inputs are dark, square-edged and bordered with a quiet cream line. Text uses Soft Cream or stronger. Focus uses the shared two-pixel Gold outline.

Selected variants use Metallic Gold with Aubergine Black text. Unselected variants stay dark with a visible border. Labels describe the field and are not decorative eyebrows.

### Panels, drawers and popovers

Panels use Ink Plum or Charcoal Surface with a one-pixel Cream Border. Popovers may use a `12px` corner radius and a deep black shadow such as `0 24px 48px rgba(0, 0, 0, 0.55)`.

The mobile navigation drawer remains `100dvh`. Only its width and maximum width may be reduced. It must leave a visible strip of the dimmed page and must not change the height of the browser, Codex sidebar or any surrounding application surface.

### Ornament

The gold line ornament may divide major sections when it helps the long page breathe. It is centred, in flow and no wider than `min(340px, 70vw)`. Do not add it to every section or use it as a substitute for spacing.

## 5. Layout Principles

The site combines full-bleed atmosphere with contained reading and commerce areas.

- Hero imagery spans the viewport. The current Home hero is `92svh`; mobile work should shorten it enough to reveal that shopping content continues below.
- Section padding is usually fluid, with about `1.5rem` horizontal padding on phones and `3rem–7rem` vertical space depending on importance.
- Space inside a title, price and badge group is tighter than space between modules.
- Editorial layouts stack on mobile and may use an asymmetric image/text split on desktop.
- Long pages use images, spacing and occasional ornaments to mark rhythm. They do not need a label above every heading.
- Shopify’s section, block and theme-editor model remains intact. Design changes work with it rather than replacing it.

### Responsive behaviour

The review widths are 320px, 390px and 430px, plus landscape and 200% text zoom. Desktop visual review uses 1440px.

At every width:

- Page content stays within the viewport.
- Text can grow without clipping or overlapping controls.
- Touch and focus targets remain usable.
- Images retain their subject and do not hide essential text.
- Hover is an enhancement. Every action and piece of information remains available by touch and keyboard.

## 6. Imagery

The image language is photographic, dark and tactile: crystals, candles, smoke, cards, brass, timber and the real shop. Light is warm and directional. Purple smoke and amethyst tones add depth, while gold comes from real light and objects as well as the interface.

- Keep product colour and texture truthful. Do not grade away inclusions, scale or surface detail.
- Use close still-life compositions with a clear subject and room for copy where copy is intended.
- Do not bake text into images.
- Avoid clip art, novelty Halloween imagery and generic fantasy decoration.
- Brand fallbacks must be responsive. The current `5504 × 3072` hero and `942 × 292` fallback logo should not be sent at full size to every phone.

## 7. Depth and Motion

Depth comes from photography, dark tonal steps, hairline borders and restrained shadows. Avoid stacks of floating cards or bright glass effects.

The shared reveal moves content from `translateY(24px)` and zero opacity to its resting position over `800ms` with `cubic-bezier(0.16, 1, 0.3, 1)`. Groups stagger in `80ms` steps. Image hover may brighten slightly and scale to `1.03`.

The Home hero uses a slow Ken Burns scale from `1` to `1.06` over `14s`. Motion establishes atmosphere or confirms one change of state. It does not compete with reading or buying.

Under `prefers-reduced-motion: reduce`, content is immediately visible and transforms, repeating zooms and non-essential transitions stop.

## 8. Accessibility and Interaction Rules

- Use the shared two-pixel Gold focus ring with a two-pixel offset. Focus must never be clipped by decorative overflow.
- No interactive target falls below the WCAG 2.2 24px floor without a valid spacing exception.
- Primary navigation, filters, quantity, gallery, cart and checkout controls aim for a practical 44px region.
- Paragraph text uses Soft Cream or stronger. Faint Cream is metadata only.
- Sticky, fixed and app-provided controls must not cover focused elements, forms or commerce actions.
- Reduced motion retains all information and control states.

## 9. Voice in the Interface

The shop speaks like Alison would speak to someone at the counter: warm, specific and knowledgeable. Witchy language is welcome when it helps the experience, such as “Add to Cauldron” or “Consult the Oracle”. It should not hide what an action does.

Do not invent awards, review totals, discounts, urgency or delivery claims. Keep practical information plain, especially price, availability, delivery and collection.

## 10. Drift to Remove During the Mobile Upgrade

These are visible in the current storefront but are not part of the approved system:

- Decorative eyebrow, kicker and overline labels above headings.
- Display typography applied to prices or dense utility controls.
- Body or utility text that becomes hard to read because its face, size or contrast is too delicate.
- A mobile drawer that is nearly full-screen in width.
- Fixed two-column product cards when real names no longer fit.
- Oversized fallback imagery sent to phones.

Remove these through the published mobile tickets. Preserve the site’s candlelit imagery, gold restraint, shop-specific copy and authored interactions while doing so.
