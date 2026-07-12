# Totally Spellbound — Style Reference
> Shifting amethyst depths on frosted glass

> **Historical document:** this amethyst direction is superseded by the current launch direction. Do not implement it as the active system.
>
> **Standing owner rule — no eyebrows:** never place a small uppercase, widely tracked “eyebrow”, “kicker” or “overline” above a heading as decorative hierarchy. This is a generic AI-layout tell and is not part of Totally Spellbound's visual language. If the words add meaning, make them part of the heading or supporting copy. If they do not, remove them. Functional badges, form labels and status text are separate patterns and must describe real information.

**Theme:** dark
**Derived from:** `refs/monopo-saigon/DESIGN.md` (structure, typography, spacing kept; palette swapped to purple/violet with warm gold accents)

Totally Spellbound operates with a sophisticated dark aesthetic, employing a backdrop of organic, shifting violet gradients that give the impression of fluid, sculpted surfaces. The UI elements are minimal and translucent, appearing as if etched onto or floating within this rich, atmospheric background. Typography is stark white against dark, providing a strong contrast for readability while maintaining an understated, mystical elegance. The overall impression is one of artful depth and a restrained, almost ethereal digital presence — the inside of a candlelit crystal shop after dark.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Midnight Canvas | `#000000` | `--color-midnight-canvas` | Primary background for pages, cards, and dark-themed sections |
| Frost White | `#ffffff` | `--color-frost-white` | Primary text color, link defaults, borders for ghost components, and accents against dark backgrounds. Used for text on primary buttons |
| Deep Shadow | `#181818` | `--color-deep-shadow` | Secondary text in footers and less prominent information. Subtly darker borders |
| Whisper Gray | `#6d6d6d` | `--color-whisper-gray` | Muted body text and auxiliary text where lower contrast is desired |
| Misty Gray | `#636363` | `--color-misty-gray` | Background for subtle, low-contrast interactive elements like the cookie consent button |
| Amethyst | `#8b5cf6` | `--color-amethyst` | Primary brand accent — violet for active links, hover states, focus rings |
| Deep Plum | `#581c87` | `--color-deep-plum` | Deeper violet for pressed states, secondary surfaces, and shadow tints |
| Warm Gold | `#d97706` | `--color-warm-gold` | Warm accent for highlights, "Add to Cauldron" emphasis, and gradient terminus |
| Amethyst Veil Gradient | `linear-gradient(90deg, rgb(196, 181, 253), rgb(139, 92, 246) 50%, rgb(217, 119, 6))` | `--color-amethyst-veil-gradient` | Atmospheric background for hero sections and full-bleed visual elements, creating an immersive, fluid environment |

## Tokens — Typography

### Roobert — Primary brand typeface for all headings, body text, links, and buttons. Its wide range of weights and sizes supports a detailed typographic hierarchy, from subtle metadata to commanding display text. The default 'normal' letter spacing keeps it highly legible. · `--font-roobert`
- **Substitute:** system-ui, sans-serif
- **Weights:** 300, 400, 600
- **Sizes:** 11px, 12px, 16px, 18px, 29px, 30px, 39px, 45px, 54px, 78px, 94px, 225px
- **Line height:** 0.70, 0.76, 1.10, 1.15, 1.19, 1.21, 1.22, 1.24, 1.25, 1.36, 1.39, 1.58, 1.82
- **Letter spacing:** normal
- **Role:** Primary brand typeface for all headings, body text, links, and buttons. Its wide range of weights and sizes supports a detailed typographic hierarchy, from subtle metadata to commanding display text. The default 'normal' letter spacing keeps it highly legible.

### Raleway — Used for specific heading elements, providing an alternative, slightly more classic feel than Roobert. · `--font-raleway`
- **Substitute:** serif
- **Weights:** 400
- **Sizes:** 54px
- **Line height:** 1.39
- **Letter spacing:** normal
- **Role:** Used for specific heading elements, providing an alternative, slightly more classic feel than Roobert.

### system-ui — system-ui — detected in extracted data but not described by AI · `--font-system-ui`
- **Weights:** 400
- **Sizes:** 9px, 16px
- **Line height:** 1.15, 1.32
- **Role:** system-ui — detected in extracted data but not described by AI

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 11px | 1.58 | — | `--text-caption` |
| body | 16px | 1.25 | — | `--text-body` |
| subheading | 18px | 1.22 | — | `--text-subheading` |
| heading-sm | 29px | 1.21 | — | `--text-heading-sm` |
| heading | 39px | 1.15 | — | `--text-heading` |
| heading-lg | 54px | 1.39 | — | `--text-heading-lg` |
| display | 225px | 0.7 | — | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** spacious

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 28 | 28px | `--spacing-28` |
| 40 | 40px | `--spacing-40` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 68 | 68px | `--spacing-68` |
| 152 | 152px | `--spacing-152` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 10px |
| buttons | 75.024px |

