(function () {
  const INDUSTRY_SLOTS = {
    technology: { days: ['Tuesday', 'Wednesday', 'Thursday'], slots: ['9:00 AM', '9:30 AM', '10:00 AM'] },
    default: { days: ['Tuesday', 'Wednesday', 'Thursday'], slots: ['8:00 AM', '9:00 AM', '12:00 PM'] }
  };

  const TEMPLATES = {
    thought_leadership: {
      copy: (topic) => `The future of ${topic} isn't about technology. It's about who uses it.\n\nHere's what we're seeing:\n\n→ Expectations have shifted. Customers want instant, intelligent responses.\n→ Competition has leveled. Smaller teams punch above their weight.\n→ Talent is the new bottleneck. Upskilling isn't optional anymore.\n\nThe businesses winning today aren't the ones with the biggest budgets. They're the ones moving fastest.\n\nWhere are you in your journey? Drop a comment — let's talk.`,
      hashtags: ['#Innovation', '#Leadership', '#FutureOfWork', '#DigitalTransformation', '#Growth']
    },
    product_highlight: {
      copy: (topic) => `Introducing our approach to ${topic}.\n\nWe built this to solve a problem we kept hearing: [problem].\n\nWhat you get:\n→ [benefit 1]\n→ [benefit 2]\n→ [benefit 3]\n\nReady to see it in action? Learn more in the comments or DM us.`,
      hashtags: ['#ProductLaunch', '#Innovation', '#Tech', '#SaaS', '#Startup']
    },
    tip_insight: {
      copy: (topic) => `One lesson we learned about ${topic}:\n\n[Key insight or tip]\n\nWhy it matters: [reason]\n\nSave this for later. Share if it helped.\n\n#Tip #Insight #Learning`,
      hashtags: ['#Tip', '#Insight', '#Learning', '#ProfessionalDevelopment', '#Growth']
    }
  };

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

  function getHashtags(topic, type) {
    const base = TEMPLATES[type].hashtags;
    const topicTag = '#' + topic.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
    return [...base, topicTag].filter((v, i, a) => a.indexOf(v) === i).slice(0, 5);
  }

  function getCopy(topic, type) {
    return TEMPLATES[type].copy(topic);
  }

  function getSeoKeywords(topic) {
    const words = topic.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    return [...words, 'linkedin', 'marketing', 'engagement'].join(', ');
  }

  function drawImage(canvas, headline, subline, brand) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(0.5, '#1e293b');
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = 'linear-gradient(90deg, #3b82f6, #8b5cf6)';
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(48, 80, 80, 4);

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'left';
    const lines = headline.match(/.{1,40}/g) || [headline];
    let y = 140;
    lines.forEach(line => { ctx.fillText(line, 48, y); y += 44; });

    ctx.font = '18px sans-serif';
    ctx.fillStyle = 'rgba(248,250,252,0.9)';
    ctx.fillText(subline.substring(0, 60) + (subline.length > 60 ? '...' : ''), 48, y + 20);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = 'rgba(248,250,252,0.7)';
    ctx.fillText(brand, 48, h - 48);
  }

  function init() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js');
    }

    const topicInput = document.getElementById('topic');
    const postTypeSelect = document.getElementById('postType');
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.getElementById('outputSection');
    const copyEl = document.getElementById('copy');
    const hashtagsEl = document.getElementById('hashtags');
    const seoEl = document.getElementById('seo');
    const optimalTimeEl = document.getElementById('optimalTime');
    const canvas = document.getElementById('imageCanvas');
    const downloadBtn = document.getElementById('downloadImage');
    const statusEl = document.getElementById('status');

    navigator.onLine ? (statusEl.textContent = 'Online') : (statusEl.textContent = 'Offline');

    generateBtn.addEventListener('click', () => {
      const topic = topicInput.value.trim() || 'industry insights';
      const type = postTypeSelect.value;

      copyEl.value = getCopy(topic, type);
      hashtagsEl.textContent = getHashtags(topic, type).join(' ');
      seoEl.textContent = getSeoKeywords(topic);
      optimalTimeEl.textContent = getOptimalTime();

      drawImage(canvas, topic, 'Professional post for LinkedIn · LaravisionX', 'LaravisionX');

      outputSection.classList.add('visible');
      outputSection.scrollIntoView({ behavior: 'smooth' });
    });

    document.querySelectorAll('.copyBtn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.target);
        const text = target.value || target.textContent;
        navigator.clipboard.writeText(text).then(() => { btn.textContent = 'Copied!'; setTimeout(() => btn.textContent = 'Copy', 1500); });
      });
    });

    downloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'linkedin-post.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
