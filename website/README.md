# Website Sub-Page: AI LinkedIn Marketing Agent

This folder contains a sub-page you can add to laravisionx.com.

## Files

- **digital-marketing-agent.html** — Standalone HTML page (no dependencies)
- **wordpress-page-content.html** — Content for WordPress (paste into Custom HTML block)
- **WORDPRESS.md** — Step-by-step WordPress instructions

## How to Add to Your Website

### WordPress (laravisionx.com)
See **WORDPRESS.md** for step-by-step instructions. Use `wordpress-page-content.html` in a Custom HTML block.

### Option 1: Direct upload (non-WordPress)
1. Upload `digital-marketing-agent.html` to your web server
2. Access at: `https://laravisionx.com/digital-marketing-agent.html`
3. Or rename to `index.html` and place in a folder: `https://laravisionx.com/digital-marketing-agent/`

### Option 2: Integrate into existing site
1. Copy the HTML structure and styles into your CMS/template
2. Adjust the header/nav/footer to match your site
3. Update the CTA links (Contact, LinkedIn) to your actual URLs

### Option 3: Laravel/Blade
1. Create a route: `Route::view('/digital-marketing-agent', 'pages.digital-marketing-agent');`
2. Convert HTML to a Blade template with `@extends('layouts.main')`
3. Include your site's header/footer

## Suggested URL

- `/digital-marketing-agent`
- `/ai-linkedin-marketing`
- `/services/linkedin-agent`

## Customize

- Update CTA links (`#contact`, LinkedIn URL)
- Adjust colors to match your brand
- Add your logo in the header