### Layout

- **Page max-width:** 1078px
- **Section gap:** 46px
- **Card padding:** 34px
- **Element gap:** 14px

## Components

### Ghost Button - Light Border
**Role:** Interactive element allowing light interaction without dominating the dark background. Features a very subtle border.

Background: rgba(0, 0, 0, 0), Text: #ffffff, Border: 1px solid rgba(255, 255, 255, 0.3) on top only, Radius: 75.024px, Padding: 1px 6px.

### Text Link Button
**Role:** Minimal interactive element, appearing as simple text. Used for navigation and tertiary actions.

Background: rgba(0, 0, 0, 0), Text: #ffffff, No border, Radius: 0px, Padding: 0px.

### Filled Cookie Consent Button
**Role:** Primary action button within transient UI elements like cookie consent pop-ups. Offers a clear, actionable contrast.

Background: rgba(55, 55, 55, 0.78), Text: #ffffff, Border: 1px solid #ffffff, Radius: 75.024px, Padding: 11.232px 33.696px.

### Dark Text Link Button
**Role:** Minimal interactive element for navigation and tertiary actions, in context where text color should be white.

Background: rgba(0, 0, 0, 0), Text: #ffffff, No border, Radius: 0px, Padding: 0px.

### Information Card Overlay
**Role:** Base card element for presenting content. Designed to blend seamlessly into the background, letting content take precedence.

Background: rgba(0, 0, 0, 0), Border-radius: 0px, No shadow, Padding: 0px.

## Do's and Don'ts

