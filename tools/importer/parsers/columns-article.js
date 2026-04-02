/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-article. Base: columns.
 * Source: https://wknd-trendsetters.site (section 2 featured article)
 * Columns blocks: NO field comments per xwalk rules
 * → 1 row with 2 columns: [image | article info]
 */
export default function parse(element, { document }) {
  const cols = element.querySelectorAll(':scope > div');

  const cells = [];
  const row = [];

  // Column 1: image
  if (cols[0]) {
    const img = cols[0].querySelector('img');
    const pic = img ? (img.closest('picture') || img) : null;
    row.push(pic || '');
  }

  // Column 2: article info (breadcrumbs, heading, author, date)
  if (cols[1]) {
    const frag = document.createDocumentFragment();
    // Extract heading
    const heading = cols[1].querySelector('h2, h1');
    if (heading) frag.appendChild(heading);
    // Extract author info
    const authorName = cols[1].querySelector('.utility-text-black');
    if (authorName) {
      const p = document.createElement('p');
      p.textContent = 'By ' + authorName.textContent;
      frag.appendChild(p);
    }
    // Extract date and read time
    const dateEls = cols[1].querySelectorAll('.utility-text-secondary');
    const dateTexts = [];
    dateEls.forEach((el) => {
      const text = el.textContent.trim();
      if (text && text !== '•' && text !== 'By') dateTexts.push(text);
    });
    if (dateTexts.length) {
      const p = document.createElement('p');
      p.textContent = dateTexts.join(' · ');
      frag.appendChild(p);
    }
    row.push(frag);
  }

  cells.push(row);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
