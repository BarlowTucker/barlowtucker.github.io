/* barlowtucker.com — small, dependency-free behaviors
   1. Header state on scroll
   2. Mobile menu (accessible toggle)
   3. Scroll reveal (IntersectionObserver, respects reduced motion)
*/
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.getElementById('site-header');

  /* 1. Header state ------------------------------------------------- */
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. Mobile menu -------------------------------------------------- */
  var toggle = document.querySelector('.nav__toggle');
  var panel = document.getElementById('nav-panel');

  function setMenu(open) {
    if (!toggle || !panel || !header) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    header.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    panel.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });
    // Reset if the viewport grows past the mobile breakpoint while open.
    var mq = window.matchMedia('(min-width: 56rem)');
    var onMq = function (ev) { if (ev.matches) setMenu(false); };
    if (mq.addEventListener) mq.addEventListener('change', onMq); else if (mq.addListener) mq.addListener(onMq);
  }

  /* 3. Scroll reveal ------------------------------------------------ */
  var targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (el) {
    // Anything already in view on load shows immediately; no waiting on scroll.
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('is-visible');
    } else {
      io.observe(el);
    }
  });
})();
