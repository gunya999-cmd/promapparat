(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('edit') !== '1') return;

  const targets = [
    { id: 'heroBg', label: 'Hero background', selector: '.hero-bg', x: 0, y: 0, scale: 1, opacity: 0.34, brightness: 1, contrast: 1, saturate: 0.95, hue: 0 },
    { id: 'heroValve', label: 'Main valve', selector: '.hero-product', x: 0, y: 0, scale: 1, opacity: 1, brightness: 1, contrast: 1, saturate: 1, hue: 0 },
    { id: 'blueprint', label: 'Blueprint', selector: '.hero-blueprint', x: 0, y: 0, scale: 1, opacity: 0.48, brightness: 1, contrast: 1, saturate: 1, hue: 0 },
    { id: 'heroCard', label: 'Right card', selector: '.hero-card', x: 0, y: 0, scale: 1, opacity: 1, brightness: 1, contrast: 1, saturate: 1, hue: 0 },
    { id: 'stats', label: 'Stats block', selector: '.stats', x: 0, y: 0, scale: 1, opacity: 1, brightness: 1, contrast: 1, saturate: 1, hue: 0 }
  ];

  const storageKey = 'promapparat-page-editor-v1';
  const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
  const state = {};
  targets.forEach(t => state[t.id] = { ...t, ...(saved[t.id] || {}) });

  const css = document.createElement('style');
  css.id = 'pa-editor-runtime-style';
  document.head.appendChild(css);

  const panel = document.createElement('div');
  panel.id = 'pa-editor-panel';
  panel.innerHTML = `
    <div class="pe-head">
      <strong>Page editor</strong>
      <button type="button" data-action="close">×</button>
    </div>
    <p class="pe-note">Режим включён только при <code>?edit=1</code>. Меняй рендеры и копируй CSS.</p>
    <div class="pe-controls"></div>
    <div class="pe-actions">
      <button type="button" data-action="copy">Copy CSS</button>
      <button type="button" data-action="reset">Reset</button>
    </div>
    <textarea class="pe-output" readonly></textarea>
  `;
  document.body.appendChild(panel);

  const panelCss = document.createElement('style');
  panelCss.textContent = `
    #pa-editor-panel{position:fixed;right:18px;top:18px;width:340px;max-height:calc(100vh - 36px);overflow:auto;z-index:999999;background:#fff;border:1px solid #c9d8ee;border-radius:12px;box-shadow:0 18px 60px rgba(0,25,70,.24);font-family:Arial,Helvetica,sans-serif;color:#071b3e;padding:14px}
    #pa-editor-panel .pe-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}
    #pa-editor-panel .pe-head strong{font-size:16px}
    #pa-editor-panel button{cursor:pointer;border:1px solid #075bd8;background:#075bd8;color:#fff;border-radius:6px;height:34px;padding:0 12px;font-weight:700}
    #pa-editor-panel button[data-action="close"]{width:34px;padding:0;background:#fff;color:#075bd8}
    #pa-editor-panel .pe-note{font-size:12px;line-height:1.45;color:#526985;margin:0 0 12px}
    #pa-editor-panel details{border-top:1px solid #e0e9f5;padding:10px 0}
    #pa-editor-panel summary{cursor:pointer;font-weight:700;font-size:14px}
    #pa-editor-panel label{display:grid;grid-template-columns:78px 1fr 50px;align-items:center;gap:8px;font-size:12px;margin:8px 0;color:#263c5e}
    #pa-editor-panel input[type="range"]{width:100%}
    #pa-editor-panel .pe-actions{display:flex;gap:8px;margin-top:10px}
    #pa-editor-panel .pe-output{width:100%;min-height:150px;margin-top:10px;border:1px solid #dbe7f6;border-radius:8px;padding:8px;font-family:Consolas,monospace;font-size:11px;color:#10284f}
    .pa-edit-outline{outline:2px dashed rgba(7,91,216,.55)!important;outline-offset:4px!important}
  `;
  document.head.appendChild(panelCss);

  function makeRange(target, key, min, max, step, suffix = '') {
    const value = state[target.id][key];
    return `<label><span>${key}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}" data-id="${target.id}" data-key="${key}"><output>${value}${suffix}</output></label>`;
  }

  const controls = panel.querySelector('.pe-controls');
  controls.innerHTML = targets.map(t => `
    <details ${t.id === 'heroBg' ? 'open' : ''}>
      <summary>${t.label}</summary>
      ${makeRange(t, 'x', -900, 900, 1, 'px')}
      ${makeRange(t, 'y', -400, 400, 1, 'px')}
      ${makeRange(t, 'scale', 0.2, 3, 0.01)}
      ${makeRange(t, 'opacity', 0, 1, 0.01)}
      ${makeRange(t, 'brightness', 0.2, 2, 0.01)}
      ${makeRange(t, 'contrast', 0.2, 2, 0.01)}
      ${makeRange(t, 'saturate', 0, 3, 0.01)}
      ${makeRange(t, 'hue', -180, 180, 1, 'deg')}
    </details>
  `).join('');

  function cssForTarget(t) {
    const s = state[t.id];
    return `${t.selector}{transform:translate(${s.x}px,${s.y}px) scale(${s.scale})!important;opacity:${s.opacity}!important;filter:brightness(${s.brightness}) contrast(${s.contrast}) saturate(${s.saturate}) hue-rotate(${s.hue}deg)!important;}`;
  }

  function allCss() {
    return targets.map(cssForTarget).join('\n');
  }

  function apply() {
    css.textContent = allCss();
    panel.querySelector('.pe-output').value = allCss();
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  function highlight(id) {
    document.querySelectorAll('.pa-edit-outline').forEach(el => el.classList.remove('pa-edit-outline'));
    const t = targets.find(x => x.id === id);
    const el = t ? document.querySelector(t.selector) : null;
    if (el) el.classList.add('pa-edit-outline');
  }

  panel.addEventListener('input', e => {
    const input = e.target.closest('input[type="range"]');
    if (!input) return;
    const id = input.dataset.id;
    const key = input.dataset.key;
    state[id][key] = Number(input.value);
    input.nextElementSibling.textContent = input.value + (key === 'x' || key === 'y' ? 'px' : key === 'hue' ? 'deg' : '');
    highlight(id);
    apply();
  });

  panel.addEventListener('click', async e => {
    const action = e.target.dataset.action;
    if (!action) return;
    if (action === 'close') panel.remove();
    if (action === 'reset') {
      localStorage.removeItem(storageKey);
      location.reload();
    }
    if (action === 'copy') {
      await navigator.clipboard.writeText(allCss());
      e.target.textContent = 'Copied';
      setTimeout(() => e.target.textContent = 'Copy CSS', 900);
    }
  });

  document.querySelectorAll('.pe-controls details').forEach((d, i) => {
    d.addEventListener('toggle', () => { if (d.open) highlight(targets[i].id); });
  });

  apply();
  highlight('heroBg');
})();
