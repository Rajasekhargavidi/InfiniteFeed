# Digital Marketing Agent — Tool Reference

## Built-in Scripts

### 1. Optimal Post Time

**Path:** `.marketing/scripts/optimal-post-time.js`

Calculates best posting times for maximum reach (data from 2025 engagement studies).

```bash
node .marketing/scripts/optimal-post-time.js [industry] [timezone]
```

**Industries:** `default` | `technology` | `financial` | `healthcare` | `professional_services`

**Example:**
```bash
node .marketing/scripts/optimal-post-time.js technology America/Los_Angeles
```

**Output:** JSON with next 10 optimal slots, best days, avoid times.

---

### 2. Schedule Approval Reminder (10 min before post)

**Path:** `.marketing/scripts/schedule-reminder.js`

Shows a Windows popup 10 minutes before posting time so you can approve the post.

```bash
node .marketing/scripts/schedule-reminder.js <YYYY-MM-DD> <HH:MM> [timezone] [topic]
```

**Example:**
```bash
node .marketing/scripts/schedule-reminder.js 2026-03-17 09:00 Asia/Kolkata "AI market changes"
```

**Note:** Run terminal as Administrator if task creation fails. Otherwise use the manual reminder suggestion from the output.

### 3. Prepare Post Context

**Path:** `.marketing/scripts/prepare-post-context.js`

Generates structured post content: copy template, hashtags, SEO keywords, image brief.

```bash
node .marketing/scripts/prepare-post-context.js <topic> [post-type]
```

**Post types:** `thought_leadership` | `product_highlight` | `case_study` | `tip_insight`

**Example:**
```bash
node .marketing/scripts/prepare-post-context.js "AI product launch" product_highlight
```

---

### 4. Image Generation (3 methods)

#### Method A: HTML Template + Browser Screenshot

**Path:** `.marketing/scripts/generate-image-template.html`

1. Agent creates HTML with headline, subline, brand (or use template)
2. Add query params: `?headline=...&subline=...&brand=...`
3. Use **cursor-ide-browser** MCP:
   - `browser_navigate` to file URL
   - `browser_resize` to 1200x627
   - `browser_take_screenshot` → save to `.marketing/posts/images/`

#### Method B: Zapier + OpenAI DALL·E

When `openai_*` or `ChatGPT_*` image action exists in Zapier:
- Call with prompt: "Professional, high-quality LinkedIn post image, 1200x627 aspect, [topic]. Clean, sharp, corporate style. No blur, no abstract art. Clear typography, readable text, professional color palette. High resolution."
- Avoid unclear, blurry, or abstract images. Use "professional", "sharp", "high clarity" in prompts.
- Save returned image URL for post

#### Method C: Canvas HTML (for design-heavy visuals)

Use `cursor-ide-browser` canvas tool to create custom HTML/CSS visuals, then screenshot.

---

## MCP Tools Used

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Open image HTML template |
| `browser_resize` | Set viewport to 1200x627 |
| `browser_take_screenshot` | Capture post image |
| `get_configuration_url` (Zapier) | Add/remove Zapier actions |
| `openai_*` / `linkedin_*` / `buffer_*` | When configured in Zapier |

---

## Optimal Posting Times (Reference)

| Industry | Best Days | Best Times | Timezone |
|----------|-----------|------------|----------|
| General | Tue–Thu | 8–11 AM, 12–2 PM | Audience local |
| Technology | Tue–Thu | 9–10:30 AM | PST |
| Financial | Mon–Wed | 7:30–9 AM | EST |
| Healthcare | Wed–Fri | 10–11:30 AM | Local |
| Professional Services | Mon–Wed | 8:30–10 AM | Local |

**Critical:** First hour engagement drives 40%+ of total reach. Avoid weekends and Friday after 2 PM.
