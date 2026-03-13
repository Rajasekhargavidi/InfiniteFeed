# LinkedIn Post Agent — Mobile PWA

A Progressive Web App that generates LinkedIn posts **offline**. No API keys, no subscription.

## What Works Offline

| Feature | Offline | How |
|---------|---------|-----|
| **Post copy** | Yes | Template-based (thought leadership, product, tip) |
| **Hashtags** | Yes | Generated from topic + type |
| **SEO keywords** | Yes | Rule-based extraction |
| **Optimal time** | Yes | Tue–Thu, 9–10 AM (tech industry) |
| **Image** | Yes | Canvas-generated (1200×627) |
| **Copy to clipboard** | Yes | Native API |
| **Download image** | Yes | Canvas to PNG |

## Install on Mobile

1. **Host the app** — Upload the `mobile-app` folder to your web server (or use GitHub Pages)
2. **Open in mobile browser** — Visit the URL (e.g. `https://yoursite.com/mobile-app/`)
3. **Add to Home Screen** — In Chrome: Menu → "Add to Home Screen" / In Safari: Share → "Add to Home Screen"
4. **Use like an app** — Opens full screen, works offline after first load

## Hosting Options (Free)

- **GitHub Pages** — Push to repo, enable Pages, get `https://username.github.io/Infinte/mobile-app/`
- **Netlify** — Drag & drop the folder
- **Vercel** — Connect repo
- **Your WordPress** — Upload to a subfolder

## File Structure

```
mobile-app/
├── index.html      # Main app
├── manifest.json   # PWA config
├── sw.js           # Service worker (offline cache)
├── css/app.css
├── js/app.js       # All logic (offline)
└── README.md
```

## Usage

1. Enter your topic (e.g. "AI trends", "product launch")
2. Select post type
3. Tap **Generate Post**
4. Copy text, download image, post to LinkedIn

## Customize

- Edit `js/app.js` → `TEMPLATES` for your copy templates
- Edit `js/app.js` → `drawImage()` for image style
- Add your logo/brand in the canvas drawing
