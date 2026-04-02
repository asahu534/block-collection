/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Removes non-authorable content (navbar, footer, skip-link).
 * Selectors from captured DOM of https://wknd-trendsetters.site
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip-link before parsing
    WebImporter.DOMUtils.remove(element, ['.skip-link']);
  }
  if (hookName === H.after) {
    // Remove non-authorable site chrome
    WebImporter.DOMUtils.remove(element, [
      '.navbar',           // Main navigation bar
      'footer.footer',     // Site footer
      'iframe',
      'link',
      'noscript',
    ]);
  }
}
