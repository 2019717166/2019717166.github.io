(function () {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function markNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('dynamic-scrolled', window.scrollY > 12);
  }

  function setupReveal() {
    var targets = document.querySelectorAll('.index-card, .board, article, .archive, .category-list, .tag-cloud, .about-avatar, .about-name, .about-intro, .markdown-body > *');
    if (reducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (item) {
        item.classList.add('dynamic-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('dynamic-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });

    targets.forEach(function (item, index) {
      item.classList.add('dynamic-reveal');
      item.style.transitionDelay = Math.min(index * 28, 260) + 'ms';
      observer.observe(item);
    });
  }

  function setupPreviewRefreshHint() {
    if (!location.hostname.match(/^(localhost|127\.0\.0\.1)$/)) return;
    document.documentElement.dataset.localPreview = 'true';
  }

  document.addEventListener('DOMContentLoaded', function () {
    markNavbar();
    setupReveal();
    setupPreviewRefreshHint();
  });

  window.addEventListener('scroll', markNavbar, { passive: true });
})();
