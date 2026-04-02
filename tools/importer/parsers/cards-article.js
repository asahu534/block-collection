/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-article. Base: cards.
 * Source: https://wknd-trendsetters.site (section 5 latest articles)
 * Model fields per card: image (reference), text (richtext)
 * → 1 row per card: [image | text body]
 */
export default function parse(element, { document }) {
  // Each article card is an <a> element with class article-card
  const items = element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > a');

  const cells = [];

  items.forEach((item) => {
    // Image
    const img = item.querySelector('.article-card-image img, img');
    const pic = img ? (img.closest('picture') || img) : null;

    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (pic) imgFrag.appendChild(pic);

    // Text body: tag, date, heading
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));

    const tag = item.querySelector('.tag');
    const date = item.querySelector('.article-card-meta .paragraph-sm, .utility-text-secondary');
    const heading = item.querySelector('h3, h4');

    if (tag) textFrag.appendChild(tag);
    if (date) {
      const p = document.createElement('p');
      p.textContent = date.textContent.trim();
      textFrag.appendChild(p);
    }
    if (heading) textFrag.appendChild(heading);

    // Preserve the link href
    const link = document.createElement('a');
    link.href = item.href || '#';
    link.textContent = heading ? heading.textContent : 'Read more';

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
