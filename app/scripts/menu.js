'use strict';

var $navbarBurgers = document.querySelectorAll('.navbar-burger');

$navbarBurgers.forEach($el => {
  $el.addEventListener('click', () => {
    var target = $el.dataset.target;
    var $target = document.getElementById(target);

    $el.classList.toggle('is-active');
    $target.classList.toggle('is-active');
  });
});
