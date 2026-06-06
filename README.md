# ПО Промаппарат — сайт v2

Готовый статический сайт для GitHub + Cloudflare Pages.

## В v2
- отдельные страницы каталога в `/catalog/`;
- современный industrial-дизайн;
- форма заявки через Cloudflare Pages Function `/api/lead`;
- адаптивная верстка;
- без сборщика.

## Cloudflare Pages
Build command: пусто  
Build output directory: `/`

## Форма
Обработчик: `functions/api/lead.js`.  
Сейчас принимает заявку и возвращает JSON. Следующий шаг — подключить Telegram/email/CRM.
