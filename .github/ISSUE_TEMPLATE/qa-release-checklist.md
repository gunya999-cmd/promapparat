---
name: QA Release Checklist
description: Full release QA for Promapparat site
labels: QA, release
---

# QA Release Checklist

## Blockers

- [ ] P0 encoding issue in `index.html` engineering block is fixed
- [ ] Cloudflare Pages deployed current `main`
- [ ] iPad/Safari shows clean Russian text

## Functional QA

- [ ] Header links work on all pages
- [ ] Footer links work on all pages
- [ ] Mailto buttons open with correct subject/body
- [ ] Forms generate correct email draft
- [ ] Oprosnyye-listy downloads/links work
- [ ] Catalog category cards open correct pages

## Adaptive QA

- [ ] Desktop 1920px
- [ ] Laptop 1366px
- [ ] iPad landscape
- [ ] iPad portrait
- [ ] iPhone portrait
- [ ] Chrome desktop
- [ ] Safari iPad/iPhone

## Content QA

- [ ] No mojibake: `РўРµС`, `Р§Рµ`, `вЂ`, `В°C`
- [ ] No broken alt text
- [ ] No broken aria-label text
- [ ] No duplicate headings
- [ ] Company contacts correct

## SEO QA

- [ ] `title` and `description` exist
- [ ] canonical correct
- [ ] robots.txt available
- [ ] sitemap.xml available
- [ ] 404 page behavior acceptable
- [ ] no noindex on production pages

## Performance QA

- [ ] Hero image optimized
- [ ] Images use width/height
- [ ] Below-fold images lazy-loaded
- [ ] No layout shift in header/hero
- [ ] No console errors
