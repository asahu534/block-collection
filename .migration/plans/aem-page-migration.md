# Homepage Migration Plan — wknd-trendsetters.site

## Overview

Migrate the homepage at **https://wknd-trendsetters.site** to AEM Edge Delivery Services.

- **Source URL:** https://wknd-trendsetters.site
- **Project type:** xwalk (Universal Editor / cross-walk)
- **Block library:** Available via Sidekick library
- **Existing blocks:** accordion, cards, carousel, columns, embed, form, fragment, hero, modal, quote, search, table, tabs, video, header, footer

## Migration Strategy

The `excat-site-migration` skill will be used to orchestrate the full migration. This involves:

1. **Site & Page Analysis** — Fetch and analyze the homepage to identify sections, content sequences, and block candidates
2. **Block Mapping** — Map source page elements to available EDS blocks (or create new variants if needed)
3. **Import Infrastructure** — Generate parsers and transformers tailored to the homepage structure
4. **Content Import** — Run the import to produce the EDS-compatible HTML content
5. **Design Adaptation** — Extract and apply design tokens (colors, fonts, spacing) from the original site
6. **Preview & Validation** — Render the migrated page locally and compare against the original

## Checklist

- [ ] Analyze homepage at https://wknd-trendsetters.site (structure, sections, blocks)
- [ ] Classify content sequences into EDS blocks and default content
- [ ] Map source elements to existing blocks or create new block variants
- [ ] Generate import infrastructure (parsers, transformers, page template)
- [ ] Execute content import to produce HTML in content directory
- [ ] Extract and apply design tokens (colors, typography, spacing)
- [ ] Preview migrated page locally and compare with original
- [ ] Fix any visual discrepancies or rendering issues
- [ ] Final validation of migrated homepage

## Notes

- The project already has a rich set of base blocks — the migration will reuse these where possible and only create variants when the source content differs significantly.
- Previous migration work artifacts exist in `migration-work/` and may provide useful context.
- **Execution requires exiting Plan mode.** When ready, switch to Execute mode to begin the migration.
