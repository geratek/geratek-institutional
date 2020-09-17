'use strict';

var $navbarItems = document.querySelectorAll('[data-scrollTo]');

$navbarItems.forEach($el => {
  return $el.addEventListener('click', event => {
    event.preventDefault();

    var target = $el.dataset.scrollto || 'html';
    var targetPosition = document.querySelector(target).offsetTop - 100;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var duration = 1000;
    var start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
      if (!start) {
        start = timestamp;
      }

      var progress = timestamp - start;

      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));

      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }
  });
});

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t * t + b;
  t -= 2;
  return c / 2 * (t * t * t + 2) + b;
}