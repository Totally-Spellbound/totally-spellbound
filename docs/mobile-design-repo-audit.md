# Totally Spellbound: Mobile Design and Repository Audit

**Audit date:** 12 July 2026

**Scope:** repository-wide discovery with a deep review of the core mobile storefront at 390px: Home, Collection, Product, Cart, Search, Our Story, Visit Us, Contact and 404. Desktop and inherited Horizon internals received a lighter review.

**Method:** static source inspection, `shopify theme check`, a live Shopify development theme, rendered-page measurements, Lighthouse on Home, and first-party design guidance from Apple, W3C, USWDS, Carbon, A List Apart and Baymard.
**Constraint observed:** analysis only. No theme code or store configuration was changed.

## Executive Summary

Overall health is **C+**: the store is distinctive, working and much more authored than a typical theme conversion, but the mobile commerce layer is carrying a desktop-sized visual system and has no automated release gate. The strongest parts are the candlelit art direction, the product photography, the copy, the accessibility fundamentals and the modular Shopify structure. The first risk is typography: one decorative face is applied to body copy, prices and utility controls, while Cinzel Decorative is used so widely that product comparison becomes slow on a phone. The second is a Search loading defect which can make every visible carousel image eager, producing 50 eager image requests in one observed blank-search render. The third is mobile hierarchy: a 120px logo, tall heroes, two-column cards with long names, narrow hit areas and a 95vw drawer leave too little room for shopping. The best opportunities are to settle one design authority and rebuild the type tokens, to recompose the first useful viewport and product grids from minimum content widths, and to add a small Shopify-native quality gate. The goal should be refinement rather than a restyle: preserve the atmosphere and voice, then make the buying path quieter, faster and easier to read.

## Repo Map

### Purpose and maturity

Totally Spellbound is a production Shopify storefront for an independent crystal, tarot and witchcraft shop. The project states its core value as guiding customers to suitable products thoughtfully (`.planning/STATE.md:18-21`), and the launch brief identifies Alison and the real Sutton-in-Ashfield shop, its catalogue, shipping and intended conversational voice (`.planning/phases/03-launch/DIRECTION.md:9-23`). The repo is beyond prototype stage: it contains complete Home, Collection, Product, Cart, Search, content and error-page compositions (`.planning/phases/03-launch/DIRECTION.md:103-124`), live app embeds (`config/settings_data.json:72-91`) and Shopify CLI deployment scripts (`package.json:6-11`).

### Stack

- **Platform/runtime:** Shopify Online Store 2.0, based on Horizon (`README.md:1-3`).
- **Presentation:** Liquid, JSON templates, CSS and vanilla JavaScript. The root layout composes Shopify styles, fonts, theme variables, custom brand CSS and the shared motion script before rendering section groups (`layout/theme.liquid:37-59`).
- **Data:** Shopify products, collections, metafields, theme settings and app embeds. There is no local application server or database in this repo.
- **Tooling:** Shopify CLI only; `package.json` contains scripts but no package dependencies (`package.json:1-12`; `package-lock.json:1-11`).
- **Runtime targets:** Shopify CDN/storefront, theme editor, touch and desktop browsers. The canonical release checklist calls for 1440px and 390px verification (`.planning/phases/03-launch/DIRECTION.md:141-146`).

### Architecture sketch

```text
Shopify request + store data
        ↓
layout/theme.liquid
        ├── shared Horizon snippets, variables, fonts and scripts
        ├── spellbound-custom.css + spellbound-motion.js
        ├── header-group
        ↓
JSON page template
        ↓
ordered sections → blocks → snippets → product/collection/metafield data
        ↓
main storefront DOM
        ├── footer-group
        ├── search / quick-add overlays
        └── Shopify app embeds: Inbox + Square Wishlist
```

`layout/theme.liquid` is the composition root: the page body and header are created at `layout/theme.liquid:55-59`, template content enters at `layout/theme.liquid:129-138`, and global footer/search/quick-add UI follows at `layout/theme.liquid:140-147`.

### Key directories

| Area | Role |
| --- | --- |
| `layout/` | Shopify document shells and the shared page entry point (`layout/theme.liquid:37-59`). |
| `templates/` | JSON page compositions; Home starts with the bespoke hero and trust bar (`templates/index.json:4-17`), while Product composes gallery, details and enrichment sections (`templates/product.json:4-45`, `templates/product.json:267-308`). |
| `sections/` | Large page modules and Shopify schema. This is where most Spellbound art direction and section-specific CSS live. |
| `blocks/` | Reusable Horizon content and commerce components, including product details and cart elements. |
| `snippets/` | Small Liquid rendering units, structured data and shared variables. |
| `assets/` | Horizon CSS/JS, custom brand CSS/JS, fonts, logo and cinematic image fallbacks. |
| `config/` | Theme settings, active palette/type choices and app embeds (`config/settings_data.json:2-91`). |
| `locales/` | Storefront and editor translations. |
| `.planning/` | Product/design history. Its state file identifies the current launch direction (`.planning/STATE.md:23-28`). |
| `docs/` | Project context and this audit. |

### Main page flow

- **Home:** cinematic hero, trust bar, categories, featured products, intention discovery, editorial, Oracle, countdown and zodiac (`templates/index.json:4-17`, `templates/index.json:63-143`, `templates/index.json:217-317`).
- **Collection/Search:** a header and facet controls feed Horizon product grids. Both choose “small” mobile cards with 16px horizontal gaps (`templates/collection.json:124-131`; `templates/search.json:163-170`).
- **Product:** gallery and product details come first, followed by extras, lore, celestial/chakra interactions and recommendations (`templates/product.json:4-45`, `templates/product.json:267-308`).
- **Cart:** cart title/items/summary plus a product list (`templates/cart.json:4-59`).
- **Content pages:** a shared cinematic page hero is followed by editable page content, visit cards and editorial modules (`templates/page.our-story.json:4-87`; `templates/page.visit-us.json:4-103`; `templates/page.contact.json:4-152`).

