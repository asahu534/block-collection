/* eslint-disable */
/* global WebImporter */
/** Parser for accordion-faq. Base: accordion. Source: https://wknd-trendsetters.site. */
export default function parse(element, { document }) {
  // Accordion FAQ: expandable question/answer pairs
  // Source DOM: .faq-list with details.faq-item children, each with summary.faq-question and .faq-answer
  // Container block: each row = one item, col1 = summary (question), col2 = text (answer)

  const faqItems = element.querySelectorAll('details.faq-item, details');
  const cells = [];

  faqItems.forEach((item) => {
    const summary = item.querySelector('summary, .faq-question');
    const answer = item.querySelector('.faq-answer');

    // Col 1: question/summary with field hint
    const summaryFrag = document.createDocumentFragment();
    summaryFrag.appendChild(document.createComment(' field:summary '));
    if (summary) {
      const questionSpan = summary.querySelector('span');
      summaryFrag.appendChild(document.createTextNode(
        questionSpan ? questionSpan.textContent : summary.textContent.trim()
      ));
    }

    // Col 2: answer text with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (answer) {
      const answerP = answer.querySelector('p');
      if (answerP) textFrag.appendChild(answerP);
    }

    cells.push([summaryFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
