document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[id^="spellbound-oracle-"]').forEach(function (oracle) {
    var state = { intent: '', element: '' };
    var steps = oracle.querySelectorAll('.spellbound-oracle__step');
    var baseUrl = oracle.dataset.baseUrl || '/collections/all';

    function showStep(index) {
      steps.forEach(function (step) {
        step.classList.remove('active');
      });
      if (steps[index]) {
        steps[index].classList.add('active');
      }
    }

    // Intention buttons
    oracle.querySelectorAll('[data-oracle-intent]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.intent = this.dataset.oracleIntent;
        showStep(1);
      });
    });

    // Element buttons
    oracle.querySelectorAll('[data-oracle-element]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.element = this.dataset.oracleElement;
        var intentDisplay = oracle.querySelector('[data-oracle-intent-display]');
        var elementDisplay = oracle.querySelector('[data-oracle-element-display]');
        if (intentDisplay) intentDisplay.textContent = state.intent;
        if (elementDisplay) elementDisplay.textContent = state.element;

        var revealLink = oracle.querySelector('[data-oracle-reveal]');
        if (revealLink) {
          var handle = state.element.toLowerCase().replace(/\s+/g, '-');
          revealLink.href = '/collections/' + handle;
        }
        showStep(2);
      });
    });

    // Back button
    oracle.querySelectorAll('[data-oracle-back]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        showStep(0);
      });
    });

    // Reset button
    oracle.querySelectorAll('[data-oracle-reset]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state = { intent: '', element: '' };
        showStep(0);
      });
    });
  });
});
