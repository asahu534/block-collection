/* eslint-disable */
/* global WebImporter */
/** Parser for hero-landing. Base: hero. Source: https://wknd-trendsetters.site. */
export default function parse(element, { document }) {
  // Hero landing: image row + text row (heading, subheading, CTAs)
  // Source DOM: header.section.secondary-section with .grid-layout containing text div + image grid

  // Row 1: Image — extract first hero image from the image grid
  const heroImg = element.querySelector('.grid-layout .cover-image');

  // Row 2: Text — heading, subheading, buttons
  const heading = element.querySelector('h1');
  const subheading = element.querySelector('.subheading, p.subheading');
  const buttons = Array.from(element.querySelectorAll('.button-group a.button'));

  // Build cells matching hero block library: row 1 = image, row 2 = text content
  const cells = [];

  // Row 1: image with field hint
  if (heroImg) {
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    imgFrag.appendChild(heroImg);
    cells.push([imgFrag]);
  } else {
    cells.push(['']);
  }

  // Row 2: text content with field hint
  const textFrag = document.createDocumentFragment();
  textFrag.appendChild(document.createComment(' field:text '));
  if (heading) textFrag.appendChild(heading);
  if (subheading) textFrag.appendChild(subheading);
  buttons.forEach((btn) => textFrag.appendChild(btn));
  cells.push([textFrag]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
