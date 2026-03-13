# AI Generated Code by Deloitte + Cursor (BEGIN)
# Deploy for Images & Videos (No User Key Required)

To give users topic-based images and videos **without** them adding a Pexels key:

## Deploy to Vercel (recommended)

1. **Push your repo** to GitHub (if not already).

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) → New Project → Import your repo
   - **Root Directory: leave empty** (use repo root)

3. **Add environment variable**
   - Project → Settings → Environment Variables
   - Add: `PEXELS_API_KEY` = your Pexels API key (from [pexels.com/api](https://www.pexels.com/api/))
   - Save

4. **Deploy**
   - Deploy (or redeploy if already connected)

Your app will be at `https://your-project.vercel.app`. The `/api/pexels` proxy runs on the same domain, so users get images and videos automatically.

## GitHub Pages (images only)

If you deploy only to GitHub Pages (no Vercel), users will get:
- **Images**: Picsum fallback (varied per topic, not topic-specific)
- **Videos**: Not available (requires proxy)

Users can add their own Pexels key in Settings for topic-based photos.
# AI Generated Code by Deloitte + Cursor (END)
