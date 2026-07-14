(() => {
  const shopifyInboxSelector = 'inbox-online-store-chat#ShopifyChat';
  const styleId = 'spellbound-shopify-inbox-size';

  function labelLauncher(shadowRoot) {
    shadowRoot.querySelector("button[data-spec='toggle-button']")?.setAttribute('aria-label', 'Chat with us');
  }

  function configureLauncher() {
    const shopifyInbox = document.querySelector(shopifyInboxSelector);
    const shadowRoot = shopifyInbox?.shadowRoot;

    if (!shadowRoot) return false;
    if (shadowRoot.getElementById(styleId)) return true;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @media (max-width: 749px) {
        button[data-spec='toggle-button'] {
          border-radius: 50%;
          height: 48px;
          width: 48px;
        }

        button[data-spec='toggle-button'] svg {
          height: 46px;
          width: 46px;
        }
      }
    `;
    shadowRoot.append(style);
    labelLauncher(shadowRoot);

    new MutationObserver(() => labelLauncher(shadowRoot)).observe(shadowRoot, { childList: true, subtree: true });

    return true;
  }

  if (!configureLauncher()) {
    const observer = new MutationObserver(() => {
      if (configureLauncher()) observer.disconnect();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    customElements.whenDefined('inbox-online-store-chat').then(() => {
      if (configureLauncher()) observer.disconnect();
    });
  }
})();