### Conventions worth preserving

- Spellbound components consume named CSS variables rather than duplicating colour values; that intent is documented in the live CSS (`assets/spellbound-custom.css:1-4`).
- Shared motion is initialised per element, falls back without `IntersectionObserver`, respects reduced motion and reinitialises in the theme editor (`assets/spellbound-motion.js:7-51`).
- The countdown validates a strict date, rejects rollover dates and clears its interval after expiry (`assets/spellbound-countdown.js:9-22`, `assets/spellbound-countdown.js:43-81`).
- Content remains Shopify-editor friendly through section schemas and JSON compositions rather than hard-coded page markup.

### What surprised me

The named `DESIGN.md` is deliberately obsolete. `.planning/STATE.md:23-28` says its amethyst direction was dropped and names `.planning/phases/03-launch/DIRECTION.md` as canonical. The live stylesheet then claims a different “Brand Guidelines v1.0 (May 2024)” and changes the fonts and colours again (`assets/spellbound-custom.css:1-4`, `assets/spellbound-custom.css:37-65`). No Brand Guidelines v1.0 file exists in the repository, so I could not verify which later decisions were intentional.

## Audit Report

### Review evidence

The live theme was inspected at **390 × 844 CSS pixels** with touch/mobile emulation. Home scored 100 in the Lighthouse Accessibility, Best Practices and SEO categories. All nine audited pages had image alt text and explicit image dimensions, and only Home produced page-level horizontal overflow. The control-height counts below use 44px as a practical mobile usability heuristic, not as a claim that every smaller text link fails WCAG; the WCAG 2.2 AA floor is 24px or sufficient spacing.

| Page | Live observation at 390px | Source that explains the result |
| --- | --- | --- |
| Home | Document width reached 412px; 10 practical targets were under 44px. The first viewport is almost entirely announcement, header and hero. | The countdown glow extends 12% outside its frame without clipping (`sections/spellbound-ritual-countdown.liquid:8-12`, `sections/spellbound-ritual-countdown.liquid:115-139`, `sections/spellbound-ritual-countdown.liquid:202-204`). The hero is 92svh (`sections/spellbound-hero.liquid:12-20`). |
| Collection | 12 practical targets under 44px. Long names wrapped to 3–5 lines in the two-column grid. | Mobile card size is fixed to small (`templates/collection.json:124-131`); card titles are an unbounded 18px decorative heading (`assets/spellbound-custom.css:426-438`); filter text is 12px in a 38px-high pill (`assets/spellbound-custom.css:537-554`). |
| Product | Product title began around y=697; price around y=861; add-to-cart around y=1018. 13 practical targets were under 44px. | Mobile uses dot gallery controls (`templates/product.json:11-20`); product price is a 34px heading face (`assets/spellbound-custom.css:733-742`); the primary action itself is generously padded (`assets/spellbound-custom.css:794-807`). |
| Cart | 11 practical targets under 44px and a large empty vertical interval before the empty-state action. | Empty Cart vertically centres the column and adds `margin-6xl` above title and follow-on blocks (`sections/main-cart.liquid:67-77`). |
| Search | 9 practical targets under 44px. A blank search rendered a very long product grid and 50 eager images in one observed load. | Empty results deliberately fall back to a collection (`sections/search-results.liquid:26-35`), while the image condition can mark all media in early sections eager (`snippets/card-gallery.liquid:109-140`). |
| Story / Visit / Contact | 10–11 practical targets under 44px on each. The tall shared hero postpones page-specific utility. | The page hero is at least 300px/45vh (`sections/spellbound-page-hero.liquid:9-16`); visit-card links have only 6px vertical padding (`sections/spellbound-visit-cards.liquid:82-95`). |
| 404 | No overflow; 9 practical targets under 44px, mainly shared footer links. | Policy links have no enlarged hit area (`sections/spellbound-footer.liquid:192-208`). |

### Findings by severity

#### High

##### 1. The design system has two competing authorities

- **Type:** Fact.
- **Found:** The launch direction calls itself the single source of truth and specifies Cormorant headings, Inter body/UI and a `#050505`/`#e5a94d` palette (`.planning/phases/03-launch/DIRECTION.md:1-7`, `.planning/phases/03-launch/DIRECTION.md:25-67`). The active CSS instead declares Brand Guidelines v1.0, Cinzel Decorative headings, Cormorant Garamond body and a `#0d0b10`/`#d4af37` palette (`assets/spellbound-custom.css:1-4`, `assets/spellbound-custom.css:37-65`). Theme settings add a third layer by selecting Cormorant for all four font roles (`config/settings_data.json:3-34`).
- **Why it matters:** A designer or agent can follow the written brief exactly and still move the live site in the wrong direction. Tokens, accessibility decisions and future polish cannot be reviewed consistently until this is settled.
- **Severity:** High.

##### 2. Typography roles have collapsed, hurting mobile reading and comparison

- **Type:** Fact plus design judgement.
- **Found:** The global override applies Cinzel Decorative to headings/subheadings and Cormorant Garamond to body/accent (`assets/spellbound-custom.css:57-65`). Collection titles use the heading face at 18px while prices use the body face (`assets/spellbound-custom.css:426-438`). Product price is also rendered as a 34px heading (`assets/spellbound-custom.css:733-742`), and the facet control uses the body face at 12px with wide tracking (`assets/spellbound-custom.css:537-550`). At 390px, long product names occupied 3–5 lines and the Product title occupied about 144px vertically.
- **Why it matters:** Decorative letterforms cease to feel special when used for every role. More concretely, scan speed drops where customers compare names, prices, filters and purchase controls. The problem is role choice and line length, not simply font size.
- **Severity:** High.

