/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: block-collection cleanup.
 * Selectors from captured DOM at https://main--block-collection--asahu534.aem.page/
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // No overlays or modals found in captured DOM
  }
  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable content found in captured DOM:
    // - header.header-wrapper: site header/navigation
    // - footer.footer-wrapper: site footer
    // - Empty sections with no content
    WebImporter.DOMUtils.remove(element, [
      'header.header-wrapper',
      'footer.footer-wrapper',
    ]);

    // Remove empty sections (no authorable content)
    element.querySelectorAll('.section').forEach((section) => {
      if (!section.textContent.trim() && !section.querySelector('img, picture, video')) {
        section.remove();
      }
    });

    // Clean up safe elements
    WebImporter.DOMUtils.remove(element, ['link', 'noscript']);
  }
}
