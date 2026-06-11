# SEO migration map for www.promapparat.ru

This document fixes the migration logic for the Promapparat site before moving the new static site to `www.promapparat.ru`.

`www.promapparat.ru` is an old ranked domain. The migration goal is to preserve search equity, indexed URLs, old product demand, and user paths while moving to the new structure.

## Main rule

Every old indexed URL must return either:

1. `200` on the new relevant page, or
2. `301` to the closest new relevant page.

Old URLs must not return `404` unless the page is clearly useless and has no relevant replacement.

## Canonical target

Current canonical base used in files:

```text
https://promapparat.ru/
```

After the final domain decision, if `www.promapparat.ru` is used as the primary host, canonicals must be aligned consistently.

## Migration groups

| Old / legacy direction | New target URL | Notes |
|---|---:|---|
| Main catalog | `/katalog/` | General catalog entry. |
| Old valve / armature pages | `/truboprovodnaya-i-zapornaya-armatura/` | Main commercial direction. Do not duplicate in old products. |
| Ball valves | `/sharovye-krany/` | Second-level valve page. |
| Gate valves | `/zadvizhki/` | Second-level valve page. |
| Butterfly valves | `/zatvory-diskovye/` | Second-level valve page. |
| Check valves | `/klapany-obratnye/` | Second-level valve page. |
| Shut-off valves / ventili | `/klapany-zapornye/` or `/ventili/` | Use the closest page. |
| Regulating valves | `/reguliruyushchaya-armatura/` | Main commercial direction. |
| Control valves | `/reguliruyushchie-klapany/` | Second-level regulating page. |
| Pressure regulators | `/regulyatory-davleniya/` | Second-level regulating page. |
| Drives / actuators | `/privody/` | Main drive target. |
| Electric drives | `/elektroprivody/` | Specific drive target. |
| Pneumatic drives | `/pnevmoprivody/` | Specific drive target. |
| Positioners | `/pozitsionery/` | Specific automation target. |
| Old KIPiA pages | `/kontrolno-izmeritelnyie-priboryi-i-avtomatizatsiya/` | Main commercial direction. Do not duplicate in old products. |
| Pressure sensors | `/datchiki-davleniya/` | KIPiA second-level page. |
| Temperature sensors | `/datchiki-temperatury/` | KIPiA second-level page. |
| Manometers | `/manometry/` | KIPiA second-level page. |
| Thermometers | `/termometry/` | KIPiA second-level page. |
| Flowmeters | `/rashodomery/` | Main commercial direction. |
| Level gauges / levelmeters | `/urovnemery/` | Main commercial direction. |
| Level switches | `/signalizatory-urovnya/` | KIPiA second-level page. |
| Gas analyzers | `/gazanalizatory/` | KIPiA second-level page. |
| Automation systems | `/sistemy-avtomatizatsii/` | KIPiA second-level page. |
| Technological equipment hub | `/tekhnologicheskoe-oborudovanie/` | Hub for old products without main category duplicates. |
| RVS / RVSP / RGS / RGSP tanks | `/rezervuary-rvs-rgs/` | Important old SEO direction. |
| General vessels / емкости | `/emkostnoe-oborudovanie/` | Apparatus, receivers, air collectors, settling tanks, fiberglass tanks. |
| Heat exchangers | `/teploobmennoe-oborudovanie/` | Shell-and-tube, tube-in-tube, U-tube, floating head, AVO. |
| Filters and compensators | `/filtry-i-kompensatory/` | Profile auxiliary page, not duplicated in old hub. |
| Loading / unloading oil products | `/oborudovanie-dlya-sliva-naliva-nefteproduktov/` | USN, UPVS, UNZH, ASN, KAZS. |
| Reservoir equipment | `/rezervuarnoe-oborudovanie/` | KDS, SMDK, KDM, KPG, NDKM, AK, pontoons, PZU, PRU, hatches, flame arresters. |
| Separators and column equipment | `/separatsionnoe-i-kolonnoe-oborudovanie/` | Flare, oil-and-gas, gas separators, column apparatus. |
| Pumps and compressors | `/nasosnoe-oborudovanie/` | Pumps, vertical semi-submersible pumps, compressors. |
| Metal structures and stack pipes | `/metallokonstruktsii-i-dymovye-truby/` | Smoke stacks, ventilation pipes, building metal structures. |
| Pig traps / SOD chambers | `/kamery-sod/` | Auxiliary equipment. |
| Pipe fittings / pipeline parts | `/truboprovodnye-detali/` | Auxiliary / pipeline page. |

## Old products that must not be duplicated inside legacy hub

These directions are preserved, but only in their main commercial sections:

- трубопроводная и запорная арматура;
- регулирующая арматура;
- КИПиА;
- расходомеры;
- уровнемеры;
- приводы and исполнительные механизмы;
- core auxiliary equipment already covered by the auxiliary section.

## Required checks before domain launch

1. Check `_redirects` for all known old URL variants.
2. Check `sitemap.xml` for all new important pages.
3. Check canonical URLs: no `pages.dev` canonicals.
4. Check internal links from homepage, catalog, footer, and old-product hub.
5. Crawl old URL list and confirm each old URL returns `301` to a relevant new URL.
6. Check for accidental `404`, redirect loops, and chains longer than one hop.
7. After launch: submit sitemap in Yandex Webmaster and Google Search Console.
