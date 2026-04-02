# Fix "Missing Site Configuration" Error

## Problem

When trying to create a content package in the AEM Code workspace (`aemcoder.adobe.io`) for `asahu534/block-collection`, a red error toast appears: **"Missing site configuration"**.

## Current Blocker

The workspace shows: **"Cannot sync: You have uncommitted changes. Please commit or push them first."**

The AEM Code workspace has local changes (from the migration work we did — new block variants, parsers, transformers, import scripts, and content) that haven't been committed and pushed to GitHub. Until these changes are pushed, the GitHub connection cannot sync, and the site configuration remains unavailable.

## Fix Steps

### Step 1: Commit and Push Changes
The workspace contains migration artifacts that need to be committed to the `asahu534/block-collection` GitHub repo:
- New block variants: `blocks/hero-welcome/`, `blocks/columns-info/`, `blocks/cards-feature/`
- Import infrastructure: `tools/importer/parsers/`, `tools/importer/transformers/`
- Import script: `tools/importer/import-homepage.js`
- Content: `content/index.plain.html`
- Migration artifacts: `migration-work/`, `.migration/`

**In the AEM Code workspace:**
1. Go to the **Code** panel
2. Review the uncommitted changes
3. **Commit** all changes with a message like "Add homepage migration artifacts"
4. **Push** to the `main` branch on GitHub

### Step 2: Wait for Code Sync
- After pushing, the AEM Code Sync app will automatically sync the code to the CDN
- The GitHub status should change from "Not connected" (grey) to **connected** (blue)
- This may take 10-30 seconds

### Step 3: Verify
- Check `https://admin.hlx.page/status/asahu534/block-collection/main`
- Code status should be **200** (not 404)

### Step 4: Retry Content Package Creation
- Go to Content in the workspace
- Try "Create content package" again
- The "Missing site configuration" error should be resolved

## Checklist

- [ ] Commit all uncommitted changes in the AEM Code workspace
- [ ] Push changes to `main` branch on GitHub
- [ ] Wait for code sync to complete
- [ ] Confirm GitHub shows as connected (blue dot) in the Code panel
- [ ] Verify code status is 200 at the admin API
- [ ] Retry content package creation
- [ ] Confirm "Missing site configuration" error is resolved
