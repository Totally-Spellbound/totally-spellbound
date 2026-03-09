# Totally Spellbound

Shopify theme for the [Totally Spellbound](https://totally-spellbound-2.myshopify.com) store. Based on Shopify's Horizon theme.

## Prerequisites

- [Node.js](https://nodejs.org/) (for npm scripts)
- [Shopify CLI](https://shopify.dev/docs/storefronts/themes/tools/cli) — install with:
  ```sh
  npm install -g @shopify/cli @shopify/theme
  ```

## Getting started

### 1. Clone the repo

```sh
git clone https://github.com/Totally-Spellbound/totally-spellbound.git
cd totally-spellbound
```

### 2. Start developing

```sh
npm run dev
```

This runs `shopify theme dev` against the `totally-spellbound-2` store. On first run, the CLI will prompt you to log in via your browser. You need a staff account or collaborator access on the store.

Once authenticated, it will:

- Upload the theme as a development theme
- Start a local dev server with hot reload
- Give you a preview URL to view changes in real time

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local dev server with hot reload |
| `npm run push` | Push theme to the store |
| `npm run pull` | Pull latest theme changes from the store |
| `npm run check` | Run Theme Check linting |
| `npm run share` | Generate a shareable preview link |

## Project structure

```
├── assets/        # CSS, JS, SVGs, and static files
├── blocks/        # Theme blocks (reusable UI components)
├── config/        # Theme settings (settings_schema.json, settings_data.json)
├── layout/        # Layout templates (theme.liquid, password.liquid)
├── locales/       # Translation files
├── sections/      # Theme sections
├── snippets/      # Reusable Liquid snippets
└── templates/     # Page templates (JSON)
```

## License

See [LICENSE.md](LICENSE.md) for details.
