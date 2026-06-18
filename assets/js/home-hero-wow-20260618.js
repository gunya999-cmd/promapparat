(function () {
  var hero = document.querySelector('.home-hero-static--wow');
  if (!hero) return;

  var blueprint = hero.querySelector('.home-hero-wow--blueprint');
  var dots = hero.querySelector('.home-hero-wow--dots');
  if (!blueprint || !dots) return;

  var supportsFinePointer = window.matchMedia('(min-width: 768px)');
  if (!supportsFinePointer.matches) return;

  function setZoneVars(zone, event) {
    var rect = zone.getBoundingClientRect();
    var x = ((event.clientX - rect.left) / rect.width) * 100;
    var y = ((event.clientY - rect.top) / rect.height) * 100;
    zone.style.setProperty('--zone-mx', Math.max(0, Math.min(100, x)) + '%');
    zone.style.setProperty('--zone-my', Math.max(0, Math.min(100, y)) + '%');
  }

  function isInside(zone, event, pad) {
    var rect = zone.getBoundingClientRect();
    return event.clientX >= rect.left - pad &&
      event.clientX <= rect.right + pad &&
      event.clientY >= rect.top - pad &&
      event.clientY <= rect.bottom + pad;
  }

  function update(event) {
    var hotBlueprint = isInside(blueprint, event, 90);
    var hotDots = isInside(dots, event, 90);

    hero.classList.toggle('is-wow-active', hotBlueprint || hotDots);
    blueprint.classList.toggle('is-hot', hotBlueprint);
    dots.classList.toggle('is-hot', hotDots);

    if (hotBlueprint) setZoneVars(blueprint, event);
    if (hotDots) setZoneVars(dots, event);
  }

  hero.addEventListener('mousemove', update, { passive: true });
  hero.addEventListener('mouseenter', update, { passive: true });
  hero.addEventListener('mouseleave', function () {
    hero.classList.remove('is-wow-active');
    blueprint.classList.remove('is-hot');
    dots.classList.remove('is-hot');
  });
})();