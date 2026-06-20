(() => {
  const d = document;
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mail = 'info@promapparat.ru';
  const enc = encodeURIComponent;

  function buildMailto(subject, rows) {
    const body = rows
      .filter(([, value]) => String(value || '').trim())
      .map(([label, value]) => `${label}: ${String(value).trim()}`)
      .join('\n');
    return `mailto:${mail}?subject=${enc(subject)}&body=${enc(body + '\n\nПросьба подготовить подбор и КП.')}`;
  }

  function ensureStylesheet(href) {
    if (d.querySelector(`link[href^="${href}"]`)) return;
    const link = d.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${href}?v=20260619-1`;
    d.head.appendChild(link);
  }

  function repairEngineeringNodes() {
    const module = d.querySelector('.real-engineering-module');
    if (!module) return;
    const hasBrokenText = /Р|СЃ|вЂ|Рџ|Рў/.test(module.textContent || '');
    const isSimplifiedEngineeringBlock = !module.querySelector('.engineering-panel');
    if (!hasBrokenText && !isSimplifiedEngineeringBlock) return;

    module.outerHTML = `
  <section class="live-section live-section--dark engineering-module real-engineering-module" aria-labelledby="live-schemes-title" data-live-tabs>
    <div class="wrap">
      <div class="live-head">
        <div>
          <span class="live-kicker">Технические чертежи</span>
          <h2 id="live-schemes-title">Интерактивные инженерные узлы</h2>
        </div>
        <p>Вместо декоративных SVG используются реальные blueprint-чертежи: с размерными линиями, выносками, сечениями, параметрами подбора и интерактивными контрольными точками.</p>
      </div>
      <div class="engineering-lead-grid" aria-label="Принцип работы блока">
        <div class="engineering-lead-card"><strong>01. Чертёж</strong>Реальная инженерная подложка вместо условной SVG-графики.</div>
        <div class="engineering-lead-card"><strong>02. Контрольные точки</strong>Hotspots подсвечивают узлы, которые влияют на подбор.</div>
        <div class="engineering-lead-card"><strong>03. Параметры</strong>DN, PN, среда, температура, сигнал, Ex и документы рядом.</div>
        <div class="engineering-lead-card"><strong>04. Заявка</strong>Переход к письму, опросному листу или разделу каталога.</div>
      </div>
      <div class="live-tabs engineering-tabs" role="tablist" aria-label="Тип инженерного узла">
        <button class="live-tab" type="button" data-live-target="valve">Регулирующий клапан</button>
        <button class="live-tab" type="button" data-live-target="flow">Электромагнитный расходомер</button>
        <button class="live-tab" type="button" data-live-target="level">Радарный уровнемер</button>
      </div>
      ${engineeringPanel('valve', 'Регулирующий клапан', 'valve-blueprint', 'Технический чертёж регулирующего клапана с пневмоприводом и позиционером', [
        ['Пневмопривод','Тип привода, питание или воздух, положение при отказе, требуемое усилие.','50%','19%'],
        ['Позиционер','4–20 мА, HART, обратная связь, Ex-исполнение, манометры.','67%','30%'],
        ['Сальниковый узел','Уплотнение штока, материал, температура, требования к герметичности.','49%','49%'],
        ['Седло и плунжер','Kv/Cv, характеристика регулирования, класс герметичности, перепад давления.','49%','63%'],
        ['Фланцы','DN, PN, стандарт, исполнение RF, крепёж и межфланцевая длина.','36%','66%']
      ], 'Чертёж показывает, какие параметры нужны для корректного подбора клапана: расход, перепад давления, материалы, привод, позиционер и комплект документов.', [['Диаметр','DN 15–300'],['Давление','PN 16–40'],['Температура','−40…+220 °C'],['Сигнал','4–20 мА / HART']], ['Рабочую среду, расход min/normal/max и требуемый Kv/Cv.','Давление до/после клапана, кавитацию и шум.','Материал корпуса, трима, седла и уплотнений.','Тип привода, позиционер, Ex и положение при отказе.'], 'Подбор%20регулирующего%20клапана', '/oprosnye-listy/', 'Опросный лист')}
      ${engineeringPanel('flow', 'Электромагнитный расходомер', 'flowmeter-blueprint', 'Технический чертёж электромагнитного расходомера во фланцевом исполнении', [
        ['Преобразователь','Питание, индикация, 4–20 мА, HART, Modbus, степень защиты.','49%','16%'],
        ['Измерительная труба','DN, PN, материал, футеровка, проводимость среды.','45%','48%'],
        ['Электроды','Материал электродов, заземление, коррозионная стойкость.','49%','44%'],
        ['Фланцевое соединение','Стандарт фланцев, монтажная длина, прямые участки.','36%','45%'],
        ['Заземление','Заземляющие кольца, перемычки и требования монтажа.','37%','58%']
      ], 'Чертёж показывает конструкцию расходомера, требования к монтажу, заземлению, футеровке, электродам и выходным сигналам.', [['Диаметр','DN 15…1000'],['Давление','до PN 40'],['Футеровка','PFA / PTFE'],['Сигнал','HART / Modbus']], ['Расход min/normal/max и DN трубопровода.','Электропроводность, температура и состав среды.','Футеровку, электроды, заземление и степень защиты.','Поверку, протокол связи, питание и выходные сигналы.'], 'Подбор%20расходомера', '/rashodomery/', 'Раздел расходомеров')}
      ${engineeringPanel('level', 'Радарный уровнемер', 'levelmeter-blueprint', 'Технический чертёж радарного уровнемера на резервуаре', [
        ['Корпус электроники','Питание, индикация, выходной сигнал, степень защиты.','51%','11%'],
        ['Процессное присоединение','DN/PN, штуцер, фланец, материал, температура и давление.','51%','28%'],
        ['Антенна','Тип антенны, материал PTFE/SS, агрессивность среды, конденсат.','51%','37%'],
        ['Измерительный луч','Диапазон, мёртвая зона, угол раскрытия, внутренние препятствия.','53%','55%'],
        ['Уровень продукта','Пена, пары, турбулентность, диэлектрическая проницаемость.','47%','63%']
      ], 'Чертёж показывает установку прибора на резервуаре: процессное присоединение, антенну, диапазон измерения, уровень продукта и выходные сигналы.', [['Диапазон','0…30 м'],['Давление','−1…+4 МПа'],['Температура','−40…+200 °C'],['Выход','4–20 мА + HART']], ['Высоту резервуара, диапазон и место установки.','Пену, пары, пыль, конденсат и внутренние элементы.','Материал антенны, присоединение и Ex-зону.','Сигнал, питание, индикацию и требования к сертификатам.'], 'Подбор%20уровнемера', '/urovnemery/', 'Раздел уровнемеров')}
      <div class="engineering-note real-node-note">Чертежи используются как визуальная инженерная подложка. Важные коммерческие действия, hotspots и SEO-текст остаются HTML-слоем — так блок остаётся быстрым, адаптивным и управляемым.</div>
    </div>
  </section>`;
  }

  function engineeringPanel(id, title, file, alt, points, text, specs, checks, subject, link, linkText) {
    return `<article class="engineering-panel real-engineering-panel" data-live-panel="${id}" aria-label="${title}">
      <div class="real-drawing-shell">
        <picture><source srcset="/assets/engineering-nodes/${file}.avif" type="image/avif"><source srcset="/assets/engineering-nodes/${file}.webp" type="image/webp"><img class="real-blueprint-img" src="/assets/engineering-nodes/${file}.webp" width="1448" height="1086" alt="${alt}" loading="lazy" decoding="async"></picture>
        ${points.map((p,i)=>`<button class="real-hotspot" type="button" style="left:${p[2]};top:${p[3]}">${String(i+1).padStart(2,'0')}<span class="real-tip"><strong>${p[0]}</strong>${p[1]}</span></button>`).join('')}
        <a class="real-zoom" href="/assets/engineering-nodes/${file}.webp" target="_blank" rel="noopener">Открыть чертёж крупно</a>
      </div>
      <aside class="real-node-info">
        <div class="real-node-card"><h3>${title}</h3><p>${text}</p><div class="real-node-specs">${specs.map(s=>`<div class="real-node-spec"><span>${s[0]}</span><strong>${s[1]}</strong></div>`).join('')}</div></div>
        <div class="real-node-card"><h3>Что проверить</h3><ul class="real-node-list">${checks.map(c=>`<li>${c}</li>`).join('')}</ul></div>
        <div class="real-node-card"><h3>Действия</h3><p>Отправьте исходные параметры или откройте профильный раздел.</p><div class="real-node-actions"><a class="btn" href="mailto:${mail}?subject=${subject}">Отправить параметры</a><a class="btn btn--white" href="${link}">${linkText}</a></div></div>
      </aside>
    </article>`;
  }

  function replaceDocumentationBlock() {
    ensureStylesheet('/assets/css/home-docs-placeholder-20260619.css');
    const old = d.querySelector('[aria-labelledby="live-docs-title"]');
    if (!old || old.classList.contains('home-docs-placeholder')) return;

    old.outerHTML = `
  <section class="home-docs-placeholder" aria-labelledby="home-docs-title">
    <div class="wrap home-docs-placeholder__inner">
      <div class="home-docs-placeholder__copy">
        <h2 id="home-docs-title">Комплект сопроводительной документации</h2>
        <p>По поставляемому оборудованию подготавливается комплект документов в зависимости от типа изделия, требований проекта и условий поставки.</p>
      </div>
      <div class="home-docs-placeholder__cards" aria-label="Состав документации">
        ${docCard('file','Паспорта изделий')}
        ${docCard('badge','Сертификаты')}
        ${docCard('check','Декларации ЕАЭС')}
        ${docCard('test','Протоколы испытаний')}
        ${docCard('cert','Сертификаты материалов')}
        ${docCard('folder','Исполнительная документация')}
      </div>
      <div class="home-docs-visual" aria-hidden="true">
        <div class="home-docs-sheet"><div class="home-docs-lines"><i></i><i></i><i></i><i></i></div><div class="home-docs-blueprint"></div><div class="home-docs-stamp"></div></div>
        <div class="home-docs-pen"></div>
      </div>
    </div>
  </section>`;
  }

  function docCard(type, text) {
    const icons = {
      file: '<path d="M8 3h10l5 5v18H8z"/><path d="M18 3v6h5"/><path d="M12 17h8M12 21h6"/>',
      badge: '<path d="M8 3h10l5 5v18H8z"/><path d="M18 3v6h5"/><circle cx="17" cy="20" r="3"/><path d="m19.5 22.5 2.5 2.5M14.5 22.5 12 25"/>',
      check: '<path d="M9 7h13v18H7V7h2z"/><path d="M11 7a3 3 0 0 1 6 0"/><path d="m11 18 3 3 7-8"/>',
      test: '<path d="M9 7h13v18H7V7h2z"/><path d="M11 7a3 3 0 0 1 6 0"/><path d="M15 13v7M12 20h6"/>',
      cert: '<path d="M8 4h14v17H8z"/><path d="M12 9h6M12 13h7"/><circle cx="17" cy="21" r="3"/><path d="M15 23v4l2-1 2 1v-4"/>',
      folder: '<path d="M4 8h9l2 3h13v13H4z"/><path d="M4 12h24"/>'
    };
    return `<div class="home-doc-card"><span class="home-doc-card__icon"><svg viewBox="0 0 32 32" aria-hidden="true">${icons[type]}</svg></span><strong>${text}</strong></div>`;
  }

  function initHeroCursor() {
    const hero = d.querySelector('.home-hero-static--layered-wow');
    if (!hero || reduceMotion) return;
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty('--hero-x', `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(2)}%`);
      hero.style.setProperty('--hero-y', `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(2)}%`);
    }, { passive: true });
  }

  function initReveal() {
    const targets = Array.from(d.querySelectorAll('[data-live-reveal], .live-section, .home-docs-placeholder, .live-card, .live-panel, .download-card, .catalog-group, .catalog-grid .card, .home-stage-process__item, .about-service, .about-direction, .home-doc-card'));
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
    const activate = (item) => items.forEach((node) => node.classList.toggle('is-active', node === item));
    items.forEach((item, index) => {
      item.tabIndex = 0;
      if (index === 0) item.classList.add('is-active');
      item.addEventListener('mouseenter', () => activate(item));
      item.addEventListener('focus', () => activate(item));
      item.addEventListener('click', () => activate(item));
    });
  }

  function initTabs() {
    Array.from(d.querySelectorAll('[data-live-tabs]')).forEach((group) => {
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
      fill.href = buildMailto(`Заполнение опросного листа: ${title}`, [['Раздел', title], ['Оборудование', ''], ['DN / PN', ''], ['Среда / температура / давление', ''], ['Требуемые документы', '']]);
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
    cta.innerHTML = `<a href="mailto:${mail}?subject=${enc('Запрос КП ПО Промаппарат')}">Получить КП</a><a href="/oprosnye-listy/">Опросные листы</a><a href="/podbor-analogov-importnogo-oborudovaniya/">Подобрать аналог</a>`;
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
    repairEngineeringNodes();
    replaceDocumentationBlock();
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