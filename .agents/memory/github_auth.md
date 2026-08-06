# GitHub authentication for this repository

The GitHub CLI has both `tungsten-assistant` and `AndrewBeniston` stored in the keyring.

- `tungsten-assistant` is the active default, but it has read-only access to `Totally-Spellbound/totally-spellbound`.
- `AndrewBeniston` has admin access and should be used for issue updates, issue closure, pushes, pull requests and other write or admin operations.
- Prefer selecting Andrew's token for the individual command rather than changing the machine-wide active account. For example, obtain it with `gh auth token --user AndrewBeniston` and pass it to that command through `GH_TOKEN` without printing or persisting the token.
- Do not grant `tungsten-assistant` broader repository access unless Andrew explicitly asks for that permission change.
