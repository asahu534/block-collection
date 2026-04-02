/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters sections.
 * Adds section breaks (<hr>) and section-metadata blocks from template sections.
 * Runs in afterTransform only.
 * Selectors from captured DOM of https://wknd-trendsetters.site
 */

export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const doc = element.ownerDocument || document;
    const template = payload && payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    const sections = template.sections;

    // Process sections in reverse order to avoid offset issues
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      let sectionEl = null;

      // Find section element using selector (can be string or array)
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Add <hr> before section (except first section)
      if (i > 0) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
