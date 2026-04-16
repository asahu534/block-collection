/* eslint-disable */
/* global WebImporter */
/** Parser for cards-gallery. Base: cards. Source: https://wknd-trendsetters.site. */
export default function parse(element, { document }) {
  // Cards gallery: 8 square images in a 4x2 grid, image-only cards
  // Source DOM: .grid-layout.desktop-4-column with .utility-aspect-1x1 children each containing an img
  // Container block: each row = one card item, col1 = image, col2 = text (empty for gallery)

  const imageContainers = element.querySelectorAll('.utility-aspect-1x1, :scope > div');
  const cells = [];

  imageContainers.forEach((container) => {
    const img = container.querySelector('img, picture');
    if (img) {
      // Col 1: image with field hint
      const imgFrag = document.createDocumentFragment();
      imgFrag.appendChild(document.createComment(' field:image '));
      imgFrag.appendChild(img);
      // Col 2: text (empty for image-only gallery)
      cells.push([imgFrag, '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
