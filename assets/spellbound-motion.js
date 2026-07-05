/* Totally Spellbound — reveal-on-scroll utility.
   Pairs with [data-spellbound-reveal] / [data-spellbound-reveal-group] in spellbound-custom.css.
   Re-inits safely on Shopify theme-editor section reloads. */
(function () {
  'use strict';

  var SELECTOR = '[data-spellbound-reveal], [data-spellbound-reveal-group]';
  var observer = null;

  function reveal(el) {
    el.classList.add('is-visible');
  }

  function getObserver() {
    if (observer) return observer;
    if (!('IntersectionObserver' in window)) return null;
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    return observer;
  }

  function init(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var els = scope.querySelectorAll(SELECTOR);
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var io = reduced ? null : getObserver();
    els.forEach(function (el) {
      if (el.classList.contains('is-visible')) return;
      if (io) {
        io.observe(el);
      } else {
        reveal(el);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(document); });
  } else {
    init(document);
  }
  document.addEventListener('shopify:section:load', function (e) { init(e.target); });
})();
