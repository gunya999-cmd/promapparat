(function(){
  function isHomepage(){
    var p=(location.pathname||'/').replace(/\/+/g,'/');
    return p==='/' || p==='/index.html';
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
  function hideOldHeroes(anchor){
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
      document.querySelectorAll(sel).forEach(function(el){ el.classList.add('proma-main-hero-old-hidden'); });
    });
    // fallback: if the first section before anchor visually looks like a hero, hide it conservatively by class name containing hero
    var all=[].slice.call(document.querySelectorAll('section,div'));
    all.forEach(function(el){
      if(anchor && el===anchor) return;
      var cls=(typeof el.className==='string') ? el.className : '';
      if(/hero/i.test(cls) && !/proma-main-hero-v7/.test(cls)){
        el.classList.add('proma-main-hero-old-hidden');
      }
    });
  }
  function insertHero(){
    if(!isHomepage()) return;
    if(document.querySelector('.proma-main-hero-v7')) return;
    var anchor=findAnchor();
    var parent=(anchor && anchor.parentNode) ? anchor.parentNode : (document.querySelector('main') || document.body);
    if(!parent) return;
    hideOldHeroes(anchor);
    var hero=document.createElement('section');
    hero.className='proma-main-hero-v7';
    hero.setAttribute('aria-label','Hero');
    hero.innerHTML=''
      + '<div class="proma-main-hero-v7__trigger" aria-hidden="true"></div>'
      + '<div class="proma-main-hero-v7__frame proma-main-hero-v7__frame--normal"></div>'
      + '<div class="proma-main-hero-v7__frame proma-main-hero-v7__frame--hover"></div>';
    parent.insertBefore(hero, anchor || parent.firstChild);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', insertHero); else insertHero();
})();
