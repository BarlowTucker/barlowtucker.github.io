/* ===================================================================
   BARLOW TUCKER — Main JavaScript
   Scroll reveal, nav behavior, mobile menu, entrance animations
   =================================================================== */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // -------------------------------------------------------------------
  // NAV SCROLL BEHAVIOR
  // -------------------------------------------------------------------
  const header = document.getElementById('site-header');

  function handleNavScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll(); // Set initial state

  // -------------------------------------------------------------------
  // MOBILE MENU TOGGLE
  // -------------------------------------------------------------------
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = navMenu.querySelectorAll('.nav__link, .nav__cta');

  function openMenu() {
    navToggle.classList.add('active');
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  navToggle.addEventListener('click', function () {
    if (navMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when a link is clicked
  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      navToggle.focus();
    }
  });

  // -------------------------------------------------------------------
  // ENTRANCE ANIMATIONS (Hero stagger)
  // -------------------------------------------------------------------
  if (!prefersReducedMotion) {
    var staggerElements = document.querySelectorAll('.entrance-stagger');
    staggerElements.forEach(function (el) {
      var delay = (parseInt(el.getAttribute('data-stagger'), 10) || 1) * 150;
      setTimeout(function () {
        el.classList.add('visible');
      }, delay + 200); // 200ms base delay for page load
    });
  } else {
    // Show everything immediately if reduced motion is preferred
    document.querySelectorAll('.entrance-stagger').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // -------------------------------------------------------------------
  // SCROLL REVEAL (IntersectionObserver)
  // -------------------------------------------------------------------
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    document.querySelectorAll('.scroll-reveal').forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Show everything immediately for reduced motion or no IO support
    document.querySelectorAll('.scroll-reveal').forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // -------------------------------------------------------------------
  // SMOOTH SCROLL FOR NAV LINKS (fallback for older browsers)
  // -------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
        });
      }
    });
  });
})();
