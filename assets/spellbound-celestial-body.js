/**
 * Spellbound Celestial Body - Interactive planet visualization
 * Reads data attributes from the section container and handles:
 * - Slow texture animation on the planet sphere
 * - Read More panel toggle
 */
(function() {
  const section = document.querySelector('.spellbound-celestial');
  if (!section) return;

  // Read More toggle
  const readMoreBtn = section.querySelector('.spellbound-celestial__read-more');
  const panel = section.querySelector('.spellbound-celestial__panel');
  const panelClose = section.querySelector('.spellbound-celestial__panel-close');

  if (readMoreBtn && panel) {
    readMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      panel.classList.add('is-open');
    });
  }
  if (panelClose && panel) {
    panelClose.addEventListener('click', function(e) {
      e.preventDefault();
      panel.classList.remove('is-open');
    });
  }
})();
