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

  function addHomeDashboard() {
    if (location.pathname !== '/' && location.pathname !== '/index.html') return;
    var boardInner = document.querySelector('#board .col-12.col-md-10.m-auto');
    if (!boardInner || document.querySelector('.home-dashboard')) return;

    var dashboard = document.createElement('section');
    dashboard.className = 'home-dashboard';
    dashboard.innerHTML = [
      '<div class="home-hero-panel">',
      '  <div>',
      '    <p class="home-kicker">AI / Web / Engineering</p>',
      '    <h1>把学习、实验和项目复盘沉淀成可复用的经验</h1>',
      '    <p class="home-summary">这里会持续整理人工智能应用、Web 开发、工程化工具和项目实践。每篇文章都尽量回答一个具体问题，留下清晰的思考路径。</p>',
      '  </div>',
      '  <div class="home-signal" aria-hidden="true">',
      '    <span></span><span></span><span></span><span></span>',
      '  </div>',
      '</div>',
      '<div class="home-focus-grid">',
      '  <a class="home-focus-card" href="/tags/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD/">',
      '    <span class="home-card-index">01</span>',
      '    <h2>人工智能</h2>',
      '    <p>记录 AI 工具、模型能力、应用实验和真实项目里的使用方式。</p>',
      '  </a>',
      '  <a class="home-focus-card" href="/categories/">',
      '    <span class="home-card-index">02</span>',
      '    <h2>工程实践</h2>',
      '    <p>把开发过程中的设计、取舍、排错和部署经验整理成可回看的笔记。</p>',
      '  </a>',
      '  <a class="home-focus-card" href="/archives/">',
      '    <span class="home-card-index">03</span>',
      '    <h2>持续复盘</h2>',
      '    <p>按时间线沉淀学习轨迹，让每次实践都能成为下一次的起点。</p>',
      '  </a>',
      '</div>',
      '<div class="home-workbench">',
      '  <div class="home-workbench-main">',
      '    <p class="home-section-label">近期会补充</p>',
      '    <ul>',
      '      <li><span>AI 应用开发</span><em>提示词、工作流、工具调用、项目落地</em></li>',
      '      <li><span>Hexo 博客建设</span><em>主题配置、自动化发布、本地编辑后台</em></li>',
      '      <li><span>Web 工程化</span><em>调试记录、构建优化、部署经验</em></li>',
      '    </ul>',
      '  </div>',
      '  <div class="home-actions">',
      '    <a href="/archives/">浏览归档</a>',
      '    <a href="/tags/">查看标签</a>',
      '    <a href="/about/">联系我</a>',
      '  </div>',
      '</div>',
      '<div class="home-latest-title">',
      '  <span>最新文章</span>',
      '  <small>Latest Notes</small>',
      '</div>'
    ].join('');

    boardInner.insertBefore(dashboard, boardInner.firstChild);
  }

  document.addEventListener('DOMContentLoaded', function () {
    markNavbar();
    addHomeDashboard();
    setupReveal();
    setupPreviewRefreshHint();
  });

  window.addEventListener('scroll', markNavbar, { passive: true });
})();
