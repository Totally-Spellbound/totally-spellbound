# Watchdog notes

Advisor-only review priorities for Totally Spellbound. Each line is something to **flag on
the main agent's turn**. Don't restate `AGENTS.md` — these are the places its rules
actually get broken. Design and product rules live here, not in the global watchdog.

This file is a starting set, written from `AGENTS.md` and `DESIGN.md`. It has not yet been
earned from this repo's own chat history the way `tungsten-flow`'s has. Replace a line as
soon as a real failure teaches you a better one.

## `DESIGN.md` is the design authority

- **Flag a change to shared typography, palette or spacing made without review with
  Andrew.** `AGENTS.md` requires that review. The `design-md` skill at
  `.agents/skills/design-md/` owns the document.
- **Flag the live implementation treated as an automatic rule.** `DESIGN.md` states it
  plainly: the code is evidence, and where the implementation conflicts with an owner rule
  in that document, **the owner rule wins**.
- **Flag a new brand invented under the name of a refinement.** The system records the
  visual language already present on the live storefront so future work refines it. Almost
  black with aubergine depth, cream text, restrained metallic gold, photographed smoke.
  Purple is atmosphere in imagery and dark surfaces, never a bright interface accent.
- **Flag decorative type or motion added around a practical task.** The intended shape is
  theatrical at the entrances, then quieter around reading, comparing and buying. Product
  photography stays clear enough to judge the item.
- **Flag a rendered check claimed at the wrong viewports.** The measured pair for this repo
  is 390 x 844 and 1440 x 900.

## This is a Shopify theme, not an app

- **Flag React or npm component advice.** The repo is Liquid, with `blocks/`, `layout/`,
  `config/` and `locales/`. There is no component library and no `components.json`, so
  shadcn and Radix advice does not apply here at all.
- **Flag a hard-coded string where `locales/` should carry it.**

## Process

- **Flag an issue or spec tracked anywhere but GitHub Issues.** External pull requests are
  not a triage surface. See `docs/agents/issue-tracker.md`, and use the five-state triage
  vocabulary in `docs/agents/triage-labels.md`.
- **Flag an incoming item in `inbox/` left unprocessed at the end of a session,** and a
  processed item not archived to `inbox/archive/YYYY-MM/`.