##### 3. Search can eagerly load far too many product images

- **Type:** Fact.
- **Found:** Each media slide defaults to lazy loading, but the condition `if forloop.first and section.index == null or section.index < 5` overrides it (`snippets/card-gallery.liquid:109-140`). Because `or section.index < 5` is not grouped with `forloop.first`, media beyond the first slide can become eager in early sections. One blank Search render produced 50 eager images, although only eight were above the fold. Blank Search also intentionally substitutes a collection for no results (`sections/search-results.liquid:26-35`).
- **Why it matters:** Mobile users pay for invisible carousel media in bandwidth, decoding, memory and main-thread contention. It directly delays the first useful product interaction on Search.
- **Severity:** High.

##### 4. Small practical hit areas recur across every core mobile page

- **Type:** Fact plus usability judgement.
- **Found:** The shared footer social circles are 42px and text links have no enlarged block hit area (`sections/spellbound-footer.liquid:47-60`, `sections/spellbound-footer.liquid:79-95`, `sections/spellbound-footer.liquid:192-208`). Visit-card actions are approximately 32px high due to `padding: .375rem 0` (`sections/spellbound-visit-cards.liquid:82-95`). Filter triggers were observed at 38px high and are defined with 8px vertical padding and 12px text (`assets/spellbound-custom.css:537-554`). The 390px review found 9–13 practical targets under 44px on every page.
- **Why it matters:** The audience includes an older shop owner and customers using one hand. Small links and closely packed utility controls increase missed taps, especially in filters, quantity and long footers.
- **Severity:** High for mobile UX. This report does **not** claim that every instance fails WCAG 2.2 because target spacing exceptions must be assessed per control.

#### Medium

##### 5. The first useful viewport is consumed by brand chrome

- **Type:** Design judgement grounded in measured layout.
- **Found:** The fallback logo is hard-coded to 120px high on mobile (`blocks/_header-logo.liquid:63-77`, `blocks/_header-logo.liquid:143-151`). The Home hero then takes 92svh (`sections/spellbound-hero.liquid:12-20`) with 44px minimum display text and two actions (`sections/spellbound-hero.liquid:69-136`). Content-page heroes take at least 300px/45vh (`sections/spellbound-page-hero.liquid:9-16`). On the audited phone, the Home viewport showed almost no evidence of the shop below the hero, and Product purchase controls began more than one screen down.
- **Why it matters:** The atmosphere lands, but product discovery and buying confidence arrive late. On repeat visits this becomes friction rather than theatre.
- **Severity:** Medium.

##### 6. Collection and Search cards are fitted by column count rather than content

- **Type:** Fact plus design judgement.
- **Found:** Both templates specify small mobile cards and 16px horizontal spacing (`templates/collection.json:124-131`; `templates/search.json:163-170`). The custom card title remains 18px/1.35 line-height at all mobile widths (`assets/spellbound-custom.css:426-438`). Product recommendations and Cart also force two mobile columns (`templates/product.json:433-437`; `templates/cart.json:235-240`).
- **Why it matters:** Long, distinctive product names turn into tall text blocks beneath narrow images, breaking row alignment and slowing price comparison. A grid is useful only while each card still has a viable content width.
- **Severity:** Medium.

##### 7. Home has real horizontal overflow at 390px

- **Type:** Fact.
- **Found:** The live document measured 412px wide in a 390px viewport. The countdown glow uses `inset: -12%` and blur outside a container which does not clip overflow (`sections/spellbound-ritual-countdown.liquid:8-12`, `sections/spellbound-ritual-countdown.liquid:115-139`, `sections/spellbound-ritual-countdown.liquid:202-204`).
- **Why it matters:** Sideways movement creates a visibly unstable page edge and fails the intended 320px reflow discipline. It can also make sticky or fixed controls appear misaligned.
- **Severity:** Medium.

##### 8. The navigation drawer is nearly full-screen when the requested feel is narrower

- **Type:** Fact plus stated product intent.
- **Found:** Drawer height is `100dvh`, width is `95vw`, and maximum width is 500px (`snippets/theme-styles-variables.liquid:609-618`). The user explicitly wants the full height preserved and only the width reduced.
- **Why it matters:** At 390px, 95vw leaves only 19.5px of the page visible, so the drawer reads as a replacement screen rather than an anchored layer. The tiny context strip also makes closing/orientation less obvious.
- **Severity:** Medium.

##### 9. Shopify Inbox competes with product and form controls

- **Type:** Fact plus live observation.
- **Found:** The Inbox app embed is enabled at the lowest bottom-right position (`config/settings_data.json:78-90`). Its black notification bubble overlapped lower-right content on the audited Product, Collection and content pages.
- **Why it matters:** On a narrow screen, an external fixed control can cover card actions, form fields or sticky commerce UI and competes visually with the cart.
- **Severity:** Medium.

##### 10. Brand image fallbacks bypass responsive delivery

- **Type:** Fact.
- **Found:** Admin-selected hero images receive `srcset` and `sizes`, but asset fallbacks are emitted as a single URL (`sections/spellbound-hero.liquid:262-290`; `sections/spellbound-page-hero.liquid:80-101`). The 942×292 PNG fallback logo is loaded directly on every page when no theme logo is selected (`blocks/_header-logo.liquid:63-77`).
- **Why it matters:** The default branded path sends one large asset regardless of device width. It undermines the otherwise careful width/height and responsive-image work.
- **Severity:** Medium.

##### 11. Empty Cart and blank Search inherit generic content behaviour rather than a tight mobile state

