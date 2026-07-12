# Mobile Storefront Design Upgrade

## Problem Statement

Totally Spellbound has a strong candlelit identity, but the current mobile storefront makes shopping harder than it needs to be. Decorative typography is used across headings, body copy, prices and controls; tall brand chrome delays products and buying controls; narrow two-column cards struggle with real product names; small hit areas recur across utility pages; the menu drawer covers nearly the whole screen; and one Search condition eagerly loads far more product imagery than customers can see. The site also has conflicting design documentation, so a well-intentioned change can follow an obsolete direction and still be wrong.

The customer should feel the character of Alison's shop immediately while still being able to read, compare and buy without working through visual theatre. The upgrade must improve the mobile experience without flattening the brand, replacing Shopify Horizon, or changing the full-height behaviour of the navigation drawer.

## Solution

Refine the mobile storefront as a content-led composition. Establish one current design authority, separate expressive display typography from readable shopping typography, and use mobile-specific hierarchy for Home, Collection, Search, Product, Cart and content pages. Preserve the Candlelight atmosphere, language and imagery, but make the first useful viewport, product comparison, purchase path and shared controls easier to scan and touch.

The work will also correct the verified Search image-loading defect, remove Home's horizontal overflow, reduce only the navigation drawer's width, tune empty states and the Inbox overlay, and add a lightweight Shopify-native release gate. Success will be judged at the rendered-storefront seam: real pages and real catalogue content at 320px, 390px and 430px, backed by Theme Check and targeted network measurements.

## User Stories

1. As a mobile shopper, I want body copy to be easy to read, so that I can understand products without zooming or rereading ornate letterforms.
2. As a mobile shopper, I want product names and prices to have distinct roles, so that I can compare products quickly.
3. As a mobile shopper, I want decorative typography reserved for meaningful moments, so that the brand feels special without obscuring utility.
4. As a mobile shopper, I want text over candlelit imagery to remain readable throughout any movement or crop, so that atmosphere never hides information.
5. As a mobile shopper, I want the Home page's first screen to communicate what the shop sells and offer one clear action, so that I can start browsing immediately.
6. As a returning shopper, I want the mobile header to take less vertical space, so that I can reach products faster.
7. As a mobile shopper, I want a hint of the next Home section beneath the hero, so that the page reads as a shop rather than a splash screen.
8. As a mobile shopper, I want collection cards to remain readable with long real product names, so that I can compare items without decoding narrow text columns.
9. As a mobile shopper, I want Search cards to follow the same comparison hierarchy as Collection cards, so that moving between discovery surfaces feels consistent.
10. As a mobile shopper, I want filters and sorting to be easy to find and tap, so that I can narrow the catalogue with one hand.
11. As a mobile shopper, I want controls to respond reliably even when their visible icon is delicate, so that missed taps do not interrupt shopping.
12. As a mobile shopper, I want the navigation drawer to remain full height but leave more of the page visible, so that I keep my orientation while navigating.
13. As a mobile shopper, I want every drawer row and the close control to have a generous hit region, so that the narrower drawer remains comfortable to use.
14. As a mobile shopper, I want Product imagery to reveal texture, inclusions and scale, so that I can judge a one-of-a-kind piece confidently.
15. As a mobile shopper, I want obvious touch controls for alternate Product imagery, so that I do not have to guess what dots or hover behaviour mean.
16. As a mobile shopper, I want Product imagery to work in portrait and landscape, so that I can inspect details in the orientation that suits the item.
17. As a prospective buyer, I want product name, price, exact-piece or stock state, variants and Add to Cauldron to form one clear sequence, so that buying feels straightforward.
18. As a prospective buyer, I want delivery threshold and click-and-collect reassurance near the purchase action, so that common questions are answered at the decision point.
19. As a mobile shopper, I want lore, chakra and celestial material to follow rather than interrupt purchase controls, so that rich brand content supports the sale.
20. As a shopper with an empty Cart, I want a compact explanation and obvious next action in the first useful screen, so that I can return to shopping without crossing dead space.
21. As a shopper opening Search before entering a query, I want a clear prompt and a deliberate discovery set, so that I am not dropped into an enormous unqualified catalogue.
22. As a mobile shopper, I want visible product imagery to arrive quickly while unseen media waits, so that Search feels responsive on a mobile connection.
23. As a mobile shopper, I want the page to stay within the viewport at 320px and when text is enlarged, so that I never have to chase content sideways.
24. As a shopper using reduced motion, I want all information and controls without scale, parallax or repeating movement, so that the experience remains comfortable and complete.
25. As a keyboard or switch user, I want sticky and fixed controls to avoid covering focus, so that I can complete every interaction.
26. As a mobile shopper, I want the chat launcher to avoid product controls, forms and cart actions, so that support does not obstruct shopping.
27. As a customer reading Story, Visit or Contact, I want page-specific information to arrive sooner, so that a shared hero does not delay the reason I opened the page.
28. As Alison, I want the storefront to remain recognisably Totally Spellbound, so that accessibility improvements do not turn it into a generic minimalist theme.
29. As Alison, I want prices, delivery details and shop information to be readable on her own phone, so that she can confidently use and demonstrate the site.
30. As a store editor, I want design roles and tokens to have one documented authority, so that theme changes do not revive an obsolete direction.
31. As a store editor, I want section changes to continue working after Shopify theme-editor reloads, so that preview sessions do not accumulate broken interactions.
32. As a developer, I want Search image-loading intent to be explicit, so that a Liquid precedence mistake cannot silently overload mobile pages.
33. As a developer, I want a repeatable mobile review matrix, so that each release is judged against the same pages, widths and accessibility states.
34. As a developer, I want Theme Check to run automatically, so that new syntax and standards warnings cannot be merged unnoticed.
35. As a developer, I want a recorded performance baseline for Home, Search and Product, so that visual improvements do not hide a payload regression.
36. As a maintainer, I want custom presentation code split only where the upgrade touches real hotspots, so that the work improves maintainability without turning into a Horizon rewrite.
37. As the owner, I want decorative eyebrow, kicker and overline labels removed from section headings, so that the storefront does not carry a generic AI-generated design tell.

