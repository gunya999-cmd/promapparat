(() => {
  const d = document;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const mail = 'info@promapparat.ru';
  const enc = encodeURIComponent;

  function buildMailto(subject, rows) {
    const body = rows
      .filter(([label, value]) => String(value || '').trim())
      .map(([label, value]) => `${label}: ${String(value).trim()}`)
      .join('\n');
    return `mailto:${mail}?subject=${enc(subject)}&body=${enc(body + '\n\nПросьба подготовить подбор и КП.')}`;
  }

  function initHeroCursor() {
    const hero = d.querySelector('.home-hero-static--layered-wow');
    if (!hero || reduceMotion) return;
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--hero-x', `${x.toFixed(2)}%`);
      hero.style.setProperty('--hero-y', `${y.toFixed(2)}%`);
    }, { passive: true });
  }

  function initReveal() {
    const targets = Array.from(d.querySelectorAll('[data-live-reveal], .live-section, .live-card, .live-panel, .download-card, .catalog-group, .catalog-grid .card, .home-stage-process__item, .about-service, .about-direction'));
    targets.forEach((node, index) => {
      node.setAttribute('data-live-reveal', '');
      node.style.transitionDelay = reduceMotion ? '0ms' : `${Math.min(index % 8, 7) * 45}ms`;
    });
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach((node) => observer.observe(node));
  }

  function initProcess() {
    const items = Array.from(d.querySelectorAll('.home-stage-process__item'));
    if (!items.length) return;
    const activate = (item) => {
      items.forEach((node) => node.classList.toggle('is-active', node === item));
    };
    items.forEach((item, index) => {
      item.tabIndex = 0;
      if (index === 0) item.classList.add('is-active');
      item.addEventListener('mouseenter', () => activate(item));
      item.addEventListener('focus', () => activate(item));
      item.addEventListener('click', () => activate(item));
    });
  }

  function initTabs() {
    const groups = Array.from(d.querySelectorAll('[data-live-tabs]'));
    groups.forEach((group) => {
      const tabs = Array.from(group.querySelectorAll('[data-live-target]'));
      const panels = Array.from(group.querySelectorAll('[data-live-panel]'));
      const activate = (id) => {
        tabs.forEach((tab) => tab.classList.toggle('is-active', tab.dataset.liveTarget === id));
        panels.forEach((panel) => panel.classList.toggle('is-active', panel.dataset.livePanel === id));
      };
      tabs.forEach((tab) => tab.addEventListener('click', () => activate(tab.dataset.liveTarget)));
      if (tabs[0]) activate(tabs[0].dataset.liveTarget);
    });
  }

  function initForms() {
    Array.from(d.querySelectorAll('form[data-live-mail]')).forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const subject = form.dataset.liveSubject || 'Заявка на подбор оборудования';
        const rows = Array.from(data.entries()).map(([key, value]) => [form.querySelector(`[name="${CSS.escape(key)}"]`)?.dataset.label || key, value]);
        const status = form.querySelector('.live-status');
        if (status) status.textContent = 'Откроется письмо с заполненными параметрами.';
        window.location.href = buildMailto(subject, rows);
      });
    });
  }

  function enhanceDownloads() {
    Array.from(d.querySelectorAll('.download-card')).forEach((card) => {
      if (card.querySelector('.live-download-actions')) return;
      const title = card.querySelector('h3')?.textContent.trim() || 'Опросный лист';
      const oldBtn = card.querySelector('.btn');
      if (!oldBtn) return;
      const wrap = d.createElement('div');
      wrap.className = 'live-download-actions';
      oldBtn.parentNode.insertBefore(wrap, oldBtn);
      wrap.appendChild(oldBtn);
      const fill = d.createElement('a');
      fill.className = 'btn live-fill';
      fill.href = buildMailto(`Заполнение опросного листа: ${title}`, [
        ['Раздел', title],
        ['Оборудование', ''],
        ['DN / PN', ''],
        ['Среда / температура / давление', ''],
        ['Требуемые документы', '']
      ]);
      fill.textContent = 'Заполнить онлайн';
      wrap.appendChild(fill);
    });
  }

  function initCatalogAnchors() {
    const firstGroup = d.querySelector('.catalog-group');
    const groups = Array.from(d.querySelectorAll('.catalog-group'));
    if (!firstGroup || groups.length < 3 || d.querySelector('.catalog-live-nav')) return;
    const nav = d.createElement('nav');
    nav.className = 'catalog-live-nav';
    nav.setAttribute('aria-label', 'Быстрая навигация по каталогу');
    groups.forEach((group, index) => {
      const title = group.querySelector('h3');
      if (!title) return;
      const id = `catalog-group-${index + 1}`;
      group.id = id;
      const a = d.createElement('a');
      a.href = `#${id}`;
      a.textContent = title.textContent.trim();
      nav.appendChild(a);
    });
    firstGroup.parentNode.insertBefore(nav, firstGroup);
  }

  function initStickyCta() {
    if (d.querySelector('.live-sticky-cta')) return;
    const cta = d.createElement('aside');
    cta.className = 'live-sticky-cta';
    cta.setAttribute('aria-label', 'Быстрые действия');
    cta.innerHTML = `
      <a href="mailto:${mail}?subject=${enc('Запрос КП ПО Промаппарат')}">Получить КП</a>
      <a href="/oprosnye-listy/">Опросные листы</a>
      <a href="/podbor-analogov-importnogo-oborudovaniya/">Подобрать аналог</a>
    `;
    d.body.appendChild(cta);
    const show = () => cta.classList.toggle('is-visible', window.scrollY > 360);
    window.addEventListener('scroll', show, { passive: true });
    show();
  }

  function markActiveNav() {
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    Array.from(d.querySelectorAll('.nav a')).forEach((link) => {
      const href = link.getAttribute('href')?.replace(/\/$/, '') || '/';
      link.classList.toggle('is-active', href === path);
    });
  }

  function enhancePageHero() {
    const hero = d.querySelector('.page-hero .wrap');
    if (!hero || hero.querySelector('.live-hero-specs')) return;
    const specs = d.createElement('div');
    specs.className = 'live-hero-specs';
    specs.innerHTML = '<span>DN / PN</span><span>Среда</span><span>Температура</span><span>Документы</span>';
    hero.appendChild(specs);
  }

  function init() {
    d.documentElement.classList.add('has-live-system');
    initHeroCursor();
    initTabs();
    initForms();
    enhanceDownloads();
    initCatalogAnchors();
    initProcess();
    initReveal();
    initStickyCta();
    markActiveNav();
    enhancePageHero();
  }

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init);
  else init();
})();
