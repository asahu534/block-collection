/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-info. Base: columns.
 * Source: https://main--boilerplate--asahu534.aem.page/
 * Columns blocks do NOT require field hints (xwalk exception).
 * Block library: 2 columns per row, multiple rows.
 * Source has 2 rows: [text+list+button | image], [image | text+button]
 * Generated: 2026-04-02
 */
export default function parse(element, { document }) {
  const cells = [];

  // Iterate over each row in the columns block
  // Source: <div class="columns block columns-2-cols"> > div (rows) > div (columns)
  const rows = element.querySelectorAll(':scope > div');
  rows.forEach((row) => {
    const cols = row.querySelectorAll(':scope > div');
    const rowCells = [];
    cols.forEach((col) => {
      // Create a fragment to hold the column content
      const frag = document.createDocumentFragment();
      while (col.firstChild) {
        frag.appendChild(col.firstChild);
      }
      rowCells.push(frag);
    });
    if (rowCells.length > 0) {
      cells.push(rowCells);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-info', cells });
  element.replaceWith(block);
}
