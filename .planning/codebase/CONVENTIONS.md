# Coding Conventions

**Analysis Date:** 2026-03-22

## Naming Patterns

**Files:**
- kebab-case for all JavaScript files: `product-card.js`, `section-renderer.js`, `component-quantity-selector.js`
- Class/component names use PascalCase mapped to kebab-case element names: `ProductCard` → `<product-card>`
- Custom elements use kebab-case with no hyphens discouraged for private helpers

**Functions:**
- camelCase for all functions and methods: `fetchUpdatedSection()`, `handleVariantUpdate()`, `preloadImage()`
- Private methods prefixed with `#` using JavaScript private field syntax: `#handleVariantUpdate()`, `#updateRefs()`, `#preloadImage()`
- Arrow functions used for inline callbacks and event handlers to preserve context
- Static event names use camelCase: `variantUpdate`, `cartUpdate`, `zoomMediaSelected`

**Variables:**
- camelCase for local variables: `selectedOption`, `sectionId`, `abortController`
- Constants use UPPER_SNAKE_CASE and placed at module top: `ERROR_MESSAGE_DISPLAY_DURATION`, `SUCCESS_MESSAGE_DISPLAY_DURATION`
- Type prefixes in comments for private fields: `/** @type {Map<string, AbortController>} */`
- Boolean properties prefixed with `is` or `has`: `isOnProductPage`, `hasAttribute()`, `productTransitionEnabled`

**Types & Classes:**
- PascalCase for class names: `Component`, `ProductCard`, `VariantPicker`, `SectionRenderer`
- Custom element classes end with `Component` suffix: `AddToCartComponent`, `QuantitySelectorComponent`
- Event classes end with `Event`: `VariantUpdateEvent`, `CartAddEvent`, `CartErrorEvent`
- Typedef annotations use `@typedef` with object notation for complex types

## Code Style

**Formatting:**
- No `.prettierrc` or `.eslintrc` present — project uses default formatting or manual standards
- 2-space indentation (inferred from codebase)
- Line continuations preserved with proper indentation in long method calls
- Consistent semicolon termination throughout

**Linting:**
- Uses JSDoc/TypeScript comment annotations for type checking without TypeScript compiler
- ESLint comment used sparingly: `// eslint-disable-next-line` for specific disables (e.g., async promise executor)
- Type checking via JSDoc templates and `@type` annotations
- Components throw named Error instances with descriptive messages on validation failures

## Import Organization

**Order:**
1. Named imports from `@theme/` (internal modules): `import { Component } from '@theme/component';`
2. Named event imports: `import { VariantUpdateEvent } from '@theme/events';`
3. Utility function imports: `import { debounce, fetchConfig } from '@theme/utilities';`
4. Other named imports: `import { morph } from '@theme/morph';`
5. Relative imports as fallback: `import { DialogCloseEvent } from './dialog.js';`
6. Default exports: `import PaginatedList from '@theme/paginated-list';`

**Path Aliases:**
- `@theme/` aliases to assets directory (theme module imports)
- Example: `@theme/component` resolves to `/assets/component.js`
- All component files use `@theme/` import paths, not relative paths

## Error Handling

**Patterns:**
- Throw `Error` instances with descriptive messages for validation failures:
  ```javascript
  if (!form) throw new Error('Product form element missing');
  if (!(link instanceof HTMLAnchorElement)) throw new Error('Product card link not found');
  ```
- Use try/catch blocks for async operations (fetch, DOM manipulation):
  ```javascript
  try {
    const response = await fetch(sectionUrl);
    return response.text();
  } catch (error) {
    console.error(error);
  } finally {
    // cleanup
  }
  ```
- Silently fail on optional operations with guard clauses: `if (!element) return;`
- Catch blocks often ignore error with underscore: `catch (_) {}` or `catch (_e) {}`
- Error handlers set timeouts and manage UI state (disable/enable buttons, clear messages)

