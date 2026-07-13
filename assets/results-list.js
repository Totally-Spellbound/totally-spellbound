import { mediaQueryLarge, requestIdleCallback, startViewTransition } from '@theme/utilities';
import PaginatedList from '@theme/paginated-list';

// Two 12rem card floors plus the 12px mobile grid gap.
const mobileDoubleColumnQuery = window.matchMedia('(min-width: 396px)');

/**
 * A custom element that renders a pagniated results list
 */
export default class ResultsList extends PaginatedList {
  connectedCallback() {
    super.connectedCallback();

    mediaQueryLarge.addEventListener('change', this.#handleMediaQueryChange);
    mobileDoubleColumnQuery.addEventListener('change', this.#handleMobileDensityChange);
    this.#syncLayout(mediaQueryLarge.matches ? 'desktop' : 'mobile');
    this.setAttribute('initialized', '');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    mediaQueryLarge.removeEventListener('change', this.#handleMediaQueryChange);
    mobileDoubleColumnQuery.removeEventListener('change', this.#handleMobileDensityChange);
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

  #handleMobileDensityChange = () => {
    const storedLayout = sessionStorage.getItem('product-grid-view-mobile');
    if (mediaQueryLarge.matches || (storedLayout && storedLayout !== 'default')) return;

    this.#syncLayout('mobile');
  };

  /** @param {'desktop' | 'mobile'} viewport */
  #syncLayout(viewport) {
    const storedLayout = sessionStorage.getItem(`product-grid-view-${viewport}`);
    const value = viewport === 'desktop'
      ? storedLayout || 'default'
      : storedLayout && storedLayout !== 'default'
        ? storedLayout
        : this.#defaultMobileLayout;
    const inputName = viewport === 'desktop' ? 'grid' : 'grid-mobile';
    const targetElement = this.querySelector(`input[name="${inputName}"][value="${value}"]`);
    if (!(targetElement instanceof HTMLInputElement)) return;

    targetElement.checked = true;
    this.#setLayout(value);
  }

  get #defaultMobileLayout() {
    return mobileDoubleColumnQuery.matches ? 'mobile-double' : 'mobile-single';
  }
}

if (!customElements.get('results-list')) {
  customElements.define('results-list', ResultsList);
}
