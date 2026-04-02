/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards block.
 * Base: cards. Source: https://main--block-collection--asahu534.aem.page/
 * xwalk container block: each card item = one row with image and text columns.
 * Model fields: image (reference), text (richtext)
 * Source DOM: div.cards > ul > li, each with .cards-card-image (picture) and .cards-card-body (p>strong + p)
 */
export default function parse(element, { document }) {
  const items = element.querySelectorAll(':scope ul > li, :scope > div');
  const cells = [];

  items.forEach((item) => {
    // Extract image
    const imageDiv = item.querySelector('.cards-card-image, :scope > div:first-child');
    const picture = imageDiv ? imageDiv.querySelector('picture') : null;

    // Extract text content
    const textDiv = item.querySelector('.cards-card-body, :scope > div:last-child');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    if (picture) {
      imageCell.appendChild(document.createComment(' field:image '));
      imageCell.appendChild(picture);
    }

    // Build text cell with field hint
    const textCell = document.createDocumentFragment();
    if (textDiv) {
      textCell.appendChild(document.createComment(' field:text '));
      while (textDiv.firstChild) {
        textCell.appendChild(textDiv.firstChild);
      }
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards', cells });
  element.replaceWith(block);
}
