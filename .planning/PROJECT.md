# Totally Spellbound

## What This Is

An online Shopify store for Totally Spellbound — Alison's independent crystal and spiritual products shop. The website should feel like visiting the physical store: curated, informative, and genuinely helpful. It's both a shop and a resource, where customers can buy products but also learn about crystals, star signs, and spiritual practices.

## Core Value

A thoughtful, independent e-commerce experience that gently guides customers to the right products — helpful like a conversation in the shop, never pushy.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- ✓ Shopify admin setup — products, collections, star sign categories configured in store backend
- ✓ "Add to Cauldron" branding concept — confirmed by Alison as a keeper

### Active

<!-- Current scope. Building toward SLC (Simple, Lovable, Complete). -->
<!-- Approach: skeleton first (structure, layout, wiring), then design layer on top. -->
<!-- Existing theme code is a rough starting point — most frontend will be rebuilt. -->

- [ ] Foundation rebuild — clean skeleton structure for all core pages (home, product, collection, cart)
- [ ] Dark/gothic visual design done tastefully — purple/dark palette, handmade feel, not cheap or template-looking
- [ ] Light/dark theme toggle — Alison prefers dark, her staff prefer light
- [ ] Subtle homepage animations and interactive elements (parallax, hover effects, movement)
- [ ] Smart search bar — type a query, see products instantly with category context
- [ ] Search suggestions — "this might also interest you" style gentle upselling
- [ ] Shop by star sign — curated collections feel personalized and thoughtful
- [ ] "Proudly independent" messaging — support a real person, not a corporation
- [ ] Physical shop awareness — "did you know we have a shop?" somewhere on homepage
- [ ] Events page — craft fairs, live sessions, displayed as a flowing visual timeline
- [ ] Product detail enrichment — crystal properties, uses, complementary products

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- AI-powered search oracle / chatbot — v2 feature, SLC first
- Astronomical/astrological live tracking (moon phases, planet positions) — v2, requires external data integration
- Dynamic homepage content tied to celestial events ("Jupiter rising this week...") — v2, powerful but complex
- Deep educational resource pages per crystal/star sign — v2, content-heavy
- Mobile app — web-first, Shopify handles mobile responsiveness

## Context

- **Owner**: Alison (65) — runs Totally Spellbound, a witchy/gothic crystals and gifts shop on a small village highstreet in Sutton-in-Ashfield, England. Not tech-savvy but willing to learn. Speaks plainly, appreciates warm explanations with no jargon.
- **Products**: Under 50 items, £1-£65. Crystals (tumble stones, points, spears), incense, witchy/gothic gifts. Wholesale sourced + custom laser-engraved and 3D printed items (competitive advantage).
- **Revenue**: Shop takings £100-250/week. Online sales currently £0. Goal: extra £100-200/week online within 6 months.
- **Family team**: Andrew (tech lead, this repo), Aaron (initial Shopify setup), Kirsty (daughter, runs Facebook/socials/lives), sons paying for Shopify.
- **Previous online failure**: Had a website for over a year — 1 sale. Traffic problem, not content. eBay worked until fees killed it.
- **Competitors**: Fenix Flame (local, Sutton-in-Ashfield), Inspirations (Mansfield, may not have website). National competitors not yet researched.
- **Existing codebase**: Horizon-based Shopify theme. Existing frontend is a rough first pass — most will be rebuilt skeleton-first. Shopify admin config (products, collections, star sign categories) is the real foundation to build on.
- **Store**: `totally-spellbound-2.myshopify.com`
- **Brand personality**: Independent, friendly, helpful, wholesome, knowledgeable — "I don't just want to make a sale"
- **Design inspiration**: mage-467 (interactive dark site), monopo.vn (smooth animations), Marina Abramovic Traces (immersive experience). Purple/dark palette preferred. Must feel thoughtful, handmade, and indie — never corporate or template-looking.
- **Tools ecosystem**: Shopify Basic (£25/mo), Xyla AI for social auto-posting (£29/mo), Shopify POS for in-shop sales, Photoroom for product photos. Shopify Sidekick for plain-English store management.

## Constraints

- **Tech stack**: Shopify Liquid theme — no custom backend, must work within Shopify's theme architecture
- **Content**: Alison needs to provide crystal/product knowledge for enrichment — can't be fully automated
- **Design**: Gothic aesthetic must be tasteful, not cheap. Readability is critical (Alison can't read white-on-black easily)
- **Audience**: Range from crystal-savvy to total beginners — can't assume knowledge
- **Independence**: Must feel like a small, real shop — not over-designed or corporate
- **Alison's time**: Max ~30 mins/week on "tech stuff" — website must be low-maintenance once built
- **Budget**: Sons cover Shopify (£25/mo), Xyla from online revenue (£29/mo). No budget for premium tools/services
- **Personalisation advantage**: Laser engraver + 3D printer = custom products most online crystal shops can't offer. Website must showcase this

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| SLC approach — ship functional shop first, enrich later | Alison and Andrew agreed: get a working, themed store first, then layer intelligence and content | — Pending |
| Rebuild frontend from skeleton up | Existing theme was a quick first attempt — rebuild foundationally rather than patching. Keep Shopify admin setup, rip out most theme code | — Pending |
| Dark/gothic palette with light theme toggle | Alison likes dark + purple, but acknowledges not everyone does. Light toggle solves both | — Pending |
| "Add to Cauldron" instead of "Add to Cart" | Aaron's idea — Alison loves it. Small touches that show thoughtfulness | ✓ Good |
| AI oracle deferred to v2 | Powerful feature but complex — SLC first, oracle second | — Pending |
| Star sign collections as curation strategy | Makes products feel personally curated — Andrew and Alison both excited about this | — Pending |

---
*Last updated: 2026-03-22 after transcript synthesis and codebase mapping*
