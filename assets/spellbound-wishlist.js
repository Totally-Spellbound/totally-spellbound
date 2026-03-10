/**
 * Spellbound Wishlist ("Grimoire") - localStorage-based wishlist
 */
(function () {
  const STORAGE_KEY = 'spellbound_grimoire';

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveWishlist(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function isInWishlist(productId) {
    return getWishlist().includes(String(productId));
  }

  function toggleWishlist(productId) {
    const id = String(productId);
    let list = getWishlist();
    if (list.includes(id)) {
      list = list.filter(i => i !== id);
    } else {
      list.push(id);
    }
    saveWishlist(list);
    return list.includes(id);
  }

  function updateButtons(productId) {
    const active = isInWishlist(productId);
    document.querySelectorAll('.spellbound-grimoire-btn').forEach(btn => {
      if (btn.dataset.productId === String(productId)) {
        btn.classList.toggle('spellbound-grimoire-btn--active', active);
        const label = btn.querySelector('.spellbound-grimoire-btn__label');
        if (label) {
          label.textContent = active ? 'Marked in Grimoire' : 'Mark in Grimoire';
        }
        const svg = btn.querySelector('svg');
        if (svg) {
          svg.setAttribute('fill', active ? 'currentColor' : 'none');
        }
      }
    });
  }

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.spellbound-grimoire-btn');
    if (!btn) return;
    e.preventDefault();
    const productId = btn.dataset.productId;
    if (productId) {
      toggleWishlist(productId);
      updateButtons(productId);
    }
  });

  // Initialize on load
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.spellbound-grimoire-btn').forEach(btn => {
      const productId = btn.dataset.productId;
      if (productId) updateButtons(productId);
    });
  });

  // Expose for external use
  window.SpellboundGrimoire = { getWishlist, isInWishlist, toggleWishlist };
})();