- **Type:** Fact plus design judgement.
- **Found:** Empty Cart uses vertical centring and adds very large top margins (`sections/main-cart.liquid:67-77`). Blank/no-result Search replaces the state with the selected collection and can render its full product set (`sections/search-results.liquid:26-48`).
- **Why it matters:** Empty states should answer “what now?” quickly. Cart creates dead vertical space, while Search can produce a 10,000px-plus product page before the customer has entered a query.
- **Severity:** Medium.

##### 12. Bespoke presentation logic is concentrated in very large files

- **Type:** Fact plus maintainability judgement.
- **Found:** `assets/spellbound-custom.css` is 1,154 lines, `sections/spellbound-celestial-body.liquid` is 1,174 lines, `sections/spellbound-chakra-attunement.liquid` is 796 lines and `sections/spellbound-footer.liquid` is 699 lines. The footer contains styling, markup, audio behaviour, pointer tracking and its schema in one section; its document-level pointer listener is registered at `sections/spellbound-footer.liquid:577-582`.
- **Why it matters:** A mobile typography or spacing change must be traced through global overrides and section-local CSS. Theme-editor reloads also make global listeners in section files easy to register more than once.
- **Severity:** Medium.

##### 13. There is no automated safety net for a live storefront

- **Type:** Fact.
- **Found:** `package.json` provides Theme Check but no test or build-verification script (`package.json:6-11`), and the repository has no GitHub Actions workflow. The only documented verification is a manual checklist (`.planning/phases/03-launch/DIRECTION.md:141-146`).
- **Why it matters:** Regressions such as Search eager loading, 390px overflow and theme-editor listener duplication can ship even when the theme renders. A small Shopify-native gate would catch syntax and standards regressions without introducing a heavy test stack.
- **Severity:** Medium.

##### 14. Theme Check is green but carries 28 warnings

- **Type:** Fact from `npm run check` on 12 July 2026.
- **Found:** Theme Check exited successfully with 28 warnings across 20 files. Examples include an unknown render argument at `blocks/_card.liquid:75`, a type mismatch at `blocks/_collection-card-image.liquid:15` and an undefined-object warning at `blocks/_hotspot-product.liquid:57`.
- **Why it matters:** A green exit currently means “no errors”, not a clean theme. New warnings can hide in inherited noise unless the repo either fixes or explicitly baselines them.
- **Severity:** Medium.

#### Low

##### 15. The custom localStorage wishlist appears to be dead beside the live app

- **Type:** Fact, with one limitation.
- **Found:** `assets/spellbound-wishlist.js` implements and exposes a local wishlist (`assets/spellbound-wishlist.js:1-72`), but no Liquid, JSON or layout file references it. The Square Wishlist app is enabled separately (`config/settings_data.json:72-76`).
- **Why it matters:** Dead implementations create false architecture and can be edited or debugged by mistake. I could not verify whether an external admin workflow still expects this unreferenced asset.
- **Severity:** Low.

##### 16. The footer interaction is charming but its lifecycle is incomplete

- **Type:** Fact plus risk judgement.
- **Found:** The section adds a document-level `pointermove` listener and per-cat listeners (`sections/spellbound-footer.liquid:577-628`) but has no global guard or `shopify:section:unload` cleanup.
- **Why it matters:** Repeated section reloads in the Shopify editor can accumulate handlers and animation frames. Storefront visitors normally load it once, so the production risk is limited.
- **Severity:** Low.

##### 17. Developer setup has two reproducibility gaps

- **Type:** Fact.
- **Found:** The README asks developers to globally install both Shopify CLI and `@shopify/theme` (`README.md:19-25`); the latter emitted a deprecation warning locally because theme commands are bundled with current Shopify CLI. The repo MCP executes `@shopify/dev-mcp@latest` on every install/run (`.mcp.json:3-8`).
- **Why it matters:** “Latest” can change behaviour without a repository change, while the setup guide asks for an obsolete extra package.
- **Severity:** Low.

##### 18. Home has two `h1` elements

- **Type:** Fact.
- **Found:** Header emits a visually hidden shop-name `h1` on Home (`sections/header.liquid:313-315`), while the hero emits the visible page `h1` (`sections/spellbound-hero.liquid:295-302`).
- **Why it matters:** Modern accessibility tooling tolerates multiple `h1`s and Lighthouse passed, but the duplicate weakens document-outline clarity and can muddy SEO/content audits.
- **Severity:** Low.

### Dimension summary

| Dimension | Verdict |
| --- | --- |
| Architecture & design | Shopify’s boundaries are sound, but the brand layer is split between global CSS, large section files and contradictory design authorities. |
| Code quality | Custom JavaScript is small and defensive. The main hotspots are large all-in-one presentation sections, one incorrect Liquid condition and incomplete theme-editor lifecycles. |
| Security | **Healthy in the reviewed scope.** No tracked secrets, unsafe `eval`, or custom `innerHTML` sinks were found. The repo has no server-side auth boundary to audit; checkout and account security remain Shopify’s responsibility. |
| Testing | Manual verification exists, but there are no automated checks beyond a warning-tolerant Theme Check command. |
| Performance | The main verified defect is Search eager loading. Responsive-image fallbacks and the large logo are secondary mobile payload costs. |
| Dependencies | Runtime dependency exposure is low because this is a native theme. The unpinned development MCP and stale CLI setup are small reproducibility concerns. |
| DevEx & operations | Setup is short and deployment is Shopify-native, but there is no CI gate, warning policy, performance budget or recorded mobile release evidence. |
| Documentation | The README is serviceable. Design authority is not: the canonical direction and live “Brand Guidelines v1.0” disagree, and the latter is absent. |

### Strengths to preserve

