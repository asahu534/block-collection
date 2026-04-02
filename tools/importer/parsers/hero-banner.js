/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-banner. Base: hero.
 * Source: https://wknd-trendsetters.site (section 1 hero)
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * → 2 rows: [image], [text]
 */
export default function parse(element, { document }) {
  // The grid has two children: text content (left) and image grid (right)
  const children = element.querySelectorAll(':scope > div');
  const textDiv = children[0];
  const imageDiv = children[1];

  // Extract first image from the image grid
  const img = imageDiv ? imageDiv.querySelector('img') : element.querySelector('img');

  // Extract text content: heading, subheading, buttons
  const heading = textDiv ? textDiv.querySelector('h1') : element.querySelector('h1');
  const subheading = textDiv ? textDiv.querySelector('.subheading, p') : element.querySelector('p');
  const buttons = textDiv
    ? Array.from(textDiv.querySelectorAll('.button-group a, a.button'))
    : Array.from(element.querySelectorAll('.button-group a, a.button'));

  // Build cells: Row 1 = image, Row 2 = text content
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
  if (subheading) textFrag.appendChild(subheading);
  buttons.forEach((btn) => textFrag.appendChild(btn));
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
