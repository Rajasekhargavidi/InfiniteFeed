# LaravisionX Digital Marketing Agent

Cursor subagent for automated LinkedIn marketing — content creation, optimal posting times, image generation, and Zapier integration.

## Quick Start

1. **Invoke the agent:** `/digital-marketing create today's LinkedIn post`
2. **Fill company profile:** Edit `.marketing/company-profile.md`
3. **Optional:** Connect Zapier for image generation and scheduling (see `.marketing/ZAPIER_SETUP.md`)

## Structure

- `.cursor/agents/digital-marketing.md` — Subagent definition
- `.marketing/` — Company profile, content calendar, scripts, post drafts

## Scripts

```bash
# Optimal posting time (tech industry, India)
node .marketing/scripts/optimal-post-time.js technology Asia/Kolkata

# Prepare post context
node .marketing/scripts/prepare-post-context.js "topic" product_highlight
```

## Target Audience

Founders, marketers, sales professionals, business decision-makers.
