(function(){
  function isHomepage(){
    var p=(location.pathname||'/').replace(/\/+$/,'/');
    return p==='/' || p==='/index.html/';
  }

  function injectHideRule(){
    if(document.getElementById('proma-main-hero-v7-hide-old-rule')) return;
    var style=document.createElement('style');
    style.id='proma-main-hero-v7-hide-old-rule';
    style.textContent='html body #home-draft>.proma-main-hero-old-hidden{display:none!important;visibility:hidden!important;opacity:0!important;height:0!important;min-height:0!important;max-height:0!important;margin:0!important;padding:0!important;border:0!important;overflow:hidden!important;pointer-events:none!important;}';
    document.head.appendChild(style);
  }

  function findAnchor(){
    var nodes=[].slice.call(document.querySelectorAll('section, h1, h2'));
    for(var i=0;i<nodes.length;i++){
      var txt=(nodes[i].textContent||'').trim();
      if(/Основные\s+направления/i.test(txt)) return nodes[i].closest('section') || nodes[i];
    }
    var main=document.querySelector('main');
    if(main){
      return main.querySelector('section') || main.firstElementChild;
    }
    return document.querySelector('section');
  }

  function forceHide(el){
    if(!el || el.classList.contains('proma-main-hero-v7')) return;
    el.classList.add('proma-main-hero-old-hidden');
    el.setAttribute('aria-hidden','true');
    el.style.setProperty('display','none','important');
    el.style.setProperty('visibility','hidden','important');
    el.style.setProperty('opacity','0','important');
    el.style.setProperty('height','0','important');
    el.style.setProperty('min-height','0','important');
    el.style.setProperty('max-height','0','important');
    el.style.setProperty('margin','0','important');
    el.style.setProperty('padding','0','important');
    el.style.setProperty('border','0','important');
    el.style.setProperty('overflow','hidden','important');
    el.style.setProperty('pointer-events','none','important');
  }

  function hideOldHeroes(anchor){
    injectHideRule();
    var selectors=[
      '.home-hero',
      '.home-hero-static',
      '.home-hero-static--layered-wow',
      '.home-hero-static--clean-background',
      '.home-stage-hero',
      '.hero-wow-lab',
      '.hero-wow-lab-fullframe',
      '.hero-wow-lab-fullframe-v2',
      '.hero-wow-lab-fullframe-v3',
      '.hero-wow-lab-fullframe-v4',
      '.hero-wow-lab-fullframe-v5',
      '.hero-wow-lab-fullframe-v6',
      '.hero-wow-lab-fullframe-v7'
    ];
    selectors.forEach(function(sel){
      document.querySelectorAll(sel).forEach(forceHide);
    });
    var all=[].slice.call(document.querySelectorAll('#home-draft > section, #home-draft > div'));
    all.forEach(function(el){
      if(anchor && el===anchor) return;
      var cls=(typeof el.className==='string') ? el.className : '';
      if(/hero/i.test(cls) && !/proma-main-hero-v7/.test(cls)) forceHide(el);
    });
  }

  function insertHero(){
    if(!isHomepage()) return;
    var anchor=findAnchor();
    var parent=(anchor && anchor.parentNode) ? anchor.parentNode : (document.querySelector('main') || document.body);
    if(!parent) return;
    hideOldHeroes(anchor);
    var hero=document.querySelector('.proma-main-hero-v7');
    if(!hero){
      hero=document.createElement('section');
      hero.className='proma-main-hero-v7';
      hero.setAttribute('aria-label','Производство и поставка промышленной арматуры, КИПиА и инженерного оборудования');
      hero.innerHTML=''
        + '<div class="proma-main-hero-v7__trigger" aria-hidden="true"></div>'
        + '<div class="proma-main-hero-v7__frame proma-main-hero-v7__frame--normal"></div>'
        + '<div class="proma-main-hero-v7__frame proma-main-hero-v7__frame--hover"></div>'
        + '<div class="proma-main-hero-v7__copy">'
        +   '<div class="proma-main-hero-v7__kicker">Производство • комплектация • поставка</div>'
        +   '<h1>Промышленная арматура, КИПиА <span>и инженерное оборудование</span></h1>'
        +   '<div class="proma-main-hero-v7__actions">'
        +     '<a class="proma-main-hero-v7__btn proma-main-hero-v7__btn--primary" href="mailto:info@promapparat.ru?subject=Заявка%20на%20подбор%20оборудования">Подобрать оборудование</a>'
        +     '<a class="proma-main-hero-v7__btn proma-main-hero-v7__btn--secondary" href="mailto:info@promapparat.ru?subject=ТЗ%20для%20ПО%20Промаппарат">Отправить ТЗ</a>'
        +   '</div>'
        + '</div>'
        + '<div class="proma-main-hero-v7__features" aria-label="Ключевые преимущества">'
        +   '<article class="proma-main-hero-v7__feature"><span class="proma-main-hero-v7__feature-scan"></span><div class="proma-main-hero-v7__feature-icon"><img src="/assets/hero/designer-icons/pick_hero_icon.webp?v=20260621-v12-main" alt="" loading="eager" decoding="async"></div><div class="proma-main-hero-v7__feature-title">Подбор по ТЗ</div><div class="proma-main-hero-v7__feature-text">Технический анализ требований проекта.</div></article>'
        +   '<article class="proma-main-hero-v7__feature"><span class="proma-main-hero-v7__feature-scan"></span><div class="proma-main-hero-v7__feature-icon"><img src="/assets/hero/designer-icons/docs_hero_icon.webp?v=20260621-v12-main" alt="" loading="eager" decoding="async"></div><div class="proma-main-hero-v7__feature-title">Конструкторская документация</div><div class="proma-main-hero-v7__feature-text">Паспорта • Сертификаты • Декларации ЕАЭС • Протоколы испытаний.</div></article>'
        +   '<article class="proma-main-hero-v7__feature"><span class="proma-main-hero-v7__feature-scan"></span><div class="proma-main-hero-v7__feature-icon"><img src="/assets/hero/designer-icons/prod_hero_icon.webp?v=20260621-v12-main" alt="" loading="eager" decoding="async"></div><div class="proma-main-hero-v7__feature-title">Согласование КД и Производство</div><div class="proma-main-hero-v7__feature-text">Поставки точно в срок.</div></article>'
        +   '<article class="proma-main-hero-v7__feature"><span class="proma-main-hero-v7__feature-scan"></span><div class="proma-main-hero-v7__feature-icon"><img src="/assets/hero/designer-icons/ship_hero_icon.webp?v=20260621-v12-main" alt="" loading="eager" decoding="async"></div><div class="proma-main-hero-v7__feature-title">Поставка</div><div class="proma-main-hero-v7__feature-text">От единичных позиций до комплексных проектов.</div></article>'
        + '</div>';
      parent.insertBefore(hero, anchor || parent.firstChild);
    }
    hideOldHeroes(anchor);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', insertHero); else insertHero();
})();
