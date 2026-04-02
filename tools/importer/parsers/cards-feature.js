/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-feature. Base: cards (container block).
 * Source: https://main--boilerplate--asahu534.aem.page/
 * Model fields per card: image (reference), text (richtext)
 * Block library: 2 columns per row. Col 1 = image, Col 2 = text.
 * Each row = one card item.
 * Generated: 2026-04-02
 */
export default function parse(element, { document }) {
  const cells = [];

  // Source structure: <div class="cards block"> > <ul> > <li> (each card)
  // Each <li> has: <div class="cards-card-image"> + <div class="cards-card-body">
  const cardItems = element.querySelectorAll('ul > li, :scope > div');

  cardItems.forEach((card) => {
    // Extract image from card
    const imageDiv = card.querySelector('.cards-card-image, :scope > div:first-child');
    const img = imageDiv ? imageDiv.querySelector('picture') || imageDiv.querySelector('img') : null;

    // Extract text content from card
    const bodyDiv = card.querySelector('.cards-card-body, :scope > div:last-child');

    // Build row: [image, text] with field hints
    const imgFrag = document.createDocumentFragment();
    if (img) {
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(img);
    }

    const textFrag = document.createDocumentFragment();
    if (bodyDiv) {
      textFrag.appendChild(document.createComment(' field:text '));
      while (bodyDiv.firstChild) {
        textFrag.appendChild(bodyDiv.firstChild);
      }
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