## Implementation Decisions

- The current live storefront is implementation evidence, not design approval. Generate a root `DESIGN.md` from approved Stitch screens with the repository's `design-md` skill and review it with Andrew before changing typography or palette tokens.
- Root `DESIGN.md` is the sole design authority once approved. Reconcile the live Brand Guidelines reference against it and remove any unsupported claim of authority.
- Keep Shopify Horizon's layout, section, block and theme-editor model. This is a design-system and responsive-composition upgrade, not a framework rewrite.
- Preserve the Candlelight identity: dark cinematic surfaces, warm gold interactive accents, authored imagery, shop-specific language and selected expressive moments.
- Define semantic typography roles for display, page title, section title, product title, body, price, metadata, form control and action. Expressive faces must not automatically flow into body, price, filter or field roles.
- Never use a decorative eyebrow, kicker or overline above a heading. Remove existing instances during the relevant page slice. If their wording carries meaning, integrate it into the heading or supporting copy; otherwise delete it. Functional badges, form labels and status text remain valid when they communicate real information.
- Use bounded fluid sizing for display and section headings. Keep ordinary body and product-description copy in the 16–18px range with suitable leading, subject to visual testing with real content and text enlargement.
- Use a small shared spacing scale and proximity rules. Space inside a content group must be tighter than space between page modules.
- Recompose Home's mobile hero around one primary action and reduce mobile brand chrome enough to reveal that the page continues into shopping content.
- Choose Collection and Search column counts from a minimum viable card width and real title wrapping, rather than preserving a fixed two-column arrangement at every phone width.
- Keep product photography dominant in cards. Align name, price, badge and optional quick action as one comparison unit, with no hover-only information.
- Treat the Product gallery as inspection UI. Preserve aspect ratio, touch swipe and useful zoom where supported, and prefer recognisable thumbnail previews over anonymous dots when multiple useful images exist.
- Order the Product buying sequence as imagery, name, price, exact-piece or stock state, variants, quantity and Add to Cauldron. Delivery and collection reassurance should sit close to the action; enrichment modules follow the purchase block.
- Keep the navigation drawer at full viewport height. Reduce only its width and maximum width, beginning near `min(82vw, 320px)` as a design target and validating it at all agreed phone widths.
- Enlarge hit geometry independently from visible icon or link size. Primary navigation, filters, quantity, gallery, cart and checkout controls target a practical 44px region; no control may fall below the WCAG 2.2 24px floor without a valid spacing exception.
- Correct the Search loading condition so only the intended first images in genuinely early content are eager. Alternate slides and below-fold cards remain lazy.
- Blank Search should present a query prompt and a deliberately bounded discovery set. Empty Cart should present its next action without large inherited vertical gaps.
- Home's countdown glow must be clipped at the correct section boundary without clipping its visible frame, focus outlines or intended reduced-motion state.
- Shopify Inbox must remain discoverable only if it can avoid covering content and commerce controls at the agreed widths. Prefer app configuration before theme-specific overrides.
- Brand image fallbacks should deliver device-appropriate variants or be replaced by Shopify-managed image settings. Preserve dimensions and avoid layout shift.
- Shared motion remains restrained and state-led. Reduced-motion mode removes repeating scale, translation and Ken Burns effects while keeping every control and message.
- Add a lightweight continuous-integration gate around Shopify Theme Check. Existing warnings must be fixed or explicitly baselined so new warnings fail the gate.
- Do not add a separate browser automation or component-test framework for this work. The highest and most valuable test seam is the rendered Shopify storefront with real data.
- Remove or isolate dead custom wishlist code only after confirming that the enabled Square Wishlist app is the sole active wishlist implementation.
- Add theme-editor lifecycle cleanup or a single-registration guard for document-level footer interactions touched during the upgrade.
- Preserve desktop behaviour unless a mobile change exposes a shared defect. Any intentional desktop change requires visual approval at the existing desktop review width.

