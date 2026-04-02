/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: block-collection sections.
 * Adds section breaks and section-metadata blocks based on template sections.
 * Selectors from captured DOM at https://main--block-collection--asahu534.aem.page/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const template = payload && payload.template;
    if (!template || !template.sections || template.sections.length < 2) return;

    // Process sections in reverse order to avoid offset issues
    const sections = [...template.sections].reverse();

    sections.forEach((section) => {
      // Find the section element using the selector
      const selectorList = Array.isArray(section.selector) ? section.selector : [section.selector];
      let sectionEl = null;
      for (const sel of selectorList) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add <hr> section break before non-first sections (when there's content before it)
      if (section.id !== template.sections[0].id) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
