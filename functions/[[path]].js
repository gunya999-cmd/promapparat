const SITE_HEADER = `
<header class="top site-header" data-global-header="true">
  <div class="wrap site-header__wrap">
    <a class="logo site-header__logo" href="/" aria-label="ПО Промаппарат — на главную">
      <img src="/assets/logo/logo-main.webp" width="460" height="115" decoding="async" alt="Промаппарат">
    </a>
    <nav class="nav site-header__nav" aria-label="Основная навигация">
      <a href="/o-kompanii/">О компании</a>
      <a href="/katalog/">Каталог</a>
      <a href="/podbor-analogov-importnogo-oborudovaniya/">Аналоги</a>
      <a href="/dokumentatsiya/">Документация</a>
      <a href="/oprosnye-listy/">Опросные листы</a>
      <a href="/kontakty/">Контакты</a>
    </nav>
    <div class="head-right site-header__right">
      <div class="head-contacts site-header__contacts">
        <strong>+7 (846) 277-54-14</strong>
        <span>Пн–Пт 9:00–18:00</span>
        <span>info@promapparat.ru</span>
      </div>
      <a class="btn site-header__btn" href="mailto:info@promapparat.ru?subject=Запрос%20КП">Получить КП</a>
    </div>
  </div>
</header>`;

const SITE_HEADER_CSS = `
<style id="promapparat-global-header-css">
.site-header{border-bottom:1px solid #dbe7f6!important;background:rgba(255,255,255,.96)!important;position:sticky!important;top:0!important;z-index:1000!important;backdrop-filter:blur(10px)!important}
.site-header .site-header__wrap{width:min(100% - 56px,1220px)!important;min-height:84px!important;margin:auto!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;padding:0!important}
.site-header__logo{flex:0 0 auto!important;display:flex!important;align-items:center!important}
.site-header__logo img{width:218px!important;height:auto!important;display:block!important;max-width:100%!important}
.site-header__nav{display:flex!important;align-items:center!important;gap:18px!important;font-size:14px!important;line-height:1!important;color:#152b4f!important;white-space:nowrap!important;overflow:visible!important;order:initial!important;width:auto!important;padding:0!important;margin:0!important}
.site-header__nav a{color:#152b4f!important;text-decoration:none!important;font-weight:400!important}
.site-header__nav a:hover{color:#075bd8!important}
.site-header__right{display:flex!important;align-items:center!important;gap:16px!important;flex:0 0 auto!important;margin-left:0!important;width:auto!important}
.site-header__contacts{display:grid!important;gap:4px!important;font-size:13px!important;line-height:1.18!important;color:#4a5f7c!important;white-space:nowrap!important}
.site-header__contacts strong{font-size:15px!important;line-height:1.15!important;color:#071b3e!important}
.site-header__btn{min-height:46px!important;padding:0 20px!important;border-radius:6px!important;border:1px solid #075bd8!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;background:#075bd8!important;color:#fff!important;font-weight:700!important;font-size:14px!important;white-space:nowrap!important;text-decoration:none!important;box-shadow:none!important}
@media(max-width:1180px){.site-header .site-header__wrap{gap:14px!important}.site-header__logo img{width:190px!important}.site-header__nav{gap:14px!important;font-size:13px!important}.site-header__contacts{font-size:12px!important}.site-header__btn{padding:0 16px!important}}
@media(max-width:980px){.site-header .site-header__wrap{width:min(100% - 36px,1220px)!important;min-height:74px!important;flex-wrap:wrap!important;padding:12px 0!important}.site-header__nav{order:3!important;width:100%!important;overflow-x:auto!important;padding:2px 0 4px!important;gap:20px!important}.site-header__right{margin-left:auto!important}.site-header__contacts{display:none!important}}
@media(max-width:560px){.site-header .site-header__wrap{width:min(100% - 28px,100%)!important}.site-header__logo img{width:170px!important}.site-header__right{width:100%!important}.site-header__btn{width:100%!important}.site-header__nav{gap:18px!important}}
</style>`;

function withSingleHeader(html) {
  let out = html;

  if (!out.includes('promapparat-global-header-css')) {
    out = out.replace(/<\/head>/i, `${SITE_HEADER_CSS}\n</head>`);
  }

  const headerPattern = /<header\b[^>]*class=(['"])[^'"]*\btop\b[^'"]*\1[\s\S]*?<\/header>/i;
  if (headerPattern.test(out)) {
    out = out.replace(headerPattern, SITE_HEADER);
  } else {
    out = out.replace(/<body([^>]*)>/i, `<body$1>\n${SITE_HEADER}`);
  }

  return out;
}

export async function onRequest(context) {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  if (!contentType.toLowerCase().includes('text/html')) {
    return response;
  }

  const html = await response.text();
  const transformed = withSingleHeader(html);
  const headers = new Headers(response.headers);
  headers.set('content-type', 'text/html; charset=utf-8');
  headers.set('cache-control', 'no-cache');

  return new Response(transformed, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
