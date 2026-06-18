(function () {
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!canHover.matches) return;

  var zones = document.querySelectorAll('.home-hero-wow');
  if (!zones.length) return;

  function updateZone(zone, event) {
    var rect = zone.getBoundingClientRect();
    var x = ((event.clientX - rect.left) / rect.width) * 100;
    var y = ((event.clientY - rect.top) / rect.height) * 100;
    zone.style.setProperty('--mx', x + '%');
    zone.style.setProperty('--my', y + '%');
    zone.classList.add('is-active');
  }

  zones.forEach(function (zone) {
    zone.addEventListener('mouseenter', function (event) {
      updateZone(zone, event);
    });

    zone.addEventListener('mousemove', function (event) {
      updateZone(zone, event);
    });

    zone.addEventListener('mouseleave', function () {
      zone.classList.remove('is-active');
    });
  });
})();