/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Selectors from captured DOM at https://wknd-trendsetters.site
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip-link (not authorable)
    WebImporter.DOMUtils.remove(element, ['.skip-link']);
  }
  if (hookName === H.after) {
    // Remove non-authorable site chrome: navbar, footer, mobile menu button
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer.footer',
      '.nav-mobile-menu-button',
      'noscript',
      'link',
    ]);
    // Clean data attributes from all elements
    element.querySelectorAll('[data-astro-cid-37fxchfa]').forEach((el) => {
      el.removeAttribute('data-astro-cid-37fxchfa');
    });
  }
}
