/* Spellbound Oracle — three-step intention reading (intention -> element -> reveal). */
(function () {
  'use strict';

  function initOracle(root) {
    if (root.dataset.oracleReady === 'true') return;
    root.dataset.oracleReady = 'true';

    var state = { intention: '', element: '' };
    var steps = Array.prototype.slice.call(root.querySelectorAll('[data-oracle-step]'));
    var baseUrl = (root.getAttribute('data-base-url') || '').trim() || '/collections/all';
    var intentDisplay = root.querySelector('[data-oracle-intent-display]');
    var elementDisplay = root.querySelector('[data-oracle-element-display]');
    var revealLink = root.querySelector('[data-oracle-reveal]');

    function showStep(index, moveFocus) {
      var target = null;
      steps.forEach(function (step) {
        var stepIndex = parseInt(step.getAttribute('data-oracle-step'), 10);
        var isActive = !isNaN(stepIndex) && stepIndex === index;
        step.classList.toggle('active', isActive);
        if (isActive) target = step;
      });
      if (target && moveFocus) {
        var focusable = target.querySelector('button, a[href]');
        if (focusable) focusable.focus();
      }
    }

    function updateReveal() {
      if (!revealLink) return;
      if (state.intention && state.element) {
        revealLink.href =
          baseUrl +
          '?filter.p.m.custom.intention=' + encodeURIComponent(state.intention) +
          '&filter.p.m.custom.element=' + encodeURIComponent(state.element);
      } else {
        revealLink.href = baseUrl;
      }
    }

    // Step 1: intention buttons
    root.querySelectorAll('[data-oracle-intent]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = (btn.getAttribute('data-oracle-intent') || '').trim();
        if (!value) return;
        state.intention = value;
        if (intentDisplay) intentDisplay.textContent = state.intention;
        updateReveal();
        showStep(1, true);
      });
    });

    // Step 2: element buttons
    root.querySelectorAll('[data-oracle-element]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = (btn.getAttribute('data-oracle-element') || '').trim();
        if (!value) return;
        state.element = value;
        if (elementDisplay) elementDisplay.textContent = state.element;
        updateReveal();
        showStep(2, true);
      });
    });

    // Back buttons (each carries the step index it returns to)
    root.querySelectorAll('[data-oracle-back]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = parseInt(btn.getAttribute('data-oracle-back'), 10);
        if (isNaN(target) || target < 0) target = 0;
        showStep(target, true);
      });
    });

    // Reset
    root.querySelectorAll('[data-oracle-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.intention = '';
        state.element = '';
        if (intentDisplay) intentDisplay.textContent = '';
        if (elementDisplay) elementDisplay.textContent = '';
        updateReveal();
        showStep(0, true);
      });
    });

    updateReveal();
    showStep(0, false);
  }

  function initAll(scope) {
    (scope || document).querySelectorAll('[data-spellbound-oracle]').forEach(initOracle);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAll(document);
    });
  } else {
    initAll(document);
  }

  document.addEventListener('shopify:section:load', function (event) {
    initAll(event.target);
  });
})();