**Error Events:**
- Custom error event classes: `CartErrorEvent`, with detail objects containing `message`, `errors`, `description`
- Error messages displayed to users with fixed duration constants: `ERROR_MESSAGE_DISPLAY_DURATION = 10000`
- Console errors logged for development awareness: `console.error(error);`

## Logging

**Framework:** No external logging library — uses native `console.error()` for errors

**Patterns:**
- `console.error()` used in catch blocks for development debugging
- Errors logged with full error object for stack traces
- No info/warning/debug logs observed — only errors logged to console
- Performance metrics tracked via custom `cartPerformance` module (performance monitoring)

## Comments

**When to Comment:**
- JSDoc blocks required for exported functions and classes
- Inline comments explain non-obvious logic: "Check on the current active image..."
- Complex event handling workflows documented with multi-line comments
- Intent explanations: "Deliberately not using origin, as it includes the protocol..."

**JSDoc/TSDoc:**
- All public methods documented with `@param` and return types
- Complex types documented with `@typedef` blocks at file top
- Generic template parameters documented: `@template {Refs} T`
- Example usage included in namespace/module comments: `@example document.dispatchEvent(new VariantUpdateEvent(...))`
- Type assertions documented: `/** @type {HTMLInputElement} */`

**Example:**
```javascript
/**
 * A custom element for product links with images for transitions to PDP.
 * This is a base class that is extended by ProductCard.
 *
 * @template {ProductCardLinkRefs} [T=ProductCardLinkRefs]
 * @extends {Component<T>}
 */
export class ProductCardLink extends Component {
  /**
   * Handles the click event for view transitions.
   * @param {Event} event
   */
  handleViewTransition(event) {
    // If the event has been prevented, don't do anything
    if (event.defaultPrevented) return;
  }
}
```

## Function Design

**Size:** Functions range from 5-50 lines, with many private helpers under 15 lines. Larger functions (50-100+ lines) handle complex workflows like `variantChanged()`.

**Parameters:**
- Single object parameter for complex method options
- Event objects destructured in parameters: `{ event, data }`
- Optional parameters documented with `[param]` syntax in JSDoc
- Typed parameters via JSDoc: `@param {Event} event`, `@param {number} quantity`

**Return Values:**
- Early returns used extensively for guard clauses
- Methods often return `undefined` (implicit) for side-effect operations
- Getters return boolean or element references: `get productTransitionEnabled()`, `get featuredMediaUrl()`
- Async methods return Promises: `Promise<string>`, `Promise<void>`

## Module Design

**Exports:**
- Named exports for classes: `export class ProductCard extends ProductCardLink {}`
- Named exports for utility functions: `export function startViewTransition(callback, types) {}`
- Default exports for primary classes in component files: `export default class VariantPicker extends Component {}`
- Mix of both patterns (named + default) in single files allowed

**Barrel Files:**
- No dedicated barrel files (`index.js`) observed
- Imports use full paths: `import { Component } from '@theme/component'` not `@theme/`
- Each file exports its primary functionality only

**Custom Elements Registration:**
- Registration pattern at end of file:
  ```javascript
  if (!customElements.get('product-card')) {
    customElements.define('product-card', ProductCard);
  }
  ```
- Conditional definition prevents double-registration
- Element names derived from class names: `ProductCard` → `product-card`

## Event Handling

**Custom Events:**
- Custom event classes extend `Event` with constructor parameter validation
- All custom events set `bubbles: true` for component communication
- Detail objects use consistent structure: `{ resource, sourceId, data }`
- Static event names defined on event class: `SlideshowSelectEvent.eventName`
- Event class provides factory for creating instances: `new VariantUpdateEvent(resource, sourceId, data)`

**DOM Event Listeners:**
- Inline event handler attributes in HTML: `on:click="/selector/methodName"`
- Declarative event binding system through `Component` base class
- Method names bound with `/` delimiter and optional data with `?` prefix
- Complex event delegation through `getClosestComponent()` hierarchy

---

*Convention analysis: 2026-03-22*
