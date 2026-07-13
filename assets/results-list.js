import { mediaQueryLarge, requestIdleCallback, startViewTransition } from '@theme/utilities';
import PaginatedList from '@theme/paginated-list';

/**
 * A custom element that renders a pagniated results list
 */
export default class ResultsList extends PaginatedList {
  #gridResizeObserver = new ResizeObserver(() => this.#syncAutomaticMobileControl());

  connectedCallback() {
    super.connectedCallback();

    mediaQueryLarge.addEventListener('change', this.#handleMediaQueryChange);
    this.#syncLayout(mediaQueryLarge.matches ? 'desktop' : 'mobile');
    this.#gridResizeObserver.observe(this);
    this.setAttribute('initialized', '');
  }

  updatedCallback() {
    super.updatedCallback();
    this.#syncAutomaticMobileControl();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    mediaQueryLarge.removeEventListener('change', this.#handleMediaQueryChange);
    this.#gridResizeObserver.disconnect();
  }

  /**
   * Updates the layout.
   *
   * @param {Event} event
   */
  updateLayout({ target }) {
    if (!(target instanceof HTMLInputElement)) return;

    this.#applyLayoutChange(target.value);
  }

  /**
   * Applies the layout, retaining Horizon's transition for desktop density changes.
   *
   * @param {string} value
   */
  #applyLayoutChange = async (value) => {
    const { grid } = this.refs;

    if (!grid) return;

    const isMobileLayout = value === 'mobile-single' || value === 'mobile-double';
    const viewport = isMobileLayout ? 'mobile' : 'desktop';

    if (isMobileLayout) {
      this.#setLayout(value);
    } else {
      await startViewTransition(() => this.#setLayout(value), ['product-grid']);
    }

    requestIdleCallback(() => {
      sessionStorage.setItem(`product-grid-view-${viewport}`, value);
    });
  };

  /**
   * Sets the layout attribute.
   *
   * @param {string} value
   */
  #setLayout(value) {
    const { grid } = this.refs;
    if (!grid) return;
    grid.setAttribute('product-grid-view', value);
  }

  /**
   * Handles the media query change event.
   *
   * @param {MediaQueryListEvent} event
   */
  #handleMediaQueryChange = (event) => {
    this.#syncLayout(event.matches ? 'desktop' : 'mobile');
  };

  /** @param {'desktop' | 'mobile'} viewport */
  #syncLayout(viewport) {
    const storedLayout = sessionStorage.getItem(`product-grid-view-${viewport}`);
    const value = storedLayout && storedLayout !== 'default' ? storedLayout : 'default';
    const inputName = viewport === 'desktop' ? 'grid' : 'grid-mobile';
    const targetElement = this.querySelector(`input[name="${inputName}"][value="${value}"]`);
    this.#setLayout(value);
    if (targetElement instanceof HTMLInputElement) targetElement.checked = true;
    if (viewport === 'mobile' && value === 'default') this.#syncAutomaticMobileControl();
  }

  #syncAutomaticMobileControl() {
    const { grid } = this.refs;
    if (mediaQueryLarge.matches || !grid || grid.getAttribute('product-grid-view') !== 'default') return;

    const columnCount = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    const value = columnCount > 1 ? 'mobile-double' : 'mobile-single';
    const targetElement = this.querySelector(`input[name="grid-mobile"][value="${value}"]`);
    if (targetElement instanceof HTMLInputElement) targetElement.checked = true;
  }
}

if (!customElements.get('results-list')) {
  customElements.define('results-list', ResultsList);
}
