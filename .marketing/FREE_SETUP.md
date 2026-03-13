# 100% Free Setup — No Subscriptions, No API Keys

Run the digital marketing agent and grow your LinkedIn brand **without any paid subscriptions, API keys, or external services**.

---

## What Works for Free

| Component | Free Method | Cost |
|-----------|-------------|------|
| **Content creation** | Cursor agent + scripts | Free (Cursor free tier) |
| **Optimal post time** | `optimal-post-time.js` | Free |
| **Post copy & hashtags** | `prepare-post-context.js` + agent | Free |
| **Images** | HTML template + browser screenshot | Free |
| **Reminder** | `schedule-reminder.js` | Free |
| **Posting** | Manual copy to LinkedIn | Free |
| **Stock photos (optional)** | Picsum.photos, Unsplash | Free |

**No Zapier, OpenAI, Buffer, or other paid tools required.**

---

## Free Workflow (Step by Step)

### 1. Create a post

Invoke the agent:
```
/digital-marketing create today's LinkedIn post
```

The agent will:
- Use your company profile
- Write copy, hashtags, SEO
- Create an image via HTML template (no API)

### 2. Generate the image (free)

**Method A — HTML template (recommended, 100% free):**

1. Open `.marketing/scripts/generate-image-template.html` in a browser
2. Add query params: `?headline=Your+Headline&subline=Your+Subline&brand=LaravisionX`
3. Resize browser to 1200×627 (or use Cursor browser MCP)
4. Take a screenshot (Win+Shift+S or browser dev tools)
5. Save to `.marketing/posts/images/`

**Method B — Free stock photo as background:**

- **Picsum.photos:** `https://picsum.photos/1200/627` — random professional photo
- **Unsplash:** Sign up free at unsplash.com/developers for 50 requests/hour
- Use as background in Canva (free tier) or in your HTML template

### 3. Post to LinkedIn (free)

1. Go to [linkedin.com](https://linkedin.com)
2. Create a new post
3. Paste the copy from `.marketing/posts/YYYY-MM-DD-post.md`
4. Upload the image from `.marketing/posts/images/`
5. Use LinkedIn's native scheduler (free) to schedule for optimal time

### 4. Set a reminder (free)

```bash
node .marketing/scripts/schedule-reminder.js 2026-03-17 09:00 Asia/Kolkata "Your topic"
```

---

## Quick Commands (All Free)

```bash
# Best time to post
node .marketing/scripts/optimal-post-time.js technology Asia/Kolkata

# Prepare post structure
node .marketing/scripts/prepare-post-context.js "your topic" thought_leadership

# Reminder 10 min before post
node .marketing/scripts/schedule-reminder.js 2026-03-17 09:00 Asia/Kolkata "topic"
```

---

## Free Image Options

| Source | URL / Usage | Notes |
|--------|-------------|-------|
| **HTML template** | `.marketing/scripts/generate-image-template.html` | No API, professional text overlay |
| **Free image URLs** | `node .marketing/scripts/get-free-image-urls.js [topic]` | Outputs Picsum URLs, no key |
| **Picsum.photos** | `https://picsum.photos/1200/627` | Random photo, no key |
| **Unsplash** | unsplash.com (download manually) | Free, high quality |
| **Canva free** | canva.com | Create graphics, free tier |

---

## What You Don't Need

- Zapier subscription
- OpenAI API key
- Buffer / Hootsuite
- DALL·E or other AI image APIs
- Any paid LinkedIn tools

---

## Tips to Maximize Brand Value (Free)

1. **Post consistently** — Tue–Thu, 9–10 AM (run optimal-post-time.js for your timezone)
2. **Use the HTML template** — Professional, on-brand, no cost
3. **Engage** — Reply to comments within 24h (use response-templates.md)
4. **Vary content** — Thought leadership, tips, product highlights
5. **Track** — Note which posts get more engagement, iterate
