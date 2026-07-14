/* Spellbound Oracle — three-step intention reading (intention -> element -> reveal). */
(function () {
  'use strict';

  function initOracle(root) {
    if (root.dataset.oracleReady === 'true') return;
    root.dataset.oracleReady = 'true';

    var state = { intention: '', element: '' };
    var availabilityCache = {};
    var availabilityRequest = 0;
    var hasStarted = false;
    var steps = Array.prototype.slice.call(root.querySelectorAll('[data-oracle-step]'));
    var elementButtons = Array.prototype.slice.call(root.querySelectorAll('[data-oracle-element]'));
    var baseUrl = (root.getAttribute('data-base-url') || '').trim() || '/collections/all';
    var intentDisplay = root.querySelector('[data-oracle-intent-display]');
    var elementDisplay = root.querySelector('[data-oracle-element-display]');
    var availabilityStatus = root.querySelector('[data-oracle-availability]');
    var revealLink = root.querySelector('[data-oracle-reveal]');

    function publish(eventName) {
      if (!window.Shopify || !window.Shopify.analytics || typeof window.Shopify.analytics.publish !== 'function') {
        return;
      }
      var publication = window.Shopify.analytics.publish('totally_spellbound:' + eventName, {
        intention: state.intention,
        element: state.element
      });
      if (publication && typeof publication.catch === 'function') {
        publication.catch(function () {});
      }
    }

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

    function resultsUrl(includeElement) {
      var url = new URL(baseUrl, window.location.origin);
      url.searchParams.set('filter.v.availability', '1');
      if (state.intention) {
        url.searchParams.set('filter.p.m.custom.intention', state.intention);
      }
      if (includeElement && state.element) {
        url.searchParams.set('filter.p.m.custom.element', state.element);
      }
      return url;
    }

    function updateReveal() {
      if (!revealLink) return;
      revealLink.href = resultsUrl(true).toString();
    }

    function focusFirstAvailableElement() {
      var firstAvailable = elementButtons.find(function (button) {
        return !button.disabled;
      });
      if (firstAvailable) firstAvailable.focus();
    }

    function applyAvailability(availability) {
      var unavailableCount = 0;
      elementButtons.forEach(function (button) {
        var value = (button.getAttribute('data-oracle-element') || '').trim();
        button.disabled = availability[value] !== true;
        if (button.disabled) unavailableCount += 1;
      });
      if (availabilityStatus) {
        availabilityStatus.textContent = unavailableCount > 0
          ? 'Unavailable elements cannot be chosen because no matching pieces are in stock.'
          : '';
      }
      focusFirstAvailableElement();
    }

    function loadElementAvailability() {
      var intention = state.intention;
      var requestId = ++availabilityRequest;
      elementButtons.forEach(function (button) {
        button.disabled = true;
      });
      if (availabilityStatus) availabilityStatus.textContent = 'Checking the shelves…';

      if (availabilityCache[intention]) {
        applyAvailability(availabilityCache[intention]);
        return;
      }

      fetch(resultsUrl(false).toString())
        .then(function (response) {
          if (!response.ok) throw new Error('Unable to check Oracle availability');
          return response.text();
        })
        .then(function (html) {
          if (requestId !== availabilityRequest || intention !== state.intention) return;
          var resultsDocument = new DOMParser().parseFromString(html, 'text/html');
          var availability = {};
          resultsDocument.querySelectorAll('input[name="filter.p.m.custom.element"]').forEach(function (input) {
            var value = (input.value || '').trim();
            if (value) availability[value] = availability[value] === true || !input.disabled;
          });
          if (Object.keys(availability).length === 0) {
            throw new Error('Oracle element filters are missing');
          }
          availabilityCache[intention] = availability;
          applyAvailability(availability);
        })
        .catch(function () {
          if (requestId !== availabilityRequest || intention !== state.intention) return;
          if (availabilityStatus) {
            availabilityStatus.textContent = 'The Oracle cannot read the shelves just now. Go back and choose another path.';
          }
        });
    }

    // Step 1: intention buttons
    root.querySelectorAll('[data-oracle-intent]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = (btn.getAttribute('data-oracle-intent') || '').trim();
        if (!value) return;
        state.intention = value;
        state.element = '';
        if (intentDisplay) intentDisplay.textContent = state.intention;
        if (elementDisplay) elementDisplay.textContent = '';
        updateReveal();
        if (!hasStarted) {
          hasStarted = true;
          publish('oracle_started');
        }
        showStep(1, false);
        loadElementAvailability();
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
        publish('oracle_completed');
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
        availabilityRequest += 1;
        hasStarted = false;
        elementButtons.forEach(function (button) {
          button.disabled = false;
        });
        if (availabilityStatus) availabilityStatus.textContent = '';
        if (intentDisplay) intentDisplay.textContent = '';
        if (elementDisplay) elementDisplay.textContent = '';
        updateReveal();
        showStep(0, true);
      });
    });

    if (revealLink) {
      revealLink.addEventListener('click', function () {
        publish('oracle_result_clicked');
      });
    }

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
