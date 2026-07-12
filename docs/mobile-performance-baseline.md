# Mobile storefront baseline

Recorded on 12 July 2026 before the mobile upgrade, from development theme `187401240957` at commit `93dbd7c`.

## Profile

- Lighthouse 13.4.0, one cold navigation per route.
- Mobile form factor at 390 × 844 CSS pixels and device scale factor 3.
- Simulated throttling: 150ms RTT, 1,638.4 Kbit/s throughput and 4× CPU slowdown.
- Browser storage cleared between routes.
- Shopify CLI development proxy on localhost. The profile is useful for before-and-after comparisons on the same machine; absolute timings include development-proxy and app overhead.
- Product fixture: `Dark in Love Ruth Mesh Strap Gothic Sleeveless Top`.

## Results

Scores are Performance / Accessibility / Best Practices / SEO. Timings are milliseconds. Transfer values include the whole page navigation.

| Page | Route | Scores | FCP | LCP | TBT | CLS | Requests | Transfer | Image requests | Image transfer |
| --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | `/` | 36 / 100 / 73 / 100 | 7,019 | 21,657 | 979 | 0 | 277 | 8.58 MB | 21 | 2.23 MB |
| Search | `/search` | 52 / 94 / 54 / 92 | 10,089 | 22,319 | 219 | 0 | 296 | 9.56 MB | 52 | 2.83 MB |
| Product | `/products/dark-in-love-ruth-mesh-strap-gothic-sleeveless-top` | 56 / 82 / 73 / 100 | 10,273 | 20,774 | 74 | 0 | 307 | 8.86 MB | 26 | 1.58 MB |

These results miss the upgrade targets. Search is the clearest payload defect; its blank state declares 50 images eager and requests 52 images during the Lighthouse navigation.

## Image-loading declarations

Counts come from the rendered HTML returned for the same routes. `Unset` means the browser applies its default eager behaviour unless another mechanism intervenes.

| Page | Image elements | `eager` | `lazy` | Unset | Network image requests |
| --- | ---: | ---: | ---: | ---: | ---: |
| Home | 27 | 1 | 25 | 1 | 21 |
| Search | 134 | 50 | 83 | 1 | 52 |
| Product | 84 | 0 | 47 | 37 | 26 |

Repeat the same three routes and profile after work that changes shared assets, image loading or first-viewport composition. Record a fresh row rather than replacing this baseline.
