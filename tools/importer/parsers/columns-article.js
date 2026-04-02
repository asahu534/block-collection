/* eslint-disable */
/* global WebImporter */
/** Parser for columns-article. Base: columns. Source: https://wknd-trendsetters.site. */
export default function parse(element, { document }) {
  // Columns block: 2 columns — image left, article info right
  // Source DOM: .grid-layout.tablet-1-column.grid-gap-lg with two child divs
  // Columns blocks do NOT require field hints (xwalk exception)

  const cols = element.querySelectorAll(':scope > div');
  const cells = [];

  if (cols.length >= 2) {
    // Row 1: col1 = image, col2 = article info
    const col1Content = [];
    const col1Img = cols[0].querySelector('img, picture');
    if (col1Img) col1Content.push(col1Img);

    const col2Content = [];
    const heading = cols[1].querySelector('h2, h1');
    const breadcrumbs = cols[1].querySelector('.breadcrumbs');
    const authorInfo = cols[1].querySelectorAll('.flex-horizontal');

    if (breadcrumbs) col2Content.push(breadcrumbs);
    if (heading) col2Content.push(heading);
    authorInfo.forEach((info) => col2Content.push(info));

    cells.push([col1Content.length ? col1Content : '', col2Content.length ? col2Content : '']);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
