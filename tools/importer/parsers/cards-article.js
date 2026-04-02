/* eslint-disable */
/* global WebImporter */
/** Parser for cards-article. Base: cards. Source: https://wknd-trendsetters.site. */
export default function parse(element, { document }) {
  // Cards article: 4 article cards with image, tag, date, title
  // Source DOM: .grid-layout.desktop-4-column with a.article-card children
  // Container block: each row = one card, col1 = image, col2 = text (tag, date, title)

  const articleCards = element.querySelectorAll('a.article-card, .article-card');
  const cells = [];

  articleCards.forEach((card) => {
    const img = card.querySelector('.article-card-image img, img');
    const tag = card.querySelector('.tag');
    const date = card.querySelector('.paragraph-sm.utility-text-secondary');
    const title = card.querySelector('h3, h4, .h4-heading');

    // Col 1: image with field hint
    const imgFrag = document.createDocumentFragment();
    imgFrag.appendChild(document.createComment(' field:image '));
    if (img) imgFrag.appendChild(img);

    // Col 2: text content with field hint
    const textFrag = document.createDocumentFragment();
    textFrag.appendChild(document.createComment(' field:text '));
    if (tag) textFrag.appendChild(tag);
    if (date) textFrag.appendChild(date);
    if (title) textFrag.appendChild(title);

    // Preserve the link href on the title
    const link = card.closest('a[href]') || card;
    if (link.href && title) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = title.textContent;
      title.textContent = '';
      title.appendChild(a);
    }

    cells.push([imgFrag, textFrag]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
