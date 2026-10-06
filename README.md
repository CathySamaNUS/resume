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
- `script.js` — English/Chinese switching, theme persistence, navigation state
- `assets/` — résumé PDFs, project screenshots, avatar, and company logos

## Company logo sources

The internship section uses locally stored logos from Wikimedia Commons: [Micron](https://commons.wikimedia.org/wiki/File:Micron_Technology_logo_2024.svg), [Tencent](https://commons.wikimedia.org/wiki/File:Tencent_logo_2017.svg), [BAAI](https://commons.wikimedia.org/wiki/File:Beijing_Academy_of_Artificial_Intelligence_logo.svg), [Microsoft](https://commons.wikimedia.org/wiki/File:Microsoft_logo_%282012%29.svg), and [Volkswagen](https://commons.wikimedia.org/wiki/File:Volkswagen_logo_2019.svg). All company marks remain trademarks of their respective owners and are shown only to identify past internships.

The site has no build step and can be deployed directly to GitHub Pages, Netlify, Vercel, or any static host.
