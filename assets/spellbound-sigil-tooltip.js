/* Floating product-sigil tooltip. A single body-level layer avoids card and
   media overflow clipping while leaving each product card as one tab stop. */
(function () {
  'use strict';

  var TRIGGER_SELECTOR = '.spellbound-badge[data-label]';
  var TOOLTIP_ID = 'SpellboundSigilTooltip';
  var VIEWPORT_MARGIN = 8;
  var TOOLTIP_GAP = 10;
  var activeTrigger = null;
  var tooltip = null;
  var hideTimer = null;

  function getTrigger(target) {
    return target instanceof Element ? target.closest(TRIGGER_SELECTOR) : null;
  }

  function isInsideTrigger(trigger, target) {
    return target instanceof Node && trigger.contains(target);
  }

  function getTooltip() {
    if (tooltip) return tooltip;

    tooltip = document.createElement('div');
    tooltip.id = TOOLTIP_ID;
    tooltip.className = 'spellbound-sigil-tooltip';
    tooltip.setAttribute('role', 'tooltip');
    tooltip.hidden = true;
    document.body.appendChild(tooltip);
    return tooltip;
  }

  function positionTooltip(trigger) {
    var layer = getTooltip();
    var triggerRect = trigger.getBoundingClientRect();
    var tooltipWidth = layer.offsetWidth;
    var naturalLeft = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;
    var maxLeft = Math.max(VIEWPORT_MARGIN, window.innerWidth - tooltipWidth - VIEWPORT_MARGIN);
    var left = Math.max(VIEWPORT_MARGIN, Math.min(naturalLeft, maxLeft));
    var arrowLeft = triggerRect.left + triggerRect.width / 2 - left;

    layer.style.left = left + 'px';
    layer.style.top = triggerRect.bottom + TOOLTIP_GAP + 'px';
    layer.style.setProperty('--spellbound-tooltip-arrow-left', arrowLeft + 'px');
  }

  function showTooltip(trigger) {
    var label = trigger.dataset.label;
    if (!label) return;

    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }

    activeTrigger = trigger;
    var layer = getTooltip();
    layer.textContent = label;
    layer.hidden = false;
    positionTooltip(trigger);

    window.requestAnimationFrame(function () {
      if (activeTrigger === trigger) layer.classList.add('is-visible');
    });
  }

  function hideTooltip(trigger) {
    if (trigger && trigger !== activeTrigger) return;
    if (!tooltip) return;

    activeTrigger = null;
    tooltip.classList.remove('is-visible');
    hideTimer = window.setTimeout(function () {
      if (!activeTrigger && tooltip) tooltip.hidden = true;
      hideTimer = null;
    }, 180);
  }

  document.addEventListener('pointerover', function (event) {
    var trigger = getTrigger(event.target);
    if (!trigger || isInsideTrigger(trigger, event.relatedTarget)) return;
    showTooltip(trigger);
  });

  document.addEventListener('pointerout', function (event) {
    var trigger = getTrigger(event.target);
    if (!trigger || isInsideTrigger(trigger, event.relatedTarget)) return;
    hideTooltip(trigger);
  });

  document.addEventListener('focusin', function (event) {
    var trigger = getTrigger(event.target);
    if (trigger) showTooltip(trigger);
  });

  document.addEventListener('focusout', function (event) {
    var trigger = getTrigger(event.target);
    if (trigger) hideTooltip(trigger);
  });

  window.addEventListener('resize', function () { hideTooltip(); });
  window.addEventListener('scroll', function () { hideTooltip(); }, { capture: true, passive: true });
})();
