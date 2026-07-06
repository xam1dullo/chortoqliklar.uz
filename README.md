# Chortoqliklar.uz — single-page website

Chortoq tumani haqida ma’lumot beruvchi, mobil qurilmalarga mos va build jarayonisiz ishlaydigan statik landing page.

## Fayllar

- `index.html` — sahifa tuzilmasi va SEO meta-ma’lumotlar
- `styles.css` — responsive dizayn va animatsiyalar
- `script.js` — mobil menyu, scroll animatsiyasi, raqamlar animatsiyasi va demo forma
- `assets/chortoq-sanatorium.png` — Wikimedia Commons rasmi
- `assets/favicon.svg` — sayt belgisi

## Ishga tushirish

Eng sodda usul: `index.html` faylini brauzerda oching.

Mahalliy server bilan:

```bash
python3 -m http.server 8080
```

So‘ng brauzerda `http://localhost:8080` manzilini oching.

## Hostingga joylash

Barcha fayllarni domenning `public_html` papkasiga yuklash kifoya. `index.html`, `styles.css`, `script.js` va `assets` papkasi bir xil darajada turishi kerak.

## Muhim eslatmalar

- Hozirgi email forma demo rejimida va ma’lumotni faqat brauzer `localStorage`iga saqlaydi. Real ishlashi uchun backend/API ulash kerak.
- OpenStreetMap xaritasi va Google Fonts internetga ulanishni talab qiladi.
- Ma’lumotlar 2026-yil iyul holatiga ochiq manbalar asosida tayyorlangan.
- Foto: Shohi kubro / Wikimedia Commons, CC BY-SA 4.0.

## Asosiy manbalar

- Chortoq tumani hokimligi: https://gov.uz/oz/chortoq
- O‘zbekiston statistika agentligi: https://api.siat.stat.uz/media/uploads/sdmx/sdmx_data_246.pdf
- Chortoq sanatoriysi: https://www.chortoqsan.uz/
- Uzbekistan Travel: https://uzbekistan.travel/uz/o/ozbekistonning-shifo-maskanlari/
- Wikimedia Commons foto: https://commons.wikimedia.org/wiki/File:Chortoq_sanatoriyasi_bino.png
