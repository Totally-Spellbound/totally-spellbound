# Totally Spellbound

Shopify theme for the [Totally Spellbound](https://totally-spellbound-2.myshopify.com) store. Based on Shopify's Horizon theme.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Ruby](https://www.ruby-lang.org/) (required by Shopify CLI)

## Getting started

### 1. Clone the repo

```sh
git clone https://github.com/Totally-Spellbound/totally-spellbound.git
cd totally-spellbound
```

### 2. Install dependencies

Install the Shopify CLI and theme tools:

```sh
npm install -g @shopify/cli @shopify/theme
```

Verify it installed correctly:

```sh
shopify version
```

### 3. Log in to Shopify

Authenticate with the Totally Spellbound store:

```sh
shopify theme dev --store totally-spellbound-2
```

On first run, this will open a browser window asking you to log in to your Shopify Partners or staff account. You need staff or collaborator access on the **totally-spellbound-2** store. Once you authenticate, the CLI will remember your session for future commands.

### 4. Develop

After login, the dev server starts automatically. For subsequent sessions just run:

```sh
npm run dev
```

This will:

- Upload the theme as a development theme
- Start a local dev server with hot reload at `http://127.0.0.1:9292`
- Give you a preview URL to view changes in real time

### Troubleshooting auth

If your session expires or you need to re-authenticate:

```sh
shopify auth logout
shopify theme dev --store totally-spellbound-2
```

This will re-trigger the browser login flow.

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
