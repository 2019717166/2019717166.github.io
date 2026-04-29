(function () {
  'use strict';

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function text(value) {
    return value;
  }

  function markNavbar() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.classList.toggle('dynamic-scrolled', window.scrollY > 12);
  }

  function setupReveal() {
    var targets = document.querySelectorAll('.home-side-card, .index-card, .board, article, .archive, .category-list, .tag-cloud, .about-avatar, .about-name, .about-intro, .markdown-body > *');
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
      item.style.transitionDelay = Math.min(index * 28, 220) + 'ms';
      observer.observe(item);
    });
  }

  function setupPreviewRefreshHint() {
    if (!location.hostname.match(/^(localhost|127\.0\.0\.1)$/)) return;
    document.documentElement.dataset.localPreview = 'true';
  }

  function createCard(className, html) {
    var card = document.createElement('section');
    card.className = className;
    card.innerHTML = html;
    return card;
  }

  function positionFloatingSidebars() {
    if (!document.documentElement.classList.contains('home-wide-sidebars')) return;
    var main = document.querySelector('.home-main-feed');
    var left = document.querySelector('.home-sidebar-left');
    var right = document.querySelector('.home-sidebar-right');
    if (!main || !left || !right) return;

    var viewport = window.innerWidth || document.documentElement.clientWidth;
    var useFloating = viewport >= 1200;
    document.documentElement.classList.toggle('home-floating-active', useFloating);
    if (!useFloating) {
      left.style.left = '';
      right.style.right = '';
      return;
    }

    left.style.left = '24px';
    right.style.right = '24px';
  }

  function addHomeSidebars() {
    if (location.pathname !== '/' && location.pathname !== '/index.html') return;
    var boardInner = document.querySelector('#board .col-12.col-md-10.m-auto');
    if (!boardInner || document.querySelector('.home-shell')) return;
    document.documentElement.classList.add('home-wide-sidebars');

    var cards = Array.prototype.slice.call(boardInner.querySelectorAll(':scope > .index-card'));
    if (!cards.length) return;

    var shell = document.createElement('div');
    shell.className = 'home-shell';

    var left = document.createElement('aside');
    left.className = 'home-sidebar home-sidebar-left';
    left.appendChild(createCard('home-side-card home-profile-card', [
      '<h2>' + text('\u5fc3\u5e73\u6c14\u548c') + '</h2>',
      '<p>' + text('\u8bb0\u5f55\u4eba\u5de5\u667a\u80fd\u3001Web \u5f00\u53d1\u548c\u5de5\u7a0b\u5b9e\u8df5\uff0c\u628a\u6bcf\u6b21\u5b66\u4e60\u548c\u5b9e\u9a8c\u90fd\u7559\u6210\u53ef\u590d\u7528\u7684\u7ecf\u9a8c\u3002') + '</p>',
      '<div class="home-signal-mini" aria-hidden="true"><span></span><span></span><span></span></div>'
    ].join('')));
    left.appendChild(createCard('home-side-card', [
      '<h3>' + text('\u5173\u6ce8\u65b9\u5411') + '</h3>',
      '<a href="/tags/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD/">' + text('\u4eba\u5de5\u667a\u80fd') + '</a>',
      '<a href="/categories/">' + text('\u5de5\u7a0b\u5b9e\u8df5') + '</a>',
      '<a href="/archives/">' + text('\u6301\u7eed\u590d\u76d8') + '</a>'
    ].join('')));

    var center = document.createElement('section');
    center.className = 'home-main-feed';
    center.innerHTML = '<div class="home-feed-title"><span>' + text('\u6700\u65b0\u6587\u7ae0') + '</span><small>Latest Notes</small></div>';
    cards.forEach(function (card) {
      center.appendChild(card);
    });

    var right = document.createElement('aside');
    right.className = 'home-sidebar home-sidebar-right';
    right.appendChild(createCard('home-side-card', [
      '<h3>' + text('\u8fd1\u671f\u4f1a\u8865\u5145') + '</h3>',
      '<ul class="home-topic-list">',
      '<li><span>AI</span>' + text('\u5e94\u7528\u5f00\u53d1\u548c\u5de5\u5177\u8c03\u7528') + '</li>',
      '<li><span>Hexo</span>' + text('\u535a\u5ba2\u914d\u7f6e\u4e0e\u81ea\u52a8\u5316') + '</li>',
      '<li><span>Web</span>' + text('\u8c03\u8bd5\u3001\u6784\u5efa\u548c\u90e8\u7f72') + '</li>',
      '</ul>'
    ].join('')));
    right.appendChild(createCard('home-side-card home-quick-card', [
      '<h3>' + text('\u5feb\u6377\u5165\u53e3') + '</h3>',
      '<a href="/archives/">' + text('\u5f52\u6863') + '</a>',
      '<a href="/tags/">' + text('\u6807\u7b7e') + '</a>',
      '<a href="/about/">' + text('\u5173\u4e8e') + '</a>'
    ].join('')));

    shell.appendChild(left);
    shell.appendChild(center);
    shell.appendChild(right);
    boardInner.appendChild(shell);
    positionFloatingSidebars();
  }

  document.addEventListener('DOMContentLoaded', function () {
    markNavbar();
    addHomeSidebars();
    setupReveal();
    setupPreviewRefreshHint();
    positionFloatingSidebars();
  });

  window.addEventListener('scroll', markNavbar, { passive: true });
  window.addEventListener('resize', positionFloatingSidebars);
  window.addEventListener('load', positionFloatingSidebars);
})();