- **It does not look like generic AI-generated storefront work.** The candlelit photography, gold restraint, shop-specific language and custom Oracle/celestial/chakra material form a recognisable world. The canonical voice is concrete and grounded in the real shop (`.planning/phases/03-launch/DIRECTION.md:86-101`).
- **Accessibility fundamentals are unusually good for a visual theme.** The audited pages had alt text and explicit image dimensions, Home achieved 100 Lighthouse Accessibility, focus styles exist on bespoke CTAs (`sections/spellbound-hero.liquid:138-140`), and shared motion respects reduced-motion preferences (`assets/spellbound-motion.js:31-43`).
- **The primary purchase action is clear and physically generous.** Add to Cauldron has strong contrast, large padding and a stable hierarchy (`assets/spellbound-custom.css:794-807`).
- **Failure handling in custom JavaScript is thoughtful.** The countdown rejects invalid data and stops its timer (`assets/spellbound-countdown.js:9-22`, `assets/spellbound-countdown.js:43-81`); the local wishlist catches malformed storage (`assets/spellbound-wishlist.js:7-12`).
- **Shopify editability has been preserved.** The core pages are assembled from JSON templates and schema-driven sections rather than one hard-coded page application (`templates/index.json:4-17`; `templates/product.json:4-45`).
- **The store is close to responsive correctness.** Eight of nine audited pages stayed exactly within 390px. Home’s single overflow source is local and explainable.

## Improvement Strategy

### Theme 1: establish one design authority

**Target state:** one tracked design document names the current palette, font files, type roles, spacing rhythm, target sizes, drawer behaviour and accessibility rules. `settings_data.json`, custom tokens and component styles all resolve to it. The obsolete amethyst document is clearly archived, and Brand Guidelines v1.0 is either added or its reference removed.

**Principle:** design tokens are a contract, not a historical note. Visual polish becomes cheap only when everyone is evaluating the same system.

### Theme 2: separate atmosphere from utility

**Target state:** expressive type is reserved for a small set of display moments; body copy, prices, filters, fields and metadata use a highly legible UI face. Mobile headings use bounded fluid sizes, body copy is 16–18px with appropriate leading, and decorative eyebrow/kicker/overline labels above headings are removed entirely.

**Principle:** the special typeface gains power when it is scarce. Shopping information should be read before it is admired.

### Theme 3: compose mobile from content constraints

**Target state:** cards select one or two columns from a minimum viable card width; the first screen of Home and Product has one clear job; touch geometry is at least WCAG-compliant and 44px for primary controls; the drawer stays full height but exposes a useful page strip. Cart, Search and filters get deliberate small-screen states rather than inherited spacing.

**Principle:** mobile is a re-composition. It is not a reduced desktop arrangement.

### Theme 4: spend bandwidth only on visible product value

**Target state:** only genuinely above-fold card images are eager, fallbacks have phone-sized variants, the logo is right-sized, and product galleries expose useful alternate views without hover. Mobile Home and Search maintain a Lighthouse Performance target of at least 90 on a repeatable profile.

**Principle:** visual richness should come from the right image at the right moment, not from loading every possible image.

### Theme 5: make quality repeatable

**Target state:** every change runs Theme Check in CI; warnings are zero or recorded as an approved baseline; releases include evidence at 320, 390 and 430px, landscape, 200% text zoom and reduced motion. No separate browser-test framework is needed for this one-store theme.

**Principle:** the checklist already describes good judgement. The repo needs a cheap gate that ensures it is actually applied.

### Explicit trade-offs

- Do not rewrite Horizon or replace its section/block model. Most inherited foundations are sound, and a rewrite would endanger Shopify editor behaviour for little customer gain.
- Do not flatten the site into a generic minimalist shop. Keep the imagery, gold, language and selected theatrical moments; reduce their frequency around comparison and buying controls.
- Do not add Playwright, Vitest or a component laboratory at this maturity. Shopify Theme Check plus disciplined interactive Chrome checks gives a better effort-to-risk ratio.
- Do not refactor all inherited large files during the mobile upgrade. Split only the custom hotspots touched by the work, starting with shared type/touch rules and the footer listener lifecycle.
- Do not force every text link to look like a 44px button. Enlarge invisible hit regions and spacing while preserving the visual delicacy.

### Definition of done

- One canonical design guide is tracked and linked from `.planning/STATE.md`; no active file claims a conflicting authority.
- At 320, 390 and 430px, all core pages have `scrollWidth <= clientWidth`, including at 200% text zoom.
- Body/UI type and display type have explicit roles; long copy is at least 16px with roughly 1.5 line-height; product prices, filters and fields do not use decorative display type.
- No interactive target falls below WCAG 2.2’s 24px floor without a documented spacing exception; primary navigation, filters, quantity, gallery, cart and checkout controls have practical 44px hit regions.
- The full-height drawer leaves a deliberate orientation strip at 320/390/430px and does not alter viewport or sidebar height.
- Search eagerly loads only the intended first above-fold product images; below-fold and alternate slides remain lazy.
- Home and Search score at least 90 Lighthouse Performance and at least 95 Accessibility/Best Practices/SEO on the agreed mobile profile.
- Theme Check runs in CI; new warnings fail the gate.
- The release checklist records Home, Collection, Product, Cart, Search, Story, Visit, Contact and 404 at the agreed viewports, landscape, reduced motion and 200% text zoom.

### Designer-informed review prompts

These prompts translate first-party platform/accessibility guidance and established responsive-commerce research into concrete briefs for this site. They are meant to be used one at a time during design and implementation, not pasted as one giant request.

