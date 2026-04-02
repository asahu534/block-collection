/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-welcome. Base: hero.
 * Source: https://main--boilerplate--asahu534.aem.page/
 * Model fields: image (reference), imageAlt (collapsed), text (richtext)
 * Block library: 1 column, row 1 = image, row 2 = text content
 * Generated: 2026-04-02
 */
export default function parse(element, { document }) {
  // Extract background/hero image from source DOM
  // Source: <picture>...<img src="...media_17442c8974f4d71d45ec2720c303432d9ced329cc...">
  const img = element.querySelector('picture img, img');

  // Extract text content (heading)
  // Source: <h1 id="congrats-you-are-ready-to-go">Congrats, you are ready to go!</h1>
  const heading = element.querySelector('h1, h2');

  // Build cells matching block library structure:
  // Row 1: image (with field hint)
  // Row 2: text content (with field hint)
  const cells = [];

  // Row 1: Image
  if (img) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    const pic = img.closest('picture') || img;
    imgFrag.appendChild(pic);
    cells.push([imgFrag]);
  } else {
    cells.push(['']);
  }

  // Row 2: Text content
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) {
    textFrag.appendChild(heading);
  }
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-welcome', cells });
  element.replaceWith(block);
}
