# QA Release Report — Promapparat

## Current release status

**Status:** blocked by P0.

## P0 blocker

### P0-001 — Broken UTF-8 / mojibake in homepage engineering block

**File:** `index.html`

**Affected block:** `real-engineering-module`

**Symptoms:**

- iPad/Safari displays broken Russian text.
- Repository HTML contains mojibake strings such as `РўРµС`, `Р§Рµ`, `вЂ`, `В°C`.

**Verification command:**

```powershell
Select-String -Path .\index.html -Pattern "РўРµС|Р§Рµ|вЂ|В°C"
```

**Expected:** empty output.

**Actual:** lines around 186–268 still match.

**GitHub issue:** #2

## QA team roles

### Senior Frontend Engineer

- Replace broken `real-engineering-module` in `index.html` with clean UTF-8 HTML.
- Do not create sandbox files for this P0.
- Commit only the necessary production fix.

### Build / Cloudflare Engineer

- Verify Cloudflare Pages deploys current `main`.
- Confirm cache-busted URL works after deploy.
- Confirm production HTML no longer contains mojibake.

### Functional QA

- Test header/footer navigation.
- Test category cards.
- Test mailto buttons and form-generated mailto links.
- Test download/links on `/oprosnye-listy/`.

### Adaptive QA

- Desktop 1920px.
- Laptop 1366px.
- iPad portrait and landscape.
- iPhone portrait.
- Safari and Chrome.

### SEO QA

- Check title/description/canonical.
- Check robots.txt and sitemap.xml.
- Check 404 behavior.
- Check headings and alt text.

## Release gate

Release cannot proceed until:

```powershell
Select-String -Path .\index.html -Pattern "РўРµС|Р§Рµ|вЂ|В°C"
```

returns no matches and the Cloudflare Pages build displays clean Russian text on iPad/Safari.
