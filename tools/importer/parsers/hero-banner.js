/* eslint-disable */
/* global WebImporter */
/** Parser for hero-banner. Base: hero. Source: https://wknd-trendsetters.site. */
export default function parse(element, { document }) {
  // Hero banner: background image with overlay, heading, paragraph, CTA
  // Source DOM: section.inverse-section .utility-position-relative with .cover-image bg + .card-body text

  // Row 1: Background image
  const bgImg = element.querySelector('.cover-image.utility-overlay, .cover-image');

  // Row 2: Text content — heading, paragraph, CTA
  const heading = element.querySelector('.card-body h2, .card-body h1, h1, h2');
  const description = element.querySelector('.card-body .subheading, .card-body p:not(.subheading)');
  const ctaBtn = element.querySelector('.card-body .button-group a.button, .button-group a');

  const cells = [];

  // Row 1: image with field hint
  if (bgImg) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(bgImg);
    cells.push([imgFrag]);
  } else {
    cells.push(['']);
  }

  // Row 2: text content with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (description) textFrag.appendChild(description);
  if (ctaBtn) textFrag.appendChild(ctaBtn);
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
