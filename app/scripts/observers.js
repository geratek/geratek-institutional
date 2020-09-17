'use strict';

var $navbar = document.querySelector('.navbar');
var $hero = document.querySelector('.hero');

var options = {
  rootMargin: '-90% 0px 0px 0px'
};

var heroObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    $navbar.classList.toggle('nav-scrolled', !entry.isIntersecting);
  });
}, options);

heroObserver.observe($hero);