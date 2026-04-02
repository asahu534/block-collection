/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-cta. Base: hero.
 * Source: https://wknd-trendsetters.site (section 7 CTA banner)
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * → 2 rows: [image], [text]
 */
export default function parse(element, { document }) {
  // Background image with overlay
  const img = element.querySelector('img.cover-image, img');

  // Text content: heading, paragraph, CTA button
  const heading = element.querySelector('h1, h2');
  const description = element.querySelector('.subheading, .card-body > p');
  const buttons = Array.from(element.querySelectorAll('.button-group a, a.button'));

  const cells = [];

  // Row 1: image with field hint
  if (img) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    const pic = img.closest('picture') || img;
    imgFrag.appendChild(pic);
    cells.push([imgFrag]);
  }

  // Row 2: text (richtext) with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (description) textFrag.appendChild(description);
  buttons.forEach((btn) => textFrag.appendChild(btn));
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-cta', cells });
  element.replaceWith(block);
}
