# Issue tracker: GitHub

Issues and specs for this repository live as GitHub issues. Use the `gh` CLI for issue operations and infer the repository from the configured Git remote.

## Conventions

- Create an issue with `gh issue create` and use a body file for multi-line content.
- Read an issue and its discussion with `gh issue view <number> --comments`.
- Apply or remove workflow labels with `gh issue edit`.
- Close resolved or rejected work with `gh issue close`, adding a short outcome comment where useful.

When an engineering skill says to publish to the issue tracker, create a GitHub issue in `Totally-Spellbound/totally-spellbound`.

## Pull requests as a triage surface

External pull requests are **not** treated as feature requests by the triage workflow. Pull requests remain the review and merge surface for work already represented by an issue or spec.

## Wayfinding operations

If Wayfinder is used later, create one issue for the map and link its investigation tickets as GitHub sub-issues where the repository supports them. Use visible issue dependencies for blocking relationships; otherwise record `Blocked by: #<issue>` in the child issue body.
