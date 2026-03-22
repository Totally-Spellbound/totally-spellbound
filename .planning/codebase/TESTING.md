# Testing Patterns

**Analysis Date:** 2026-03-22

## Test Framework

**Runner:**
- Not detected — no test runner found (Jest, Vitest, Playwright, or similar)

**Assertion Library:**
- Not applicable — testing infrastructure not present

**Run Commands:**
- Project includes npm script `check`: `shopify theme check` (Shopify theme validation, not unit testing)
- No test scripts configured in `package.json`

## Testing Strategy

**Current State:**
- No automated test files found (no `.test.js`, `.spec.js` files)
- No test configuration files (`jest.config.js`, `vitest.config.ts`, etc.)
- No testing framework dependencies in `package.json`
- Testing appears to be manual and exploratory

**Shopify Theme Testing:**
- Uses `shopify theme check` command for theme validation and linting
- Validates theme configuration, liquid syntax, and structure compliance

## Code Structure for Testability

**Separation of Concerns:**
- Logic organized in class methods rather than monolithic files
- Utility functions exported separately: `utilities.js` contains reusable helpers
- Event system decoupled from UI: events published and subscribed through `ThemeEvents`
- Components extend base `Component` class providing standardized interface

**Module Dependencies:**
Files use explicit imports allowing dependency injection opportunities:
- `product-card.js` imports `Component`, events, utilities, helpers
- `section-renderer.js` singleton pattern with internal state management
- Event classes instantiated with required parameters for flexibility

**Custom Element Base Class:**
- `Component` class (`component.js`) provides standard hooks: `connectedCallback()`, `disconnectedCallback()`, `updatedCallback()`
- Refs system allows testing DOM queries without full browser: `this.refs.productCardLink`
- Declarative event binding reduces inline event handler coupling

## Mockable Patterns Observed

**Dependencies:**
The codebase structure supports mocking these patterns:
- `fetch()` calls wrapped in utility functions (`fetchConfig()`)
- DOM queries through refs system: `this.refs.fieldsets` can be stubbed
- Event dispatching through custom event classes
- MutationObserver (`#mutationObserver` in Component) could be stubbed
- AbortController used for cancellation (`#abortController` in SectionRenderer)

**Example — Mockable Fetch:**
```javascript
// In section-renderer.js
async getSectionHTML(sectionId, useCache = true, url = new URL(window.location.href)) {
  const sectionUrl = buildSectionRenderingURL(sectionId, url);
  // fetch() could be stubbed in tests
  pendingPromise = fetch(sectionUrl).then((response) => {
    return response.text();
  });
}
```

**Example — Event Dispatching:**
```javascript
// Events can be stubbed/mocked in tests
this.dispatchEvent(new VariantSelectedEvent({
  id: selectedOption.dataset.optionValueId ?? '',
}));
```

**Example — Refs Stubbing:**
```javascript
// Refs system allows testing without full DOM
const { cardGallery } = this.refs;  // Could return mock in tests
```

## What Would Be Worth Testing

**High-Value Test Areas:**

1. **Component Initialization & Lifecycle:**
   - `connectedCallback()` / `disconnectedCallback()` in Component subclasses
   - Ref resolution and `requiredRefs` validation
   - Event listener setup/teardown

2. **Event Handling & Publishing:**
   - Custom event creation with proper detail objects
   - Event bubbling and propagation control
   - Event listener cleanup preventing memory leaks

3. **Variant Management:**
   - `variantChanged()` method in VariantPicker: URL updates, section rendering
   - Variant selection and image updates in ProductCard
   - Combined listing product switching logic

4. **Section Rendering:**
   - Cache hits/misses in SectionRenderer
   - Abort signal handling for pending requests
   - DOM morphing success/failure scenarios

5. **Error Scenarios:**
   - Missing required refs throwing MissingRefError
   - Invalid element type validation
   - Network failure handling in fetch operations

6. **State Management:**
   - Private field state isolation
   - Debounced method execution
   - MutationObserver-driven ref updates

## Manual Testing Observations

**Development Workflow:**
- `npm run dev`: Local theme development with hot reload via Shopify CLI
- `npm run check`: Theme linting/validation
- Manual browser testing assumed (no automated test reports found)
- Theme editor preview testing in theme environment

**Areas Requiring Manual Verification:**
- View transitions working across page navigation
- Product card interactions (variant selection, slideshow, quick-add)
- Cart operations and error states
- Mobile vs desktop breakpoint behavior
- Custom element registration and initialization

## Test Infrastructure Gaps

**To Implement Testing:**
1. Choose framework: Vitest (modern, fast) or Jest (established)
2. Set up test file locations: `__tests__/` directory or co-locate `.test.js` files
3. Add DOM testing library: `@testing-library/dom` or similar
4. Create test utilities for:
   - Component initialization with mock refs
   - Event creation and dispatching helpers
   - DOM query shortcuts
5. Add test npm scripts: `npm test`, `npm run test:watch`, `npm run test:coverage`

## Performance Considerations Found

**Lazy Loading Patterns:**
- `requestIdleCallback` used to defer heavy DOM operations
- `requestAnimationFrame` for animation synchronization
- Images preloaded on hover: `preloadImage()`

**Debouncing & Throttling:**
- Debounce used on frequently-fired events: `debounce(this.#resetVariant, 100)`
- Window resize observer with debounce in variant picker

**Async Optimization:**
- `yieldToMainThread()` breaks long tasks using scheduler.yield()
- Promise-based section rendering with abort control
- Cache layer in SectionRenderer prevents redundant fetches

These patterns indicate performance-aware code that would benefit from load testing.

---

*Testing analysis: 2026-03-22*
