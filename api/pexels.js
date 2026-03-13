// AI Generated Code by Deloitte + Cursor (BEGIN)
// Vercel serverless function - proxies Pexels API. Key stays in env, never exposed.
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const key = process.env.PEXELS_API_KEY;
  if (!key) {
    return res.status(500).json({ error: 'PEXELS_API_KEY not configured' });
  }

  const q = (req.query.q || req.query.query || '').trim() || 'business';
  const type = (req.query.type || 'photo').toLowerCase();
  const isVideo = type === 'video';

  const base = isVideo
    ? 'https://api.pexels.com/v1/videos/search'
    : 'https://api.pexels.com/v1/search';
  const params = new URLSearchParams({
    query: q,
    per_page: '1',
    orientation: 'landscape'
  });
  if (isVideo) params.set('size', 'medium');

  try {
    const r = await fetch(`${base}?${params}`, {
      headers: { Authorization: key },
      cache: 'no-store'
    });
    const data = await r.json();

    if (isVideo) {
      const v = data.videos && data.videos[0];
      if (!v) return res.status(404).json({ error: 'No video found' });
      const file = (v.video_files || []).find(f => f.quality === 'hd' || f.quality === 'sd') || v.video_files?.[0];
      const image = v.image || (v.video_pictures && v.video_pictures[0]?.picture);
      return res.status(200).json({
        type: 'video',
        url: file?.link,
        thumbnail: image,
        duration: v.duration,
        videographer: v.user?.name
      });
    }

    const p = data.photos && data.photos[0];
    if (!p) return res.status(404).json({ error: 'No photo found' });
    return res.status(200).json({
      type: 'photo',
      url: p.src?.large2x || p.src?.original,
      thumbnail: p.src?.medium,
      photographer: p.photographer
    });
  } catch (e) {
    return res.status(500).json({ error: 'Pexels API error', message: e.message });
  }
}
// AI Generated Code by Deloitte + Cursor (END)
