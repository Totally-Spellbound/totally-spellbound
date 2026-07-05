/**
 * Spellbound Celestial Body - Interactive planet visualization
 * Handles the "Read More" facts panel per section instance:
 * open/close via button, backdrop and Escape, with focus management.
 * Re-initialises on Shopify section reloads in the theme editor.
 */
(function () {
  'use strict';

  function initCelestial(section) {
    if (section.dataset.spellboundCelestialInit === 'true') return;
    section.dataset.spellboundCelestialInit = 'true';

    var openBtn = section.querySelector('.spellbound-celestial__read-more');
    var panel = section.querySelector('.spellbound-celestial__panel');
    var closeBtn = section.querySelector('.spellbound-celestial__panel-close');
    var backdrop = section.querySelector('.spellbound-celestial__backdrop');

    if (!openBtn || !panel) return;

    var lastFocused = null;

    function openPanel() {
      if (panel.classList.contains('is-open')) return;
      lastFocused = document.activeElement;
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
      openBtn.setAttribute('aria-expanded', 'true');
      if (backdrop) backdrop.hidden = false;
      window.requestAnimationFrame(function () {
        panel.focus();
      });
    }

    function closePanel() {
      if (!panel.classList.contains('is-open')) return;
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
      openBtn.setAttribute('aria-expanded', 'false');
      if (backdrop) backdrop.hidden = true;
      if (lastFocused && typeof lastFocused.focus === 'function' && document.contains(lastFocused)) {
        lastFocused.focus();
      } else {
        openBtn.focus();
      }
      lastFocused = null;
    }

    openBtn.addEventListener('click', function (event) {
      event.preventDefault();
      if (panel.classList.contains('is-open')) {
        closePanel();
      } else {
        openPanel();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function (event) {
        event.preventDefault();
        closePanel();
      });
    }

    if (backdrop) {
      backdrop.addEventListener('click', closePanel);
    }

    section.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        closePanel();
      }
    });
  }

  function initAll(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var sections = scope.querySelectorAll('.spellbound-celestial');
    for (var i = 0; i < sections.length; i++) {
      initCelestial(sections[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAll(document);
    });
  } else {
    initAll(document);
  }

  document.addEventListener('shopify:section:load', function (event) {
    initAll(event.target || document);
  });
})();