### Do
- Prioritize Roobert as the primary typeface for all textual content, utilizing its diverse weights to establish hierarchy.
- Maintain a spacious layout with a base unit of 4px and aim for an element gap of 14px to ensure visual breathing room.
- Use Midnight Canvas (#000000) for all primary backgrounds and Frost White (#ffffff) for primary text to ensure high contrast.
- Apply a border-radius of 75.024px to all buttons for a distinctly rounded, pill-like appearance.
- Implement the Amethyst Veil Gradient (linear-gradient(90deg, rgb(196, 181, 253), rgb(139, 92, 246) 50%, rgb(217, 119, 6))) as a background for hero and large interactive sections.
- Ensure interactive elements like buttons and links use Frost White (#ffffff) text against dark backgrounds unless a specific muted tone (Whisper Gray #6d6d6d) is explicitly called for.
- Use a subtle 1px border with rgba(255, 255, 255, 0.3) for ghost buttons to maintain a minimalist aesthetic.
- Reserve Warm Gold (#d97706) for emphasis moments — "Add to Cauldron" buttons, in-stock badges, special-offer ribbons.

### Don't
- Avoid using harsh, saturated accent colors outside the violet/gold range that would disrupt the site's subdued and atmospheric palette.
- Do not introduce square or sharp borders on interactive elements; button radii should always be 75.024px.
- Refrain from using strong box-shadows or heavy elevation, as the design relies on gradient depth rather than layered elements.
- Do not deviate from the specified Roobert and Raleway font families; avoid generic system fonts for branding elements.
- Avoid tight information density; maintain spacious relationships between elements and sections.
- Do not treat #636363 as a primary action color; reserve it for specific, muted interactive elements like secondary consent buttons.
- Never use solid color backgrounds in feature sections where the organic gradient is intended to create atmosphere.
- Do not pair Amethyst with green or red accents — keep the supporting palette in the violet-to-gold spectrum.

## Elevation

The design intentionally avoids traditional box-shadows. Instead, depth and hierarchy are communicated through the use of rich, organic violet gradients and nuanced color tints on textual and interactive elements, giving the impression of elements floating or subtly recessed within a volumetric space rather than casting shadows upon a flat surface.

## Imagery

The site deploys abstract, organic violet gradients and translucent spherical shapes as primary background visuals, creating a sense of depth and fluid motion. There is an absence of traditional photography or illustrations in chrome areas; product photography for crystals appears within content cards and benefits from the dark backdrop. Icons (if present) are minimal, outlined, and monochromatic, matching the overall dark and understated UI. The visual density is image-heavy in terms of atmospheric graphics, but text-dominant for content presentation, allowing the background to provide mood without distracting from information.

## Layout

The page primarily uses a full-bleed layout for its immersive background gradients, with content contained within a consistent max-width of 1078px, centered on the screen. The hero section features a large, centered headline directly on the animated gradient background. Sections maintain a consistent vertical rhythm, with generous section gaps of 46px. Content elements are typically stacked or arranged in minimal two-column text-left/image-right patterns (where 'image' refers to the abstract gradient visuals or crystal photography), but all elements appear to live within the main content well. The header is a sticky top navigation bar with minimal text links.

## Agent Prompt Guide

Quick Color Reference:
text: #ffffff
background: #000000
border: rgba(255, 255, 255, 0.3)
accent: #8b5cf6 (Amethyst)
primary action: #8b5cf6 (Amethyst) with #d97706 (Warm Gold) for emphasis CTAs

Example Component Prompts:
1. Create a primary page section: Full-bleed background with Amethyst Veil Gradient. Headline 'United, Unbound' using Roobert weight 400 at 54px, color Frost White (#ffffff), centered within the 1078px max-width content area.
2. Create a ghost navigation button: Text 'SHOP' using Roobert weight 400 at 16px, color #ffffff. Background transparent. Top border 1px solid rgba(255, 255, 255, 0.3). Radius 75.024px. Padding 1px 6px.
3. Create an "Add to Cauldron" primary CTA: Text 'Add to Cauldron' using Roobert weight 600 at 16px, color Frost White (#ffffff). Background Amethyst (#8b5cf6). Border 1px solid Warm Gold (#d97706). Radius 75.024px. Padding 11.232px 33.696px.

## Similar Brands

- **Stripe** — Uses dark backgrounds with subtle lighting effects and large, clean typography for a sophisticated feel.
- **Apple (services pages)** — Employs immersive, full-bleed backgrounds often with abstract or gradient visuals and prominent, minimalist text overlays.
- **Framer** — Features a dark, developer-focused UI with precise typography and a minimalist approach to components, emphasizing content over heavy chrome.
- **monopo saigon** — Direct structural ancestor for this style. Same dark frosted aesthetic; we swap the warm green/orange/red gradient for amethyst/violet/gold.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Colors */
  --color-midnight-canvas: #000000;
  --color-frost-white: #ffffff;
  --color-deep-shadow: #181818;
  --color-whisper-gray: #6d6d6d;
  --color-misty-gray: #636363;
  --color-amethyst: #8b5cf6;
  --color-deep-plum: #581c87;
  --color-warm-gold: #d97706;
  --color-amethyst-veil-gradient: #8b5cf6;
  --gradient-amethyst-veil: linear-gradient(90deg, rgb(196, 181, 253), rgb(139, 92, 246) 50%, rgb(217, 119, 6));

  /* Typography — Font Families */
  --font-roobert: 'Roobert', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-raleway: 'Raleway', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-system-ui: 'system-ui', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 11px;
  --leading-caption: 1.58;
  --text-body: 16px;
  --leading-body: 1.25;
  --text-subheading: 18px;
  --leading-subheading: 1.22;
  --text-heading-sm: 29px;
  --leading-heading-sm: 1.21;
  --text-heading: 39px;
  --leading-heading: 1.15;
  --text-heading-lg: 54px;
  --leading-heading-lg: 1.39;
  --text-display: 225px;
  --leading-display: 0.7;

  /* Typography — Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-28: 28px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-68: 68px;
  --spacing-152: 152px;

  /* Layout */
  --page-max-width: 1078px;
  --section-gap: 46px;
  --card-padding: 34px;
  --element-gap: 14px;

  /* Border Radius */
  --radius-lg: 10px;
  --radius-full: 75.024px;

  /* Named Radii */
  --radius-cards: 10px;
  --radius-buttons: 75.024px;
}
```

### Tailwind v4

```css
@theme {
  /* Colors */
  --color-midnight-canvas: #000000;
  --color-frost-white: #ffffff;
  --color-deep-shadow: #181818;
  --color-whisper-gray: #6d6d6d;
  --color-misty-gray: #636363;
  --color-amethyst: #8b5cf6;
  --color-deep-plum: #581c87;
  --color-warm-gold: #d97706;

  /* Typography */
  --font-roobert: 'Roobert', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-raleway: 'Raleway', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-system-ui: 'system-ui', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-caption: 11px;
  --leading-caption: 1.58;
  --text-body: 16px;
  --leading-body: 1.25;
  --text-subheading: 18px;
  --leading-subheading: 1.22;
  --text-heading-sm: 29px;
  --leading-heading-sm: 1.21;
  --text-heading: 39px;
  --leading-heading: 1.15;
  --text-heading-lg: 54px;
  --leading-heading-lg: 1.39;
  --text-display: 225px;
  --leading-display: 0.7;

  /* Spacing */
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-28: 28px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-68: 68px;
  --spacing-152: 152px;

  /* Border Radius */
  --radius-lg: 10px;
  --radius-full: 75.024px;
}
```
