document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-countdown-target]').forEach(function (timer) {
    var targetDate = new Date(timer.dataset.countdownTarget + 'T00:00:00').getTime();
    var daysEl = timer.querySelector('[data-countdown-days]');
    var hoursEl = timer.querySelector('[data-countdown-hours]');
    var minsEl = timer.querySelector('[data-countdown-mins]');

    function update() {
      var now = Date.now();
      var diff = targetDate - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minsEl) minsEl.textContent = '00';
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (daysEl) daysEl.textContent = days < 10 ? '0' + days : days;
      if (hoursEl) hoursEl.textContent = hours < 10 ? '0' + hours : hours;
      if (minsEl) minsEl.textContent = mins < 10 ? '0' + mins : mins;
    }

    update();
    setInterval(update, 60000);
  });
});
