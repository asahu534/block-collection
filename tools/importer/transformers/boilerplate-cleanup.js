/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: boilerplate cleanup.
 * Selectors from captured DOM of https://main--boilerplate--asahu534.aem.page/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove nav hamburger button (not authorable)
    WebImporter.DOMUtils.remove(element, ['.nav-hamburger']);
  }
  if (hookName === H.after) {
    // Remove non-authorable site shell content
    // Found in captured DOM: <header class="header-wrapper">, <footer class="footer-wrapper">
    WebImporter.DOMUtils.remove(element, [
      'header.header-wrapper',
      'footer.footer-wrapper',
      'noscript',
      'iframe',
      'link'
    ]);
  }
}
