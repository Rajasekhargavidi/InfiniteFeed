/**
 * Returns free stock image URLs for LinkedIn posts (1200x627).
 * No API key required. Use as background or reference.
 *
 * Usage: node get-free-image-urls.js [topic]
 */

const TOPICS = {
  default: ['business', 'technology', 'office', 'teamwork', 'innovation'],
  technology: ['technology', 'coding', 'software', 'digital', 'innovation'],
  business: ['business', 'meeting', 'office', 'professional', 'success'],
  marketing: ['marketing', 'social', 'growth', 'strategy', 'creative'],
};

function getPicsumUrl(seed) {
  return `https://picsum.photos/seed/${seed}/1200/627`;
}

function main() {
  const topic = (process.argv[2] || 'default').toLowerCase();
  const seeds = TOPICS[topic] || TOPICS.default;
  const urls = seeds.map((s) => ({
    topic: s,
    url: getPicsumUrl(s),
  }));

  console.log(JSON.stringify({
    note: 'Free stock photos. No API key. Use in Canva or as HTML background.',
    dimensions: '1200x627',
    urls,
    htmlTemplate: 'Use .marketing/scripts/generate-image-template.html for text overlays (no API).',
  }, null, 2));
}

main();
