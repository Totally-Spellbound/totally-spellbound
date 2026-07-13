# Domain docs

Totally Spellbound is a single-context repository.

Before exploring or changing domain behaviour, read:

- `CONTEXT.md` at the repository root when it exists;
- `DESIGN.md` at the repository root when it exists;
- relevant architectural decisions under `docs/adr/` when they exist;
- the current GitHub issue and repository spec relevant to the task.

If `CONTEXT.md` or `docs/adr/` does not exist, proceed without creating empty scaffolding. Domain-modelling work should add those documents only when a term or decision has genuinely been resolved.

Use vocabulary from `CONTEXT.md` in issue titles, specs, tests and code. If a proposal conflicts with an ADR, name the conflict rather than silently overriding it.
