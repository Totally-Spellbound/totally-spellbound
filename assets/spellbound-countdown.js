/* Spellbound Ritual Countdown — date-only countdown (DD HH MM), minute tick. */
(function () {
  'use strict';

  function pad(value) {
    return value < 10 ? '0' + value : String(value);
  }

  /* Parse a strict YYYY-MM-DD string as local midnight. Returns NaN when invalid. */
  function parseTargetDate(raw) {
    var match = /^(\d{4})-(\d{2})-(\d{2})$/.exec((raw || '').trim());
    if (!match) return NaN;
    var year = parseInt(match[1], 10);
    var month = parseInt(match[2], 10);
    var day = parseInt(match[3], 10);
    if (month < 1 || month > 12 || day < 1 || day > 31) return NaN;
    var date = new Date(year, month - 1, day, 0, 0, 0, 0);
    /* Reject rollovers like 2026-02-31 -> March */
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      return NaN;
    }
    return date.getTime();
  }

  function initCountdown(root) {
    if (root.dataset.countdownReady === 'true') return;
    root.dataset.countdownReady = 'true';

    var timer = root.querySelector('[data-countdown-timer]');
    if (!timer) return;

    var expiredEl = root.querySelector('[data-countdown-expired]');
    var daysEl = timer.querySelector('[data-countdown-days]');
    var hoursEl = timer.querySelector('[data-countdown-hours]');
    var minsEl = timer.querySelector('[data-countdown-mins]');

    function setValues(days, hours, mins) {
      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minsEl) minsEl.textContent = pad(mins);
    }

    var target = parseTargetDate(timer.getAttribute('data-countdown-target'));

    /* Invalid or missing date: show zeros and never start an interval. */
    if (isNaN(target)) {
      setValues(0, 0, 0);
      return;
    }

    var intervalId = null;

    function expire() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
      setValues(0, 0, 0);
      if (expiredEl && expiredEl.textContent.trim() !== '') {
        timer.hidden = true;
        expiredEl.hidden = false;
      }
    }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        expire();
        return;
      }
      var totalMins = Math.floor(diff / 60000);
      var days = Math.floor(totalMins / 1440);
      var hours = Math.floor((totalMins % 1440) / 60);
      var mins = totalMins % 60;
      setValues(days, hours, mins);
    }

    tick();
    if (target - Date.now() > 0) {
      intervalId = setInterval(tick, 60000);
    }
  }

  function initAll(scope) {
    (scope || document).querySelectorAll('[data-spellbound-countdown]').forEach(initCountdown);
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
