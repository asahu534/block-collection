/* eslint-disable */
/* global WebImporter */
/**
 * Parser for accordion-faq. Base: accordion.
 * Source: https://wknd-trendsetters.site (section 6 FAQ)
 * Model fields per item: summary (text), text (richtext)
 * → 1 row per FAQ item: [summary | text]
 */
export default function parse(element, { document }) {
  // Each FAQ item is a <details> element
  const items = element.querySelectorAll('details.faq-item, details');

  const cells = [];

  items.forEach((item) => {
    // Cell 1: summary (question)
    const summaryEl = item.querySelector('summary');
    const questionSpan = summaryEl ? summaryEl.querySelector('span') : null;
    const questionText = questionSpan ? questionSpan.textContent.trim() : (summaryEl ? summaryEl.textContent.trim() : '');

    const summaryFrag = document.createDocumentFragment();
    summaryFrag.appendChild(document.createComment(' field:summary '));
    summaryFrag.appendChild(document.createTextNode(questionText));

    // Cell 2: text (answer)
    const answerDiv = item.querySelector('.faq-answer, summary ~ div');
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (answerDiv) {
      while (answerDiv.firstChild) {
        textFrag.appendChild(answerDiv.firstChild);
      }
    }

    cells.push([summaryFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
