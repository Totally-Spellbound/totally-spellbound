# Design Direction

**Date:** 2026-03-22

## Inspiration Sites (from transcript + Andrew's list)

### mage-467 (mage.ai)
- **What Alison liked:** Interactive cursor effects, the movement, the dark palette
- **Design patterns:** Dark base, purple/blue glowing accents, bold large typography, bento-style content blocks, smooth scroll animations
- **Tags:** Dark, Colourful, Interactive, Animation, Large Type

### Threads (threads-979)
- **What Alison liked:** The colors (purple/pink particles on black), the movement
- **Design patterns:** Particle system on dark background, gradient color (pink/purple/orange on black), minimal text, immersive feel
- **Tags:** Dark, Gradient, Interactive, Minimal

### Wope (wope-937)
- **What we liked:** Purple palette on dark, bento grid layout
- **Design patterns:** Deep purple/black, animated cards, gradient accent highlights, bento grid with varied card sizes, glass effects
- **Tags:** Animation, Bento Grid, Colourful, Dark, Gradient, Microinteractions

### Monopo Vietnam (monopo.vn)
- **What Alison liked:** "That's nice" — the fluid, organic animation, the colors
- **Design patterns:** Organic fluid 3D animation, glass sphere, dark + golden/amber tones, extreme minimalism, premium feel, smooth page transitions
- **Tags:** Dark, Subtle, 3D, Animation

### Marina Abramovic Traces
- **What Andrew liked:** The immersive experience, floating celestial objects, entering a world
- **Design patterns:** Floating orbs/planets in dark space, interactive light, parallax depth, audio
- **Tags:** Art, Animation, Interactive, Light, 3D, Parallax

## Extracted Design DNA for Totally Spellbound

### Color
- **Base:** Deep black / near-black (#0a0a0a range, NOT dark brown or dark red)
- **Primary accent:** Purple / violet gradients (from the Wope/Threads palette)
- **Secondary:** Warm gold / amber touches (from Monopo)
- **Text:** High-contrast off-white for readability (Alison's requirement — she can't read white-on-black easily, so needs careful contrast)
- **Light theme:** Must exist as a toggle — inverted palette for accessibility

### Typography
- **Headings:** Large, bold, likely serif or display serif for mystical/handcrafted feel
- **Body:** Clean sans-serif for readability
- **Scale:** Generous — big headings, comfortable body text. Not cramped.

### Motion & Interaction
- **Cursor effects:** Light/glow follows mouse (Mage-style) — homepage hero area only, not annoying everywhere
- **Scroll animations:** Elements fade/float in as you scroll (not aggressive — subtle reveal)
- **Page transitions:** Smooth, fluid (Monopo-style)
- **Hover states:** Cards/products react to hover — glow, lift, subtle scale
- **Constraint:** Must not be annoying. Alison specifically called out a bat-cursor site that was too much. Subtle > flashy.

### Layout
- **Spatial:** Generous whitespace (darkspace). Objects float in space, not packed into tight grids
- **Bento-style cards:** Varied sizes for products/categories (Wope-style), not uniform product grids
- **Sections:** Clear visual separation between homepage zones, each with its own character
- **Mobile:** Must work — most customers will be on phones from social media links

### Feel
- **Immersive:** Like entering a world, not browsing a catalog
- **Handmade:** Must feel like someone crafted this, not picked a template
- **Organic:** Flowing, natural shapes — not sharp geometric corporate
- **Mystical but accessible:** Gothic/witchy atmosphere without alienating beginners
- **Independent:** Should feel personal, like you're visiting someone's curated space

## Anti-Patterns (What NOT to do)

- Dark brown/maroon backgrounds (Fenix Flames)
- Script/cursive logos that look like cheap Halloween fonts
- Uniform product grids with no visual hierarchy
- Static pages with no interaction whatsoever
- Over-the-top animations that follow you everywhere (the bat cursor problem)
- Template-looking layouts where you can tell it's a stock theme
- Corporate/clean/minimalist in a way that strips all personality

## Shopify Constraints

These design ambitions need to work within Shopify's Liquid theme architecture:
- Custom CSS in `assets/` for all visual styling (no Tailwind or build step)
- Custom JavaScript modules for interactions (cursor effects, scroll animations, transitions)
- Liquid sections/blocks for content structure (editable via Shopify admin)
- No server-side rendering of dynamic effects — all client-side JS
- Must be performant on mobile devices
- Theme settings schema for light/dark toggle, color customisation

---
*Design direction captured: 2026-03-22*
*Sources: Transcript (Alison + Andrew conversation), Godly.website references, Chrome DevTools visual review*
