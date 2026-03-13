// AI Generated Code by Deloitte + Cursor (BEGIN)
/**
 * Prepares full post context: copy, hashtags, SEO keywords, image brief, CTA.
 * Reads company profile and topic, outputs structured post ready for scheduling.
 *
 * Usage: node prepare-post-context.js <topic> [post-type]
 * Post types: thought_leadership | product_highlight | case_study | tip_insight
 *
 * Requires: .marketing/company-profile.md to be filled
 */

const fs = require('fs');
const path = require('path');

const PROFILES_PATH = path.join(__dirname, '..', 'company-profile.md');
const POST_TYPES = {
  thought_leadership: { hook: 'Insight or contrarian take', cta: 'Share your thoughts in the comments' },
  product_highlight: { hook: 'Problem solved or benefit', cta: 'Learn more / Book a demo' },
  case_study: { hook: 'Result or transformation', cta: 'Read the full story' },
  tip_insight: { hook: 'Actionable tip or lesson', cta: 'Save this for later' },
};

function loadCompanyProfile() {
  try {
    const content = fs.readFileSync(PROFILES_PATH, 'utf8');
    return content;
  } catch {
    return null;
  }
}

function prepareOutput(topic, postType, profile) {
  const typeConfig = POST_TYPES[postType] || POST_TYPES.thought_leadership;
  return {
    topic,
    postType,
    platform: 'LinkedIn',
    imageDimensions: { width: 1200, height: 627 },
    imageBrief: {
      style: 'professional, clean, on-brand',
      elements: `Headline related to: ${topic}. Supporting visual or icon.`,
      altText: `LinkedIn post image about ${topic}`,
    },
    copyTemplate: {
      hook: `[First 1-2 lines: ${typeConfig.hook}. LinkedIn truncates after ~3 lines.]`,
      body: '[Value-driven content: story, data, or insight. 1300-2000 chars optimal.]',
      cta: typeConfig.cta,
    },
    hashtags: ['#LinkedIn', '#Industry', '#Topic', '#Company', '#Engagement'],
    seoKeywords: [topic.replace(/\s+/g, '').toLowerCase(), 'linkedin', 'marketing', 'engagement'],
    companyContext: profile ? 'Loaded from company-profile.md' : 'Fill company-profile.md for better output',
  };
}

function main() {
  const topic = process.argv[2] || 'company update';
  const postType = process.argv[3] || 'thought_leadership';
  const profile = loadCompanyProfile();

  const output = prepareOutput(topic, postType, profile);
  console.log(JSON.stringify(output, null, 2));
}

main();
// AI Generated Code by Deloitte + Cursor (END)
