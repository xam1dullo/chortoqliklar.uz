# Chortoqliklar.uz

Static website about Chortoq district (Namangan region, Uzbekistan) with no build step required.

## Files

- `index.html`: main landing page, structured data (JSON-LD), FAQ, map, satellite archive, and developer modal
- `styles.css`: responsive layout, design tokens, modal, and blog styles
- `script.js`: navigation, scroll reveals, counters, satellite Wayback viewer, developer modal, and demo form
- `blog/`: standalone article pages and blog index for SEO
- `sitemap.xml` and `robots.txt`: search engine indexing configuration
- `assets/chortoq-sanatorium.png`: Wikimedia Commons photo
- `assets/favicon.svg`: site icon

## Local development

Open `index.html` directly in a browser, or run a local server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

Upload all files and folders (`index.html`, `styles.css`, `script.js`, `robots.txt`, `sitemap.xml`, `assets/`, `blog/`) to `public_html`.

## Notes

- All code, file paths, section IDs, and technical resources are in English; user-facing content is in Uzbek.
- Satellite imagery uses Esri World Imagery Wayback WMTS tiles (`2014` to `2026`).
- OpenStreetMap, Esri Wayback tiles, and Google Fonts require an internet connection.
