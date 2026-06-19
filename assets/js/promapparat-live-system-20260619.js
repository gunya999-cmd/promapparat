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

  function repairEngineeringNodes() {
    const module = d.querySelector('.real-engineering-module');
    if (!module) return;

    const hasBrokenText = /Р|СЃ|вЂ|Рџ|Рў/.test(module.textContent || '');
    if (!hasBrokenText) return;

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

      <article class="engineering-panel real-engineering-panel" data-live-panel="valve" aria-label="Регулирующий клапан">
        <div class="real-drawing-shell">
          <picture>
            <source srcset="/assets/engineering-nodes/valve-blueprint.avif" type="image/avif">
            <source srcset="/assets/engineering-nodes/valve-blueprint.webp" type="image/webp">
            <img class="real-blueprint-img" src="/assets/engineering-nodes/valve-blueprint.webp" width="1448" height="1086" alt="Технический чертёж регулирующего клапана с пневмоприводом и позиционером" loading="lazy" decoding="async">
          </picture>
          <button class="real-hotspot" type="button" style="left:50%;top:19%">01<span class="real-tip"><strong>Пневмопривод</strong>Тип привода, питание или воздух, положение при отказе, требуемое усилие.</span></button>
          <button class="real-hotspot" type="button" style="left:67%;top:30%">02<span class="real-tip"><strong>Позиционер</strong>4–20 мА, HART, обратная связь, Ex-исполнение, манометры.</span></button>
          <button class="real-hotspot" type="button" style="left:49%;top:49%">03<span class="real-tip"><strong>Сальниковый узел</strong>Уплотнение штока, материал, температура, требования к герметичности.</span></button>
          <button class="real-hotspot" type="button" style="left:49%;top:63%">04<span class="real-tip"><strong>Седло и плунжер</strong>Kv/Cv, характеристика регулирования, класс герметичности, перепад давления.</span></button>
          <button class="real-hotspot" type="button" style="left:36%;top:66%">05<span class="real-tip"><strong>Фланцы</strong>DN, PN, стандарт, исполнение RF, крепёж и межфланцевая длина.</span></button>
          <a class="real-zoom" href="/assets/engineering-nodes/valve-blueprint.webp" target="_blank" rel="noopener">Открыть чертёж крупно</a>
        </div>
        <aside class="real-node-info">
          <div class="real-node-card"><h3>Регулирующий клапан</h3><p>Чертёж показывает, какие параметры нужны для корректного подбора клапана: расход, перепад давления, материалы, привод, позиционер и комплект документов.</p><div class="real-node-specs"><div class="real-node-spec"><span>Диаметр</span><strong>DN 15–300</strong></div><div class="real-node-spec"><span>Давление</span><strong>PN 16–40</strong></div><div class="real-node-spec"><span>Температура</span><strong>−40…+220 °C</strong></div><div class="real-node-spec"><span>Сигнал</span><strong>4–20 мА / HART</strong></div></div></div>
          <div class="real-node-card"><h3>Что проверить</h3><ul class="real-node-list"><li>Рабочую среду, расход min/normal/max и требуемый Kv/Cv.</li><li>Давление до/после клапана, кавитацию и шум.</li><li>Материал корпуса, трима, седла и уплотнений.</li><li>Тип привода, позиционер, Ex и положение при отказе.</li></ul></div>
          <div class="real-node-card"><h3>Действия</h3><p>Отправьте исходные параметры или заполните опросный лист — по ним можно готовить КП.</p><div class="real-node-actions"><a class="btn" href="mailto:info@promapparat.ru?subject=Подбор%20регулирующего%20клапана">Отправить параметры</a><a class="btn btn--white" href="/oprosnye-listy/">Опросный лист</a></div></div>
        </aside>
      </article>

      <article class="engineering-panel real-engineering-panel" data-live-panel="flow" aria-label="Электромагнитный расходомер">
        <div class="real-drawing-shell">
          <picture>
            <source srcset="/assets/engineering-nodes/flowmeter-blueprint.avif" type="image/avif">
            <source srcset="/assets/engineering-nodes/flowmeter-blueprint.webp" type="image/webp">
            <img class="real-blueprint-img" src="/assets/engineering-nodes/flowmeter-blueprint.webp" width="1448" height="1086" alt="Технический чертёж электромагнитного расходомера во фланцевом исполнении" loading="lazy" decoding="async">
          </picture>
          <button class="real-hotspot" type="button" style="left:49%;top:16%">01<span class="real-tip"><strong>Преобразователь</strong>Питание, индикация, 4–20 мА, HART, Modbus, степень защиты.</span></button>
          <button class="real-hotspot" type="button" style="left:45%;top:48%">02<span class="real-tip"><strong>Измерительная труба</strong>DN, PN, материал, футеровка, проводимость среды.</span></button>
          <button class="real-hotspot" type="button" style="left:49%;top:44%">03<span class="real-tip"><strong>Электроды</strong>Материал электродов, заземление, коррозионная стойкость.</span></button>
          <button class="real-hotspot" type="button" style="left:36%;top:45%">04<span class="real-tip"><strong>Фланцевое соединение</strong>Стандарт фланцев, монтажная длина, прямые участки.</span></button>
          <button class="real-hotspot" type="button" style="left:37%;top:58%">05<span class="real-tip"><strong>Заземление</strong>Заземляющие кольца, перемычки и требования монтажа.</span></button>
          <a class="real-zoom" href="/assets/engineering-nodes/flowmeter-blueprint.webp" target="_blank" rel="noopener">Открыть чертёж крупно</a>
        </div>
        <aside class="real-node-info">
          <div class="real-node-card"><h3>Электромагнитный расходомер</h3><p>Чертёж показывает конструкцию расходомера, требования к монтажу, заземлению, футеровке, электродам и выходным сигналам.</p><div class="real-node-specs"><div class="real-node-spec"><span>Диаметр</span><strong>DN 15…1000</strong></div><div class="real-node-spec"><span>Давление</span><strong>до PN 40</strong></div><div class="real-node-spec"><span>Футеровка</span><strong>PFA / PTFE</strong></div><div class="real-node-spec"><span>Сигнал</span><strong>HART / Modbus</strong></div></div></div>
          <div class="real-node-card"><h3>Что проверить</h3><ul class="real-node-list"><li>Расход min/normal/max и DN трубопровода.</li><li>Электропроводность, температура и состав среды.</li><li>Футеровку, электроды, заземление и степень защиты.</li><li>Поверку, протокол связи, питание и выходные сигналы.</li></ul></div>
          <div class="real-node-card"><h3>Действия</h3><p>Для КП нужны расход, среда, DN/PN, футеровка, сигнал и требования к поверке.</p><div class="real-node-actions"><a class="btn" href="mailto:info@promapparat.ru?subject=Подбор%20расходомера">Отправить параметры</a><a class="btn btn--white" href="/rashodomery/">Раздел расходомеров</a></div></div>
        </aside>
      </article>

      <article class="engineering-panel real-engineering-panel" data-live-panel="level" aria-label="Радарный уровнемер">
        <div class="real-drawing-shell">
          <picture>
            <source srcset="/assets/engineering-nodes/levelmeter-blueprint.avif" type="image/avif">
            <source srcset="/assets/engineering-nodes/levelmeter-blueprint.webp" type="image/webp">
            <img class="real-blueprint-img" src="/assets/engineering-nodes/levelmeter-blueprint.webp" width="1448" height="1086" alt="Технический чертёж радарного уровнемера на резервуаре" loading="lazy" decoding="async">
          </picture>
          <button class="real-hotspot" type="button" style="left:51%;top:11%">01<span class="real-tip"><strong>Корпус электроники</strong>Питание, индикация, выходной сигнал, степень защиты.</span></button>
          <button class="real-hotspot" type="button" style="left:51%;top:28%">02<span class="real-tip"><strong>Процессное присоединение</strong>DN/PN, штуцер, фланец, материал, температура и давление.</span></button>
          <button class="real-hotspot" type="button" style="left:51%;top:37%">03<span class="real-tip"><strong>Антенна</strong>Тип антенны, материал PTFE/SS, агрессивность среды, конденсат.</span></button>
          <button class="real-hotspot" type="button" style="left:53%;top:55%">04<span class="real-tip"><strong>Измерительный луч</strong>Диапазон, мёртвая зона, угол раскрытия, внутренние препятствия.</span></button>
          <button class="real-hotspot" type="button" style="left:47%;top:63%">05<span class="real-tip"><strong>Уровень продукта</strong>Пена, пары, турбулентность, диэлектрическая проницаемость.</span></button>
          <a class="real-zoom" href="/assets/engineering-nodes/levelmeter-blueprint.webp" target="_blank" rel="noopener">Открыть чертёж крупно</a>
        </div>
        <aside class="real-node-info">
          <div class="real-node-card"><h3>Радарный уровнемер</h3><p>Чертёж показывает установку прибора на резервуаре: процессное присоединение, антенну, диапазон измерения, уровень продукта и выходные сигналы.</p><div class="real-node-specs"><div class="real-node-spec"><span>Диапазон</span><strong>0…30 м</strong></div><div class="real-node-spec"><span>Давление</span><strong>−1…+4 МПа</strong></div><div class="real-node-spec"><span>Температура</span><strong>−40…+200 °C</strong></div><div class="real-node-spec"><span>Выход</span><strong>4–20 мА + HART</strong></div></div></div>
          <div class="real-node-card"><h3>Что проверить</h3><ul class="real-node-list"><li>Высоту резервуара, диапазон и место установки.</li><li>Пену, пары, пыль, конденсат и внутренние элементы.</li><li>Материал антенны, присоединение и Ex-зону.</li><li>Сигнал, питание, индикацию и требования к сертификатам.</li></ul></div>
          <div class="real-node-card"><h3>Действия</h3><p>Для подбора нужны высота резервуара, среда, штуцер, температура, давление и сигнал.</p><div class="real-node-actions"><a class="btn" href="mailto:info@promapparat.ru?subject=Подбор%20уровнемера">Отправить параметры</a><a class="btn btn--white" href="/urovnemery/">Раздел уровнемеров</a></div></div>
        </aside>
      </article>

      <div class="engineering-note real-node-note">Чертежи используются как визуальная инженерная подложка. Важные коммерческие действия, hotspots и SEO-текст остаются HTML-слоем — так блок остаётся быстрым, адаптивным и управляемым.</div>
    </div>
  </section>`;
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
    repairEngineeringNodes();
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