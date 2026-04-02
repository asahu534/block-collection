/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery. Base: cards.
 * Source: https://wknd-trendsetters.site (section 3 photo gallery)
 * Model fields per card: image (reference), text (richtext)
 * → 1 row per card: [image | text]
 * Image-only gallery: text cells are empty
 */
export default function parse(element, { document }) {
  // Each child div contains an image in the grid
  const items = element.querySelectorAll(':scope > div');

  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('img');
    const pic = img ? (img.closest('picture') || img) : null;

    if (pic) {
      // Row: [image with hint | empty text]
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(pic);

      cells.push([imgFrag, '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
