/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns block.
 * Base: columns. Source: https://main--block-collection--asahu534.aem.page/
 * xwalk: Columns blocks do NOT require field hints.
 * Source DOM: div.columns.columns-2-cols with 2 rows, each having 2 columns.
 * Row 1: text (p, ul, a.button.primary) + image (picture)
 * Row 2: image (picture) + text (p, a.button.secondary)
 */
export default function parse(element, { document }) {
  const rows = element.querySelectorAll(':scope > div');
  const cells = [];

  rows.forEach((row) => {
    const cols = row.querySelectorAll(':scope > div');
    const rowCells = [];

    cols.forEach((col) => {
      // Collect all child nodes of the column
      const content = document.createDocumentFragment();
      while (col.firstChild) {
        content.appendChild(col.firstChild);
      }
      rowCells.push(content);
    });

    if (rowCells.length > 0) {
      cells.push(rowCells);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns', cells });
  element.replaceWith(block);
}