1. **Rebuild the mobile type hierarchy around reading.** Inventory every type style on Home, Collection, Product, Cart, Search and 404. Reduce them to an approved display face and a legible body/UI face. Keep ordinary body and product-description copy at an effective 16–18px with about 1.5 line-height. Use bounded fluid display sizes so 390px still feels cinematic without one-word-per-line headings. Remove every decorative eyebrow, kicker or overline above a heading. Preserve small type only for functional information such as a form label, badge or status, never as automatic section-heading decoration. Informed by [Apple Typography](https://developer.apple.com/design/human-interface-guidelines/typography), [USWDS Typography](https://designsystem.digital.gov/components/typography/) and [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/).

2. **Make every candlelit text layer pass at its worst frame.** Sample the brightest and darkest parts of every hero, editorial tile, category image and Ken Burns crop. Add a stable directional scrim or text surface wherever body copy cannot hold 4.5:1 through the full motion. Atmosphere may vary; reading contrast may not. Informed by [WCAG Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [Apple Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode).

3. **Give the first mobile viewport one job.** Recompose Home so the image, “Every crystal holds a story”, one short line and one primary action form a single hierarchy. Quiet the second action. Crop for the phone, protect the text focal area and let the next section peek into view so the page reads as a shop rather than a splash screen. Informed by [Responsive Web Design](https://alistapart.com/article/responsive-web-design/) and [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

4. **Use proximity to create rhythm through the long Home page.** Adopt a small spacing scale with 4px micro and 8px macro steps as a project target. Product title, price and badge should read as one group; a section heading and its first card as another. Use more space between Browse the Collections, New Manifestations, Intentions, editorial, Oracle and zodiac than inside each module. Informed by [USWDS spacing units](https://designsystem.digital.gov/design-tokens/spacing-units/) and [USWDS Typography](https://designsystem.digital.gov/components/typography/).

5. **Keep the navigation drawer tall; make only its width lighter.** Preserve `100dvh`, row height and control sizing. Test a width near `min(82vw, 320px)` as a site-specific starting point at 320, 390 and 430px. Keep every row and close control inside a 44px practical hit region and leave a visible strip of the dimmed page for orientation. Informed by [Apple Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons) and [WCAG Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum).

6. **Make Collection and Search cards into comparison tools.** Choose the column count from minimum viable card width, title wrapping and usable quick-add geometry. Give photography most of the card, use a plain face for utility information, keep prices easy to align and ensure badges never cover the crystal. Expose useful alternate views with an obvious touch affordance; do not rely on hover. Informed by [Baymard’s 2025 mobile benchmark](https://baymard.com/blog/mobile-ux-ecommerce).

7. **Treat the Product gallery as the customer’s hand lens.** Make the exact-piece photograph dominant, preserve its aspect ratio, support useful swipe/zoom and use recognisable thumbnails instead of anonymous dots. Test portrait and landscape. A mood grade that hides inclusions, texture or scale is a sales defect. Informed by [Baymard on mobile landscape images](https://baymard.com/blog/scale-mobile-product-images-in-landscape), [mobile image gestures](https://baymard.com/blog/mobile-image-gestures) and [thumbnail previews](https://baymard.com/blog/always-use-thumbnails-additional-images).

8. **Make the Product purchase path feel inevitable without making it loud.** In the first useful scroll sequence, establish image, product name, white price, exact-piece/stock state, variant choice and Add to Cauldron in that order. Keep delivery threshold and click-and-collect reassurance close to the action. Lore, chakra and celestial content can follow, but must never interrupt the controls or obscure a selected option.

9. **Audit touch as invisible geometry.** Draw the actual hit rectangles for header, drawer, filter ribbon, gallery, quantity, quick-add, Oracle, zodiac, cart and checkout. Use 44px for primary controls and never fall below the 24px WCAG floor without the allowed spacing exception. A delicate crescent, arrow or underline may sit inside a larger transparent target. Informed by [Apple Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons), [WCAG Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) and [Baymard mobile-commerce UX](https://baymard.com/blog/mobile-commerce-design).

10. **Let motion mark one change of state, then leave.** Keep slow entry motion where it establishes hierarchy. A filter change, drawer open, add-to-cart confirmation or Oracle step should get one clear response; avoid stacking scale, glow, parallax and delayed reveal. Under reduced motion, replace translation, scale and Ken Burns movement with immediate states or a short fade. Informed by [Apple Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility/), [WCAG Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) and [Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html).

11. **Recompose bento layouts into one-dimensional reading.** Keep varied spans on desktop where they express editorial priority. At 320–390px, order the same content by shopping value and stack or horizontally contain it without page-level overflow. At 320px and 200% text zoom, accept no lost content, clipped action, overlapping badge or sideways page scroll. Informed by [Responsive Web Design](https://alistapart.com/article/responsive-web-design/) and [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html).

12. **Give Cart, Search and filters their own mobile hierarchy.** In Cart, separate item identity, quantity, price, delivery progress and checkout even when names wrap. In Search and Collection, keep query/category, result count, sort and filters discoverable without stacking toolbars across the first screen. Any sticky summary or filter control must leave enough room for content and never cover keyboard focus.

## Task Plan

Effort: **S** under 2 hours, **M** half-day, **L** 1–2 days, **XL** needs breakdown. Risk is the chance that the change itself breaks live behaviour.

### Milestone 0: Safety net

| ID | Task | Description and affected areas | Acceptance criteria | Effort | Change risk | Depends on |
| --- | --- | --- | --- | --- | --- | --- |
| M0.1 | Record the mobile release matrix | Turn the existing 390px checklist into a short manual record for Home, Collection, Product, Cart, Search, Story, Visit, Contact and 404. Include 320/390/430, landscape, 200% text zoom and reduced motion. Affects `.planning/phases/03-launch/DIRECTION.md` or a new `docs/release-checklist.md`. | A release can show pass/fail evidence for every page/state; console and network errors are recorded; no spawned browser remains open. | M | Low | None |
| M0.2 | Add Theme Check CI | Add a minimal GitHub Actions workflow that installs current Shopify CLI and runs `npm run check`. Decide whether the existing 28 warnings are fixed first or stored as a temporary baseline. Affects `.github/workflows/`, `package.json`. | Every pull request runs Theme Check; new warnings fail; the documented local command matches CI. | M | Low | None |
| M0.3 | Capture performance baselines | Record Lighthouse mobile results and request counts for Home, Search and Product before changes. Affects `docs/` only. | Baseline includes profile, date, URL, key scores, eager/lazy image counts and screenshots. | S | None | None |

### Milestone 1: Critical correctness and design authority

| ID | Task | Description and affected areas | Acceptance criteria | Effort | Change risk | Depends on |
| --- | --- | --- | --- | --- | --- | --- |
| M1.1 | Resolve the canonical design system | Decide whether the 2026 Candlelight direction or the absent Brand Guidelines v1.0 governs. Merge the approved palette, type roles, font files, spacing and accessibility rules into one tracked guide; mark old documents historical. Affects `.planning/STATE.md`, `.planning/phases/02-design-system/DESIGN.md`, `.planning/phases/03-launch/DIRECTION.md`, possibly a supplied brand guide. | One document is named canonical; live tokens can be traced to it; no active file claims a conflicting font or palette. | M | Low | None |
| M1.2 | Fix Search eager-loading logic | Group the intended Liquid condition explicitly so only the first appropriate card image is eager, while alternate and below-fold images stay lazy. Affects `snippets/card-gallery.liquid`. | Blank Search and a populated query show the same products; no more than the agreed above-fold first images are eager; carousel variants and hover images still work; Theme Check passes. | S | Medium | M0.3 |
| M1.3 | Remove Home horizontal overflow | Clip the countdown glow at the correct section boundary without clipping its visible frame or focus outlines. Affects `sections/spellbound-ritual-countdown.liquid`. | `scrollWidth <= clientWidth` at 320/390/430 and 200% zoom; glow still reads as intended; reduced-motion state remains correct. | S | Low | M0.1 |

### Milestone 2: High-leverage mobile redesign

| ID | Task | Description and affected areas | Acceptance criteria | Effort | Change risk | Depends on |
| --- | --- | --- | --- | --- | --- | --- |
| M2.1 | Build the mobile type and spacing foundation | Implement the approved display/body/UI roles, fluid type bounds and a small spacing scale. Remove role overrides which turn prices and controls into display type. Affects `assets/spellbound-custom.css`, `config/settings_data.json`, `snippets/theme-styles-variables.liquid` and touched section CSS. | Type inventory maps every role to a token; body/UI is legible at 320px and 200% zoom; product names and prices scan cleanly; no unapproved one-off mobile sizes are added. | L | High | M1.1, M0.1 |
| M2.2 | Recompose Home’s first viewport | Reduce mobile brand chrome and hero occupation while preserving the image, headline and primary action. Let the next module peek into view. Affects `blocks/_header-logo.liquid`, `sections/spellbound-hero.liquid`, potentially header settings. | At 390×844, the value proposition and primary action are clear and the next section is visible; header controls remain 44px; desktop presentation is unchanged or intentionally approved. | L | Medium | M2.1 |
| M2.3 | Adapt Collection and Search cards by viable width | Test one-column and two-column compositions against long real product names. Use content-driven breakpoints, aligned prices and touch-friendly filters; expose alternate media appropriately. Affects `templates/collection.json`, `templates/search.json`, product-card CSS/snippets and facet styles. | At 320/390/430 no title becomes an unreadable column; cards remain comparable; filter/sort targets are practical; no hover-only information; Search payload target remains met. | L | Medium | M1.2, M2.1 |
| M2.4 | Tighten the Product purchase sequence | Review gallery controls, title/price scale, exact-piece status, variant/quantity controls and trust copy before enrichment sections. Replace anonymous dots with useful thumbnails when media supports it. Affects `templates/product.json`, product details blocks and product CSS. | A buyer can inspect imagery and reach product name, price, state, variants and Add to Cauldron in a clear sequence; gallery works in portrait/landscape; primary controls are 44px-plus. | L | High | M2.1 |
| M2.5 | Narrow the drawer without changing its height | Keep `100dvh`; reduce only width/max-width, preserve row sizing and ensure the close area remains practical. Affects `snippets/theme-styles-variables.liquid` and drawer CSS only if needed. | Drawer is full-height at 320/390/430, leaves an intentional page strip, does not change Codex/browser sidebar height, and all rows/close controls remain easy to tap. | S | Low | M0.1 |
| M2.6 | Enlarge touch geometry across shared components | Increase transparent hit areas and separation for footer, visit links, facets, quantity, gallery and header utilities without making every link look like a button. Affects shared/footer/visit/product/facet CSS. | No target below 24px without a documented spacing exception; primary controls meet the 44px practical target; no visual crowding regression. | L | Medium | M2.1 |

### Milestone 3: Quality and polish

| ID | Task | Description and affected areas | Acceptance criteria | Effort | Change risk | Depends on |
| --- | --- | --- | --- | --- | --- | --- |
| M3.1 | Redesign empty Cart and blank Search states | Remove dead vertical space in Cart; give blank Search a useful prompt and a bounded discovery set instead of an unqualified full catalogue. Affects `sections/main-cart.liquid`, `sections/search-results.liquid`, template settings/copy. | Each state explains the next action in the first useful viewport; Search does not create a huge unqueried result page; populated states are unchanged. | M | Medium | M2.1, M2.3 |
| M3.2 | Tune the Inbox overlay | Configure or style the Shopify Inbox launch button so it does not cover product controls, form fields or sticky cart UI; consider context-sensitive suppression only if the app supports it. Affects Shopify app settings and possibly narrowly scoped CSS. | Overlay clearance verified on all core pages at 320/390/430; chat remains discoverable and keyboard accessible. | M | Medium | M0.1 |
| M3.3 | Add responsive brand image variants | Replace oversized asset fallbacks with phone-appropriate formats/variants or ensure selected Shopify images are the default path. Optimise the fallback logo. Affects brand assets, hero/page-hero/logo snippets. | Mobile receives appropriately sized WebP/AVIF or CDN variants; no layout shift; visual fidelity approved; Home performance target met. | M | Medium | M0.3 |
| M3.4 | Clean custom lifecycle and dead code | Add footer listener cleanup/guard for theme-editor reloads; confirm and remove the unused local wishlist if no external dependency exists. Affects `sections/spellbound-footer.liquid`, `assets/spellbound-wishlist.js`. | Repeated section reloads create one listener set; footer cat still works; wishlist behaviour is supplied by one documented system. | M | Medium | M0.2 |
| M3.5 | Clear Theme Check and setup drift | Resolve or approve all 28 warnings, remove deprecated `@shopify/theme` setup, and pin the dev MCP to an approved version/update policy. Affects warning files, `README.md`, `.mcp.json`. | Theme Check is warning-free or uses a written temporary baseline; a clean clone follows current setup without deprecation warnings; tool version changes are intentional. | M | Low | M0.2 |
| M3.6 | Clarify Home heading structure | Keep the visible hero as the sole meaningful page `h1` or document why a second is required. Affects `sections/header.liquid` or hero semantics. | Heading outline has one clear page title; Lighthouse and screen-reader smoke check remain clean. | S | Low | M0.1 |

### Quick wins

| Task | Impact | Effort |
| --- | --- | --- |
| Correct the Search eager-loading condition (`snippets/card-gallery.liquid:137-140`). | Large mobile payload reduction on Search. | S |
| Clip the countdown glow at its section boundary (`sections/spellbound-ritual-countdown.liquid:8-12`). | Removes the only verified 390px page overflow. | S |
| Change drawer width only; preserve `100dvh` (`snippets/theme-styles-variables.liquid:616-618`). | Matches the requested mobile feel with a contained change. | S |
| Remove the duplicate Home heading after checking outline (`sections/header.liquid:313-315`). | Cleaner semantics. | S |
| Update deprecated setup and pin the dev MCP (`README.md:19-25`; `.mcp.json:3-8`). | More predictable onboarding. | S |

### Implementation sketches for the top three tasks

#### A. Resolve the canonical design system

1. Put the 2026 launch direction and the referenced Brand Guidelines v1.0 side by side. If the latter exists outside the repo, add an approved copy or a tracked summary.
2. Ask the owner to choose the actual heading, body and UI faces. Record font licences/files, palette values, text contrast floor, spacing scale and mobile type bounds.
3. Make one token table the source of truth. Map each live variable in `assets/spellbound-custom.css:37-65` and each setting in `config/settings_data.json:3-34` to it.
4. Mark the amethyst `DESIGN.md` historical rather than deleting useful context.
5. Gotcha: do not blindly restore Inter because an older file says so. The later CSS may reflect a real client decision; the missing evidence is the defect.

#### B. Build the mobile type and spacing foundation

1. Inventory rendered roles: hero display, page title, section title, product title, body, price, metadata, field, filter and button. Record decorative eyebrows/kickers/overlines for removal rather than assigning them a token.
2. Define semantic tokens for those roles, then use `clamp()` only for display/section scales. Keep body/UI stable enough to survive 200% zoom.
3. Move price, filters, quantity, forms and utility links off the decorative display role. Keep Cinzel/Cormorant for selected moments approved in M1.1.
4. Test with the longest real product names and content, not placeholder text, at 320/390/430 and 200% zoom.
5. Gotcha: `spellbound-custom.css` overrides Horizon’s generated variables after they load (`layout/theme.liquid:42-46`), so changing only Theme settings will not change the rendered result.

#### C. Fix Search loading and comparison behaviour

1. Replace the ambiguous Liquid expression with nested conditions or an explicitly grouped equivalent whose intent is obvious: first media only, and only for the truly early section/card context.
2. Measure eager/lazy images on blank Search, a populated query and Collection. Verify the first visible images still arrive quickly and alternate slides remain lazy.
3. Limit blank Search discovery to a deliberate small set and introduce its prompt before the product list.
4. Test long titles and alternate media at 320/390/430; select a content-driven card breakpoint.
5. Gotcha: Liquid logical precedence is the root issue. A cosmetic `loading="lazy"` change inside the image snippet can be overridden by this caller and may harm LCP elsewhere.

## Open Questions

1. Where is **Brand Guidelines v1.0 (May 2024)**, and did the client explicitly approve Cinzel Decorative plus Cormorant Garamond after the 5 July 2026 Candlelight brief? This decides the type and palette target.
2. Is the primary mobile customer profile mostly Alison’s existing local audience, social-media discovery traffic, or both? That affects how much first-screen space should go to story versus product discovery.
3. Does Shopify Inbox produce meaningful enquiries or sales? If so, it should be repositioned carefully; if not, removing the launcher from small screens may be the better trade.
4. Should blank Search act as a curated discovery page, or should it remain empty until a query is entered?
5. For one-of-a-kind crystals, are alternate/detail/scale images available consistently enough to justify thumbnail gallery work?
6. Is 90+ Lighthouse mobile Performance on Home/Search an acceptable target, and which network/device profile should be the release baseline?
7. Are the celestial, chakra and interactive footer modules important conversion/brand assets, or are any candidates for lighter mobile treatment?
