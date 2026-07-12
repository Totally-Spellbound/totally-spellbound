# Storefront release checklist

Use this matrix for every storefront release. Record the date, commit, development-theme URL and evidence link before marking a cell complete.

## Release record

- Date:
- Commit:
- Tester:
- Development theme:
- Evidence folder or link:

## Mobile matrix

`P` means portrait. Test landscape at the same 844 × 390 CSS-pixel viewport used by the performance baseline. Test text zoom at 200% at 320px wide. A checked console cell means no unexplained errors; a checked actions cell means every listed action completed without a dead control.

| Page | Route and state | 320 P | 390 P | 430 P | Landscape | 200% text | Reduced motion | Console | Actions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Home | `/`; signed out | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Hero action, collection links, Oracle |
| Collection | `/collections/all`; long names and filters | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Filter, sort, card, quick add |
| Product | Multi-image, available product with variants | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Gallery, variant, quantity, Add to Cauldron |
| Cart | Empty, then populated | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Continue shopping, quantity, remove, checkout |
| Search | `/search`, then a populated query | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Submit, clear, filter, sort, card |
| Our Story | `/pages/our-story` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] All links and controls |
| Visit Us | `/pages/visit-us` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Address and contact actions |
| Contact | `/pages/contact` | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Validation and successful form submission |
| 404 | A deliberately missing route | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] Search or return action |

## Checks at every viewport

- [ ] `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.
- [ ] Focus is visible and is not covered by the header, chat launcher or sticky controls.
- [ ] Text does not clip, overlap controls or become an unreadably narrow column.
- [ ] Images keep their subject and useful controls remain available without hover.
- [ ] Navigation drawer remains `100dvh`; record its measured width separately.

## Automated gate

Run `npm run check:ci`. The command uses the pinned Shopify CLI version in `config/theme-check-baseline.json`. Existing warning fingerprints are allowed; a new warning, error or extra occurrence fails.

When an old warning is fixed, remove that occurrence from the baseline in the same pull request. Do not add a warning to the baseline without recording why in the pull request.
