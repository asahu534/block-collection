# Homepage Migration Plan

**Source URL:** `https://main--block-collection--asahu534.aem.page/`
**Project Type:** xwalk (AEM Sites / Universal Editor)
**Block Library:** `https://main--sta-xwalk-boilerplate--aemysites.aem.page/tools/sidekick/library.json`

---

## Page Analysis

The source homepage contains the following structure:

### Section 1 — Hero / Intro
- **Default content:** Decorative image/icon, H1 heading ("Google Drive as a content source! Testing headline."), descriptive paragraph with links, H2 subheading
- **Columns block:** Two-column layout with a bulleted list + CTA link on the left, and a paragraph + link on the right

### Section 2 — Highlights
- **Default content:** H2 heading ("Boilerplate Highlights?") + intro paragraph
- **Cards block:** Seven feature cards, each with an icon/image, bold title, and description paragraph

### Footer
- Standard footer content

---

## Block Mapping

| Source Element | Target Block | Status |
|---|---|---|
| Intro text + headings | Default content | Available |
| Two-column layout | **Columns** | Available locally |
| Feature cards grid | **Cards** | Available locally |
| Footer | **Footer** | Available locally |

All required blocks already exist in the local project — no new block variants are needed.

---

## Migration Approach

This migration will use the `excat-site-migration` skill which provides:
- Automated page analysis and block identification
- Import script generation with block parsers
- Content HTML file generation
- Local preview verification

---

## Current Progress

All migration artifacts were generated in a prior session:
- `tools/importer/page-templates.json` — homepage template with block mappings
- `migration-work/authoring-analysis.json` — page structure analysis
- `tools/importer/parsers/columns.js`, `cards.js` — block parsers
- `tools/importer/transformers/block-collection-cleanup.js`, `block-collection-sections.js` — transformers
- `tools/importer/import-homepage.js` + `.bundle.js` — import script
- `content/index.plain.html` — imported content file (5KB)

---

## Checklist

- [x] Run site analysis to classify the URL and create page template
- [x] Perform detailed page analysis (sections, blocks, content structure)
- [x] Map blocks to page template (Columns, Cards)
- [x] Generate import infrastructure (block parsers + page transformers)
- [x] Generate import script and execute content import
- [x] Create content HTML file at `/content/index.html`
- [x] Verify rendered page in local preview
- [ ] Compare migrated page against original for visual fidelity

---

## Prerequisites

- Source page is publicly accessible ✅
- Local project has required blocks (columns, cards, footer) ✅
- Local preview server available at `localhost:3000` ✅

---

## Remaining Work

Only one checklist item remains: **visual fidelity comparison** between the migrated page (`localhost:3000/content/index`) and the original (`https://main--block-collection--asahu534.aem.page/`). This requires taking screenshots of both pages and comparing layout, content, and block rendering. Switch to Execute mode to complete this final step.
