(() => {
  const params = new URLSearchParams(location.search);
  if (!params.has('tune') && !params.has('edit')) return;
  document.body.classList.add('pa-tune-enabled');
  const root = document.documentElement;
  const controls = [
    ['--pa-hero-height', 520, 820, 1, 'px', 'Высота hero'],
    ['--pa-blue-width', 42, 70, 1, '%', 'Ширина синей зоны'],
    ['--pa-workshop-opacity', 0.35, 1, 0.01, '', 'Прозрачность цеха'],
    ['--pa-glow-opacity', 0, 1, 0.01, '', 'Свечение перехода'],
    ['--pa-hero-drawing-opacity', 0, .55, .01, '', 'Чертёж в hero'],
    ['--pa-hero-drawing-scale', .7, 1.8, .01, '', 'Масштаб чертежа hero'],
    ['--pa-card-drawing-opacity', 0, .55, .01, '', 'Чертёж в карточке'],
    ['--pa-card-drawing-scale', .65, 1.55, .01, '', 'Масштаб чертежа карточки'],
    ['--pa-card-drawing-x', 0, 100, 1, '%', 'Позиция чертежа X'],
    ['--pa-card-drawing-y', 0, 100, 1, '%', 'Позиция чертежа Y']
  ];
  const saved = JSON.parse(localStorage.getItem('paTechTuning') || '{}');
  Object.entries(saved).forEach(([k,v]) => root.style.setProperty(k, v));
  const panel = document.createElement('div');
  panel.className = 'pa-tuner';
  const toggle = document.createElement('button');
  toggle.className = 'pa-tuner-toggle';
  toggle.textContent = 'Настройка';
  panel.innerHTML = '<h3>Ручная настройка hero</h3><p>Изменения сохраняются в браузере. После настройки нажмите «Скопировать CSS».</p>';
  const values = {};
  function currentNumber(name, fallback){
    const raw = root.style.getPropertyValue(name) || getComputedStyle(root).getPropertyValue(name);
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : fallback;
  }
  controls.forEach(([name,min,max,step,unit,label]) => {
    const row = document.createElement('label');
    const value = document.createElement('strong');
    const input = document.createElement('input');
    input.type = 'range'; input.min = min; input.max = max; input.step = step;
    input.value = currentNumber(name, min);
    values[name] = input.value + unit;
    value.textContent = input.value + unit;
    row.append(label, value, input);
    input.addEventListener('input', () => {
      const v = input.value + unit;
      value.textContent = v;
      values[name] = v;
      root.style.setProperty(name, v);
      localStorage.setItem('paTechTuning', JSON.stringify(values));
    });
    panel.appendChild(row);
  });
  const out = document.createElement('textarea');
  out.readOnly = true;
  const copy = document.createElement('button'); copy.textContent = 'Скопировать CSS';
  const reset = document.createElement('button'); reset.textContent = 'Сбросить';
  const close = document.createElement('button'); close.textContent = 'Закрыть';
  function buildCSS(){
    const entries = controls.map(([name]) => `  ${name}: ${getComputedStyle(root).getPropertyValue(name).trim()};`).join('\n');
    return `:root{\n${entries}\n}`;
  }
  copy.addEventListener('click', async () => {
    out.value = buildCSS();
    out.select();
    try { await navigator.clipboard.writeText(out.value); } catch(e) {}
  });
  reset.addEventListener('click', () => { localStorage.removeItem('paTechTuning'); location.reload(); });
  close.addEventListener('click', () => panel.classList.remove('is-open'));
  toggle.addEventListener('click', () => panel.classList.add('is-open'));
  panel.append(copy, reset, close, out);
  document.body.append(panel, toggle);
  panel.classList.add('is-open');
})();