## Testing Decisions

- The primary seam is the rendered storefront, because the feature is a visual and interaction upgrade whose value appears only when Shopify data, Liquid composition, CSS, JavaScript and app embeds run together.
- Test Home, Collection, Product, Cart, Search, Our Story, Visit Us, Contact and 404 at 320px, 390px and 430px.
- Repeat the core flow at 200% text zoom, in landscape and with reduced motion enabled.
- Use real long product names, real prices, one-of-a-kind product states, empty Cart, blank Search, populated Search, filters, variants and multiple-image products.
- Assert external behaviour: no page-level horizontal overflow, readable hierarchy, visible focus, unobscured controls, reliable touch targets, correct drawer dimensions and complete purchase interactions. Do not test internal selectors or implementation details as ends in themselves.
- Verify Search network behaviour by counting eager and lazy product images above and below the fold. Confirm that the first visible imagery remains prompt and unseen alternate media does not load eagerly.
- Record Lighthouse mobile results for Home, Search and Product using one agreed profile. Target at least 90 Performance and at least 95 Accessibility, Best Practices and SEO, with deviations explained rather than hidden.
- Run Shopify Theme Check locally and in continuous integration. New warnings fail the gate.
- Check the browser console and network for errors, missing requests, invalid values and dead actions on every core page.
- Exercise drawer, search, filters, sort, gallery swipe, variant selection, quantity, Add to Cauldron, Cart, Oracle and any touched custom interaction with touch emulation.
- Verify Shopify theme-editor section reloads for touched interactive sections, especially footer lifecycle and shared motion initialisation.
- Prior art is the current launch verification checklist and the existing defensive custom-script patterns: per-instance initialisation, reduced-motion handling, invalid-data guards and section-load reinitialisation.
- Capture before-and-after screenshots and measurements for any first-viewport, card-grid, drawer or Product purchase-sequence change. Review at identical dimensions.

## Out of Scope

- Replacing Shopify Horizon or migrating to another commerce platform.
- Redesigning checkout, customer accounts or Shopify-hosted authentication surfaces.
- A wholesale desktop redesign.
- Rebranding the shop, rewriting the approved voice or replacing the Candlelight identity with the obsolete amethyst direction.
- Adding new third-party apps, fonts or hotlinked assets without a separate decision.
- Building a general design system site, Storybook, Playwright suite or unit-test framework.
- Refactoring every inherited Horizon warning or large file where it does not affect this upgrade.
- Changing product data, collection taxonomy, pricing, shipping rules or shop policy content except where presentation requires approved copy.
- Treating the Codex sidebar or in-app browser dimensions as part of the storefront. The storefront drawer may change width; the Codex sidebar height and size must remain untouched.

## Further Notes

- The repository audit is the evidence base for this spec and records the file-level findings, severity, measured 390px behaviour and staged implementation plan.
- The audit found no Critical security issue. Priority is mobile usability, performance correctness and design governance.
- The current site is visually distinctive and should not be flattened. The upgrade should make the authored character easier to use.
- Wayfinder is not required before implementation because discovery and dependency mapping are already complete. It becomes useful only if implementation reveals several independent unknowns that cannot be resolved inside normal tickets.
- The work should be split into tracer-bullet implementation tickets after this spec is accepted, with the Search loading and Home overflow fixes early and the shared typography foundation before page-by-page polish.
- Apply the repository review ladder to implementation work: deslop every agent-written branch, run the standard code review when a ticket completes, and reserve the Thermos pair for the pull-request or milestone gate.
