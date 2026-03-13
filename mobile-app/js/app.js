(function () {
  // AI Generated Code by Deloitte + Cursor (BEGIN)
  const INDUSTRY_SLOTS = {
    technology: { days: ['Tuesday', 'Wednesday', 'Thursday'], slots: ['9:00 AM', '9:30 AM', '10:00 AM'] },
    default: { days: ['Tuesday', 'Wednesday', 'Thursday'], slots: ['8:00 AM', '9:00 AM', '12:00 PM'] }
  };

  const BASE_HASHTAGS = ['#Innovation', '#Leadership', '#DigitalTransformation', '#Growth', '#Tech', '#Business', '#ProfessionalDevelopment', '#FutureOfWork', '#SaaS', '#Startup', '#Marketing', '#Sales', '#B2B', '#Founders'];

  function getComprehensiveCopy(topic) {
    const t = topic || 'industry insights';
    return `${t.charAt(0).toUpperCase() + t.slice(1)} — here's what matters.\n\nPERSPECTIVE\nThe future isn't about technology alone. It's about who uses it and how. Founders who automate. Marketers who personalize at scale. Sales teams who close faster with data-driven insights. The gap isn't technology — it's adoption.\n\nKEY INSIGHTS\n→ Customer expectations have shifted. They want instant, intelligent responses.\n→ Competition has leveled. Smaller teams punch above their weight.\n→ Talent is the new bottleneck. Upskilling isn't optional anymore.\n\nPRACTICAL TIPS\n• Start small. Test one process, measure the impact, then scale what works.\n• Big launches fail when you try to change everything at once.\n• Small wins build momentum and prove value before you invest more.\n\nWHAT YOU GET\n→ Faster delivery with less effort\n→ Consistent, professional output\n→ Scalable solutions that grow with you\n\nThe businesses winning today aren't the ones with the biggest budgets. They're the ones moving fastest.\n\nWhere are you in your journey? Drop a comment — let's talk.`;
  }

  function getOptimalTime() {
    const config = INDUSTRY_SLOTS.technology;
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (let d = 0; d < 7; d++) {
      const d2 = new Date(now);
      d2.setDate(now.getDate() + d);
      if (config.days.includes(dayNames[d2.getDay()])) {
        return `${dayNames[d2.getDay()]} at ${config.slots[0]} (local time)`;
      }
    }
    return 'Tuesday–Thursday, 9–10 AM';
  }

  function getHashtags(topic) {
    const topicTag = '#' + topic.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
    const words = topic.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    const topicTags = words.map(w => '#' + w.charAt(0).toUpperCase() + w.slice(1));
    return [...new Set([topicTag, ...topicTags, ...BASE_HASHTAGS])].slice(0, 10);
  }

  function getCopy(topic) {
    return getComprehensiveCopy(topic);
  }

  function getSeoKeywords(topic) {
    const words = topic.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    return [...words, 'linkedin', 'marketing', 'engagement'].join(', ');
  }

  function getThemeFromTopic(topic) {
    const t = (topic || '').toLowerCase();
    if (t.includes('ai') || t.includes('tech') || t.includes('software')) {
      return { bg: ['#0f172a', '#1e293b', '#0f172a'], accent: ['#3b82f6', '#8b5cf6'], shapes: 'circles' };
    }
    if (t.includes('product') || t.includes('launch') || t.includes('saas')) {
      return { bg: ['#0f172a', '#134e4a', '#0f172a'], accent: ['#14b8a6', '#0d9488'], shapes: 'grid' };
    }
    if (t.includes('team') || t.includes('growth') || t.includes('leadership')) {
      return { bg: ['#1e1b4b', '#312e81', '#1e1b4b'], accent: ['#a78bfa', '#c4b5fd'], shapes: 'arcs' };
    }
    if (t.includes('marketing') || t.includes('sales') || t.includes('b2b')) {
      return { bg: ['#1c1917', '#292524', '#1c1917'], accent: ['#f59e0b', '#fbbf24'], shapes: 'lines' };
    }
    if (t.includes('data') || t.includes('insight') || t.includes('analytics')) {
      return { bg: ['#0c4a6e', '#0e7490', '#0c4a6e'], accent: ['#22d3ee', '#67e8f9'], shapes: 'bars' };
    }
    const hash = (topic || 'x').split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
    const themes = [
      { bg: ['#0f172a', '#1e293b'], accent: ['#3b82f6', '#8b5cf6'], shapes: 'circles' },
      { bg: ['#134e4a', '#0f766e'], accent: ['#14b8a6', '#2dd4bf'], shapes: 'grid' },
      { bg: ['#1e1b4b', '#312e81'], accent: ['#f59e0b', '#fbbf24'], shapes: 'arcs' }
    ];
    return themes[Math.abs(hash) % themes.length];
  }

  function hashTopic(topic) {
    return (topic || 'x').split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  }

  function getProxyUrl() {
    const base = (typeof window.API_PROXY_URL === 'string' && window.API_PROXY_URL.trim()) || '';
    return base ? base.replace(/\/$/, '') : (window.location.origin + '/api/pexels');
  }

  async function fetchFromProxy(topic, type) {
    if (!navigator.onLine) return null;
    try {
      const url = getProxyUrl() + '?q=' + encodeURIComponent(topic) + '&type=' + type;
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) return null;
      const data = await r.json();
      return data.url || data;
    } catch (_) {
      return null;
    }
  }

  async function fetchFromPexelsDirect(topic, type, pexelsKey) {
    if (!pexelsKey || !navigator.onLine) return null;
    try {
      const isVideo = type === 'video';
      const base = isVideo ? 'https://api.pexels.com/v1/videos/search' : 'https://api.pexels.com/v1/search';
      const params = new URLSearchParams({ query: topic, per_page: '1', orientation: 'landscape' });
      const r = await fetch(base + '?' + params, { headers: { Authorization: pexelsKey }, cache: 'no-store' });
      const data = await r.json();
      if (isVideo) {
        const v = data.videos && data.videos[0];
        if (!v || !v.video_files) return null;
        const f = v.video_files.find(x => x.quality === 'hd' || x.quality === 'sd') || v.video_files[0];
        return { url: f.link, thumbnail: v.image || (v.video_pictures && v.video_pictures[0]?.picture) };
      }
      const p = data.photos && data.photos[0];
      return p ? (p.src?.large2x || p.src?.original) : null;
    } catch (_) {
      return null;
    }
  }

  async function fetchBackgroundImage(topic, pexelsKey) {
    let result = await fetchFromProxy(topic, 'photo');
    if (result && (result.url || typeof result === 'string')) return result.url || result;
    result = await fetchFromPexelsDirect(topic, 'photo', pexelsKey);
    if (typeof result === 'string') return result;
    if (navigator.onLine) {
      const seed = Math.abs(hashTopic(topic)) || 1;
      return 'https://picsum.photos/seed/' + seed + '/1200/627';
    }
    return null;
  }

  async function fetchVideo(topic, pexelsKey) {
    let result = await fetchFromProxy(topic, 'video');
    if (result && (result.url || (typeof result === 'object' && result.url))) return { url: result.url || result, thumbnail: result.thumbnail };
    result = await fetchFromPexelsDirect(topic, 'video', pexelsKey);
    return result && typeof result === 'object' && result.url ? result : null;
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = url;
    });
  }

  function drawImage(canvas, headline, subline, brand, topic, bgImage) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const theme = getThemeFromTopic(topic);

    if (bgImage && bgImage.complete && bgImage.naturalWidth) {
      ctx.drawImage(bgImage, 0, 0, w, h);
      const overlay = ctx.createLinearGradient(0, 0, 0, h);
      overlay.addColorStop(0, 'rgba(15,23,42,0.75)');
      overlay.addColorStop(0.5, 'rgba(15,23,42,0.85)');
      overlay.addColorStop(1, 'rgba(15,23,42,0.9)');
      ctx.fillStyle = overlay;
      ctx.fillRect(0, 0, w, h);
    } else {
      const bgGrad = ctx.createLinearGradient(0, 0, w, h);
      theme.bg.forEach((c, i) => bgGrad.addColorStop(i / (theme.bg.length - 1), c));
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);
      drawDecorativeShapes(ctx, w, h, theme, headline);
    }

    if (ctx.roundRect) {
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.roundRect(36, 56, w - 72, h - 112, 16);
      ctx.fill();
    }

    const barGrad = ctx.createLinearGradient(0, 0, 140, 0);
    barGrad.addColorStop(0, theme.accent[0]);
    barGrad.addColorStop(1, theme.accent[1]);
    ctx.fillStyle = barGrad;
    ctx.fillRect(48, 72, 110, 6);
    ctx.fillRect(48, 82, 70, 6);

    drawTopicIcon(ctx, w, h, headline, theme);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 44px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    const maxWidth = w - 96;
    const lines = wrapText(ctx, headline, maxWidth, 44);
    let y = 158;
    lines.forEach((line, i) => {
      ctx.font = i === 0 ? 'bold 44px "Plus Jakarta Sans", sans-serif' : 'bold 38px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(line, 48, y);
      y += 50;
    });

    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(248,250,252,0.9)';
    const subText = subline.length > 58 ? subline.substring(0, 58) + '...' : subline;
    ctx.fillText(subText, 48, Math.min(y + 28, h - 100));

    const footerY = h - 50;
    const lineGrad = ctx.createLinearGradient(0, 0, 200, 0);
    lineGrad.addColorStop(0, theme.accent[0]);
    lineGrad.addColorStop(1, theme.accent[1]);
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(48, footerY);
    ctx.lineTo(150, footerY);
    ctx.stroke();
    ctx.font = '600 14px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = 'rgba(248,250,252,0.95)';
    ctx.fillText(brand, 48, h - 24);

    ctx.fillStyle = theme.accent[0];
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    ctx.moveTo(w, 0);
    ctx.lineTo(w, 100);
    ctx.lineTo(w - 100, 0);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawDecorativeShapes(ctx, w, h, theme, headline) {
    const t = (headline || '').toLowerCase();
    ctx.globalAlpha = 0.06;
    if (theme.shapes === 'circles') {
      [0.2, 0.4, 0.6].forEach((p, i) => {
        ctx.beginPath();
        ctx.arc(w * (0.88 + i * 0.04), h * p, 100 + i * 50, 0, Math.PI * 2);
        ctx.strokeStyle = theme.accent[0];
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    } else if (theme.shapes === 'grid') {
      for (let x = 0; x < w; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.strokeStyle = theme.accent[0];
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    } else if (theme.shapes === 'arcs') {
      ctx.beginPath();
      ctx.arc(w + 80, -30, 280, 0, Math.PI * 0.5);
      ctx.strokeStyle = theme.accent[0];
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w + 40, h * 0.65, 220, Math.PI * 0.5, Math.PI);
      ctx.strokeStyle = theme.accent[1];
      ctx.stroke();
    } else if (theme.shapes === 'lines') {
      [0.3, 0.5, 0.7].forEach((p, i) => {
        ctx.beginPath();
        ctx.moveTo(w * 0.7, h * p);
        ctx.lineTo(w + 50, h * (p + 0.1));
        ctx.strokeStyle = theme.accent[i % 2];
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    } else if (theme.shapes === 'bars') {
      [30, 50, 70, 45, 85, 55].forEach((ht, i) => {
        ctx.fillStyle = theme.accent[i % 2];
        ctx.fillRect(w - 180 + i * 28, h - 80 - ht, 18, ht);
      });
    }
    ctx.globalAlpha = 1;
  }

  function drawTopicIcon(ctx, w, h, headline, theme) {
    const t = (headline || '').toLowerCase();
    if (t.includes('ai') || t.includes('tech')) {
      ctx.fillStyle = theme.accent[0];
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(w - 100, 85);
      ctx.lineTo(w - 58, 125);
      ctx.lineTo(w - 100, 165);
      ctx.lineTo(w - 142, 125);
      ctx.closePath();
      ctx.fill();
    } else if (t.includes('product') || t.includes('launch')) {
      ctx.strokeStyle = theme.accent[1];
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 2;
      ctx.strokeRect(w - 130, 88, 58, 58);
      ctx.strokeRect(w - 115, 103, 28, 28);
    } else if (t.includes('team') || t.includes('growth')) {
      ctx.fillStyle = theme.accent[0];
      ctx.globalAlpha = 0.3;
      [0, 1, 2].forEach((i) => {
        ctx.beginPath();
        ctx.arc(w - 100 + i * 26, 122, 14 - i * 2, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (t.includes('marketing') || t.includes('sales')) {
      ctx.strokeStyle = theme.accent[1];
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(w - 140, 138);
      ctx.lineTo(w - 98, 98);
      ctx.lineTo(w - 56, 138);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w - 98, 138, 22, Math.PI, 0);
      ctx.stroke();
    } else if (t.includes('data') || t.includes('insight')) {
      ctx.fillStyle = theme.accent[0];
      ctx.globalAlpha = 0.4;
      [42, 58, 72, 52, 88].forEach((ht, i) => {
        ctx.fillRect(w - 142 + i * 20, 162 - ht, 14, ht);
      });
    } else {
      ctx.fillStyle = theme.accent[0];
      ctx.globalAlpha = 0.2;
      ctx.beginPath();
      ctx.arc(w - 82, 122, 48, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function wrapText(ctx, text, maxWidth, fontSize) {
    const words = (text || '').split(/\s+/);
    const lines = [];
    let line = '';
    ctx.font = `bold ${fontSize}px "Plus Jakarta Sans", sans-serif`;
    for (const word of words) {
      const test = line ? line + ' ' + word : word;
      const m = ctx.measureText(test);
      if (m.width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines.slice(0, 3);
  }
  // AI Generated Code by Deloitte + Cursor (END)

  function init() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js');
    }

    const topicInput = document.getElementById('topic');
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.getElementById('outputSection');
    const copyEl = document.getElementById('copy');
    const hashtagsEl = document.getElementById('hashtags');
    const seoEl = document.getElementById('seo');
    const optimalTimeEl = document.getElementById('optimalTime');
    const canvas = document.getElementById('imageCanvas');
    const downloadBtn = document.getElementById('downloadImage');
    const statusEl = document.getElementById('status');
    const pexelsKeyInput = document.getElementById('pexelsKey');

    if (pexelsKeyInput) {
      pexelsKeyInput.value = localStorage.getItem('pexelsKey') || (typeof window.PEXELS_API_KEY === 'string' ? window.PEXELS_API_KEY : '') || '';
      pexelsKeyInput.addEventListener('change', () => {
        const v = pexelsKeyInput.value.trim();
        if (v) localStorage.setItem('pexelsKey', v);
        else localStorage.removeItem('pexelsKey');
      });
    }

    navigator.onLine ? (statusEl.textContent = 'Online') : (statusEl.textContent = 'Offline');

    generateBtn.addEventListener('click', async () => {
      const topic = topicInput.value.trim() || 'industry insights';
      const pexelsKey = (localStorage.getItem('pexelsKey') || (typeof window.PEXELS_API_KEY === 'string' ? window.PEXELS_API_KEY : '') || '').trim();

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const copyText = getCopy(topic);
      const hashtagText = getHashtags(topic).join(' ');
      const seoText = getSeoKeywords(topic);
      const timeText = getOptimalTime();

      copyEl.value = copyText;
      copyEl.placeholder = '';
      hashtagsEl.textContent = hashtagText;
      seoEl.textContent = 'SEO: ' + seoText;
      optimalTimeEl.textContent = timeText;

      generateBtn.disabled = true;
      generateBtn.querySelector('.btn-text').textContent = 'Generating...';

      const videoCard = document.getElementById('videoCard');
      const postVideo = document.getElementById('postVideo');
      const downloadVideoBtn = document.getElementById('downloadVideo');

      let bgImg = null;
      let videoData = null;
      try {
        const [imgUrl, vid] = await Promise.all([
          fetchBackgroundImage(topic, pexelsKey),
          fetchVideo(topic, pexelsKey)
        ]);
        if (imgUrl) bgImg = await loadImage(imgUrl);
        videoData = vid;
      } catch (_) {}

      drawImage(canvas, topic, 'Professional post for LinkedIn · LaravisionX', 'LaravisionX', topic, bgImg);

      if (videoData && videoData.url) {
        videoCard.style.display = 'block';
        postVideo.src = videoData.url;
        postVideo.poster = videoData.thumbnail || '';
        downloadVideoBtn.style.display = 'inline-block';
        downloadVideoBtn.onclick = () => {
          const a = document.createElement('a');
          a.href = videoData.url;
          a.download = 'linkedin-post-video.mp4';
          a.click();
        };
      } else {
        videoCard.style.display = 'none';
        downloadVideoBtn.style.display = 'none';
      }

      generateBtn.disabled = false;
      generateBtn.querySelector('.btn-text').textContent = 'Generate Post';

      outputSection.classList.add('visible');
      outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    document.querySelectorAll('.copyBtn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ids = (btn.dataset.target || '').split(',').map(s => s.trim()).filter(Boolean);
        let text = '';
        ids.forEach(id => {
          const el = document.getElementById(id);
          if (el) {
            const t = el.value || el.textContent || '';
            text += (text ? '\n\n' : '') + t;
          }
        });
        navigator.clipboard.writeText(text).then(() => { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 1500); });
      });
    });

    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'linkedin-post.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });

    document.getElementById('clearCacheBtn').addEventListener('click', async () => {
      try {
        if ('caches' in window) {
          const names = await caches.keys();
          await Promise.all(names.map((n) => caches.delete(n)));
        }
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.unregister()));
        }
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(true);
      } catch (e) {
        window.location.reload(true);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
