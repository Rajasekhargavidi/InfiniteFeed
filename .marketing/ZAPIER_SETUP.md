<!-- AI Generated Code by Deloitte + Cursor (BEGIN) -->
# Zapier Tools Setup for Digital Marketing Agent

Add these Zapier actions at **mcp.zapier.com** (or via Cursor Settings > Tools & MCP > Zapier > Connect) so the digital-marketing agent can use them.

## 1. Image Creation

### OpenAI (DALL·E) - Generate Image

- **App:** OpenAI
- **Action:** Generate image (DALL·E)
- **Use:** Creates post images from text prompts
- **Setup:** Connect OpenAI API key in Zapier. The agent will pass prompt, size (1024x1024 or 1792x1024 for LinkedIn).

## 2. Social Posting & Scheduling

### LinkedIn

- **App:** LinkedIn
- **Actions to add:**
  - Create post (company or personal)
  - Create post with image
- **Note:** Requires LinkedIn OAuth. Use for scheduling when approved by user.

### Buffer (alternative)

- **App:** Buffer
- **Actions:** Add post to queue, Create post
- **Use:** Schedule posts across LinkedIn and other platforms

### Hootsuite (alternative)

- **App:** Hootsuite
- **Actions:** Create post, Schedule post

## 3. Content & Context Prep

### Google Sheets (optional)

- **App:** Google Sheets
- **Actions:** Create row, Update row
- **Use:** Store content calendar, post drafts, analytics

### Airtable (optional)

- **App:** Airtable
- **Actions:** Create record, Update record
- **Use:** Content calendar with images, status tracking

## 4. Recommended Zap Flow

1. **Trigger:** Schedule (e.g., daily at 8 AM)
2. **Action 1:** OpenAI – Generate image (prompt from agent)
3. **Action 2:** Save image to Google Drive / OneDrive
4. **Action 3:** LinkedIn / Buffer – Create post (with image URL + copy)

**Important:** Always include a human approval step for posting to LinkedIn.

## Quick Start

1. **Connect Zapier in Cursor**
   - Go to **Settings > Cursor Settings > Tools & MCP**
   - Find **Zapier** and click **Connect**
   - Sign in at mcp.zapier.com when prompted

2. **Add actions at mcp.zapier.com**
   - Open the configuration URL (from Zapier MCP or Cursor MCP settings)
   - Add these actions:
     - **OpenAI** → Create Image (DALL·E)
     - **LinkedIn** → Create Company Post (or Create Post)
     - **Buffer** (optional) → Add Post to Queue

3. **Connect accounts**
   - OpenAI: API key
   - LinkedIn: OAuth (company page access)
   - Buffer: OAuth (if using)

4. **Use the agent**
   - Run `/digital-marketing create today's LinkedIn post`
   - Agent will use Zapier tools when available for image generation and post scheduling
<!-- AI Generated Code by Deloitte + Cursor (END) -->
