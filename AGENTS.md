# Totally Spellbound

## Handoffs & inbox

This project participates in the cross-project handoff pattern.

- **Incoming handoffs** land in `inbox/`. Say "check inbox" at any point to process them.
- **Outgoing handoffs** go to other projects' inboxes via the global `write-handoff` skill. Say "send a handoff to {project}" to generate one.
- **Processed items** are archived to `inbox/archive/YYYY-MM/`.
- **The full map of projects** in the handoff network is at `~/Documents/01-Projects/Git/BRIDGE.md`.

## Local memory

Local memory is mirrored under `.agents/memory/`; read its `MEMORY.md` index when relevant. Do not copy memory titles or contents into this tracked instruction file.

## Agent skills

### Issue tracker

Issues and specs are tracked in GitHub Issues; external pull requests are not a triage surface. See `docs/agents/issue-tracker.md`.

### Triage labels

The repo uses the standard five-state engineering-skill vocabulary. See `docs/agents/triage-labels.md`.

### Domain docs

This is a single-context repository with an optional root `CONTEXT.md` and system-wide ADRs under `docs/adr/`. See `docs/agents/domain.md`.

### Design system

The repository-owned `design-md` skill lives at `.agents/skills/design-md/`. Use the live storefront and its measured styles as the source for the canonical root `DESIGN.md`; review that document with Andrew before changing shared typography, palette or spacing. Stitch screens may supplement the website when Andrew supplies them.
