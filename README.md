# Cathy Fang — Personal Website

A bilingual, responsive static portfolio generated from the content in the English and Chinese résumés.

## Preview locally

```bash
cd personal-site
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Structure

- `index.html` — page content and semantic structure
- `styles.css` — responsive layout, dark/light themes, animations
- `script.js` — English/Chinese switching, internship spotlight, theme persistence, navigation state
- `assets/` — deployable résumé PDFs

The site has no build step and can be deployed directly to GitHub Pages, Netlify, Vercel, or any static host.
